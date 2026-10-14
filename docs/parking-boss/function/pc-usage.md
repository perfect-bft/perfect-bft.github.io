---
title: 2.1 PC端使用说明
sidebar_position: 1
---

停车Boss云平台 PC 端使用说明书

本文档面向运维与运营人员，系统讲解 PC 端从登录、组织机构、车场配置到车场业务、优惠券、数据分析等各模块的操作方法。

## 一、登录系统

1、输入登录地址

打开浏览器 `<平台登录地址>`（由服务人员提供）登录系统首页，如图所示：

<div className="img-hover-container">
![img-001](./pc-usage_img/img-001.png)
</div>

2、输入登录账号（账号创建请联系我公司相关服务人员）。

<div className="img-hover-container">
![img-002](./pc-usage_img/img-002.png)
</div>

## 二、首页

首页通过可视化的方式展示车流量，收入以及各类统计组成；从近一周，近30天的维度进行车流量，相关收入以及车场车次分析、新能源时段停留划分进行统计，使管理者对车场的运营情况一目了然。

<div className="img-hover-container">
![img-003](./pc-usage_img/img-003.png)
</div>

## 三、组织机构

### 1、集团管理

可新增、修改、查询、删除集团，在集团下新建角色，创建账号。

<div className="img-hover-container">
![img-004](./pc-usage_img/img-004.png)
</div>

（1）新增集团，填写集团账号信息，设置年费价格；在账号申请表格里面有对公、对私账户，申请后支付类型选择对应数据填写。

<div className="img-hover-container">
![img-005](./pc-usage_img/img-005.png)
</div>

（2）新建集团角色，角色权限不勾选默认所有权限。

<div className="img-hover-container">
![img-006](./pc-usage_img/img-006.png)
</div>

（3）新增集团账号，选择上一步创建的角色，输入必填项，点击确认

<div className="img-hover-container">
![img-007](./pc-usage_img/img-007.png)
</div>

### 2、分公司管理

可新增、修改、查询、删除分公司，创建分公司角色和账号。

创建分公司，选择上一步填写的集团名，输入分公司名称，点击提交。

<div className="img-hover-container">
![img-008](./pc-usage_img/img-008.png)
</div>

### 3、项目管理

可操作新增、修改、查询、删除项目，创建项目角色和账号。

（1）创建项目，选择集团、分公司，选择支付平台，填写支付编码，年费价格。

<div className="img-hover-container">
![img-009](./pc-usage_img/img-009.png)
</div>

（2）添加角色、权限分配、新增账号：

每个分级权限可新增角色与账号的意义在于鼓励经销商客户让自己的客户自己管理车场，发展下级。

## 四、账号信息

- **充值记录**：查看下级所有项目线上、线下充值、申请提现、已结算记录，城市、集团账号可操作提现。

<div className="img-hover-container">
![img-010](./pc-usage_img/img-010.png)
</div>

## 五、车场配置

### 1、公共配置

公共配置包括无牌车、月租、出入场、支付、其它配置等。

#### （1）无牌车配置

<div className="img-hover-container">
![img-011](./pc-usage_img/img-011.png)
</div>

- ①启用无牌车：开启后，无牌车可以选择扫码进出场。

- ②无牌车地感验证：开启后现场有真实有效车辆才可触发无牌车开关，通过扫码不能直接开闸，避免车主用手机扫码输入，不存在车辆进场。

- ③无牌车进出场模式：小程序、短信、直接开闸三种模式，默认短信。小程序、短信均按0.1元/条收费，平台免费提供100条，后续自费。

#### （2）月租车配置

<div className="img-hover-container">
![img-012](./pc-usage_img/img-012.png)
</div>

- ①月租车满位入场：开启后，在车场无余位情况下，月租车仍可以正常入场。

- ②自动删除过期月租车：默认开启3个月，超过设置时长，自动删除月租车。

- ③月租车申请：开启后，车主可自行扫车场月租申请码登记上报月租车信息，操作界面如下图。

