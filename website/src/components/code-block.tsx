"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const PYTHON_KEYWORDS = new Set([
  "from", "import", "def", "class", "if", "else", "elif", "return",
  "assert", "for", "in", "with", "as", "try", "except", "raise",
  "not", "and", "or", "is", "True", "False", "None",
]);

const PYTHON_BUILTINS = new Set([
  "SpiderGuard", "Decision", "guard", "result", "clean", "print",
]);

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(line: string, language: string): string {
  const escaped = escapeHtml(line);

  if (language === "bash") {
    // Comment line
    if (escaped.trimStart().startsWith("#")) {
      return `<span class="code-comment">${escaped}</span>`;
    }
    // $ prompt
    return escaped
      .replace(/^(\$\s)/, '<span class="code-keyword">$1</span>')
      .replace(/\b(spidershield|pip|npx)\b/g, '<span class="code-function">$1</span>')
      .replace(/(--[\w-]+)/g, '<span class="code-keyword">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>');
  }

  // Python: comment line
  if (escaped.trimStart().startsWith("#")) {
    return `<span class="code-comment">${escaped}</span>`;
  }

  // Python: tokenize with single-pass regex
  // Match strings, words, numbers, and everything else
  return escaped.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b[a-zA-Z_]\w*\b|\b\d+\.?\d*\b)/g,
    (match) => {
      // String literals
      if (match.startsWith('"') || match.startsWith("'")) {
        return `<span class="code-string">${match}</span>`;
      }
      // Numbers
      if (/^\d/.test(match)) {
        return `<span class="code-number">${match}</span>`;
      }
      // Keywords
      if (PYTHON_KEYWORDS.has(match)) {
        return `<span class="code-keyword">${match}</span>`;
      }
      // Builtins / important names
      if (PYTHON_BUILTINS.has(match)) {
        return `<span class="code-function">${match}</span>`;
      }
      return match;
    }
  );
}

function highlight(code: string, language: string): string {
  return code
    .split("\n")
    .map((line) => highlightLine(line, language))
    .join("\n");
}

export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlight(code, language);

  return (
    <div className="code-block group relative">
      <div className="flex items-center justify-between border-b border-[var(--color-surface)] px-4 py-2">
        <span className="text-xs text-[var(--color-muted)]">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-[var(--color-muted)] transition-colors hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-5 text-sm leading-7"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
