const mdIt = require('markdown-it')
const mdEmoji = require('markdown-it-emoji')
const mdCheckbox = require('./md-checkbox')
const hljs = require('highlight.js')

const md = mdIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
      } catch (err) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})
md.use(mdEmoji).use(mdCheckbox)

module.exports = md