<div className="img-hover-container">
![img-013](./pc-usage_img/img-013.png)
</div>

- ④月租超位模式：在一位多车情况下，第二台（或者多台月租车）要进车场，可选全程按临时车收费或场内转月租。

#### （3）入场配置

<div className="img-hover-container">
![img-014](./pc-usage_img/img-014.png)
</div>

- **①允许排队入场**：默认开启，车场车位已满的情况，车辆可在入口等待，出口有车出去后，入口不用倒车，自动开闸。

- ②最小入场确认时间：针对单通道，出场时避免车速过慢或车辆抖动重新识别尾部车牌，造成异常开闸。

- ③最大出场确认时间：包含上述情况外，避免出口相机一直识别离出场口较近停车位，造成异常开闸。还有一种情况，刚刚入场就到出口识别，造成误识别，异常开闸。

- **④未入场缴费**：没有入场纪录，预支付指定保证金。

- **⑤临时车扫码确认时间**：设置扫码时间支付，超时订单失效需重新扫码。

- **⑥允许重复进出场**：车辆重复进出场，例如，车辆缴费后，道闸开闸时间已过，落闸后，车辆后退重新识别又可重新开闸。举例：商户住店车在住店时间内可重复进出场。

#### （4）出场配置

<div className="img-hover-container">
![img-015](./pc-usage_img/img-015.png)
</div>

- ①出场返场逃费：车辆入场后又到出口识别，再倒车停到车位；未开启此功能时会丢失入场记录，提示无入场记录，此时系统提示请缴纳保证金出场。如不开启保证金模式则直接免费出场。

- ②允许黑名单车辆出场：在场黑名单车辆允许出场

- **③相机离线后所有车辆放行**：默认不开，离线后管理员可用手机登录公众号，人工拍照上传照片进出。（此场景应对断电，断网状态）

- **④出口压地感后允许输入车牌出场**：此功能为设置为扫码出场使用。避免利用相机识别照片错误开闸。

- **⑤滞留车辆时间定义**：入场超过设定时间，自动把该车辆归类于滞留车辆，可手动盘存。该车辆不占用车场余位。

#### （5）支付配置

<div className="img-hover-container">
![img-016](./pc-usage_img/img-016.png)
</div>

- **①联合追缴**：此功能已经下放到所有等级车场，在同一账号下，A停车场逃费记录，上传云平台该城市所有车场可入口补缴该笔费用。追缴金额回到A停车场账户。

- ②异常自动补缴确认：开启后会弹出自动补缴确认金额，小于等于填写的金额自动进入补缴后台，车辆再进入车场需补缴上次欠费订单后入场。

- **③缴费异常车辆禁止通行**：（此功能正在开发中，暂不释义）。

- ④月租入口补缴：开启后，过期月租出口未支付，进入异常记录，确认补缴后，待下次车辆入场时需补缴上次欠费订单后再入场。

- ⑤保证金自动退款：开启后无入场记录车辆出场的保证金隔天自动退款。

- ⑥无牌车自动退款：开启后无牌车预付金额在车辆出场后隔天自动退款。

- ⑦无牌车预支付单次金额：填写金额（元）无牌车扫码进入需交预付保证金。

- ⑧缴费状态异常等待时间：出入口识别车牌后，在设定时间内不扫码支付则需重新后退识别别。

- ⑨自动补缴确认金额：功能属于异常补缴确认功能补充项。

- ⑩新能源日内免费时长（小时）：设置新能源车辆指定时长内免费通行。

#### （6）其它配置

<div className="img-hover-container">
![img-017](./pc-usage_img/img-017.png)
</div>

- ①允许锁车：开启后月租车可以设置开闸密码，月租车进出需要扫码填写密码开闸。若没设置密码，则自动识别出场。

- ②特殊车场：针对特殊车场相机无法识别车牌设置。默认不开启。

- ③启用本地服务器：默认不开。

- ④地感验证：此为辅助识别功能，默认不开。详情可咨询我公司技术人员。

