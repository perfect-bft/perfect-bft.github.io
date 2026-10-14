import React, { useState, useEffect } from 'react';

// 纯函数写法，避免解析错误
function ImageCarousel(props) {
  // 解构 props 改用基础赋值方式
  const images = props.images || [];
  const autoPlayInterval = props.autoPlayInterval || 3000;
  const width = props.width || '100%';
  const height = props.height || '400px';
  const showTitle = props.showTitle !== undefined ? props.showTitle : true;

  // 状态定义
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // 初始化自动轮播
  useEffect(function() {
    const id = setInterval(function() {
      goToNext();
    }, autoPlayInterval);
    setIntervalId(id);
    return function() {
      clearInterval(id);
    };
  }, [images.length, autoPlayInterval]);

  // 上一张
  function goToPrev() {
    clearInterval(intervalId);
    setCurrentIndex(function(prev) {
      return (prev - 1 + images.length) % images.length;
    });
    const id = setInterval(function() {
      goToNext();
    }, autoPlayInterval);
    setIntervalId(id);
  }

  // 下一张
  function goToNext() {
    setCurrentIndex(function(prev) {
      return (prev + 1) % images.length;
    });
  }

  // 跳转到指定图片
  function goToSlide(index) {
    clearInterval(intervalId);
    setCurrentIndex(index);
    const id = setInterval(function() {
      goToNext();
    }, autoPlayInterval);
    setIntervalId(id);
  }

  if (!images || images.length === 0) {
    return <div>暂无图片</div>;
  }

  // 样式定义 - 完全静态，无动态计算/展开
  const containerStyle = {
    width: width,
    height: height,
    position: 'relative',
    margin: '0 auto',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  // 标题基础样式（新增：开放颜色自定义）
  const titleBaseStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '10px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold' // 可选：加粗让标题更醒目
  };

  const indicatorsStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 2
  };

  // 左右按钮样式 - 移除伪类，改用 className 控制（后续用全局 CSS）
  const navBtnBaseStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  };

  const prevBtnStyle = {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  };

  const nextBtnStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  };

  // 指示器按钮样式（静态写法）
  function getIndicatorStyle(isActive) {
    if (isActive) {
      return {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
        padding: 0
      };
    } else {
      return {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        padding: 0
      };
    }
  }

  return (
    <div style={containerStyle}>
      {/* 轮播图片 */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        style={imageStyle}
      />

      {/* 图片标题：新增颜色自定义逻辑 */}
      {showTitle && images[currentIndex].title && (
        <div 
          style={{
            ...titleBaseStyle,
            // 优先使用配置的颜色，无配置则默认白色
            color: images[currentIndex].titleColor || '#fff'
          }}
        >
          {images[currentIndex].title}
        </div>
      )}

      {/* 上一张按钮 */}
      <button
        onClick={goToPrev}
        style={prevBtnStyle}
        aria-label="上一张图片"
        className="carousel-nav-btn"
      >
        ❮
      </button>

      {/* 下一张按钮 */}
      <button
        onClick={goToNext}
        style={nextBtnStyle}
        aria-label="下一张图片"
        className="carousel-nav-btn"
      >
        ❯
      </button>

      {/* 轮播指示器 */}
      <div style={indicatorsStyle}>
        {images.map(function(item, index) {
          return (
            <button
              key={index}
              onClick={function() { goToSlide(index); }}
              style={getIndicatorStyle(index === currentIndex)}
              aria-label={'切换到图片 ' + (index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageCarousel;