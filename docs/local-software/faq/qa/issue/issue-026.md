---
title: 修改保存车类报错RegbookType
sidebar_position: 26
---

![图片](../../img/faq-issue-026-01.png)

1。修改车类报错RegbookType，这个是数据库车类表里面缺少这个参数，需要在数据库里面添加上

![图片](../../img/faq-issue-026-02.png)

2.首先链接数据库 然后查询车类表parkCarType 右键点击设计表 然后拉到最下面 点击添加栏位 输入RegbookType   类型选int  长度50，添加好之后保存就行了。
