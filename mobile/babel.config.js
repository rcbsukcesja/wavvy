module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            src: './src',
          },
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
    ],
  };
};
