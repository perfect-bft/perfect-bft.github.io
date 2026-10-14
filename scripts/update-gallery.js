/**
 * update-gallery.js
 *
 * 自动扫描 static/img/case/ 下各型号文件夹中的图片，
 * 生成 gallery-manifest.json（供 Gallery 组件运行时读取）。
 *
 * 用法：
 *   node scripts/update-gallery.js
 *
 * 用户只需把案例图片丢进对应型号文件夹，运行此脚本后重新 build 即可。
 */

const fs = require('fs');
const path = require('path');

// ---- 配置 ----
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CASE_DIR = path.join(PROJECT_ROOT, 'static', 'img', 'case');
const ALBUMS_CONFIG = path.join(PROJECT_ROOT, 'gallery-albums.json');
const MANIFEST_OUTPUT = path.join(PROJECT_ROOT, 'static', 'gallery-manifest.json');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

// ---- 主逻辑 ----
function main() {
  // 1. 读取相册配置
  if (!fs.existsSync(ALBUMS_CONFIG)) {
    console.error('[ERROR] 找不到相册配置文件: ' + ALBUMS_CONFIG);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(ALBUMS_CONFIG, 'utf-8'));
  const folderMap = {};
  for (const album of config.albums) {
    folderMap[album.folder] = album;
  }

  // 2. 确保 case 目录存在
  if (!fs.existsSync(CASE_DIR)) {
    fs.mkdirSync(CASE_DIR, { recursive: true });
    console.log('[INFO] 创建 case 目录: ' + CASE_DIR);
  }

  // 3. 扫描每个型号文件夹
  const manifestAlbums = [];
  const subdirs = fs.readdirSync(CASE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const album of config.albums) {
    const folderPath = path.join(CASE_DIR, album.folder);
    let images = [];

    if (fs.existsSync(folderPath)) {
      // 扫描文件夹内所有图片（按文件名排序）
      images = fs.readdirSync(folderPath)
        .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .sort()
        .map(f => `/img/case/${album.folder}/${f}`);
    }

    manifestAlbums.push({
      id: album.id,
      title: album.title,
      cover: album.cover,
      images: images,
      count: images.length
    });

    console.log(`[OK] ${album.id}: ${images.length} 张案例照`);
  }

  // 4. 写入 manifest
  const manifest = { albums: manifestAlbums, generatedAt: new Date().toISOString() };
  fs.writeFileSync(MANIFEST_OUTPUT, JSON.stringify(manifest, null, 2), 'utf-8');

  // 统计
  const totalImages = manifestAlbums.reduce((sum, a) => sum + a.count, 0);
  const activeAlbums = manifestAlbums.filter(a => a.count > 0).length;
  console.log('\n------ 扫描完成 ------');
  console.log(`相册总数: ${manifestAlbums.length}`);
  console.log(`有案例照的: ${activeAlbums}`);
  console.log(`案例图片总计: ${totalImages} 张`);
  console.log(`清单已写入: ${MANIFEST_OUTPUT}`);
}

main();
