// components/MarkdownViewer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownViewer({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}