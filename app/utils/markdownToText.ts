import sanitizeHtml from 'sanitize-html';

export const markdownToText = (markdown: string) => {
  const sanitizedMarkdown = sanitizeHtml(markdown, {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all HTML attributes
  });

  // Remove all Markdown syntax
  const plainText = sanitizedMarkdown
    .replace(/^\s*#+\s*/gm, '') // Remove headings (e.g., # Heading)
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold syntax (e.g., **text**)
    .replace(/\*(.*?)\*/g, '$1') // Remove italic syntax (e.g., *text*)
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links (e.g., [text](url))
    .replace(/`(.*?)`/g, '$1') // Remove inline code (e.g., `code`)
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough (e.g., ~~text~~)
    .replace(/\n+/g, '\n') // Normalize newlines
    .trim(); // Trim leading/trailing whitespace

  return plainText;
};
