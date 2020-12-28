export const mapHtmlToString = htmlMarkup =>
    htmlMarkup
        ? htmlMarkup
              .trim()
              .replace(/<style.*[\s\S]*<\/style>/gm, '')
              .replace(/<br[^>]*>(.*?)/gm, '\n')
              .replace(/<\/p[^>]*>(.*?)/gm, '\n')
              .replace(/<(?:.|\n)*?>/gm, '')
              .replace(/&nbsp;/gm, ' ')
              .replace(/&amp;/gm, '&')
        : ''
