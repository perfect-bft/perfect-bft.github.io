// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // 核心必填项1111111111
  title: '资料站',
  tagline: '最全面最详细的资料站',
  favicon: 'img/favicon2.ico',
  url: 'https://perfect-bft.github.io',
  baseUrl: '/',
  organizationName: 'perfect-bft',
  projectName: 'perfect-bft.github.io',
  trailingSlash: true,

  // 未来特性配置
  future: {
    v4: true,
  },

  // 错误处理配置
  onBrokenLinks: 'throw',

  // 国际化配置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 插件配置（仅本地搜索，无灯箱）
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

  // 预设配置
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 主题配置
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // 导航栏配置
      navbar: {
        title: '资料站',
        logo: {
          alt: '资料站Logo',
          src: 'img/tubiao.jpg',
          style: { width: '24px', height: '24px', objectFit: 'contain' },
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
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
      // 页脚配置
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [{ label: '入门', to: '/docs/intro' }],
          },
          {
            title: '社区',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
              { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
              { label: 'X', href: 'https://x.com/docusaurus' },
            ],
          },
          {
            title: '更多',
            items: [
              { label: '博客', to: '/blog' },
              { label: 'GitHub', href: 'https://github.com/perfect-bft/perfect-bft.github.io' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 资料站, Built with Docusaurus.
                    <br/>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" style="color: #ffffff; text-decoration: none;">
                      粤ICP备2026016335号
                    </a>`,
      },
      // 代码高亮配置
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;