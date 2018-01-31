const fs = require("fs");
const path = require("path");
const util = require("util");
const _ = require("lodash");
const fetch = require("node-fetch");
const matter = require("gray-matter");
const dotenv = require("dotenv");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

const ensureDirectory = dir => mkdir(dir).catch(err => err.code !== 'EEXIST' && Promise.reject(err));

dotenv.config();
const GITHUB_TOKEN = process.env.HEADLESS_CMS_GITHUB_TOKEN;
const TWITTER_KEY = process.env.HEADLESS_CMS_TWITTER_KEY;
const TWITTER_SECRET = process.env.HEADLESS_CMS_TWITTER_SECRET;

process.chdir(path.join(__dirname, ".."));

const mapToKeyVal = (arr, fn) =>
  arr.reduce((table, item, i) => {
    const [key, val] = fn(item, i);

    return {
      ...table,
      [key]: val,
    };
  }, {});

const readFrontMatter = path => readFile(path, "utf8").then(contents => matter(contents).data);

const getProjectsSourcePaths = () =>
  readdir("./site/content/projects/").then(paths =>
    paths.filter(path => path.endsWith(".md")).map(path => `./site/content/projects/${path}`),
  );

const getReducedValues = projectsData => {
  return projectsData.reduce(
    (acc, projectData) => {
      return {
        typesofcms: _.union(acc.typesofcms, [projectData.typeofcms]).sort(),
        generators: _.union(acc.generators, projectData.supportedgenerators).sort(),
      };
    },
    {
      typesofcms: [],
      generators: [],
    },
  );
};

const getRepoURL = repo => `https://api.github.com/repos/${repo}`;
const getRepoStars = repo =>
  fetch(getRepoURL(repo), {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
    .then(res => (res.ok ? res.json() : Promise.reject(new Error(`Could not retrieve stars for ${repo}`))))
    .then(repo => repo.stargazers_count);
const getProjectStars = project => (project.repo ? getRepoStars(project.repo) : Promise.resolve(0));
const getAllProjectsStars = async projects => {
  const allProjectStars = await Promise.all(projects.map(getProjectStars));
  return mapToKeyVal(projects, (project, i) => [project.title, allProjectStars[i]]);
};

const getTwitterAccessToken = async () => {
  const consumerKey = encodeURIComponent(TWITTER_KEY);
  const consumerSecret = encodeURIComponent(TWITTER_SECRET);
  const bearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
  const encodedBearerTokenCredentials = new Buffer(bearerTokenCredentials).toString("base64");

  const authResponse = await fetch(`https://api.twitter.com/oauth2/token`, {
    method: "POST",
    headers: {
      "User-Agent": "@bmischenko/headlesscms-twitter-followers v0",
      Authorization: `Basic ${encodedBearerTokenCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: "grant_type=client_credentials",
  });
  if (!authResponse.ok) {
    throw await authResponse.text();
  }
  const authBody = await authResponse.json();
  return authBody.access_token;
};

const getAllProjectsFollowers = async projects => {
  const usernames = projects.map(project => project.twitter).filter(_.identity);
  const usernameBatches = _.chunk(usernames, 100);
  const twitterToken = await getTwitterAccessToken();
  const twitterRequestPromises = usernameBatches.map(batch =>
    fetch("https://api.twitter.com/1.1/users/lookup.json", {
      method: "POST",
      headers: {
        "User-Agent": "@bmischenko/headlesscms-twitter-followers v0",
        Authorization: `Bearer ${twitterToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `screen_name=${batch.join(",")}`,
    }).then(res => res.json()),
  );
  const twitterResponses = await Promise.all(twitterRequestPromises);
  const twitterData = _.flatten(twitterResponses);
  const followersByUsernames = mapToKeyVal(twitterData, user => [user.screen_name.toLowerCase(), user.followers_count]);
  return projects
    .map(project => [project.title, project.twitter ? followersByUsernames[project.twitter.toLowerCase()] : 0])
    .reduce(
      (table, [title, followers]) => ({
        ...table,
        [title]: followers,
      }),
      {},
    );
};

const writeData = (path, data) => {
  const jsonString = JSON.stringify(data) + "\n";
  return writeFile(path, jsonString);
};

// 15min cache period by default. Prevents tons of requests from
// editing the site.
const cacheMs = 15 * 60 * 1000;
const cacheDirectory = "./.generated-data-cache/";
const writeToCacheAndReturn = async (key, fn) => {
  await ensureDirectory(cacheDirectory);
  const data = await fn();
  await writeData(path.join(cacheDirectory, key), data);
  return data;
};
const readFromCache = async key => readFile(path.join(cacheDirectory, key)).then(JSON.parse)
const cacheResult = async (key, fn) => {
  const currentTime = new Date().getTime();
  try {
    const stats = await stat(path.join(cacheDirectory, key));
    const mtime = new Date(stats.mtime).getTime();
    const difference = currentTime - mtime;
    if (difference < cacheMs) {
      return readFromCache(key);
    }
    return writeToCacheAndReturn(key, fn);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return writeToCacheAndReturn(key, fn);
    }
    throw err;
  }
};

const run = async () => {
  const sourcePaths = await getProjectsSourcePaths();
  const projects = await Promise.all(sourcePaths.map(readFrontMatter));
  const [followersByProjectTitle, starsByProjectTitle] = await Promise.all([
    cacheResult("followers", () => getAllProjectsFollowers(projects)),
    cacheResult("stars", () => getAllProjectsStars(projects)),
  ]);
  const finalProjects = projects.map(project => ({
    ...project,
    followers: followersByProjectTitle[project.title] || 0,
    stars: starsByProjectTitle[project.title] || 0,
  }));
  const { typesofcms, generators } = getReducedValues(finalProjects);
  const finalData = {
    projects: mapToKeyVal(finalProjects, project => [project.title, project]),
    typesofcms,
    generators,
  };
  await writeData("./site/data/projects.json", finalData);
};

run()
  .then(() => console.log("Successfully generated and wrote projects data."))
  .catch(console.error);
