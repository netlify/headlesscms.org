# headlesscms.org

[headlesscms.org](http://www.headlesscms.org), a leaderboard of top open-source static site content management systems.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ff98559c-c0a7-498d-9989-27f09b139e6f/deploy-status)](https://app.netlify.com/sites/headlesscms/deploys)

## Contributing

Missing a headless CMS here? Just fork the repo and add yours as a `<name>.md` in the
`content/projects` folder.

Make sure to follow the following rules:

*   **Truly headless:** This means your CMS must interact with content and data, and cannot be responsible for building the site.
*   **JAMstack:** Your CMS has to work with the JAMstack methodology: JavaScript, API's and Markup.
*   **Stick to the format:** Fill out all the same fields as the other CMS's in `content/projects`.
*   **Short description:** Keep all the details for the body text, keep the description for the overview page short and sweet.

## Usage

Be sure that you have the latest node and npm installed, then clone this repository and run:

```bash
npm install
npm start
```

In order to successfully retrieve Twitter followers and GitHub stars, you will need authentication
keys for both services.

For GitHub you'll need is a personal access token with permission to create Gists. This can be generated at
<https://github.com/settings/tokens>. For Twitter, you need to create an application at
<https://apps.twitter.com> to get the necessary tokens. When deploying, you must set the environment
variables per the example below. If you are developing locally, you can set
these in a `.env` file at the root of the repo.

```
HEADLESS_CMS_GITHUB_TOKEN=examplekey123abc
HEADLESS_CMS_TWITTER_CONSUMER_KEY=examplekey231abc
HEADLESS_CMS_TWITTER_CONSUMER_SECRET=examplekey321abc
HEADLESS_CMS_TWITTER_ACCESS_TOKEN_KEY=examplekey231abc
HEADLESS_CMS_TWITTER_ACCESS_TOKEN_SECRET=examplekey321abc
```

GitHub and Twitter data is cached in the `.tmp` directory, and online in a Gist. If neither has data
newer than 24 hours old, fresh data is fetched from GitHub and Twitter. Fetching caching occur
automatically during the build.

Then visit http://localhost:3000/ - React Static will automatically reload when changes occur.

To test a production build locally, do:

```bash
npm run stage
npm run serve
```

To run a production build for deployment:

```bash
npm run build
```

## Netlify

headlesscms.org is built and maintained by [Netlify](https://www.netlify.com), a hosting and automation service for static websites and apps.

## License
This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).
