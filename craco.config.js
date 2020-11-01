const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // "@primary-color": "#212529",
              // "@heading-color": "#212529",
              // "@text-color": "#212529",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
