const link_regex = /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/;
const tag_regex = /^([^\s]+)/;

const md = require('markdown-it')({
  html: true,
  linkify: true
}).use(require('markdown-it-footnote'))
.use((md) => {
  md.linkify.add('[[', {
    validate: link_regex,
    normalize: match => {
                const parts = match.raw.slice(2,-2).split("|");
                parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                match.text = (parts[1] || parts[0]).trim();
                match.url = `/notes/${parts[0].trim()}/`;
    }
  });

  md.linkify.add('#', {
    validate: tag_regex,
    normalize: match => {
      match.text = match.raw.trim();
      match.url = `/tags/${match.text}/`;
    }
  })
});


