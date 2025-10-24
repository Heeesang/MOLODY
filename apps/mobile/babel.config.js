module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};