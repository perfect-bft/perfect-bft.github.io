import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import { FaRocket, FaBook, FaQuestionCircle, FaDownload } from 'react-icons/fa';

// 定义卡片数据（对应你的“新手入门、核心教程”等）
const cardData = [
  {
    icon: '🚀', // 可替换为 SVG 图标
    title: '新手入门',
    description: '从零开始了解基础操作，快速上手',
  },
  {
    icon: '📚',
    title: '核心教程',
    description: '详细的功能讲解和实战案例',
  },
  {
    icon: '❓',
    title: '常见问题',
    description: '解决使用过程中遇到的各类问题',
  },
  {
    icon: '📥',
    title: '资源下载',
    description: '相关工具、插件和素材下载',
  },
];

export default function Home() {
  return (
    <main className={clsx('container', styles.mainContainer)}>
      {/* 标题区域 */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>简单介绍</h1>
        <div className={styles.titleLine}></div>
      </div>

      {/* 卡片区域 */}
      <div className={styles.cardGrid}>
        {cardData.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}