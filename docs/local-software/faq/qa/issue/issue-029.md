---
title: 数据库服务启动不了说明书
sidebar_position: 29
---

:::caution
图片缺失：
:::

![图片](../../img/faq-issue-029-01.png)

电脑自动断电可能会导致数据库服务损坏而启动不了

解决方案：

![图片](../../img/faq-issue-029-02.png)

右击管理端图标打开文件夹位置在mysqlDB文件夹---data文件夹里面删除ib-logfile0和ib-logfile1 这2个文件在到任务管理器里面重启mysqlcx的数据库服务就能启动
