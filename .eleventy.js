const parser = require('index').md;

module.exports = {
  configuration: (conf, opts = {}) => {
    conf.addFilter('markdownify', string => {
     return parser.render(string);
    });

    conf.setLibrary('md', parser);
  }
};
