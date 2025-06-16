import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false,
});

// Custom renderer for better styling
const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `
    <h${level} id="${escapedText}" class="${getHeadingClasses(level)}">
      ${text}
    </h${level}>
  `;
};

renderer.paragraph = (text) => {
  return `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`;
};

renderer.list = (body, ordered) => {
  const type = ordered ? 'ol' : 'ul';
  const classes = ordered 
    ? 'list-decimal list-inside mb-4 space-y-2 text-gray-700'
    : 'list-disc list-inside mb-4 space-y-2 text-gray-700';
  return `<${type} class="${classes}">${body}</${type}>`;
};

renderer.listitem = (text) => {
  return `<li class="ml-4">${text}</li>`;
};

renderer.blockquote = (quote) => {
  return `
    <blockquote class="border-l-4 border-primary-500 pl-6 py-4 mb-6 bg-primary-50 rounded-r-lg">
      <div class="italic text-gray-800">${quote}</div>
    </blockquote>
  `;
};

renderer.table = (header, body) => {
  return `
    <div class="overflow-x-auto mb-6">
      <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead class="bg-gray-50">${header}</thead>
        <tbody class="bg-white divide-y divide-gray-200">${body}</tbody>
      </table>
    </div>
  `;
};

renderer.tablerow = (content) => {
  return `<tr class="hover:bg-gray-50">${content}</tr>`;
};

renderer.tablecell = (content, flags) => {
  const tag = flags.header ? 'th' : 'td';
  const classes = flags.header 
    ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
  return `<${tag} class="${classes}">${content}</${tag}>`;
};

renderer.code = (code, language) => {
  return `
    <div class="mb-6">
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code class="${language ? `language-${language}` : ''}">${code}</code>
      </pre>
    </div>
  `;
};

renderer.codespan = (code) => {
  return `<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">${code}</code>`;
};

marked.use({ renderer });

function getHeadingClasses(level: number): string {
  const baseClasses = "font-bold text-gray-900 mb-4 mt-8";
  switch (level) {
    case 1:
      return `${baseClasses} text-3xl border-b border-gray-200 pb-2`;
    case 2:
      return `${baseClasses} text-2xl`;
    case 3:
      return `${baseClasses} text-xl`;
    case 4:
      return `${baseClasses} text-lg`;
    case 5:
      return `${baseClasses} text-base`;
    case 6:
      return `${baseClasses} text-sm`;
    default:
      return `${baseClasses} text-base`;
  }
}

export function renderMarkdown(markdown: string): string {
  const rawHtml = marked(markdown);
  return DOMPurify.sanitize(rawHtml);
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const htmlContent = renderMarkdown(content);
  
  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
