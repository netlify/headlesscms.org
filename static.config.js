import axios from 'axios'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          types: {
            api_driven: 'API Driven',
            git_based: 'Git-based',
          },
          generators: {
            all: 'All',
            custom: 'Custom',
            gatsby: 'Gatsby JS',
            hexo: 'Hexo',
            hugo: 'Hugo',
            jekyll: 'Jekyll',
            metalsmith: 'Metalsmith',
            middleman: 'Middleman',
            phenomic: 'Phenomic',
            spike: 'Spike',
          },
          licenses: {
            open_source: 'Open source',
            closed_source: 'Closed source',
          },
          sorts: {
            stars: 'GitHub stars',
            followers: 'Twitter followers',
            title: 'Title',
          },
          projects: [{
            title: 'Netlify CMS',
            repo: 'netlify/netlify-cms',
            homepage: 'https://www.netlifycms.org',
            open_source: true,
            type: 'git_based',
            supported_generators: 'all',
            description: 'A git based, client side CMS for static site generators.',
            starter_template_repo: 'netlify-templates/one-click-hugo-cms',
            images: '/images/netlify-cms1.png',
          }],
        }),
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
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
            <link href='//fonts.googleapis.com/css?family=Roboto:400,100,700' rel='stylesheet' type='text/css'/>

            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
