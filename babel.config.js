module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@": "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@context": "./src/context",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@src": "./src",
          },
        },
      ]
    ],
  };
};
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // já inclui o necessário para expo-router
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@": "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@context": "./src/context",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@src": "./src"
          },
        },
      ]
    ],
  };
};
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // já inclui o necessário para expo-router
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@": "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@context": "./src/context",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@hooks": "./hooks",
            "@src": "./src"
          },
        },
      ]
    ],
  };
};
