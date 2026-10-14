// @ts-check

/**
 * 侧边栏配置：仅保留实际存在的文档
 * 核心规则：所有id必须和docs目录下的文件路径（不带.md）完全一致
 */
const sidebars = {
  mainSidebar: [
    // 置顶文档
    { type: 'doc', id: '首页', label: '首页', className: 'sidebar-icon-home' },
    // 网站公告（侧边栏类目：更新公告置顶 + 网站使用方法）
    {
      type: 'category',
      label: '网站公告',
      className: 'sidebar-icon-bell',
      link: { type: 'doc', id: 'intro' },
      items: [
        { type: 'doc', id: 'announcement/update-notice', label: '更新公告', className: 'sidebar-icon-bullhorn' },
        { type: 'doc', id: 'intro', label: '网站使用方法', className: 'sidebar-icon-help' },
      ],
      collapsible: true,
      collapsed: false,
    },
    { type: 'doc', id: 'gallery', label: '案例相册', className: 'sidebar-icon-camera' },
    // 智慧通行主分组
    {
      type: 'category',
      label: '智慧通行',
      className: 'sidebar-icon-car',
      link: {
        type: 'generated-index',
        title: '智慧通行',
        description: '智慧通行相关教程与文档',
      },
      items: [
        // 1. 设备上云子分组
        {
          type: 'category',
          label: '1. 设备上云',
          className: 'sidebar-icon-cloud',
          link: {
            type: 'generated-index',
            title: '设备上云',
            description: '设备上云相关教程与文档',
          },
          items: [
            { type: 'doc', id: 'bl/cloud/R5E', label: '1.1 R5E上云方式' },
            { type: 'doc', id: 'bl/cloud/sysq', label: '1.2 上云神器' },
            { type: 'doc', id: 'bl/cloud/C5H', label: '1.3 C5H上云方式' },
            { type: 'doc', id: 'bl/cloud/R5L', label: '1.4 R5L上云方式' },
            { type: 'doc', id: 'bl/cloud/HX', label: '1.5 HX上云方式' },
            { type: 'doc', id: 'bl/cloud/llc', label: '1.6 两轮车上云方式' },
            { type: 'doc', id: 'bl/cloud/harl/index', label: '1.7 HA人脸上云方式' },
            { type: 'doc', id: 'bl/cloud/darl', label: '1.8 DA人脸上云方式' },
          ],
          collapsible: true,
          collapsed: true
        },
        // 2. 平台功能子分组
        {
          type: 'category',
          label: '2. 平台功能',
          className: 'sidebar-icon-gear',
          link: {
            type: 'generated-index',
            title: '平台功能',
            description: '平台功能相关说明与文档',
          },
          items: [
            { type: 'doc', id: 'bl/function/home', label: '2.1 首页' },
            { type: 'doc', id: 'bl/function/yungt', label: '2.2 云岗亭' },
            { type: 'doc', id: 'bl/function/monitor', label: '2.3 车道监控' },
            {
              type: 'category',
              label: '2.4 订单管理',
              className: 'sidebar-icon-order',
              link: {
                type: 'generated-index',
                title: '订单管理',
                description: '订单管理相关功能说明',
              },
              items: [
                { type: 'doc', id: 'bl/function/order/1', label: '2.4.1 在场车辆' },
                { type: 'doc', id: 'bl/function/order/2', label: '2.4.2 已离场车辆' },
                { type: 'doc', id: 'bl/function/order/3', label: '2.4.3 起落杆记录' },
                { type: 'doc', id: 'bl/function/order/4', label: '2.4.4 电子交易' },
                { type: 'doc', id: 'bl/function/order/5', label: '2.4.5 抵扣记录' },
                { type: 'doc', id: 'bl/function/order/6', label: '2.4.6 异常订单' },
                { type: 'doc', id: 'bl/function/order/7', label: '2.4.7 减免记录' },
                { type: 'doc', id: 'bl/function/order/8', label: '2.4.8 欠费订单' },
                { type: 'doc', id: 'bl/function/order/9', label: '2.4.9 欠费标签' },
                { type: 'doc', id: 'bl/function/order/10', label: '2.4.10 车位预约订单' },
                { type: 'doc', id: 'bl/function/order/11', label: '2.4.11 车道事件记录' }
              ],
              collapsible: true,
              collapsed: true
            },
            { type: 'doc', id: 'bl/function/statistics', label: '2.5 统计分析' },
            {
              type: 'category',
              label: '2.6 车辆管理',
              className: 'sidebar-icon-vehicle',
              link: {
                type: 'generated-index',
                title: '车辆管理',
                description: '固定车的添加和相关设置',
              },
              items: [
                { type: 'doc', id: 'bl/function/vehicle/1', label: '2.6.1 月卡车辆' },
                { type: 'doc', id: 'bl/function/vehicle/2', label: '2.6.2 月卡设置' },
                { type: 'doc', id: 'bl/function/vehicle/3', label: '2.6.3 月卡续费记录' },
                { type: 'doc', id: 'bl/function/vehicle/4', label: '2.6.4 月卡套餐' },
                { type: 'doc', id: 'bl/function/vehicle/5', label: '2.6.5 储值车辆' },
                { type: 'doc', id: 'bl/function/vehicle/6', label: '2.6.6 储值余额变更' },
                { type: 'doc', id: 'bl/function/vehicle/7', label: '2.6.7 储值使用记录' },
                { type: 'doc', id: 'bl/function/vehicle/8', label: '2.6.8 内部车辆' },
                { type: 'doc', id: 'bl/function/vehicle/9', label: '2.6.9 黑白名单' }
              ],
              collapsible: true,
              collapsed: true
            },
            {
              type: 'category',
              label: '2.7 车场管理',
              className: 'sidebar-icon-parking',
              link: {
                type: 'generated-index',
                title: '车场管理',
                description: '车场相关的基础配置与管理功能',
              },
              items: [
                { type: 'doc', id: 'bl/function/parking/1', label: '2.7.1 车场信息' },
                { type: 'doc', id: 'bl/function/parking/2', label: '2.7.2 车场配置' },
                { type: 'doc', id: 'bl/function/parking/3', label: '2.7.3 相机管理' },
                { type: 'doc', id: 'bl/function/parking/4', label: '2.7.4 通道管理' },
                { type: 'doc', id: 'bl/function/parking/5', label: '2.7.5 数据同步' },
                { type: 'doc', id: 'bl/function/parking/6', label: '2.7.6 监控管理' },
                { type: 'doc', id: 'bl/function/parking/7', label: '2.7.7 二维码管理' },
                { type: 'doc', id: 'bl/function/parking/8', label: '2.7.8 车型管理' },
                { type: 'doc', id: 'bl/function/parking/9', label: '2.7.9 计费管理' },
                { type: 'doc', id: 'bl/function/parking/10', label: '2.7.10 预约车位管理' },
                { type: 'doc', id: 'bl/function/parking/11', label: '2.7.11 放行原因' },
                { type: 'doc', id: 'bl/function/parking/12', label: '2.7.12 高级设置' }
              ],
              collapsible: true,
              collapsed: true
            },
            {
              type: 'category',
              label: '2.8 车位管理',
              className: 'sidebar-icon-space',
              link: {
                type: 'generated-index',
                title: '车位管理',
                description: '车位相关的管理功能与数据统计',
              },
              items: [
                { type: 'doc', id: 'bl/function/space/1', label: '2.8.1 车位管理' },
                { type: 'doc', id: 'bl/function/space/2', label: '2.8.2 车位订单' },
                { type: 'doc', id: 'bl/function/space/3', label: '2.8.3 统计报表' },
                { type: 'doc', id: 'bl/function/space/4', label: '2.8.4 用户管理' }
              ],
              collapsible: true,
              collapsed: true
            },
            {
              type: 'category',
              label: '2.9 访客管理',
              className: 'sidebar-icon-visitor',
              link: {
                type: 'generated-index',
                title: '访客管理',
                description: '来访人员与业主相关管理功能',
              },
              items: [
                { type: 'doc', id: 'bl/function/visitor/1', label: '2.9.1 来访人员' },
                { type: 'doc', id: 'bl/function/visitor/2', label: '2.9.2 业主管理' }
              ],
              collapsible: true,
              collapsed: true
            },
            {
              type: 'category',
              label: '2.10 优惠管理',
              className: 'sidebar-icon-discount',
              link: {
                type: 'generated-index',
                title: '优惠管理',
                description: '优惠券与商户相关管理功能',
              },
              items: [
                { type: 'doc', id: 'bl/function/discount/1', label: '2.10.1 发券设置' },
                { type: 'doc', id: 'bl/function/discount/2', label: '2.10.2 商户管理' },
                { type: 'doc', id: 'bl/function/discount/3', label: '2.10.3 流水查询' },
                { type: 'doc', id: 'bl/function/discount/4', label: '2.10.4 优惠券管理' },
                { type: 'doc', id: 'bl/function/discount/5', label: '2.10.5 发券端说明' }
              ],
              collapsible: true,
              collapsed: true
            },
            { type: 'doc', id: 'bl/function/event/1', label: '2.11 事件管理' },
          ],
          collapsible: true,
          collapsed: true
        },
        {
          type: 'category',
          label: '3. 小程序说明',
          className: 'sidebar-icon-program',
          link: {
            type: 'doc',
            id: 'bl/program/index',
          },
          items: [
            { type: 'doc', id: 'bl/program/1', label: '3.1 运营小管家' },
            { type: 'doc', id: 'bl/program/2', label: '3.2 一码APP' }
          ],
          collapsible: true,
          collapsed: true
        },
        {
          type: 'category',
          label: '4. 工作台',
          className: 'sidebar-icon-workbench',
          link: {
            type: 'generated-index',
            title: '工作台',
            description: '工作台相关功能说明',
          },
          items: [
            { type: 'doc', id: 'bl/workbench/1', label: '4.1 工作台说明' }
          ],
          collapsible: true,
          collapsed: true
        },
        {
          type: 'category',
          label: '5. 支付云',
          className: 'sidebar-icon-payment',
          link: {
            type: 'generated-index',
            title: '支付云',
            description: '支付云相关功能说明',
          },
          items: [
            { type: 'doc', id: 'bl/payment/1', label: '5.1 支付云说明' }
          ],
          collapsible: true,
          collapsed: true
        },
        {
          type: 'category',
          label: '6. 常见问题',
          className: 'sidebar-icon-question',
          link: {
            type: 'generated-index',
            title: '常见问题',
            description: '使用过程中常见问题解答',
          },
          items: [
            { type: 'doc', id: 'bl/questions/1', label: '6.1 车场没有相机管理' },
            { type: 'doc', id: 'bl/questions/2', label: '6.2 怎么添加辅助相机' },
            { type: 'doc', id: 'bl/questions/11', label: '6.3 岗亭车道无法勾选' },
            { type: 'doc', id: 'bl/questions/12', label: '6.4 车场区域划分及使用' },
            { type: 'doc', id: 'bl/questions/13', label: '6.5 岗亭无法观看相机本地视频' },
            { type: 'doc', id: 'bl/questions/14', label: '6.6 纯云平台识别记录没有图片' },
            { type: 'doc', id: 'bl/questions/15', label: '6.7 相机重复识别 / 月卡临期提醒' },
            { type: 'doc', id: 'bl/questions/16', label: '6.8 岗亭设置快捷键开闸' },
            { type: 'doc', id: 'bl/questions/17', label: '6.9 设置军警等特殊车免费' },
            { type: 'doc', id: 'bl/questions/18', label: '6.10 一位多车第二辆独立计费' }
          ],
          collapsible: true,
          collapsed: true
        }
      ],
      collapsible: true,
      collapsed: true
    },

    {
      type: 'category',
      label: '停车Boss',
      className: 'sidebar-icon-briefcase',
      link: { type: 'doc', id: 'parking-boss/group-intro' },
      items: [
        // 1. 上云
        {
          type: 'category',
          label: '1. 上云',
          className: 'sidebar-icon-cloud',
          link: {
            type: 'generated-index',
            title: '上云',
            description: '停车Boss 设备上云与平台上线相关教程',
          },
          items: [
            { type: 'doc', id: 'parking-boss/cloud/quick-create', label: '1.1 快速创建车场' },
            { type: 'doc', id: 'parking-boss/cloud/platform-mq', label: '1.2 平台MQ上线' },
            { type: 'doc', id: 'parking-boss/cloud/zhenzhi-mq', label: '1.3 VZ MQ上线流程' },
            { type: 'doc', id: 'parking-boss/cloud/common-config', label: '1.4 公共配置' },
            { type: 'doc', id: 'parking-boss/cloud/space-screen', label: '1.5 余位屏上线教程' },
            { type: 'doc', id: 'parking-boss/cloud/system-online', label: '1.6 系统上线说明书' }
          ],
          collapsible: true,
          collapsed: true
        },
        // 2. 功能说明
        {
          type: 'category',
          label: '2. 功能说明',
          className: 'sidebar-icon-gear',
          link: {
            type: 'generated-index',
            title: '功能说明',
            description: '停车Boss 云平台各功能模块使用说明',
          },
          items: [
            { type: 'doc', id: 'parking-boss/function/pc-usage', label: '2.1 PC端使用说明' },
            { type: 'doc', id: 'parking-boss/function/vehicle-mgmt', label: '2.2 车辆管理操作指南' },
            { type: 'doc', id: 'parking-boss/function/reservation', label: '2.3 预约车辆' },
            { type: 'doc', id: 'parking-boss/function/coupon', label: '2.4 优惠券使用说明' },
            { type: 'doc', id: 'parking-boss/function/cloud-park-unmanned', label: '2.5 停车Boss无人值守系统' },
          ],
          collapsible: true,
          collapsed: true
        },
        // 3. 小程序
        {
          type: 'category',
          label: '3. 小程序',
          className: 'sidebar-icon-program',
          link: {
            type: 'generated-index',
            title: '小程序',
            description: '停车Boss 微信小程序使用说明',
          },
          items: [
            { type: 'doc', id: 'parking-boss/program/miniprogram', label: '3.1 微信小程序使用说明' }
          ],
          collapsible: true,
          collapsed: true
        },
        // 4. 常见问题
        {
          type: 'category',
          label: '4. 常见问题',
          className: 'sidebar-icon-question',
          link: {
            type: 'generated-index',
            title: '常见问题',
            description: '停车Boss 使用中的常见问题与处理办法',
          },
          items: [
            { type: 'doc', id: 'parking-boss/faq/evasion-recovery', label: '4.1 逃费追缴' },
            { type: 'doc', id: 'parking-boss/faq/img-01', label: '4.2 后台车辆录入与月租延期' },
            { type: 'doc', id: 'parking-boss/faq/img-02', label: '4.3 小程序添加月卡车' },
            { type: 'doc', id: 'parking-boss/faq/img-03', label: '4.4 多次进出结算点说明' },
            { type: 'doc', id: 'parking-boss/faq/img-04', label: '4.5 储值车使用说明' },
            { type: 'doc', id: 'parking-boss/faq/img-05', label: '4.6 异常通行问题排查' },
            { type: 'doc', id: 'parking-boss/faq/img-06', label: '4.7 小程序在场车辆免费放行' },
            { type: 'doc', id: 'parking-boss/faq/img-07', label: '4.8 停车位计量与授权规则配置' },
            { type: 'doc', id: 'parking-boss/faq/img-08', label: '4.9 断电断网手动通行方案' },
            { type: 'doc', id: 'parking-boss/faq/img-09', label: '4.10 无牌车进出场通行方案' },
            { type: 'doc', id: 'parking-boss/faq/img-10', label: '4.11 月租报停与启用' },
            { type: 'doc', id: 'parking-boss/faq/img-11', label: '4.12 小程序车辆延期' },
            { type: 'doc', id: 'parking-boss/faq/img-12', label: '4.13 节假日收费规则设置' },
            { type: 'doc', id: 'parking-boss/faq/img-13', label: '4.14 数据分析操作指引' },
            { type: 'doc', id: 'parking-boss/faq/img-14', label: '4.15 异常通行相关记录查询' },
            { type: 'doc', id: 'parking-boss/faq/img-15', label: '4.16 停车优惠码使用' },
            { type: 'doc', id: 'parking-boss/faq/img-16', label: '4.17 无牌车月租办理方案' },
            { type: 'doc', id: 'parking-boss/faq/img-17', label: '4.18 车牌识别一体机配置' },
            { type: 'doc', id: 'parking-boss/faq/img-18', label: '4.19 无入场记录处理' },
            { type: 'doc', id: 'parking-boss/faq/img-19', label: '4.20 余位相关问题答疑' },
          ],
          collapsible: true,
          collapsed: true
        }
      ],
      collapsible: true,
      collapsed: true
    },
    {
      type: 'category',
      label: '本地软件',
      className: 'sidebar-icon-computer',
      link: { type: 'doc', id: 'local-software/group-intro' },
      items: [
        // ===== 软件下载 =====
        {
          type: 'doc',
          id: 'local-software/download/software-download',
          label: '软件下载',
          className: 'sidebar-icon-softdownload',
        },
        // ===== 1. 管理端 =====
        {
          type: 'category',
          label: '1. 管理端',
          className: 'sidebar-icon-hardware-mainboard',
          link: {
            type: 'generated-index',
            slug: '/local-software/admin',
            title: '管理端',
            description: '智慧停车场管理系统（管理后台）使用说明',
          },
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'local-software/admin/home', label: '1.1 主页' },
            { type: 'doc', id: 'local-software/admin/non-motor-card', label: '1.2 非机动车刷卡使用说明' },
            { type: 'doc', id: 'local-software/admin/seamless-payment', label: '1.3 开通无感支付的方式' },
            { type: 'doc', id: 'local-software/admin/e-ledger', label: '1.4 电子台账说明书' },
            { type: 'doc', id: 'local-software/admin/web-payment', label: '1.5 通过网页配置支付' },
            { type: 'doc', id: 'local-software/admin/complex-mode', label: '1.6 复杂模式' },
            { type: 'doc', id: 'local-software/admin/official-account', label: '1.7 公众号说明书' },
            { type: 'doc', id: 'local-software/admin/plate-restriction', label: '1.8 单双号限行功能' },
            {
              type: 'category',
              label: '1.9 下载并注册管理端',
              className: 'sidebar-icon-download',
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'local-software/admin/install/mysql', label: '1.9.1 mysql版本软件安装流程' },
              ],
            },
            {
              type: 'category',
              label: '1.10 管理端使用说明',
              className: 'sidebar-icon-manual',
              link: {
                type: 'generated-index',
                slug: '/local-software/admin/usage',
                title: '管理端使用说明',
                description: '管理后台各功能模块的详细操作说明',
              },
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'local-software/admin/usage/basic-info', label: '1.10.1 基础信息管理' },
                { type: 'doc', id: 'local-software/admin/usage/vehicle', label: '1.10.2 车辆信息管理' },
                { type: 'doc', id: 'local-software/admin/usage/visitor', label: '1.10.3 访客信息管理' },
                { type: 'doc', id: 'local-software/admin/usage/merchant', label: '1.10.4 商家优免管理' },
                { type: 'doc', id: 'local-software/admin/usage/report', label: '1.10.5 报表信息查询' },
                { type: 'doc', id: 'local-software/admin/usage/statistics', label: '1.10.6 统计信息查询' },
                { type: 'doc', id: 'local-software/admin/usage/permission', label: '1.10.7 用户权限管理' },
                { type: 'doc', id: 'local-software/admin/usage/settings', label: '1.10.8 系统设置' },
              ],
            },
          ],
        },
        // ===== 2. 收费端 =====
        {
          type: 'category',
          label: '2. 收费端',
          className: 'sidebar-icon-payment',
          link: {
            type: 'generated-index',
            slug: '/local-software/toll',
            title: '收费端',
            description: '智慧停车场收费系统（岗亭客户端）使用说明',
          },
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'local-software/toll/intercom', label: '2.1 迪虎语音对讲配置说明' },
            { type: 'doc', id: 'local-software/toll/space-display', label: '2.2 余位显示屏配置说明' },
            { type: 'doc', id: 'local-software/toll/etc', label: '2.3 ETC开通流程' },
            {
              type: 'category',
              label: '2.4 运行收费端',
              className: 'sidebar-icon-run',
              link: {
                type: 'generated-index',
                slug: '/local-software/toll/setup',
                title: '运行收费端',
                description: '收费端运行前的环境配置与准备工作',
              },
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'local-software/toll/setup/database', label: '2.4.1 配置数据库' },
                { type: 'doc', id: 'local-software/toll/setup/local-ip', label: '2.4.2 查看自己电脑的ip' },
              ],
            },
            {
              type: 'category',
              label: '2.5 收费端使用说明',
              className: 'sidebar-icon-guide',
              link: {
                type: 'generated-index',
                slug: '/local-software/toll/usage',
                title: '收费端使用说明',
                description: '岗亭收费端各功能模块的详细操作说明',
              },
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'local-software/toll/usage/booth', label: '2.5.1 岗亭收费' },
                { type: 'doc', id: 'local-software/toll/usage/agent', label: '2.5.2 代理服务' },
                { type: 'doc', id: 'local-software/toll/usage/duty', label: '2.5.3 值班详情' },
                { type: 'doc', id: 'local-software/toll/usage/shift', label: '2.5.4 岗亭换班' },
                { type: 'doc', id: 'local-software/toll/usage/io-test', label: '2.5.5 进出测试' },
                { type: 'doc', id: 'local-software/toll/usage/io-record', label: '2.5.6 进出记录' },
                { type: 'doc', id: 'local-software/toll/usage/settings', label: '2.5.7 系统设置' },
              ],
            },
          ],
        },
        // ===== 3. 常见问题（ShowDoc 完整导入：39 分类 / 205 页）=====
        {
          type: 'category',
          label: '3. 常见问题',
          className: 'sidebar-icon-faq',
          link: {
            type: 'generated-index',
            title: '常见问题',
            description: '停车场系统常见问题、功能配置、设备对接与支付开票说明',
            slug: '/local-software/faq',
          },
          items: [
            {
              type: 'category',
              label: '3.1 常见问题问答文档',
              className: 'sidebar-icon-faq-qa',
              link: {
                type: 'generated-index',
                title: '常见问题问答文档',
                slug: '/local-software/faq/qa',
              },
              items: [
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-001',
                  label: '3.1.1 无牌车扫码进出功能介绍',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-002',
                  label: '3.1.2 小程序一键创建车场',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-003',
                  label: '3.1.3 相机有抓拍记录，软件没记录的原因',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-004',
                  label: '3.1.4 初始化设备异常，值不能为null',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-005',
                  label: '3.1.5 微信子商户设置预留提现金额',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-006',
                  label: '3.1.6 领停支付申请手续费发票',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-007',
                  label: '3.1.7 给名下停车场分配账号',
                },
                {
                  type: 'doc',
                  id: 'local-software/faq/qa/qa-008',
                  label: '3.1.8 发布公告',
                },
                {
                  type: 'category',
                  label: '3.1.9 管理端',
                  className: 'sidebar-icon-faq-admin',
                  link: {
                    type: 'generated-index',
                    title: '管理端',
                    slug: '/local-software/faq/qa/admin',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-001',
                      label: '3.1.9.1 地库一位多车设置方案',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-002',
                      label: '3.1.9.2 系统检测到车场没有连接到平台，解决方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-003',
                      label: '3.1.9.3 车型设置按车牌颜色匹配，有时出场时不能按照指定的车型收费',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-004',
                      label: '3.1.9.4 申请网页支付成功后，下载不了收费二维码，该���何解决。',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-005',
                      label: '3.1.9.5 创建数据库后初始化时提示失败',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-006',
                      label: '3.1.9.6 无牌车',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-007',
                      label: '3.1.9.7 收费端报错意外的操作',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-008',
                      label: '3.1.9.8 扫码支付报错',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-009',
                      label: '3.1.9.9 怎样在软件里设置中场，只有在内场里控制一位多车？',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-010',
                      label: '3.1.9.10 管理端支付配置地址获取失败解决方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-011',
                      label: '3.1.9.11 软件管理员密码忘记',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-012',
                      label: '3.1.9.12 显示屏显示二维码',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-013',
                      label: '3.1.9.13 怎么设置多种月租车',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-014',
                      label: '3.1.9.14 创建数据库失败或者软件打不开',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-015',
                      label: '3.1.9.15 清理在场车辆',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-016',
                      label: '3.1.9.16 网页配置支付报错',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-017',
                      label: '3.1.9.17 语音播报',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/admin/admin-018',
                      label: '3.1.9.18 数据库备份还原',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.10 收费端',
                  className: 'sidebar-icon-faq-toll',
                  link: {
                    type: 'generated-index',
                    title: '收费端',
                    slug: '/local-software/faq/qa/toll',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-001',
                      label: '3.1.10.1 手动开闸报错',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-002',
                      label: '3.1.10.2 车位显示',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-003',
                      label: '3.1.10.3 车队模式',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-004',
                      label: '3.1.10.4 报错提示配额不足',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-005',
                      label: '3.1.10.5 岗亭打折',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-006',
                      label: '3.1.10.6 扫码支付报错',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-007',
                      label: '3.1.10.7 登录',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/toll/toll-008',
                      label: '3.1.10.8 识别车牌没有显示和声音',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.11 常用功能设置方案',
                  className: 'sidebar-icon-faq-common',
                  link: {
                    type: 'generated-index',
                    title: '常用功能设置方案',
                    slug: '/local-software/faq/qa/common',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-001',
                      label: '3.1.11.1 一位多车',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-002',
                      label: '3.1.11.2 地库一位多车',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-003',
                      label: '3.1.11.3 共享储存图片路径文件夹',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-004',
                      label: '3.1.11.4 月租车，车位占用的几种循环方案',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-005',
                      label: '3.1.11.5 通过模板批量导入车辆信息',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-006',
                      label: '3.1.11.6 配置压地感扫无牌车二维码才有效',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-007',
                      label: '3.1.11.7 蓝牌，黄牌，新能源车分别设置不同收费规则',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-008',
                      label: '3.1.11.8 车牌识别+ETC双重认证车牌',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-009',
                      label: '3.1.11.9 指定类型的车辆才能通过本通道',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-010',
                      label: '3.1.11.10 单双号限行',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-011',
                      label: '3.1.11.11 月租车未进入小车场需按临时车收费',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-012',
                      label: '3.1.11.12 车辆进出免费停车，不产生费用指南',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-013',
                      label: '3.1.11.13 万能语音板卡，修改播报内容',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-014',
                      label: '3.1.11.14 LED屏不播报不显示问题排查',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-015',
                      label: '3.1.11.15 不让保安查到车场收了多少钱',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-016',
                      label: '3.1.11.16 安装包形式替换修改软件logo',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-017',
                      label: '3.1.11.17 月租车嵌套进出',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-018',
                      label: '3.1.11.18 相机直连云车场上线方案',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-019',
                      label: '3.1.11.19 余位屏设置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-020',
                      label: '3.1.11.20 修改软件名称和上传logo',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-021',
                      label: '3.1.11.21 录入车牌长度增加',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-022',
                      label: '3.1.11.22 免布线车场的创建',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-023',
                      label: '3.1.11.23 车位池',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-024',
                      label: '3.1.11.24 电子台账配置说明书',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-025',
                      label: '3.1.11.25 无牌车黑名单录入',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-026',
                      label: '3.1.11.26 当班时间异常无法换班',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-027',
                      label: '3.1.11.27 杨宗来lcd主板换图片换视频',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-028',
                      label: '3.1.11.28 电话机添加方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-029',
                      label: '3.1.11.29 访客申请二维码',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-030',
                      label: '3.1.11.30 大车场本地端配置方案',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/common/common-031',
                      label: '3.1.11.31 车位管理功能使用',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.12 常用设备配置方式',
                  className: 'sidebar-icon-faq-device',
                  link: {
                    type: 'generated-index',
                    title: '常用设备配置方式',
                    slug: '/local-software/faq/qa/device',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/device/device-001',
                      label: '3.1.12.1 红门相机设备配置',
                    },
                    {
                      type: 'category',
                      label: '3.1.12.2 纯云&本地常用功能设置',
                      link: {
                        type: 'generated-index',
                        title: '纯云&本地常用功能设置',
                        slug: '/local-software/faq/qa/device/cloud-local',
                      },
                      items: [
                        {
                          type: 'category',
                          label: '3.1.12.2.1 本地',
                          link: {
                            type: 'generated-index',
                            title: '本地',
                            slug: '/local-software/faq/qa/device/cloud-local/local',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-001',
                              label: '3.1.12.2.1.1 遥控器开闸有效，以及功能作用',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-002',
                              label: '3.1.12.2.1.2 亲情车进出添加说明',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-003',
                              label: '3.1.12.2.1.3 从平台恢复数据',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-004',
                              label: '3.1.12.2.1.4 英文版本软件配置方案',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-005',
                              label: '3.1.12.2.1.5 相机加密使用',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-local/local/local-006',
                              label: '3.1.12.2.1.6 相机加密方式',
                            },
                            {
                              type: 'category',
                              label: '3.1.12.2.1.7 纯云',
                              link: {
                                type: 'generated-index',
                                title: '纯云',
                                slug: '/local-software/faq/qa/device/cloud-local/local/cloud',
                              },
                              items: [
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-001',
                                  label: '3.1.12.2.1.7.1 创建访客二维码',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-002',
                                  label: '3.1.12.2.1.7.2 车队模式',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-003',
                                  label: '3.1.12.2.1.7.3 添加军警车牌规则',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-004',
                                  label: '3.1.12.2.1.7.4 相机加密配置',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-005',
                                  label: '3.1.12.2.1.7.5 信路通相机看视频',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-006',
                                  label: '3.1.12.2.1.7.6 纯云收��端内网查看视频',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-007',
                                  label: '3.1.12.2.1.7.7 告警稽核工单配置方式',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/cloud-local/local/cloud/cloud-008',
                                  label: '3.1.12.2.1.7.8 芊熠相机看外网视频',
                                },
                              ],
                              collapsible: true,
                              collapsed: true,
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                      ],
                      collapsible: true,
                      collapsed: true,
                    },
                    {
                      type: 'category',
                      label: '3.1.12.3 半云设备',
                      link: {
                        type: 'generated-index',
                        title: '半云设备',
                        slug: '/local-software/faq/qa/device/half-cloud',
                      },
                      items: [
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-001',
                          label: '3.1.12.3.1 人脸识别一体机',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-002',
                          label: '3.1.12.3.2 CXNT-JFJ 本地调试方法',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-003',
                          label: '3.1.12.3.3 车位锁添加方式',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-004',
                          label: '3.1.12.3.4 威视主板配置说明书',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-005',
                          label: '3.1.12.3.5 余位追缴屏纯云调试方法',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/half-cloud/half-cloud-006',
                          label: '3.1.12.3.6 科发lcd屏卡',
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.7 相机配置',
                          link: {
                            type: 'generated-index',
                            title: '相机配置',
                            slug: '/local-software/faq/qa/device/half-cloud/camera',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-001',
                              label: '3.1.12.3.7.1 大华相机本地配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-002',
                              label: '3.1.12.3.7.2 本地相机配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-003',
                              label: '3.1.12.3.7.3 VZ RG车道监控',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-004',
                              label: '3.1.12.3.7.4 VZ RF车位相机',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-005',
                              label: '3.1.12.3.7.5 宇视相机LED屏本地配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-006',
                              label: '3.1.12.3.7.6 臻实R5相机配置（LCD）',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-007',
                              label: '3.1.12.3.7.7 视捷相机本地配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-008',
                              label: '3.1.12.3.7.8 芊熠相机LCD屏配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-009',
                              label: '3.1.12.3.7.9 信路通一体机',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-010',
                              label: '3.1.12.3.7.10 HX E5一体机',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-011',
                              label: '3.1.12.3.7.11 大华相机led屏和lcd屏配置说明',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-012',
                              label: '3.1.12.3.7.12 海康相机led屏设备',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/camera/camera-013',
                              label: '3.1.12.3.7.13 HX HX88D一体机',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.8 车型识别机',
                          link: {
                            type: 'generated-index',
                            title: '车型识别机',
                            slug: '/local-software/faq/qa/device/half-cloud/vehicle',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/vehicle/vehicle-001',
                              label: '3.1.12.3.8.1 信路通车型识别机',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/vehicle/vehicle-002',
                              label: '3.1.12.3.8.2 VZ X3 车型识别机',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.9 被扫配置',
                          link: {
                            type: 'generated-index',
                            title: '被扫配置',
                            slug: '/local-software/faq/qa/device/half-cloud/scan',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/scan/scan-001',
                              label: '3.1.12.3.9.1 牛图被扫本地配置',
                            },
                            {
                              type: 'category',
                              label: '3.1.12.3.9.2 云对讲设备线下调试',
                              link: {
                                type: 'generated-index',
                                title: '云对讲设备线下调试',
                                slug: '/local-software/faq/qa/device/half-cloud/scan/intercom-offline',
                              },
                              items: [
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/half-cloud/scan/intercom-offline/intercom-offline-001',
                                  label: '3.1.12.3.9.2.1 云对讲-cx线下端添加方法',
                                },
                                {
                                  type: 'doc',
                                  id: 'local-software/faq/qa/device/half-cloud/scan/intercom-offline/intercom-offline-002',
                                  label: '3.1.12.3.9.2.2 CXNT对讲本地调试方式',
                                },
                              ],
                              collapsible: true,
                              collapsed: true,
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.10 刷卡进出设备配置说明书',
                          link: {
                            type: 'generated-index',
                            title: '刷卡进出设备配置说明书',
                            slug: '/local-software/faq/qa/device/half-cloud/card',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/card/card-001',
                              label: '3.1.12.3.10.1 YZL白色主板刷卡配置流程',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.11 ETC配置',
                          link: {
                            type: 'generated-index',
                            title: 'ETC配置',
                            slug: '/local-software/faq/qa/device/half-cloud/etc',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/etc/etc-001',
                              label: '3.1.12.3.11.1 ETC无卡模式',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/etc/etc-002',
                              label: '3.1.12.3.11.2 本地端ETC云扣费',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.3.12 YZL余位屏配置',
                          link: {
                            type: 'generated-index',
                            title: 'YZL余位屏配置',
                            slug: '/local-software/faq/qa/device/half-cloud/yzl-screen',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/half-cloud/yzl-screen/yzl-screen-001',
                              label: '3.1.12.3.12.1 本地端车场设置',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                      ],
                      collapsible: true,
                      collapsed: true,
                    },
                    {
                      type: 'category',
                      label: '3.1.12.4 纯云设备',
                      link: {
                        type: 'generated-index',
                        title: '纯云设备',
                        slug: '/local-software/faq/qa/device/cloud-device',
                      },
                      items: [
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/cloud-device/cloud-device-001',
                          label: '3.1.12.4.1 CXNT-JFJ对讲调试方法',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/cloud-device/cloud-device-002',
                          label: '3.1.12.4.2 科发LCD屏添加方法',
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.3 自助缴费机',
                          link: {
                            type: 'generated-index',
                            title: '自助缴费机',
                            slug: '/local-software/faq/qa/device/cloud-device/kiosk',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/kiosk/kiosk-001',
                              label: '3.1.12.4.3.1 云对讲-cx上云',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.4 RG相机上云配置文档',
                          link: {
                            type: 'generated-index',
                            title: 'RG相机上云配置文档',
                            slug: '/local-software/faq/qa/device/cloud-device/rg-camera',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/rg-camera/rg-camera-001',
                              label: '3.1.12.4.4.1 RG相机上云说明',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.5 ETC',
                          link: {
                            type: 'generated-index',
                            title: 'ETC',
                            slug: '/local-software/faq/qa/device/cloud-device/etc2',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/etc2/etc2-001',
                              label: '3.1.12.4.5.1 锦沃天线',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.6 牛图被扫使用说明',
                          link: {
                            type: 'generated-index',
                            title: '牛图被扫使用说明',
                            slug: '/local-software/faq/qa/device/cloud-device/niutu',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/niutu/niutu-001',
                              label: '3.1.12.4.6.1 牛图被扫上云说明书',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.7 环境相机',
                          link: {
                            type: 'generated-index',
                            title: '环境相机',
                            slug: '/local-software/faq/qa/device/cloud-device/env-camera',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/env-camera/env-camera-001',
                              label: '3.1.12.4.7.1 海康萤石云',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.8 云对讲纯云调试',
                          link: {
                            type: 'generated-index',
                            title: '云对讲纯云调试',
                            slug: '/local-software/faq/qa/device/cloud-device/intercom-cloud',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/intercom-cloud/intercom-cloud-001',
                              label: '3.1.12.4.8.1 纯云 云对讲-cx调试',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/intercom-cloud/intercom-cloud-002',
                              label: '3.1.12.4.8.2 纯云 CXNT设备调试',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.9 相机上云',
                          link: {
                            type: 'generated-index',
                            title: '相机上云',
                            slug: '/local-software/faq/qa/device/cloud-device/camera-cloud',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-001',
                              label: '3.1.12.4.9.1 相机上云提前阅读',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-002',
                              label: '3.1.12.4.9.2 VZ相机上云（旧版）',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-003',
                              label: '3.1.12.4.9.3 HX相机上云（旧版）',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-004',
                              label: '3.1.12.4.9.4 芊熠相机上云（旧版）',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-005',
                              label: '3.1.12.4.9.5 信路通相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-006',
                              label: '3.1.12.4.9.6 新VZ相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-007',
                              label: '3.1.12.4.9.7 （一）相机一键上云（新版相机）',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-008',
                              label: '3.1.12.4.9.8 臻实相机LCD上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-009',
                              label: '3.1.12.4.9.9 宇视相机内置LED屏上云配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-010',
                              label: '3.1.12.4.9.10 视捷相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-011',
                              label: '3.1.12.4.9.11 宇视相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-012',
                              label: '3.1.12.4.9.12 芊熠相机LCD屏  上云配置',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-013',
                              label: '3.1.12.4.9.13 迁里马相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-014',
                              label: '3.1.12.4.9.14 VZ赛菲姆板卡一体机',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-015',
                              label: '3.1.12.4.9.15 如何查询对应相机的序列号',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-016',
                              label: '3.1.12.4.9.16 下发OSS',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-017',
                              label: '3.1.12.4.9.17 VZ R5E相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-018',
                              label: '3.1.12.4.9.18 HX E5相机上云',
                            },
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/camera-cloud/camera-cloud-019',
                              label: '3.1.12.4.9.19 HX相机红门板卡上云',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                        {
                          type: 'category',
                          label: '3.1.12.4.10 YZL余位屏配置',
                          link: {
                            type: 'generated-index',
                            title: 'YZL余位屏配置',
                            slug: '/local-software/faq/qa/device/cloud-device/yzl-screen',
                          },
                          items: [
                            {
                              type: 'doc',
                              id: 'local-software/faq/qa/device/cloud-device/yzl-screen/yzl-screen-001',
                              label: '3.1.12.4.10.1 免布线车场设置',
                            },
                          ],
                          collapsible: true,
                          collapsed: true,
                        },
                      ],
                      collapsible: true,
                      collapsed: true,
                    },
                    {
                      type: 'category',
                      label: '3.1.12.5 环境相机',
                      link: {
                        type: 'generated-index',
                        title: '环境相机',
                        slug: '/local-software/faq/qa/device/env-camera',
                      },
                      items: [
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/env-camera/env-camera-001',
                          label: '3.1.12.5.1 本地-VZ RG',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/env-camera/env-camera-002',
                          label: '3.1.12.5.2 上云-RG相机',
                        },
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/device/env-camera/env-camera-003',
                          label: '3.1.12.5.3 海康萤石云相机',
                        },
                      ],
                      collapsible: true,
                      collapsed: true,
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.13 其他常见问题处理方案',
                  className: 'sidebar-icon-faq-issue',
                  link: {
                    type: 'generated-index',
                    title: '其他常见问题处理方案',
                    slug: '/local-software/faq/qa/issue',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-001',
                      label: '3.1.13.1 （已解决）闪退，上传视频闪烁问题',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-002',
                      label: '3.1.13.2 手持机同步',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-003',
                      label: '3.1.13.3 相机主码流或子码流获取不到',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-004',
                      label: '3.1.13.4 臻实相机连接不上软件',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-005',
                      label: '3.1.13.5 车位管理',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-006',
                      label: '3.1.13.6 上传pp进出记录没有日志的情况',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-007',
                      label: '3.1.13.7 MySQL56数据库安装说明',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-008',
                      label: '3.1.13.8 pp上传记录报错和解决方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-009',
                      label: '3.1.13.9 臻实相机 警车乱码 其它车正常',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-010',
                      label: '3.1.13.10 一位多车详细说明',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-011',
                      label: '3.1.13.11 无牌车扫码相关设置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-012',
                      label: '3.1.13.12 上传PP进出记录（本地和免布线）',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-013',
                      label: '3.1.13.13 扫码支付提示停车业务巡检不通过',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-014',
                      label: '3.1.13.14 车辆续期管理端软件闪退',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-015',
                      label: '3.1.13.15 紫色主板切换广告图片',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-016',
                      label: '3.1.13.16 数据库启动方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-017',
                      label: '3.1.13.17 免布线车场云端存储图片',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-018',
                      label: '3.1.13.18 电脑CPU使用率过高',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-019',
                      label: '3.1.13.19 英文版的软件，使用没有声音和显示处理方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-020',
                      label: '3.1.13.20 HY型相机加密',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-021',
                      label: '3.1.13.21 设备连不上软件，报错值不能为 null',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-022',
                      label: '3.1.13.22 软件升级',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-023',
                      label: '3.1.13.23 免布线',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-024',
                      label: '3.1.13.24 HY主辅相机组网设置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-025',
                      label: '3.1.13.25 商家平台',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-026',
                      label: '3.1.13.26 修改保存车类报错RegbookType',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-027',
                      label: '3.1.13.27 充电枪',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-028',
                      label: '3.1.13.28 车型识别一体机',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-029',
                      label: '3.1.13.29 数据库服务启动不了说明书',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-030',
                      label: '3.1.13.30 臻实相机 黄牌车识别没记录',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-031',
                      label: '3.1.13.31 云坐席',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-032',
                      label: '3.1.13.32 一键创建车场',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-033',
                      label: '3.1.13.33 相机设备和板卡类型分类',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-034',
                      label: '3.1.13.34 上传PP进出记录，PP有记录，但是没有图片',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-035',
                      label: '3.1.13.35 支付通知回调地址配置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-036',
                      label: '3.1.13.36 减免规则不能从平台上同步到本地',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/issue/issue-037',
                      label: '3.1.13.37 新增车辆信息报错ParklockID',
                    },
                    {
                      type: 'category',
                      label: '3.1.13.38 臻实相机相关',
                      link: {
                        type: 'generated-index',
                        title: '臻实相机相关',
                        slug: '/local-software/faq/qa/issue/zhenshi',
                      },
                      items: [
                        {
                          type: 'doc',
                          id: 'local-software/faq/qa/issue/zhenshi/zhenshi-001',
                          label: '3.1.13.38.1 警车车牌不上报',
                        },
                      ],
                      collapsible: true,
                      collapsed: true,
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.14 欠费追缴配置',
                  className: 'sidebar-icon-faq-arrear',
                  link: {
                    type: 'generated-index',
                    title: '欠费追缴配置',
                    slug: '/local-software/faq/qa/arrear',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/arrear/arrear-001',
                      label: '3.1.14.1 免布线车场追缴路边车场',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/arrear/arrear-002',
                      label: '3.1.14.2 线下欠费追缴配置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/arrear/arrear-003',
                      label: '3.1.14.3 本地欠费订单自动创建',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/arrear/arrear-004',
                      label: '3.1.14.4 免布线欠费追缴配置',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/arrear/arrear-005',
                      label: '3.1.14.5 海康萤石云相机查看欠费进出视频',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.15 操作功能',
                  className: 'sidebar-icon-faq-operation',
                  link: {
                    type: 'generated-index',
                    title: '操作功能',
                    slug: '/local-software/faq/qa/operation',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-001',
                      label: '3.1.15.1 本地车场从平台恢复',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-002',
                      label: '3.1.15.2 一位多车的录入',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-003',
                      label: '3.1.15.3 切换车场类型配置说明书',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-004',
                      label: '3.1.15.4 车场数据库迁移',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-005',
                      label: '3.1.15.5 修改数据库内存',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/operation/operation-006',
                      label: '3.1.15.6 入口登记二维码生成流程',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.16 支持充电减免的平台',
                  className: 'sidebar-icon-faq-charge',
                  link: {
                    type: 'generated-index',
                    title: '支持充电减免的平台',
                    slug: '/local-software/faq/qa/charge',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/charge/charge-001',
                      label: '3.1.16.1 支持充电减免的平台',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.17 AI社区配置介绍',
                  className: 'sidebar-icon-faq-ai',
                  link: {
                    type: 'generated-index',
                    title: 'AI社区配置介绍',
                    slug: '/local-software/faq/qa/ai',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/ai/ai-001',
                      label: '3.1.17.1 事件算法添加示例',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/ai/ai-002',
                      label: '3.1.17.2 AI盒子配置方法',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/ai/ai-003',
                      label: '3.1.17.3 客户端升级',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/ai/ai-004',
                      label: '3.1.17.4 平安社区演示视频上传步骤',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/ai/ai-005',
                      label: '3.1.17.5 Ip音响的配置方法',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.18 阿里云OSS',
                  className: 'sidebar-icon-faq-oss',
                  link: {
                    type: 'generated-index',
                    title: '阿里云OSS',
                    slug: '/local-software/faq/qa/oss',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/oss/oss-001',
                      label: '3.1.18.1 OSS开通',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/oss/oss-002',
                      label: '3.1.18.2 购买OSS',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/oss/oss-003',
                      label: '3.1.18.3 删除阿里云oss储存的图片',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.19 多语言软件系统',
                  className: 'sidebar-icon-faq-i18n',
                  link: {
                    type: 'generated-index',
                    title: '多语言软件系统',
                    slug: '/local-software/faq/qa/i18n',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/i18n/i18n-001',
                      label: '3.1.19.1 中文繁體',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.20 领停支付常见问题',
                  className: 'sidebar-icon-faq-lingting',
                  link: {
                    type: 'generated-index',
                    title: '领停支付常见问题',
                    slug: '/local-software/faq/qa/lingting',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/qa/lingting/lingting-001',
                      label: '3.1.20.1 下载支付签约合同',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
                {
                  type: 'category',
                  label: '3.1.21 车主开电子发票说明',
                  className: 'sidebar-icon-faq-invoice',
                  link: {
                    type: 'generated-index',
                    title: '车主开电子发票说明',
                    slug: '/local-software/faq/qa/invoice',
                  },
                  items: [],
                  collapsible: true,
                  collapsed: true,
                },
              ],
              collapsible: true,
              collapsed: true,
            },
            {
              type: 'category',
              label: '3.2 对接过的支付配置',
              className: 'sidebar-icon-faq-payment',
              link: {
                type: 'generated-index',
                title: '对接过的支付配置',
                slug: '/local-software/faq/payment',
              },
              items: [
                {
                  type: 'doc',
                  id: 'local-software/faq/payment/payment-001',
                  label: '3.2.1 银联被扫',
                },
              ],
              collapsible: true,
              collapsed: true,
            },
            {
              type: 'category',
              label: '3.3 开票',
              className: 'sidebar-icon-faq-billing',
              link: {
                type: 'generated-index',
                title: '开票',
                slug: '/local-software/faq/billing',
              },
              items: [
                {
                  type: 'doc',
                  id: 'local-software/faq/billing/billing-001',
                  label: '3.3.1 车主开电子发票操作步骤',
                },
                {
                  type: 'category',
                  label: '3.3.2 支付后申请开票步骤',
                  className: 'sidebar-icon-faq-invoice-apply',
                  link: {
                    type: 'generated-index',
                    title: '支付后申请开票步骤',
                    slug: '/local-software/faq/billing/invoice-apply',
                  },
                  items: [
                    {
                      type: 'doc',
                      id: 'local-software/faq/billing/invoice-apply/invoice-apply-001',
                      label: '3.3.2.1 泊链支付',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/billing/invoice-apply/invoice-apply-002',
                      label: '3.3.2.2 P云支付',
                    },
                    {
                      type: 'doc',
                      id: 'local-software/faq/billing/invoice-apply/invoice-apply-003',
                      label: '3.3.2.3 领停支付',
                    },
                  ],
                  collapsible: true,
                  collapsed: true,
                },
              ],
              collapsible: true,
              collapsed: true,
            },
          ],
          collapsible: true,
          collapsed: true,
        },
      ],
      collapsible: true,
      collapsed: true
    },

    // 无人值守
    {
      type: 'category',
      label: '无人值守',
      className: 'sidebar-icon-unattended',
      link: {
        type: 'generated-index',
        title: '无人值守',
        description: '无人值守停车场解决方案：对讲卡、话机、显示屏等核心设备',
      },
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'unattended/index', label: '1. 方案概述' },
        { type: 'doc', id: 'unattended/intercom-card', label: '2. 对讲卡' },
        { type: 'doc', id: 'unattended/intercom-phone', label: '3. 对讲话机' },
        { type: 'doc', id: 'unattended/display-screen', label: '4. 显示屏系统' },
        { type: 'doc', id: 'unattended/intercom-mainboard', label: '5. 对讲主板规格' },
      ],
    },

    // 硬件总分类
    {
      type: 'category',
      label: '硬件相关',
      className: 'sidebar-icon-wrench',
      link: {
        type: 'generated-index',
        title: '硬件相关',
        description: '道闸、相机、主板、模块各类硬件资料文档汇总',
      },
      items: [
        // 1.相机类型 独立图标class
        {
          type: 'category',
          label: '1. 相机类型',
          className: 'sidebar-icon-hardware-cam',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/camera/1', label: '1.1 VZ系列相机' },
            { type: 'doc', id: 'hardware/camera/2', label: '1.2 HX系列相机' },
            { type: 'doc', id: 'hardware/camera/3', label: '1.3 HA人脸相机' },
            { type: 'doc', id: 'hardware/camera/4', label: '1.4 DA人脸相机' },
            { type: 'doc', id: 'hardware/camera/5', label: '1.5 两轮车识别模块' },
            // { type: 'doc', id: 'hardware/camera/6', label: '1.6 通用双目相机' },
            // { type: 'doc', id: 'hardware/camera/9', label: '1.7 车牌识别一体机 KOP-H06' },
            // { type: 'doc', id: 'hardware/camera/10', label: '1.8 人脸相机上云配置' }
          ]
        },
        // 2.主板类型 独立图标class
        {
          type: 'category',
          label: '2. 主板类型',
          className: 'sidebar-icon-hardware-mainboard',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/mainboard/1', label: '2.1 FK控制板' },
            { type: 'doc', id: 'hardware/mainboard/2', label: '2.2 DT控制卡' },
            { type: 'doc', id: 'hardware/mainboard/3', label: '2.3 液晶屏驱动板' },
            { type: 'doc', id: 'hardware/mainboard/4', label: '2.4 道闸主板' },
            // { type: 'doc', id: 'hardware/mainboard/5', label: '2.5 继电器扩展主板' }
          ]
        },
        // 3.模块类型 独立图标class
        {
          type: 'category',
          label: '3. 模块类型',
          className: 'sidebar-icon-hardware-module',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/module/1', label: '3.1 4G免流控制模块' },
            { type: 'doc', id: 'hardware/module/2', label: '3.2 4G道闸模块' },
            // { type: 'doc', id: 'hardware/module/3', label: '3.3 语音播放模块' },
            // { type: 'doc', id: 'hardware/module/4', label: '3.4 读卡感应模块' },
            // { type: 'doc', id: 'hardware/module/5', label: '3.5 蓝牙调试模块' },
            // { type: 'doc', id: 'hardware/module/6', label: '3.6 继电器控制模块' }
          ]
        },
        // 4.防砸类型 独立图标class
        {
          type: 'category',
          label: '4. 防砸类型',
          className: 'sidebar-icon-hardware-anticrash',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/anti-crash/1', label: '4.1 地感线圈防砸' },
            // { type: 'doc', id: 'hardware/anti-crash/2', label: '4.2 红外对射防砸' },
            { type: 'doc', id: 'hardware/anti-crash/3', label: '4.2 雷达毫米波防砸' },
            // { type: 'doc', id: 'hardware/anti-crash/4', label: '4.4 视频虚拟线圈防砸' },
            // { type: 'doc', id: 'hardware/anti-crash/5', label: '4.5 压力波防砸' }
          ]
        },
        // 5.车牌识别系统 独立图标class
        {
          type: 'category',
          label: '5. 车牌识别系统',
          className: 'sidebar-icon-hardware-lpr',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/lpr/1', label: '5.1 系统组成与工作原理' },
            { type: 'doc', id: 'hardware/lpr/2', label: '5.2 车辆进出完整流程' },
            { type: 'doc', id: 'hardware/lpr/3', label: '5.3 现场安装规范' },
            { type: 'doc', id: 'hardware/lpr/4', label: '5.4 布线施工规范' },
            { type: 'doc', id: 'hardware/lpr/5', label: '5.5 常见故障排查' }
          ]
        },
        // 6.道闸机芯 独立图标class
        {
          type: 'category',
          label: '6. 道闸机芯',
          className: 'sidebar-icon-hardware-barrier',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/barrier/1', label: '6.1 21B 机芯规格书' }
          ]
        },
      ],
      collapsible: true,
      collapsed: true
    },

    // 下载空间（与硬件相关同级，位于其下方）
    {
      type: 'category',
      label: '下载空间',
      className: 'sidebar-icon-download-space',
      link: {
        type: 'generated-index',
        title: '下载空间',
        description: '硬件相关的工具、固件与资料下载汇总',
        slug: '/hardware/download-space',
      },
      items: [
        {
          type: 'category',
          label: '1. 工具下载',
          className: 'sidebar-icon-tool-download',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/download-space/tool-download', label: '1.1 工具下载' },
          ],
        },
        {
          type: 'category',
          label: '2. 固件下载',
          className: 'sidebar-icon-firmware-download',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/download-space/firmware-download', label: '2.1 固件下载' },
          ],
        },
        {
          type: 'category',
          label: '3. 资料下载',
          className: 'sidebar-icon-material-download',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/download-space/material-download', label: '3.1 资料下载' },
          ],
        },
        {
          type: 'category',
          label: '4. 常用软件',
          className: 'sidebar-icon-common-software',
          collapsible: true,
          collapsed: true,
          items: [
            { type: 'doc', id: 'hardware/download-space/common-software', label: '4.1 常用软件' },
          ],
        },
      ],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: '施工相关',
      className: 'sidebar-icon-construction',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: '施工相关',
        description: '车牌识别与道闸系统的安装、布线及施工规范',
        slug: '/hardware/download-space/construction',
      },
      items: [
        { type: 'doc', id: 'hardware/download-space/construction/lpr-install', label: '1. 车牌识别设备安装' },
        { type: 'doc', id: 'hardware/download-space/construction/barrier-install', label: '2. 道闸设备安装' },
        { type: 'doc', id: 'hardware/download-space/construction/wiring-diagrams', label: '3. 系统布线图' },
        { type: 'doc', id: 'hardware/download-space/construction/best-practices', label: '4. 施工规范与最佳实践' },
      ],
    },
  ]
};

module.exports = sidebars;