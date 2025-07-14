const { marked } = require('marked');

// Configure marked for security
marked.setOptions({
  headerIds: false,
  mangle: false
});

class MarkdownService {
  renderToHtml(markdownContent) {
    if (!markdownContent) {
      return '';
    }

    // Convert markdown to HTML
    const html = marked(markdownContent);
    
    // Basic sanitization - remove script tags
    // In production, use a proper HTML sanitizer like DOMPurify
    const sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    return sanitized;
  }
}

module.exports = new MarkdownService();