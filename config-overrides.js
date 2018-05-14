const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const mnfst = require('./src/manifest.json');


module.exports = (config, env) => {

  const appConstants = {
    googleExtensionId: '',
    apiRoot: ''
  };
  const config_entry = [...config.entry];
  config.entry = {
    index: config_entry,
    content: __dirname + "\\src\\content\\index.js",
    background: __dirname + "\\src\\background\\index.js"
  }

  // remove chunkhashes
  config.output.filename = "js/[name].js"
  config.output.chunkFilename = "js/[name].chunk.js"

  // disable precache-webpack-plugin
  var precachePlugin = config.plugins.find(function (plugin) {
    return (plugin.options && plugin.options.cacheId === "sw-precache-webpack-plugin");
  });
  if (precachePlugin) {
    config.plugins.splice(config.plugins.indexOf(precachePlugin), 1);
  }

  // remove assets-manifest
  var assetManifestPlugin = config.plugins.find(function (plugin) {
    return (plugin.opts && plugin.opts.fileName === "asset-manifest.json");
  });
  if (assetManifestPlugin) {
    config.plugins.splice(config.plugins.indexOf(assetManifestPlugin), 1);
  }

  /*    // update ENV variables
      var definitionsPlugin = config.plugins.find(function (plugin) {
          return !!plugin.definitions;
      });
      if(definitionsPlugin){
          definitionsPlugin.definitions['process.env'].ORACULUM_HOST = '\"' + process.env.ORACULUM_HOST + '\"';
          definitionsPlugin.definitions['process.env'].ORACULUM_PORT = '\"' + process.env.ORACULUM_PORT + '\"';
      }

      var replacementPlugin = config.plugins.find(function (plugin) {
          return !!plugin.replacements;
      });
      if(replacementPlugin){
          replacementPlugin.replacements.ORACULUM_HOST = process.env.ORACULUM_HOST;
          replacementPlugin.replacements.ORACULUM_PORT = process.env.ORACULUM_PORT;
      }*/

  // setup oauth2 keys
  if (process.env.GOOGLE_KEY === "production") {
    console.log('Production Google Key');
    // production
    mnfst.oauth2.client_id = process.env.PROD_OAUTH_2_CLIENT_ID;
    appConstants.apiRoot = process.env.PROD_REACT_APP_API_URL;
  } else {
    console.log('Development Google Key');
    // dev
    mnfst.oauth2.client_id = process.env.DEV_OAUTH_2_CLIENT_ID;
    appConstants.googleExtensionId = process.env.DEV_GOOGLE_EXTENSION_ID;
    appConstants.apiRoot = process.env.DEV_REACT_APP_API_URL;
  }

  config.module.rules.push({
    test: /app-constants\.js$/,
    loader: 'string-replace-loader',
    options: {
      multiple: [
        { search: '<--GOOGLE_EXTENSION_ID-->', replace: appConstants.googleExtensionId },
        { search: '<--API_ROOT-->', replace: appConstants.apiRoot }
      ]
    }
  });

  // remove hashes
  var cssConfig = config.plugins.find(function (plugin) {
    return (plugin.filename && plugin.filename.indexOf("css") !== -1)
  });
  if (cssConfig) {
    cssConfig.filename = "css/[name].css";
  }

  var mediaConfigs = config.module.rules.find(function (rule) {
    return (!!rule.oneOf);
  });
  mediaConfigs.oneOf.forEach(function (mediaConfig) {
    if (mediaConfig &&
      mediaConfig.options &&
      mediaConfig.options.name &&
      mediaConfig.options.name.indexOf("static/media") !== -1
    ) {
      mediaConfig.options.name = "assets/[name].[ext]";
    }
  });


  var indexHtmlPlugin = config.plugins.find(function (plugin) {
    return (plugin.options && plugin.options.chunks);
  });

  if (indexHtmlPlugin) {
    indexHtmlPlugin.options.excludeChunks = ["content", "background"];
  }


  // generate manifest
  config.plugins.push(new GenerateJsonPlugin("./manifest.json", mnfst));

  //console.log(JSON.stringify(config));
  return config;
}