module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@domains": "./domains",
            "@constants": "./constants",
            "@lib": "./lib",
            "@types": "./types",
            "@providers": "./providers",
            "@navigation": "./navigation",
            "@components": "./components",
            "@hooks": "./hooks",
            "@utils": "./utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
