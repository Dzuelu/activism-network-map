const defaultLint = require('dzuelu-eslint-config');

defaultLint.ignorePatterns.push('out/')
defaultLint.settings.jest = { version: 27 }; // so we ignore jest
defaultLint.rules['@typescript-eslint/naming-convention'] = "off";
defaultLint.rules['no-new'] = "off";
defaultLint.rules['no-plusplus'] = "off";
  defaultLint.rules['node/no-missing-import'] = ["error", {
"allowModules": ["@discordjs/rest"],
  "tryExtensions": [".js", ".ts"]
}];

module.exports = defaultLint;
