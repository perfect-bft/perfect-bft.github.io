// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '资料站',
  tagline: '最全面最详细的资料站',
  favicon: 'img/favicon2.ico',
  url: 'https://perfect-bft.github.io',
  baseUrl: '/',
  organizationName: 'perfect-bft',
  projectName: 'perfect-bft.github.io',
  trailingSlash: true,

  scripts: [
    {
      src: '/js/img-modal.js',
      defer: true
    }
  ],

  // 👇 关键：关闭所有新版坑人特性！回到 3.9.2 舒服模式
  future: {},

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '资料站',
      logo: {
        alt: '资料站Logo',
        src: 'img/tubiao.jpg',
        style: { width: '24px', height: '24px', objectFit: 'contain' },
      },
      items: [
        {
          // 移动端抽屉的一级菜单已直接渲染完整文档侧边栏（见
          // src/theme/Navbar/MobileSidebar/PrimaryMenu），这里改为普通文档
          // 链接，避免点击后跳到空白的二级菜单
          type: 'doc',
          docId: '首页',
          position: 'left',
          label: '首页',
        },
        {
          href: 'https://github.com/perfect-bft/perfect-bft.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [{ label: '入门', to: '/docs/intro' }],
        },
        // 保留标题，下面内容清空
        {
          title: '社区',
          items: [],
        },
        // 保留标题，下面内容清空
        {
          title: '更多',
          items: [],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 资料站.
      <br/>
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color:#fff">粤ICP备2026016335号</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;