- ⑤预设车辆：提高相机识别率识别速度，提前设置该城市车牌文字。

- ⑥在场车辆计算模式：扫码车辆或总车辆。

- ⑦不确定在场记录清理时间：不确定在场自动删除入场记录。

- ⑧音量设置：设置白天与晚上不同时间播报音量。

### 2、收费配置

- **收费类型**：二十四小时、计次收费、时间段收费、白天夜晚跨时段计费。

<div className="img-hover-container">
![img-018](./pc-usage_img/img-018.png)
</div>

#### （1）二十四小时

<div className="img-hover-container">
![img-019](./pc-usage_img/img-019.png)
</div>

①此案例为一小时1块，封顶20元，免费时间30分钟。首停分钟设置为0，设置为60则第一小时免费，从第二小时算起。

- **②停车时间包含免费分钟**：举例说明，开启后一小时30分钟收费为2元，不开启为1元。

- **③封顶收费含过夜费**：设置过夜费后，封顶里是否含过夜费用，不含则为封顶加上晚上过夜时间。

- **④是否启用多次进出按天封顶**：启用后，同一辆车当天进出按天封顶。

- **⑤多次进出按天封顶方式**：停车24小时、自然天24小时。

- **⑥多次停车每日收费限制金额**：除封顶外，多次进出设不设置限额。

#### （2）计次收费

<div className="img-hover-container">
![img-020](./pc-usage_img/img-020.png)
</div>

#### （3）时间段收费

<div className="img-hover-container">
![img-021](./pc-usage_img/img-021.png)
</div>

①将时间按星期划分，可设置高峰与平时各异收费标准。

②跨天收费涉及到隔天收费标准不同，所以设置指定金额，例如过晚上24点为跨天。

- **③24小时封顶**：跨段后24小时封顶收费。

- **④停车时间包含免费分钟**：同上。

- **⑤超时收费（不受封顶限制）**：开启后方可设置多长时间后每半小时收多少。

⑥添加时间段如下图：

<div className="img-hover-container">
![img-022](./pc-usage_img/img-022.png)
</div>

- **⑦注意**：整个收费标准从星期一0点开始设置，一直设置到周日晚24点为止，最小单位为半小时。

#### （4）白天夜晚跨时段计费

<div className="img-hover-container">
![img-023](./pc-usage_img/img-023.png)
</div>

设置2个时段收费标准，类似于时间段收费标准。

#### （5）节假日收费标准

<div className="img-hover-container">
![img-024](./pc-usage_img/img-024.png)
</div>

①点击新增后填写节假日收费标准名称，填写折扣，折扣按百分制规则（例如填写90，则按照现行临时车标准打9折）。

②设置开启时间与结束时间后确认保存，到达设置时间自动启用。

### 3、车场配置

<div className="img-hover-container">
![img-025](./pc-usage_img/img-025.png)
</div>

- **（1）初始余位**：设置显示屏余位功能。

（2）新增车场，不同车牌设置不同收费标准。

- **（3）所属父车场**：创建大小车场，输入大车场ID。

- **（4）独立计算费用**：默认开启，关闭后小车场不独立收费，统一到大车场出场收费。

<div className="img-hover-container">
![img-026](./pc-usage_img/img-026.png)
</div>

（5）过期月租车处理：

<div className="img-hover-container">
![img-027](./pc-usage_img/img-027.png)
</div>

（6）共有七种过期车辆设置模式。

- **（7）允许停留时间**：付费识别开闸后允许停留时间。

### 4、车道配置

<div className="img-hover-container">
![img-028](./pc-usage_img/img-028.png)
</div>

- **（1）车道类型分**：入口、出口、入口虚拟、车位相机、共用闸机。

（2）临时车通行方式：

<div className="img-hover-container">
![img-029](./pc-usage_img/img-029.png)
</div>

（3）相机升级后填写相机序列号即可。

- **（4）物联卡ID**：建议去营业厅开通，不会造成网速慢问题。插卡后，与有线网实现双重保障，有线网断网后10秒开始启用物联卡，并发送通知到管理员公众号提醒。

