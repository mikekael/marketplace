module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          'ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@app': './src',
          '@screens': './src/screens',
          '@components': './src/components',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@domain': './src/domain',
          '@services': './src/services',
        },
      },
    ],
  ],
};
