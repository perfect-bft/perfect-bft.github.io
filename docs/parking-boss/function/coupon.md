---
title: 2.4 优惠券使用说明
sidebar_position: 4
---

停车Boss无人值守停车管理系统 — 优惠券说明书

优惠券是面向商户的发放、核销与统计体系。本文档按商户管理、发放、查询统计、第三方对接四个板块说明。

## 第一板块：商户管理

- 商户是发券的主体，所有优惠券都通过商户为载体发放；商户与车场是承属关系，不能单独存在。
- 商户的创建以及相关参数说明，如下图。

<div className="img-hover-container">
![img-001](./coupon_img/img-001.jpeg)
</div>

- 创建套餐：套餐内容包含券的类型，以及券卖给商户的价格。

**券类型共 7 种：**

- **定时券**：设定固定时长优惠，例如 3 小时则固定减免 3 小时。
- **定额券**：设定固定金额优惠，例如 5 元则固定减免停车费 5 元。
- **时长券**：商户在可用库存时长内自定义时长给予车主减免（如拥有 1000 小时库存，可自由减免至 0）。
- **金额券**：商户在可用库存金额内自定义金额给予车主减免（如拥有 1000 金额库存，可自由减免至 0）。
- **折扣券**：设定固定折扣，停车费按折扣减免。
- **次券**：单次停车全免，仅针对单次停车，不支持多次进出。
- **住店券**：一般用于酒店环境，给住房客人发券，住房期间内可多次进出；超出有效期产生临停费用。

- 创建套餐，如下图。

<div className="img-hover-container">
![img-002](./coupon_img/img-002.jpeg)
</div>

- 商户绑定套餐：套餐需和商户绑定，套餐是车场制定的规则，商户可用何种套餐、何种价格由车场指定。

<div className="img-hover-container">
![img-003](./coupon_img/img-003.jpeg)
</div>

<div className="img-hover-container">
![img-004](./coupon_img/img-004.jpeg)
</div>

- 充值库存：套餐绑定后需充值库存才可发券，库存不足时发券失败。

<div className="img-hover-container">
![img-005](./coupon_img/img-005.jpeg)
</div>

<div className="img-hover-container">
![img-006](./coupon_img/img-006.jpeg)
</div>

<div className="img-hover-container">
![img-007](./coupon_img/img-007.jpeg)
</div>

## 第二板块：发放优惠券

- 发券方式按车场需求分为：公众号发券、指定车牌发券、纸质券、宴会券（固定二维码）、APP 发券（动态券）、住店车。
- 车场需给商户创建账号，商户登录账号即可操作各种发券。

<div className="img-hover-container">
![img-008](./coupon_img/img-008.jpeg)
</div>

<div className="img-hover-container">
![img-009](./coupon_img/img-009.jpeg)
</div>

- 公众号发券流程。

<div className="img-hover-container">
![img-010](./coupon_img/img-010.jpeg)
</div>

<div className="img-hover-container">
![img-011](./coupon_img/img-011.jpeg)
</div>

<div className="img-hover-container">
![img-012](./coupon_img/img-012.jpeg)
</div>

- 指定车牌发券。

<div className="img-hover-container">
![img-013](./coupon_img/img-013.jpeg)
</div>

- 纸质券（平台名称为批次券）发放流程。

<div className="img-hover-container">
![img-014](./coupon_img/img-014.jpeg)
</div>

<div className="img-hover-container">
![img-015](./coupon_img/img-015.jpeg)
</div>

<div className="img-hover-container">
![img-016](./coupon_img/img-016.jpeg)
</div>

- 宴会券的使用及发放方式。

> **特别备注：** 宴会券是固定二维码，不建议长期使用，存在被拍照留存导致优惠券滥用的风险，使用此券需知晓风险！

<div className="img-hover-container">
![img-017](./coupon_img/img-017.jpeg)
</div>

<div className="img-hover-container">
![img-018](./coupon_img/img-018.jpeg)
</div>

<div className="img-hover-container">
![img-019](./coupon_img/img-019.jpeg)
</div>

- APP 发券：APP 发券需商户自备安卓电子设备，APP 仅支持安卓手机，主要用于发放动态券，若有需要请联系我司技术。
- 住店车：可由后台主动录入，也可车主扫码自助申请。

  - 后台录入。

    <div className="img-hover-container">
    ![img-020](./coupon_img/img-020.jpeg)
    </div>

    <div className="img-hover-container">
    ![img-021](./coupon_img/img-021.jpeg)
    </div>

  - 车主扫码申请。

    <div className="img-hover-container">
    ![img-022](./coupon_img/img-022.jpeg)
    </div>

    <div className="img-hover-container">
    ![img-023](./coupon_img/img-023.jpeg)
    </div>

    <div className="img-hover-container">
    ![img-024](./coupon_img/img-024.jpeg)
    </div>

## 第三板块：用券查询及数据统计

1. 商户的发放、使用、绑定记录查询。

<div className="img-hover-container">
![img-025](./coupon_img/img-025.jpeg)
</div>

2. 车场对所属各商户的汇总查询。

<div className="img-hover-container">
![img-026](./coupon_img/img-026.jpeg)
</div>

- 后台数据统计。

<div className="img-hover-container">
![img-027](./coupon_img/img-027.jpeg)
</div>

## 第四板块：第三方优惠券

- 第三方优惠券指车场对接了充电平台，由充电平台推送绑券信息，平台配置用券规则，达到车主充电优惠出场的目的。
- 第三方优惠券已对接的平台。

<div className="img-hover-container">
![img-028](./coupon_img/img-028.jpeg)
</div>

- 用券规则根据车场实际情况配置。

<div className="img-hover-container">
![img-029](./coupon_img/img-029.jpeg)
</div>

> **注：** 第三方优惠券信息以充电平台推送的数据为准，本平台只做减免规则的匹配；若车主没有领券信息，需联系充电平台核实。