- **（5）相机授权**：选择启用。

- **（6）车牌通行权限**：默认全部勾选，取消勾选，对应类型车牌无法进出。

- **（7）黄牌开双闸**：根据不同车场设计，选择是否开启，默认为否。

（8）设置为出口时内容有所变动，如图：

<div className="img-hover-container">
![img-030](./pc-usage_img/img-030.png)
</div>

- **（9）是否开启现金支付**：配套岗亭端使用，可收现金。

- **（10）正在支付禁行通道**：使用场景同进同出，绑定后出口正在支付，入口来车会语音播报提示退后等待出口支付完成再入场。

- **（11）设置借道时间、借道金额**：在免费时间内生效，用于临时入场车辆且停留时间较短。

（12）车道配置好后设置滚动字幕，点击控制卡配置。

<div className="img-hover-container">
![img-031](./pc-usage_img/img-031.png)
</div>

<div className="img-hover-container">
![img-032](./pc-usage_img/img-032.png)
</div>

- **（13）车牌识别方式**：虚拟线圈与虚拟线圈加地感触发二选一，第二种情况有施工要求。

- **（14）控制卡类型**：控制卡对接了科发，DT，FK TTS语音版。

- **（15）动态二维码**：显示屏可开启动态二维码，在二三四行显示。

- **（16）延时关闸**：开闸后无关闸信号可设置时间关闸。

- **（17）有线网检测地址**：填写当地宽带营业厅检测地址，例如电信填写114.114.114.114或者223.5.5.5，作为断网公众号通知提醒功能。

<div className="img-hover-container">
![img-033](./pc-usage_img/img-033.png)
</div>

（18）点击首行内容，可填写显示屏第一、二、三行内容，自定义文字。

<div className="img-hover-container">
![img-034](./pc-usage_img/img-034.png)
</div>

（19）关闸功能需要相机关闸信号也接到道闸

- **（20）控制信号**：端子控制、遥控器控制开关。

### 5、相机配置

（1）新建车道后自动弹出相机配置如下图。

<div className="img-hover-container">
![img-035](./pc-usage_img/img-035.png)
</div>

（2）相机状态绿色代表相机在线，红色代表掉线，点击主相机，进入相机网页端调试界面。

### 6、开闸日志

<div className="img-hover-container">
![img-036](./pc-usage_img/img-036.png)
</div>

所有通过系统开闸的操作（包含手机端），平台全部有记录，车道有车辆时，详情内容有车牌信息。

### 7、二维码

<div className="img-hover-container">
![img-037](./pc-usage_img/img-037.png)
</div>

（1）创建车道后生成对应二维码，预支付码、入口码、出口码、月租申请码

二维码查看弹窗，点击生成图片并下载，直接下载到本地。

- **（2）预付折扣码**：右上角点击【配置停车优惠码】，选择车场、收费标准，点击确认，生成预付折扣码二维码，下载使用。

### 8、自定义语音

<div className="img-hover-container">
![img-038](./pc-usage_img/img-038.png)
</div>

点击修改可自行填写播报内容。

## 六、预付退款

### 1、无牌退款

无牌车手动申请退款列表

<div className="img-hover-container">
![img-039](./pc-usage_img/img-039.png)
</div>

### 2、退款记录

<div className="img-hover-container">
![img-040](./pc-usage_img/img-040.png)
</div>

### 3、保证金退款

无入场记录保证金退款内容，不开启自动退款数据会累积在车场内，金额会到提现账户内。

<div className="img-hover-container">
![img-041](./pc-usage_img/img-041.png)
</div>

## 七、车场业务

### 1、月租套餐

- **（1）套餐类型**：月租、储值、时段月租套餐。

<div className="img-hover-container">
![img-042](./pc-usage_img/img-042.png)
</div>

（2）常见为月租套餐，充值单位有日、月、年。
<div className="img-hover-container">
![img-043](./pc-usage_img/img-043.png)
</div>

