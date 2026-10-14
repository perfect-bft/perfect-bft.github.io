---
title: DA人脸上云方式
sidebar_position: 8
---

# DA人脸上云方式

## 一、人脸机联网登录

1. 人脸机联网，保证设备外网通讯
2. 用人脸机的 IP 登录浏览器
3. 输入账号密码：账号 `admin`，密码 `123456`

<div class="img-hover-container">
![人脸机登录](./darl/01-人脸机登录.png)
</div>

## 二、平台参数配置

1. 登录成功后，打开**平台配置** → **系统参数**
2. **平台开启**打钩
3. 填入平台 URL：`https://f.bolink.club/camera/device`

<div class="img-hover-container">
![平台参数配置](./darl/02-平台参数配置.png)
</div>

## 三、开通车场账号

联系技术人员开通车场账号。

## 四、登录社区云

1. 登录账号
2. 点开**社区云**

<div class="img-hover-container">
![登录社区云](./darl/03-登录社区云.png)
</div>

## 五、创建项目

在**项目列表**创建一个项目。

<div class="img-hover-container">
![创建项目](./darl/04-创建项目.png)
</div>

## 六、添加基础数据

进入**基本数据**，按 **区域管理 → 楼宇管理 → 房屋管理** 的顺序添加。

### 6.1 区域管理

<div class="img-hover-container">
![区域管理](./darl/05-区域管理.png)
</div>

### 6.2 楼宇管理

- **区域**：选择上一步创建的区域名称
- **楼栋名称**：自定义
- **楼层**：自定义，随便填个数字都可以
- **电梯**：有或者无

:::tip 填写提示
带星号为必填项，没有强制性内容，**自定义填写即可**。
:::

<div class="img-hover-container">
![楼宇管理](./darl/06-楼宇管理.png)
</div>

### 6.3 房屋管理

带星号必填，内容自定义填写，默认填 `1` 都可以。

<div class="img-hover-container">
![房屋管理](./darl/07-房屋管理.png)
</div>

## 七、添加门禁设备

1. 进入**添加设备** → **设备管理** → **门禁设备** → **新增**

<div class="img-hover-container">
![新增门禁设备](./darl/08-新增门禁设备.png)
</div>

2. 填写设备信息：

| 字段 | 填写内容 |
| --- | --- |
| 设备名称 | 自定义 |
| 设备类别 | 人脸门禁 |
| 设备类型 | DA-L001 |
| 联网类型 | 以太网 |
| 设备方向 | 进 或 出 |
| 设备位置 | 平台手选 |
| 安装位置 | 自定义填写 |

<div class="img-hover-container">
![设备参数填写](./darl/09-设备参数填写.png)
</div>

:::warning 序列号（MAC 地址）获取方式
序列号为人脸机的 **MAC 地址**，需要登录人脸机后台查看：

**设备信息 → 系统参数** 里面的 MAC 地址，填写到平台。
:::

<div class="img-hover-container">
![设备序列号](./darl/10-设备序列号.png)
</div>

## 八、小程序录入人脸

### 8.1 打开小程序

微信搜索 **「运营小管家」** 小程序。

<div class="img-hover-container">
![运营小管家小程序](./darl/11-运营小管家小程序.jpeg)
</div>

<div class="img-hover-container">
![小程序录入](./darl/12-小程序录入.jpeg)
</div>

<div class="img-hover-container">
![小程序录入2](./darl/13-小程序录入2.png)
</div>

### 8.2 进入工作台

**车场账号密码 → 工作台**

<div class="img-hover-container">
![工作台](./darl/14-工作台.png)
</div>

<div class="img-hover-container">
![工作台人员管理](./darl/15-工作台人员管理.png)
</div>

<div class="img-hover-container">
![人员管理新增](./darl/16-人员管理新增.png)
</div>

### 8.3 新增人员

**社区 → 人员管理 → 新增**

<div class="img-hover-container">
![一码app](./darl/17-一码app.png)
</div>

## 九、一码 App 远程开门

手机端访问**一码 app**小程序可以远程开闸。

:::warning 使用前提
需要提前录入好被注册进去的人员，**人员必须填写手机号**，访问一码 app 需要手机号验证登录。
:::

<div class="img-hover-container">
![一码app开门](./darl/18-一码app开门.png)
</div>

**社区 → 一键开门**

<div class="img-hover-container">
![一键开门](./darl/19-一键开门.png)
</div>

:::danger 查看不到开门权限？
登录平台**人员管理**，查看该人员是否已**授权开门权限**。
:::
