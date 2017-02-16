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

Then visit http://localhost:3000/ - BrowserSync will automatically reload CSS or
refresh the page when stylesheets or content changes.

To build your static output to the `/dist` folder, use:

```bash
npm run build
```

## Netlify

headlesscms.org is built and maintained by [Netlify](https://www.netlify.com), a hosting and automation service for static websites and apps.

## License
This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).


