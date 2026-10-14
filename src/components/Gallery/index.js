import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// 默认空状态（manifest 加载前/失败时显示）
const EMPTY_ALBUMS = [];

// 错误边界：即使相册渲染出错，也绝不影响页面其它部分（如导航栏）
class GalleryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[Gallery] 渲染出错，已隔离：', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <p style={{ textAlign: 'center', padding: '24px 0' }}>
          案例相册加载失败，请刷新页面重试。
        </p>
      );
    }
    return this.props.children;
  }
}

function Album({ title, cover, images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = Array.isArray(images) && images.length > 0;

  // 点击卡片 → 只在有案例照时才打开，且直接显示第一张案例照（绝不是封面）
  const handleOpen = () => {
    if (hasImages) {
      setCurrentIndex(0);
      setIsOpen(true);
    }
  };

  if (!isOpen) {
    return (
      <div
        className={`${styles.albumCard} ${!hasImages ? styles.disabledCard : ''}`}
        onClick={handleOpen}
        role={hasImages ? 'button' : undefined}
        tabIndex={hasImages ? 0 : -1}
        onKeyDown={(e) => { if (hasImages && e.key === 'Enter') handleOpen(); }}
      >
        <img
          src={cover}
          alt={title}
          className={styles.cover}
          data-no-modal="true"
          // 封面图本身禁止任何点击冒泡/独立打开行为
          onClick={(e) => e.stopPropagation()}
        />
        <h4>{title}</h4>
        <p>共 {hasImages ? images.length : 0} 张</p>
        {!hasImages && <span className={styles.emptyBadge}>暂无案例</span>}
      </div>
    );
  }

  // 查看器：只遍历 images（案例实景照），永远不含 cover
  return (
    <div className={styles.albumViewer}>
      <button className={styles.backBtn} onClick={() => setIsOpen(false)}>
        ← 返回相册列表
      </button>
      <div className={styles.imageContainer}>
        <img
          src={images[currentIndex]}
          alt={`${title} 案例图 ${currentIndex + 1}`}
          className={styles.viewImage}
        />
      </div>
      <div className={styles.controls}>
        <button
          onClick={() => setCurrentIndex(i => (i - 1 + images.length) % images.length)}
        >
          ← 上一张
        </button>
        <span>{currentIndex + 1} / {images.length}</span>
        <button
          onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
        >
          下一张 →
        </button>
      </div>
    </div>
  );
}

function GalleryInner() {
  const [albums, setAlbums] = useState(EMPTY_ALBUMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从自动生成的 manifest 加载相册数据
    fetch('/gallery-manifest.json')
      .then(res => res.json())
      .then(data => {
        const list = data && Array.isArray(data.albums) ? data.albums : EMPTY_ALBUMS;
        setAlbums(list);
        setLoading(false);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('[Gallery] 无法加载 gallery-manifest.json');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.galleryGrid}>
        <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>加载中...</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryGrid}>
      {albums.map((album) => (
        <Album key={album.id} {...album} />
      ))}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <GalleryErrorBoundary>
      <GalleryInner />
    </GalleryErrorBoundary>
  );
}
