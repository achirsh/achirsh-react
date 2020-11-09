// 样式特征
export type ThingFeatures = {
    //region显示
    "style.icon": string, // 图标
    "style.label": string, // 标签
    "style.thumbnail": string, // 缩略图
    "style.map.rotation": number, // 地图角度
    //end 

    //region 建筑
    "building.address": string, // 建筑地址
    "building.layers": { [L: number]: string }, // 建筑层级 { 层级: 名称 }
    //end

    //region 设备
    "device.sn": string, // 设备串号
    "device.code": string, // 设备编码
    "device.vendor": string, // 设备供应商
    "device.brand": string, // 设备品牌
    "device.model": string, // 设备型号
    "device.firmware": string, // 设备固件
    "device.address": string, // 设备位置
    "device.installed-at": number, // 安装时间 Unix时间戳
    "device.template": string // 设备模板
    "device.profile": { [key: string]: string | number | boolean } // 设备配置
    //end

    //region 门/闸控制
    "gate-ac.footway": boolean, // 人行门/闸控制
    "gate-ac.motorway": boolean, // 车行门/闸控制
    "gate-ac.direction": Array<"CHECKIN" | "CHECKOUT">, // 车行门/闸控制
    //end

    //region 传感器
    "sensor.recognition.face": boolean | Array<"2D" | "3D">, // 面部特征识别
    "sensor.recognition.plate": boolean | Array<string>, // 车牌号码识别
    "sensor.recognition.car-etc": boolean | Array<string>, // ETC停车识别
    "sensor.detection.infrared": boolean | Array<string>, // 红外侦测
    "sensor.camera.video.hls": boolean | string | { [channel: string]: string }, // 直播摄像头 HLS
    "sensor.camera.situational": boolean | Array<string>, // 情境识别摄像头
    "sensor.camera.snapshot": boolean | Array<string>, // 抓拍摄像头
    "sensor.input.card-reader": boolean | Array<"ID" | "M1" | "CPU">, // 智能卡读卡器
    "sensor.input.bluetooth.ble": boolean | Array<string>, // 低功耗蓝牙
    "sensor.input.keyboard": boolean | Array<string>, // 键盘输入
    //end

    //region 自然人
    "person.name": string, // 名称
    "person.tags": string | Array<string>, // 用户标签
    "person.birthdate": number, // 出生日期，Unix时间戳
    "person.phonenumber": string, // 手机号码
    "person.address": string, // 住址
    "person.gender": "MALE" | "FEMALE" | "OTHER", // 性别
    "person.oauth-identity.banj": string | Array<string>, // BANJ用户标识
    "person.face-identity.cmcc": string | Array<string>, // CMCC人脸特征标识
    "person.card-identity.dink": string | Array<string>, // DINK门禁卡标识
    "person.card-identity.lifa": string | Array<string>, // LIFA门禁卡标识
    //end

    //region 交通工具
    "vehicle.tags": string | Array<string>, // 车辆标签
    "vehicle.contract": string, // 联系人
    "vehicle.theme-color": string, // 主题颜色
    "vehicle.brand": string, // 车辆品牌
    "vehicle.model": string, // 车辆型号
    "vehicle.license-number": string, // 车牌号码
    "vehicle.card-identity.lifa": string | Array<string>, // LIFA停车卡标识
    "vehicle.plate-identity.lifa": string | Array<string>, // LIFA车牌识别
    "vehicle.etc-identity.suto": string | Array<string>, // ETC卡标识
    //end
}