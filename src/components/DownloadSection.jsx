import React from 'react';
import Link from '@docusaurus/Link';
import styles from './DownloadSection.module.css';

// 下载链接组件（带图标+文字对齐）
export default function DownloadSection({ title, href, children }) {
  return (
    <div className={styles.downloadSection}>
      {/* 标题行 */}
      <div className={styles.titleRow}>
        <span className={styles.icon}>📦</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {/* 上分隔线 */}
      <div className={styles.divider} />
      {/* 下载链接（核心：图标+文字垂直居中） */}
      <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.downloadLink}
      >
        <svg
          className={styles.linkIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {children}
      </Link>
      {/* 下分隔线 */}
      <div className={styles.bottomDivider} />
    </div>
  );
}