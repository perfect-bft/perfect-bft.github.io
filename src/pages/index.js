import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

// 定义新的卡片数据（替换原 HomepageFeatures）
const cardData = [
  {
    icon: '🚀',
    title: '基础操作',
    description: '了解基础操作，快速使用',
  },
  {
    icon: '📚',
    title: '核心说明',
    description: '详细的功能讲解和使用方法',
  },
  {
    icon: '❓',
    title: '常见问题',
    description: '解决使用过程中遇到的各类问题',
  },
  {
    icon: '📥',
    title: '资源下载',
    description: '相关工具、说明和资料下载',
  },
];

// 保留原来的顶部蓝色横幅
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/首页/"> {/* 这里改为首页路径 */}
            点我进入资料主站→ 💥
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎来到 ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* 替换原来的 HomepageFeatures 为新的卡片布局 */}
      <main className={clsx('container', styles.mainContainer)}>
        {/* 标题区域 */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>简单介绍</h1>
          <div className={styles.titleLine}></div>
        </div>
        {/* 卡片网格 */}
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
    </Layout>
  );
}