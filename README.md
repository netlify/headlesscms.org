# headlesscms.org

[headlesscms.org](http://www.headlesscms.org), a leaderboard of top open-source static site content management systems.

## Contributing

Missing a static site generator here? Just fork the repo and add your generator
as a `<name>.md` in the `content/projects` folder.

Make sure to follow the following rules:

*   **Static Site Generation:** No "flat-file CMSs". The program must be able to output a static website that can be hosted in places like Netlify, S3 or Github Pages.
*   **Stick to the format:** Fill out all the same fields as the other CMS's in `content/projects`.
*   **Short description:** Keep all the details for the body text, keep the description for the overview page short and sweet.

## Usage

Be sure that you have the latest node, npm and [Hugo](https://gohugo.io/) installed. If you need to install hugo, run:

```bash
brew install hugo
```

Next, clone this repository and run:

```bash
npm install
npm start
```

In order to successfully retrieve Twitter followers and GitHub stars, you will need authentication keys for both services.

For GitHub, all you'll need is a personal access token. This can be generated at <https://github.com/settings/tokens>. For Twitter, you need to create an application at <https://apps.twitter.com> and use the "Consumer Key" and "Consumer Secret". When deploying, you must set the environment variables `HEADLESS_CMS_GITHUB_TOKEN`, `HEADLESS_CMS_TWITTER_KEY`, and `HEADLESS_CMS_TWITTER_SECRET`. If you are developing locally, you can set these in a `.env` file at the root of the repo like so:

```
HEADLESS_CMS_GITHUB_TOKEN=examplekey123abc
HEADLESS_CMS_TWITTER_KEY=examplekey231abc
HEADLESS_CMS_TWITTER_SECRET=examplekey321abc
```

Retrieval of stars and followers is cached locally for 15min in the directory `.generated-data-cache`, to prevent hammering the APIs when doing a lot of rebuilds in succession. Deleting that directory will cause the stars and followers to be refetched. Since that directory is ignored by git, clean repo builds will always retrieve fresh data

Then visit http://localhost:3000/ - BrowserSync will automatically reload CSS or refresh the page when stylesheets or content changes.

To build your static output to the `/dist` folder, use:

```bash
npm run build
```

## Netlify

headlesscms.org is built and maintained by [Netlify](https://www.netlify.com), a hosting and automation service for static websites and apps.

## License
This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).


