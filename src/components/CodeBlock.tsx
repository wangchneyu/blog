"use client";

import { useRef, useState } from "react";
import styles from "./CodeBlock.module.css";

export default function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  };

  return (
    <div className={styles.codeBlock}>
      <button
        type="button"
        onClick={handleCopy}
        className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ""}`}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
