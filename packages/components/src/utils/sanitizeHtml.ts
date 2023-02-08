import sanitize from 'sanitize-html';

const sanitazeHtml = (html: string): string => {
  return sanitize(unescape(html), {
    allowedTags: [
      // Content sectioning
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',

      // Text content
      'blockquote',
      'dd',
      'dl',
      'dt',
      'figcaption',
      'figure',
      'hr',
      'li',
      'ol',
      'p',
      'pre',
      'ul',

      // Inline text semantics
      'a',
      'abbr',
      'b',
      'bdi',
      'bdo',
      'br',
      'cite',
      'code',
      'data',
      'dfn',
      'em',
      'i',
      'kdb',
      'mark',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'small',
      'span',
      'strong',
      'sub',
      'sup',
      'time',
      'u',
      'var',
      'wbr',

      // Image and multimedia
      'area',
      'audio',
      'img',
      'map',
      'track',
      'video',

      // SVG and MathML
      'svg',
      'math',
    ],
    allowedAttributes: {
      a: ['href'],
    },
  });
};

export default sanitazeHtml;