（3）储值套餐为储值卡模式，常见为商场充100得110类型。每次抵扣当前临停费。

<div className="img-hover-container">
![img-044](./pc-usage_img/img-044.png)
</div>

（4）时段月租定义为在一天的某个指定时间段内为月租车，其他时间为临时车执行临时车收费标准。

<div className="img-hover-container">
![img-045](./pc-usage_img/img-045.png)
</div>

### 2、黑名单

<div className="img-hover-container">
![img-046](./pc-usage_img/img-046.png)
</div>

（1）可输入黑名单车牌或者车主电话号码。列入黑名单车辆，在入场时，闸机显示屏会给出提示，让车场管理员确认是否放行该车辆。

<div className="img-hover-container">
![img-047](./pc-usage_img/img-047.png)
</div>

### 3、车主车辆

<div className="img-hover-container">
![img-048](./pc-usage_img/img-048.png)
</div>

#### （1）车主管理

可操作新增车主、修改、删除车主，批量删除车主，批量导入车辆、储值车后台充值、月租车导出等。有车主存在多辆车，多个车位的情况，车牌显示为辆数，点击可查看车牌详情。

#### （2）车辆管理

- **①车辆类型**：月租车、临时车、储值车、免费车、时段限制月租。

②可操作新增车辆、修改、删除车辆，批量删除车辆，批量修改车辆，月租车延期等。

### 4、时段月租

（1）时段月租定义为在一天的某个指定时间段内为月租车，其他时间为临时车执行临时车收费标准。

<div className="img-hover-container">
![img-049](./pc-usage_img/img-049.png)
</div>

（2）添加的时段是月租时段，非月租时段按标准收费，还可设置非月租时段是否禁行。

<div className="img-hover-container">
![img-050](./pc-usage_img/img-050.png)
</div>

<div className="img-hover-container">
![img-051](./pc-usage_img/img-051.png)
</div>

（3）设置完后，新增时段限制月租选择收费标准即可。

## 八、优惠券

### 1、商户管理

<div className="img-hover-container">
![img-052](./pc-usage_img/img-052.png)
</div>

（1）添加商户

<div className="img-hover-container">
![img-053](./pc-usage_img/img-053.png)
</div>

- **（2）绑定后失效时间**：指定车牌发券、公众号动态券的有效时间。

- **（3）是否叠加**：同一类型的优惠券可选择是否叠加使用，例如小时券，金额券。

- **（4）过期是否返还**：券设置的有效期内未使用，是否返还到券库存。

- **（5）每天最大发放量**：例如金额券，避免浪费。

- **（6）最大车位数**：各个商户最大车位是多少。

- **（7）优惠券发放时间段**：针对各类商户使用时间设置。

（8）酒店有住店车，钟点房情况，设置离店过夜以及钟点房时间。

- **（9）车主自助购买**：开启状态则需要车主自行扫码购买优惠券，默认关闭。

（10）查看更多，发放批次券，选择失效时间、券类型、数量，点击【确认】。

<div className="img-hover-container">
![img-054](./pc-usage_img/img-054.png)
</div>

（11）发放成功后，点击【打印】，查看打印优惠券效果如下图：

<div className="img-hover-container">
![img-055](./pc-usage_img/img-055.png)
</div>

（12）发放宴会券，填写同批次券：

<div className="img-hover-container">
![img-056](./pc-usage_img/img-056.png)
</div>

（13）发放成功后，查看打印效果如下图：

<div className="img-hover-container">
![img-057](./pc-usage_img/img-057.png)
</div>

（14）新增住店车，开房类型分住店车、钟点房。

<div className="img-hover-container">
![img-058](./pc-usage_img/img-058.png)
</div>

（15）新增住店车后，可操作续房、退房、修改车牌。可自行下载住店车二维码，如下图：

<div className="img-hover-container">
![img-059](./pc-usage_img/img-059.png)
</div>

### 2、套餐管理

#### （1）时长券（按时间优惠）

<div className="img-hover-container">
![img-060](./pc-usage_img/img-060.png)
</div>

