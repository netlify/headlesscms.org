import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { map, mapValues, find, uniq, flatten, sortBy } from 'lodash'
import dateFns from 'date-fns'
import { toSlug } from 'Scripts/util'
import grayMatter from 'gray-matter'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkToRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import fetchArchive from './scripts/fetch-archive'
import * as projectsMarkdown from './content/projects/*.md'

function markdownToHtml(markdown) {
  return unified()
    .use(remarkParse)
    .use(remarkToRehype)
    .use(rehypeStringify)
    .process(markdown)
    .contents
}

function processMarkdownFiles(files) {
  return map(files, file => grayMatter(file).data)
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
  }
}

function extractRelevantProjectData(data) {
  return mapValues(data, project => {
    const timestamps = map(project, 'timestamp');
    const currentTimestamp = dateFns.max(...timestamps).getTime()
    const previousWeekTimestamp = dateFns.closestTo(dateFns.subWeeks(Date.now(), 1), timestamps).getTime()
    const { followers, forks, stars, issues } = find(project, { timestamp: currentTimestamp }) || {}
    const {
      forks: forksPrevious,
      stars: starsPrevious,
      issues: issuesPrevious,
    } = find(project, { timestamp: previousWeekTimestamp }) || {}
    return { followers, forks, stars, issues, forksPrevious, starsPrevious, issuesPrevious }
  })
}

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/Home/Home',
        getData: async () => {
          /**
           * Get project details from frontmatter.
           */
          const projectDetails = processMarkdownFiles(projectsMarkdown).map(mapProjectFrontMatter)

          /**
           * Generate dropdown filter values from frontmatter
           */
          const types = sortBy(uniq(map(projectDetails, 'type')))
          const generators = sortBy(uniq(flatten(map(projectDetails, 'generators'))))


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
            return { ...project, ...data }
          });

          return { types, generators, projects };
        }
      },
      {
        is404: true,
        component: 'src/App/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link type="image/x-icon" rel="shortcut icon" href="/images/favicon.ico"/>

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
