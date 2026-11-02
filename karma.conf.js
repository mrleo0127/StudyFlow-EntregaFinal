
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {
        pattern: 'src/app/store/reading.reducer.spec.ts',
        watched: false,
      },
    ],

    preprocessors: {
      'src/app/store/reading.reducer.spec.ts': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['.ts', '.js'],
      },

      module: {
        rules: [
          {
            test: /\.ts$/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.spec.json',
                transpileOnly: true,
              },
            },
            exclude: /node_modules/,
          },
        ],
      },
    },

    webpackMiddleware: {
      stats: 'errors-warnings',
    },

    reporters: ['progress', 'junit'],

    junitReporter: {
      outputDir: 'reports/junit',
      outputFile: 'results.xml',
      useBrowserName: false,
      suite: 'StudyFlow Tests',
    },

    browsers: ['ChromeHeadless'],

    singleRun: true,

    restartOnFileChange: false,
  })
}
