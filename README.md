# Next.JS + Tailwind CSS

Setting up [Tailwind CSS](https://tailwindcss.com/) ("Tailwind") in [Next.JS](https://nextjs.org/) 9.3.0 ("Next").

This is based on

1. [the official setup example](https://github.com/tailwindcss/setup-examples/tree/master/examples/nextjs).
2. Sung's blog entry, [Tailwind for Create-React-App Cheat Sheet](https://sung.codes/blog/2020/02/26/tailwind-for-create-react-app-cheat-sheet/)

## Table of Contents

0. Assumption
1. Install DEV dependencies
1. Create a Tailwind configuration file
1. Configure PostCSS for Tailwind
1. Create a Tailwind file
1. Create NPM Scripts
1. Import Tailwind CSS Output
1. (Optional) Normalize `body`

## 0. Assumption

I will assume that you have an existing Next site.

## 1. Install DEV dependencies

```bash
# yarn
yarn add -D @fullhuman/postcss-purgecss autoprefixer npm-run-all cross-env cssnano postcss-cli purgecss tailwindcss
# npm
npm install -D @fullhuman/postcss-purgecss autoprefixer npm-run-all cross-env cssnano postcss-cli purgecss tailwindcss
```

## 2. Create a Tailwind configuration file

```bash
npx tailwind init tailwind.config.js
```

## 3. Configure PostCSS for Tailwind

1. Create a PostCSS configuration file.

```bash
# bash
touch postcss.config.js
# Powershell
new-item postcss.config.js
```

2. Configure PostCSS

If you have React components in `<project root>/components` folder, add `"./components/**/*.js"` to `contents: [...]`.

_⚠ Note: [Next disallows require in PostCSS configuration file](https://github.com/zeit/next.js/issues/10117#issuecomment-574899412)._  
So unlike [the create-react-app version](https://github.com/dance2die/template.tailwind.cra/blob/master/postcss.config.js), you need to use a subset of configuration option using an object syntax.

```javascript
const purgecss = {
  '@fullhuman/postcss-purgecss': {
    // Use this if you have `./components` folder
    // content: ["./components/**/*.js", "./pages/**/*.js"],
    content: ['./pages/**/*.js'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Purge and minify CSS only production builds only
    ...(process.env.NODE_ENV === 'production'
      ? { ...purgecss, cssnano: {} }
      : {})
  }
}
```

## 4. Create a Tailwind file

Create a file `./src/styles/tailwind.css`.

```bash
# bash
mkdir -p ./src/styles/ && touch ./src/styles/tailwind.css
# Powershell
new-item ./src/styles/tailwind.css -ItemType File -Force
```

and add following Tailwind utilities.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 5. Create NPM Scripts

```json
Update the `package.json` script to create Tailwind CSS file before starting/building.

"scripts": {
  "build:css": "postcss src/styles/tailwind.css -o src/styles/index.css",
  "watch:css": "postcss src/styles/tailwind.css -o src/styles/index.css --watch",
  "env:dev": "cross-env NODE_ENV=development",
  "env:prod": "cross-env NODE_ENV=production",
  "next:dev": "sleep 5 && next dev",
  "next:build": "next build",
  "dev": "run-p env:dev watch:css next:dev",
  "build": "run-s env:prod build:css next:build",
  "start": "next start"
},
```

## 6. Import Tailwind CSS Output

If you already don't have a [Custom App](https://nextjs.org/docs/advanced-features/custom-app), create it (`./pages/_app.js`).

Import the Tailwind generated CSS file.

```javascript
import React from 'react'
// This is the Tailwind generated CSS file
import '../src/styles/index.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

## 7. (Optional) Normalize `body`

I couldn't figure out how but for some reason, Tailwind's normalize in `@tailwind base` [isn't applied](https://github.com/zeit/next.js/issues/151#issuecomment-257090939) thus applying margin (`8px`) around the site.

You can add normalize CSS as a global style in the custom App file.  
The updated `App` file would look like the following.

```javascript
import React from 'react'
import '../src/styles/index.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* 
      Tailwind's normalize isn't applied
      thus 8px margin is added around "body". 
      Fix it with a global style.
      https://github.com/zeit/next.js/issues/151#issuecomment-257090939 */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
```
