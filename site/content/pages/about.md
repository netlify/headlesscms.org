---
title: About HeadlessCMS
url: '/about/'
layout: page
---

# About HeadlessCMS

HeadlessCMS.org is an overview of the top Content Management tools for JAMstack sites.

Headless CMS is also known as JAMstack CMS or Decoupled CMS.

## What is a Headless CMS

Basically the frontend component of a Headless CMS is decoupled from the actual serving of the website or app.

There’s a few ways the headless CMS can work (look below). 
Either as purely API driven, where the end user connects to the api from the browser.
Or it can work by updating content in Git.

Headless CMS is opposite of legacy systems like Wordpress, Drupal, Joomla, etc. They are all CMS’ that traditionally have to be hosted and built together with the site every time it’s served.

A headless CMS doesn’t care where it’s serving it’s content to. It’s no longer attached to the frontend, and the content can be viewed on any platform.

You can also say that any content management tool that can manage content on sites or apps that can be hosted directly on a CDN, can be included on this list.

## Why is Headless better than legacy systems

The advantages of this approach is huge, and it works with [JAMstack](https://www.jamstack.org/) sites that are many times faster safer and cheaper to scale than traditional sites. Read more about the stack here.

## Who makes this

Headlesscms.com is run by [Netlify](https://www.netlify.com), a automation and deployment service for Headless CMS and JAMstack sites and apps in general, as a way to promote a JAMstack approach to building websites.

## How is it made

This site itself is built with [Victor Hugo](https://github.com/netlify/victor-hugo), an open-source boilerplate for Hugo (a site generator). [Netlify](https://www.netlify.com) builds and deploys the site daily. The source-code is available on GitHub and you’re more than welcome to contribute as long as you follow [the rules](/rules).

## Explanation of Categories

### Type: Git-based / API Driven / Desktop

Here we focus on what type of CMS it fall under.

--

**Git-based**

With a git-based CMS you are pushing changes to git that then triggers a new build of your site.

_Pros_

- Full version control on all content out of the box.
- All content lives as normal text files so a developer can use all the normal tools they use as a developer.
- Much easier to rollback.
- Is the most homogenous with the existing git-based workflow of most web-developers.

_Cons_

- Not a good solution if you want several apps or sites to pull content from the same CMS.
- If you have _tons_ of content, you would in most cases benefit from having a database instead.

--

**API-driven**

A CMS that is purely API driven. It does need to run every time a site has a visitor, but it’s an external api instead of having to run it as part of your site.

For some API-driven CMS Like contentful and prismic, you can also just use the api in the build phase, eliminating the need for anything being build on the fly. Though that will lead to longer build times.

_Pros_

- The best solution if you have several different apps or sites pulling the same managed content.

_Cons_

- Not version controlled in Git.
- Not as integrated in developer workflow as git-based CMS.

--

**Desktop**

A CMS that needs to run locally. Often tied to a specific site generator.

_Pros_

- You can work offline.

_Cons_

- Can’t update on the go (eg. from a mobile device)
- Needs installing as a desktop application by anyone who needs to use it
- Is often tied to a specific site generator.
- Most are not meant for collaboration.
- Not version controlled in Git.
- Not a good solution if you want several apps or sites to pull content from the same CMS.
- If you have tons of content, you would in most cases benefit from having a database instead.


### Site generators supported: All, or listed.

Site generators or Static Site Generators are a must use build tool for modern websites. They basically make it much easier to create, build and compile a site. They come and all shapes and sizes, and even though HTML, CSS and Javascript always comes out the other end, the language the site generators are written in varies.

Each project might call for a different generator, so it’s important to know which site generators are supported by which CMS.

### Open-source: Yes / No.

Tells you if it’s Open source (read free).

_Pros of open-source:_

- All your content is not in a binary proprietary database that you don’t own.
- You can change the content editing ui
- No subscription fees.

_Most common use (this is to help you find out what CMS suits your need):_

- Is this CMS made with smaller projects like blogs in mind (like Google Drive CMS), or is the scope for larger projects, or both.
