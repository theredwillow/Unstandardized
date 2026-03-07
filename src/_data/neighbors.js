const glob = require("fast-glob");
const path = require("path");

module.exports = async function() {
  const files = await glob("src/neighbors/**/*.webc");

  // Return just the filenames without the extension (the tag names)
  return files.map(file => {
    return path.parse(file).name;
  });
};
