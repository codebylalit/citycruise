module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [ // Corrected property name here
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path : ".env",
        },
      ],
    ],
  };
};
