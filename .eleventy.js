const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/**/*.{png,js,css}");

  // Get shrine names from the shrines directory
  eleventyConfig.addGlobalData("shrines", () => {
    const shrinesDir = path.join(__dirname, 'src', 'shrines');
    if (!fs.existsSync(shrinesDir)) {
      return [];
    }
    
    return fs.readdirSync(shrinesDir)
      .filter(file => fs.statSync(path.join(shrinesDir, file)).isDirectory())
      .sort();
  });

  // Get webring names from the webrings directory
  eleventyConfig.addGlobalData("webrings", () => {
    const webringsDir = path.join(__dirname, 'src', 'webrings');
    if (!fs.existsSync(webringsDir)) return [];

    return fs.readdirSync(webringsDir)
      .filter(file => fs.statSync(path.join(webringsDir, file)).isDirectory())
      .sort()
      .map(dirName => {
        const snippetPath = path.join(webringsDir, dirName, 'snippet.html');
        let snippet = "";

        // Check if the snippet file exists before trying to read it
        if (fs.existsSync(snippetPath)) {
          snippet = fs.readFileSync(snippetPath, "utf8");
        }

        return {
          name: dirName,
          snippet: snippet
        };
      });
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
}