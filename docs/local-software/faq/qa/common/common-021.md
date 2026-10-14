---
title: 3.1.11.21 录入车牌长度增加
sidebar_position: 21
---

车辆管理中添加车牌号码，录入车牌长度不够。

![图片](../../img/faq-common-021-01.png)

## 1.使用工具（没有请联系售后）连接数据库，修改参数

![图片](../../img/faq-common-021-02.png)

## 2.双击车场对应的数据库，在右侧搜索employeeplate，右键，设计该表

![图片](../../img/faq-common-021-03.png)

## 3.将PlateNo的长度改成50,并保存

![图片](../../img/faq-common-021-04.png)

## 4.重启数据库服务

![图片](../../img/faq-common-021-05.png)

## 5.重启管理端，就可以增长车牌长度了

![图片](../../img/faq-common-021-06.png)

