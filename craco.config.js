const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#143d8d",
              "@link-color": "#1c2b4a",
              "@disabled-color": "#1c2b4a",
              "@heading-color": "#1c2b4a",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