#### （2）金额券（打折券）

<div className="img-hover-container">
![img-061](./pc-usage_img/img-061.png)
</div>

#### （3）次券（按次免费）

<div className="img-hover-container">
![img-062](./pc-usage_img/img-062.png)
</div>

（4）住店券（旅店消费，车位免费停车）

<div className="img-hover-container">
![img-063](./pc-usage_img/img-063.png)
</div>

（5）定额券（按张抵扣设置金额）

<div className="img-hover-container">
![img-064](./pc-usage_img/img-064.png)
</div>

### 3、定额券

定额券管理（设置上图抵扣券的价值）

<div className="img-hover-container">
![img-065](./pc-usage_img/img-065.png)
</div>

### 4、定时券管理

定时券为定制一张券优惠几个小时。
<div className="img-hover-container">
![img-066](./pc-usage_img/img-066.png)
</div>

### 5、折扣券

折扣券为一张券直接给当前停车费打几折。

<div className="img-hover-container">
![img-067](./pc-usage_img/img-067.png)
</div>

### 6、优惠券统计

汇总所有优惠券的发放、使用、优惠金额、过期时间、发放类型、券状态等。筛选时间范围可导出列表数据。

<div className="img-hover-container">
![img-068](./pc-usage_img/img-068.png)
</div>

### 7、优惠券日/月统计

按日、月统计优惠券发放、使用、返还、优惠金额、券库存等情况。

## 九、数据分析

### 1、在场车辆

<div className="img-hover-container">
![img-069](./pc-usage_img/img-069.png)
</div>

可通过五种信息查询在场车辆，车牌，用户名，车辆类型，入场时间。可筛选同一项目不同车场。还可手、导入导出数据，对在场车辆操作免费放行。

### 2、进出记录

<div className="img-hover-container">
![img-070](./pc-usage_img/img-070.png)
</div>

此处重要信息为支付类型，查看比对未支付情况，最后的备注功能为异常进出信息。

### 3、支付记录

<div className="img-hover-container">
![img-071](./pc-usage_img/img-071.png)
</div>

此处重点查看车辆支付金额、支付类型等。

### 4、月租充值

记录月租车增删查改、后台充值等情况。

<div className="img-hover-container">
![img-072](./pc-usage_img/img-072.png)
</div>

### 5、异常记录

<div className="img-hover-container">
![img-073](./pc-usage_img/img-073.png)
</div>

该记录为出场未缴费订单，点击入口补缴，车主下次入场则需扫码缴清上次欠款才可入场。如有异议，可调取数据照片查看。注意：必须要点击入口补缴才可以进行补缴，不下发还是当临时车处理。若开启自动补缴功能，则每天晚上0点自动下发。

### 6、数据统计

<div className="img-hover-container">
![img-074](./pc-usage_img/img-074.png)
</div>

（1）可切换数据表和柱状图，还可分为周报，月报。

（2）鼠标放在柱状图上后会显示金额明细，如图，最后的结算金额为实时到账扣除提现手续费的费用。

<div className="img-hover-container">
![img-075](./pc-usage_img/img-075.png)
</div>

### 7、滞留车辆

此功能为不占总车位余位设计，需要人工排查是否在场。可导出列表所有滞留车辆数据。

<div className="img-hover-container">
![img-076](./pc-usage_img/img-076.png)
</div>

### 8、现金支付记录

岗亭端功能，点击查看，可查看车辆进出记录。

### 9、短信使用记录

列表显示记录手机号、发送时间。

### 10、短信充值记录

<div className="img-hover-container">
![img-077](./pc-usage_img/img-077.png)
</div>

## 十、预约车辆

### 1、预约单位

<div className="img-hover-container">
![img-078](./pc-usage_img/img-078.png)
</div>

此功能针对商户使用，预约对象为商户，商户可自行登录账号填写预约车辆。

### 2、预约车辆

<div className="img-hover-container">
![img-079](./pc-usage_img/img-079.png)
</div>
查询预约车辆相关信息。
