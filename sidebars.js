// @ts-check

/**
 * 侧边栏配置：仅保留实际存在的文档
 * 核心规则：所有id必须和docs目录下的文件路径（不带.md）完全一致
 */
const sidebars = {
  mainSidebar: [
    // 置顶文档
    { type: 'doc', id: '首页', label: '首页' },
    { type: 'doc', id: 'intro', label: '入门介绍' },

    // 泊链平台主分组（仅保留存在的C5H上云文档）
    {
      type: 'category',
      label: '泊链平台',
      link: { type: 'doc', id: '泊链平台/group-intro' }, // 确保 docs/泊链平台/group-intro.md 存在
      items: [
        // 相机上云子分组（仅保留C5H上云）
        {
          type: 'category',
          label: '相机上云',
          link: { type: 'doc', id: '泊链平台/C5H上云' },
          items: ['泊链平台/C5H上云'],
          collapsible: true,
          collapsed: false
        }
      ],
      collapsible: true,
      collapsed: true
    },

    // 停车Boss分组（仅保留存在的group-intro）
    {
      type: 'category',
      label: '停车Boss',
      link: { type: 'doc', id: '停车Boss/group-intro' },
      items: [], // 删掉manage-docs-versions、translate-your-site等无效ID
      collapsible: true,
      collapsed: true
    },

    // 本地软件分组（仅保留存在的group-intro）
    {
      type: 'category',
      label: '本地软件',
      link: { type: 'doc', id: '本地软件/group-intro' },
      items: [],
      collapsible: true,
      collapsed: true
    },

    // 硬件相关分组（仅保留存在的group-intro）
    {
      type: 'category',
      label: '硬件相关',
      link: { type: 'doc', id: '硬件相关/group-intro' },
      items: [],
      collapsible: true,
      collapsed: true
    }
  ]
};

module.exports = sidebars;