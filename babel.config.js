module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "quasar": {
          "transform": "quasar/dist/babel-transforms/imports.js",
          "preventFullImport": true
        }
      }
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}