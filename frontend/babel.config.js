module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    env: {
      production: {
        plugins: [
          "react-native-paper/babel",
          "expo-image-picker",
          [
            "module:react-native-dotenv",
            {
              envName: "APP_ENV",
              moduleName: "@env",
              path: ".env",
              blocklist: null,
              allowlist: null,
              safe: false,
              allowUndefined: true,
              verbose: false,
            },
          ],
          {
            photosPermission:
              "The app accesses your photos to let you share them with your friends.",
          },
        ],
      },
    },
  };
};
