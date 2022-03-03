# aoepeople.github.io

Welcome to our AOE opensource landing page.

## Local Development Setup

To work on this repository checkout the sourcecode to any folder you like.
Also install nodejs+npx and hugo (e.g. via `brew install hugo`).

Start the hugo server for serving content:
```
hugo server --renderToDisk --disableFastRender --forceSyncStatic
```

For Tailwind, start the tailwind watcher in a second terminal:
```
cd themes/aoepeople.github.io
npm install
npm run css:watch
```

Now the page is available on http://localhost:1313/
