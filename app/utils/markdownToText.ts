export const markdownToText = (markdown: string) => {
  return markdown
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/^\s*#+\s*/gm, ''); // Remove Markdown headings (e.g., # Heading)
};
