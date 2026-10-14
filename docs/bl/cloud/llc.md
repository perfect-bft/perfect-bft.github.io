---
title: 两轮车上云方式
sidebar_position: 5
---

import DownloadButton from '@site/src/components/DownloadButton';
import CopyableField from '@site/src/components/CopyableField';

# 两轮车上云方式

:::danger 一定要注意
**一定要一台一台的调试，调好一台再接一台，千万不要多台一起调试，会出问题！**
:::

<DownloadButton href="https://share.feijipan.com/s/Rw1u4MKb">两轮车调试工具下载</DownloadButton>

## 一、准备工作

:::tip
工具解压后，拉到最底下找到 **一卡通调试工具 V5.XX**（版本会持续升级）。
:::

<div className="img-hover-container">
![调试工具界面](/img/remote/31b3b39b0f_peVctyR.png)
</div>

## 二、搜索和配置读头

### 1. 连接设备并读取版本

:::tip[操作步骤]
- 设备上电，插上网线。
- 电脑改到 1 网段，例如 `192.168.1.55`，然后打开工具。
- 默认选择「以太网通信」。
- 选择门禁系统端口号：`3966`。
- 输入设备默认 IP `192.168.1.111`，点击「读版本」，下方显示成功即可（如下图）。
- 点击「读序列号」，读序列码成功即可；该序列码就是上云所需的序列号（后续填写到云端相机序列号）。
- 修改波特率：对应播报的 485 主板，**红/绿/黄选择 9600，蓝色选择 19200**。
:::

<div className="img-hover-container">
![读版本与序列号](/img/remote/47fb0eca02_peVcLmq.png)
</div>

### 2. 配置网络与上云参数

:::tip[操作步骤]
- 选择「网络配置」，点击「读取网络」；连接成功后下方会显示 **读取网络配置成功**。
- 修改 IP 为自己的外网 IP，注意 DNS 也要配置，可标配 `114.114.114.114`。
- 点击「下载网络配置」；下发成功后会显示 **配置网卡成功**。
- 填写以下上云参数后，点击「下载云服务器配置」；成功后会显示 **设置 MQTT 服务器配置成功**。

<CopyableField label="云服务器地址" value="ac.parkingos.club" />
<CopyableField label="MQTT 用户名" value="manager202355" />
<CopyableField label="MQTT 密码" value="09334cc2" />
:::

<div className="img-hover-container">
![网络配置与上云参数](/img/remote/9379ebbd8e_peVgLgH.png)
</div>

## 三、平台配置

:::danger 一定要注意
创建车场时，所属云一定要选择 **公有云**！
:::

<div className="img-hover-container">
![创建车场](/img/remote/ed72cd62c1_peVWoEq.png)
</div>

### 1. 添加相机

:::tip[操作步骤]
1. 登录平台后，点击 **停车云 → 车场管理 → 相机管理**。
2. 点击 **新增**，填写相机名称、类型（**HX**）、相机 ID（序列号）等信息。**类型一定要选HX**。
3. 点击 **确定** 完成添加。
:::

<div className="img-hover-container">
![添加相机](./C5H/第3页-4.PNG)
</div>

### 2. 设置相机类型与 LED 卡

:::tip
- 相机类型要选择：**HX**
- LED 卡类型对应：
  - 绿色、黄色、红色对应 `001`（9600）
  - 蓝色对应 `002`（19200）
:::

<div className="img-hover-container">
![相机类型](./C5H/第4页-5.PNG)
</div>

<div className="img-hover-container">
![LED 卡设置](/img/remote/fd6cfb5a9f_peVfpUx.png)
</div>

## 四、通道绑定

1. 在对应车场中 **新建通道**。
2. 将相机绑定至通道。

<div className="img-hover-container">
![通道绑定](./C5H/6.png)
</div>
