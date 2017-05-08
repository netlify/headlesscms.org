---
title: About HeadlessCMS
url: /about/
layout: page
---

# About HeadlessCMS

HeadlessCMS.org is an overview of the top Content Management tools for JAMstack sites.

'Headless CMS' is also commonly known as 'JAMstack CMS' or 'Decoupled CMS'.

## What is a Headless CMS

Basically the frontend component of a Headless CMS is decoupled from the actual serving of the website or app.

There’s a few ways the headless CMS can work (also look below).
Either as purely API driven, where the end user connects to the api from the browser, or it can work by updating content in Git.

Headless CMS' are opposite of legacy systems like Wordpress, Drupal, Joomla, etc. They are all CMS’ that traditionally have to be hosted and built together with the site every time it’s served.

A headless CMS doesn’t care where it’s serving its content to. It’s no longer attached to the frontend, and the content can be viewed on any platform.

You could also say that any content management tool that can manage content on sites or apps that doesn't need a server and can be hosted directly on a CDN, can be included on this list.

## Why is Headless better than legacy systems

The advantages of this approach is huge, and it works with [JAMstack](https://www.jamstack.org/) sites that are many times faster safer and cheaper to scale than traditional sites.

## Who makes this

Headlesscms.org is run by [Netlify](https://www.netlify.com), an automation and deployment service for Headless CMS and JAMstack sites  in general, as a way to promote the JAMstack approach to building websites.

## How is it made

This site itself is built with [Victor Hugo](https://github.com/netlify/victor-hugo), an open-source boilerplate for Hugo (a site generator). [Netlify](https://www.netlify.com) builds and deploys the site daily. The source-code is available on GitHub and you’re more than welcome to contribute as long as you follow [the rules](/rules).

## Explanation of Categories

### Type: Git-based / API Driven

Here we focus on what type of CMS it fall under.

**Git-based**

With a git-based CMS you are pushing changes to git that then triggers a new build of your site.

*Pros*

* Full version control on all content out of the box.
* All content lives as normal text files so developers can use all the normal tools they use as a developer.
* Much easier to rollback.
* Is the most homogenous approach with the existing git-based workflow of most web-developers.

*Cons*

* Not a good solution if you want several apps or sites to pull content from the same CMS.
* If you have *tons* of content, you would in some cases want a database instead.

**API-driven**

A CMS that is purely API driven. It does need to run every time a site has a visitor, but it’s an external api instead of having to run it as part of your site.

For some API-driven CMS Like Contentful and Prismic, you can also just use the api in the build phase, eliminating the need for anything being build on the fly. Though that will lead to longer build times.

*Pros*

* The best solution if you have several different apps or sites pulling the same managed content.

*Cons*

* Not version controlled in Git.
* Not as integrated in developer workflow as git-based CMS.


### Site generators supported: All, or listed.

Site generators or Static Site Generators are a must-use build tool for modern websites. They basically make it much easier to create, build and compile a modern website. They come and all shapes and sizes, and even though HTML, CSS and Javascript always comes out the other end, the language the site generators are written in varies.

Each project might call for a different generator, so it’s important to know which site generators are supported by which Headless CMS.

