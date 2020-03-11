const purgecss = {
  '@fullhuman/postcss-purgecss': {
    // Use this if you have `./components` folder
    // content: ["./components/**/*.js", "./pages/**/*.js"],
    content: ['./pages/**/*.js'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
}

// Unlike in create-react-app, you can't use `require`.
// Reference: https://github.com/zeit/next.js/issues/10117
// Workaround: https://github.com/zeit/next.js/issues/10117#issuecomment-574892000
// PostCSS-Loader documentation: https://github.com/postcss/postcss-loader#configuration
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
