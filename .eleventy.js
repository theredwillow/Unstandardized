const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/');
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