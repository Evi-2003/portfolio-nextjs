import Markdown from 'react-markdown';

export default function StyledMarkdown({ content }: { content: string | undefined | null }) {
  if (!content) return null;

  return (
    <Markdown
      components={{
        h1: ({ children }) => <h1 className="my-4 text-3xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="my-3 text-2xl font-semibold">{children}</h2>,
        h3: ({ children }) => <h3 className="my-2 text-xl font-medium">{children}</h3>,
        p: ({ children }) => <p className="my-2 text-balance leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="my-2 ml-8 list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="my-2 ml-8 list-decimal">{children}</ol>,
        li: ({ children }) => <li className="my-1 text-base">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
        ),
        code: ({ children }) => <code className="rounded bg-gray-200 p-1">{children}</code>,
        em: ({ children }) => <em className="text-base italic">{children}</em>,
        strong: ({ children }) => <strong className="text-base font-bold">{children}</strong>,
        a: ({ children, href }) => (
          <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
