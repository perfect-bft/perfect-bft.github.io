import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

// 可复制参数行：标签 + 值 + 复制按钮 inline 对齐
export default function CopyableField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = String(value ?? '');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        ta.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('execCommand copy failed');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // 复制失败静默处理，避免打断用户
    }
  }, [value]);

  return (
    <div className={styles.field} role="group" aria-label={`${label}：${value}`}>
      <span className={styles.label}>{label}</span>
      <code className={styles.value}>{value}</code>
      <button
        type="button"
        className={styles.copyBtn}
        onClick={handleCopy}
        title={copied ? '已复制' : '复制'}
        aria-label={copied ? '已复制' : `复制${label}`}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
