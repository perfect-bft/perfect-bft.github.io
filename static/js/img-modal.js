document.addEventListener('DOMContentLoaded', () => {
  // 创建弹窗元素
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'img-modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'img-modal-content';
  
  const modalImg = document.createElement('img');
  modalImg.className = 'img-modal-img';
  
  const closeBtn = document.createElement('div');
  closeBtn.className = 'img-modal-close';
  closeBtn.innerHTML = '&times;';
  
  // 组装弹窗
  modalContent.appendChild(modalImg);
  modalContent.appendChild(closeBtn);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // 绑定图片点击事件（排除标记了 data-no-modal 的图片，如 Gallery 封面）
  function bindImageClick() {
    const markdownImgs = document.querySelectorAll('.markdown img');
    markdownImgs.forEach(img => {
      if (!img.dataset.clickBound && !img.dataset.noModal) {
        img.addEventListener('click', () => {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
        img.dataset.clickBound = 'true';
      }
    });
  }

  // 初始绑定
  bindImageClick();

  // 监听路由变化（适配Docusaurus单页应用）
  try {
    const root = document.querySelector('#__docusaurus');
    if (root) {
      const observer = new MutationObserver(() => {
        bindImageClick();
      });
      observer.observe(root, {
        childList: true,
        subtree: true
      });
    }
  } catch (e) {
    // 即使观察器初始化失败，也不影响其它页面功能
    console.warn('[img-modal] observer init skipped:', e);
  }

  // 关闭弹窗逻辑
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalImg.src = '';
    }, 300);
  }

  // 关闭方式：按钮、空白处、ESC键
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
});