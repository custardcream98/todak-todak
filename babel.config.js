const alias = require("./importAliases");

module.exports = {
  plugins: [
    // .. other plugins
    [
      "module-resolver",
      {
        root: ["./src"],
        alias,
        extensions: [".jsx", "js"]
      }
    ]
  ]
};
