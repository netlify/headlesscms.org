import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { map, mapValues, find, uniq, flatten, sortBy, pickBy } from 'lodash'
import decamelize from 'decamelize'
import dateFns from 'date-fns'
import { toSlug } from 'Scripts/util'
import grayMatter from 'gray-matter'
import marked from 'marked'
import fetchArchive from './scripts/fetch-archive'
import * as projectsMarkdown from './content/projects/*.md'
import * as pagesMarkdown from './content/pages/*.md'

const SITE_URL = 'https://headlesscms.org'

function processMarkdown(markdown, key) {
  const { content, data } = grayMatter(markdown)
  const html = marked(content)
  return { content: html, key: decamelize(key, '-'), ...data }
}

function mapProjectFrontMatter({
  title,
  repo,
  homepage,
  opensource,
  supportedgenerators,
  twitter,
  typeofcms,
  description,
  images,
  startertemplaterepo,
  content,
}) {
  return {
    title,
    slug: toSlug(title),
    repo,
    homepage,
    openSource: opensource.toLowerCase() === 'yes',
    generators: supportedgenerators,
    twitter,
    type: typeofcms,
    description,
    images,
    starterTemplateRepo: startertemplaterepo,
    content,
  }
}

function extractRelevantProjectData(data) {
  return mapValues(data, project => {
    const timestamps = map(project, 'timestamp');
    const newestTimestamp = dateFns.max(...timestamps).getTime()

    // `targetOldestTimestamp` creates a timestamp which will serve as an anchor, we'll use the
    // dataset with a timestamp closest to it as our oldest comparison data.
    const targetOldestTimestamp = dateFns.subWeeks(Date.now(), 1).getTime()
    const oldestTimestamp = dateFns.closestTo(targetOldestTimestamp, timestamps).getTime()

    const dataAgeInDays = dateFns.differenceInDays(Date.now(), oldestTimestamp)
    const { followers, forks, stars, issues } = find(project, { timestamp: newestTimestamp }) || {}
    const {
      forks: forksPrevious,
      stars: starsPrevious,
      issues: issuesPrevious,
      followers: followersPrevious,
    } = find(project, { timestamp: oldestTimestamp }) || {}
    return {
      followers,
      forks,
      stars,
      issues,
      forksPrevious,
      starsPrevious,
      issuesPrevious,
      followers,
      followersPrevious,
      dataAgeInDays,
    }
  })
}

/**
 * Retrieve and format all project data.
 */
async function getProjects() {
  /**
   * Get project details from frontmatter.
   */
  const projectDetailsRaw = map(projectsMarkdown, processMarkdown)
  const projectDetails = await Promise.all(map(projectDetailsRaw, mapProjectFrontMatter))

  /**
   * Get external project data.
   */
  const projectDataRaw = await fetchArchive(projectDetails)
  const projectData = extractRelevantProjectData(projectDataRaw)

  /**
   * Combine project details from frontmatter and project data from
   * external sources, using the sluggified title as the link, since
   * the sluggified titles are used as top level keys in the collected
   * external data.
   */
  const projects = projectDetails.map(project => {
    const slug = toSlug(project.title)
    const data = projectData[slug]
    return pickBy({ ...project, ...data }, val => val)
  })

  return projects
}

/**
 * Generate dropdown filter values from frontmatter values.
 */
function generateFilters(projects) {
  const types = sortBy(uniq(map(projects, 'type')))
  const generators = sortBy(uniq(flatten(map(projects, 'generators'))))

  return { types, generators }
}

/**
 * Retrieve and format markdown for unique pages.
 */
function getPages() {
  return map(pagesMarkdown, processMarkdown)
}

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const projects = await getProjects()
    const pages = await getPages()
    const defaultShareText = `Check out headlessCMS, a leaderboard of content management systems for JAMstack sites.`;
    return [
      {
        path: '/',
        component: 'src/Home/Home',
        getData: () => {
          const { types, generators } = generateFilters(projects)
          return { projects, types, generators, shareUrl: SITE_URL, shareText: defaultShareText }
        }
      },
      {
        path: 'projects',
        children: projects.map(project => ({
          path: project.slug,
          component: 'src/Project/Project',
          getData: () => ({
            ...project,
            shareUrl: `${SITE_URL}/projects/${project.slug}`,
            shareText: `Check out ${project.title}, a headless CMS for JAMstack sites on the headlessCMS.org leaderboard.`,
          }),
        }))
      },
      ...[ 'about', 'contribute', 'contact'  ].map(key => ({
        path: key,
        component: 'src/Page',
        getData: () => {
          const { title, content } = find(pages, { key })
          return { title, content, shareUrl: SITE_URL, shareText: defaultShareText }
        }
      })),
      {
        is404: true,
        component: 'src/App/404',
        getData: () => ({ shareUrl: SITE_URL, shareText: defaultShareText }),
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  siteRoot: SITE_URL,
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link type="image/x-icon" rel="shortcut icon" href="favicon.ico"/>

            <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible"/>

            <meta name="twitter:card" value="headlessCMS is a leaderboard of the top Content Management Systems (CMS) for JAMstack sites. Promoting a static approach to websites."/>

            <meta property="og:title" content="headlessCMS" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://headlesscms.org/" />
            <meta property="og:image" content="https://headlesscms.org/images/headlesscms.png" />
            <meta property="og:description" content="headlessCMS is a leaderboard of the top Content Management Systems for JAMstack sites. Promoting a static approach to building websites." />

            <link href='//fonts.googleapis.com/css?family=Roboto+Slab:700' rel='stylesheet' type='text/css'/>
            <link href='//fonts.googleapis.com/css?family=Roboto:100,400,600,700' rel='stylesheet' type='text/css'/>

            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
