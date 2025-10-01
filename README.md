# SuitePress Webpack Setup Guide

This guide will help you configure Webpack for a WordPress theme development workflow with Babel, SCSS, and various optimizations.

---

## 1. Create `package.json`

Start by initializing your project with the following basic configuration:

```json
{
  "name": "suitepress",
  "version": "1.0.0",
  "description": "SuitePress WordPress Theme",
  "main": "main.js",
  "scripts": {
    "prod": "cross-env NODE_ENV=production webpack --mode production --progress",
    "dev": "cross-env NODE_ENV=development webpack --watch --mode development --progress",
    "clean": "rm -rf build/*"
  },
  "keywords": ["wordpress", "theme", "suitepress"],
  "author": "SuitePress",
  "license": "MIT",
  "private": true,
  "browserslist": [
    "defaults"
  ]
}
```

---

## 2. Install Webpack and Related Dependencies

Install all the required development packages using:

```bash
npm install webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin css-loader file-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin cssnano style-loader uglifyjs-webpack-plugin cross-env -D
```

---

##  3. Configure Babel

Create a `.babelrc` file in your project root and add:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Safari versions",
            "last 2 iOS versions",
            "last 1 Android version",
            "last 1 ChromeAndroid version",
            "ie 11"
          ]
        }
      }
    ],
    "@babel/preset-react"
  ]
}
```

---

## 4. Run in Development Mode

To start development with file watching:

```bash
npm run dev
```

---

## 5. Clean Build Directory

To remove all compiled files from the `build` folder:

```bash
npm run clean
```

---

## 6. Install and Configure SASS

Install SASS and SASS tools:

```bash
npm install node-sass sass-loader sass-mq -D
```

Ensure your Webpack config links properly to your `main.scss` file.

---

## 7. Optional: SVG Support

If you're handling SVGs, run:

```bash
npm run svg
```

(You can define this script in your `package.json` based on your SVG setup.)

---

## Debugging

### JavaScript Linting Errors

Fix ESLint-related issues by reinstalling the proper plugins:

```bash
npm uninstall eslint-loader
npm install eslint-webpack-plugin eslint eslint-plugin-jsdoc --save-dev
```

### SCSS Linting Errors

Install Stylelint with WordPress config:

```bash
npm install stylelint stylelint-config-wordpress stylelint-webpack-plugin -D
```
