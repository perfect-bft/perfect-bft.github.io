import React from 'react';
import styles from './styles.module.css';

// 下载按钮：内联使用，与正文垂直居中对齐，适配明暗主题
export default function DownloadButton({ href, children, download }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download || undefined}
      className={styles.btn}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </span>
      <span className={styles.text}>{children}</span>
    </a>
  );
}
