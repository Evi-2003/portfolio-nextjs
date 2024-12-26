import sanitizeHtml from 'sanitize-html';

export const markdownToText = (markdown: string) => {
  const sanitizedMarkdown = sanitizeHtml(markdown, {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all HTML attributes
  });
  return sanitizedMarkdown.replace(/^\s*#+\s*/gm, ''); // Remove Markdown headings (e.g., # Heading)
};
