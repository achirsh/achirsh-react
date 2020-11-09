import { ISituation } from "models/map";

export const BASENAME = "/";
export const isDevelopment = process.env.NODE_ENV === "development";

export const API_DEMO = "";

export const AMAP_KEY = "a97fe961e70f9fc40049fc3411cbec45";
export const AMAP_VERSION = "1.4.0";
export const AMAP_MAPSTYLE = "amap://styles/4d8d59a1293bcf2e48c5255e34e4a9c4";

export const situations: ISituation[] = [
    { label: "安防态势感知", icon: "anfang", panels: ["access-monitor", "video-monitor", "security-warning-monitor"] },
    { label: "消防态势感知", icon: "xiaofang", panels: ["video-monitor"] },
    { label: "能源态势感知", icon: "nengyuan", panels: [] },
    { label: "运维态势感知", icon: "yunwei", panels: [] },
    // { label: "巡更巡检", panels: [] },
    // { label: "物联网智能", panels: [] },
]

export const deviceSchemes = [
    { label: "门禁", icon: "menjing", scheme: "device.gate-ac.footway.base" },
    { label: "人行闸机", icon: "renxingzhaji", scheme: "device.gate-ac.footway.gate" },
    { label: "访客对讲", icon: "duijiang", scheme: "device.gate-ac.footway.intercom" },
    { label: "车辆道闸", icon: "daozha", scheme: "device.gate-ac.motorway.base" },
    { label: "车位监控", icon: "qiuji", scheme: "device.car-parking.spots.monitor" },
    { label: "变压器监控", icon: "bianyaqi", scheme: "device.electric-supply.monitor.voltage-transformer" },
    { label: "进线柜监控", icon: "jinxiangui", scheme: "device.electric-supply.monitor.incoming-cabinet" },
    { label: "馈线柜监控", icon: "kuixiangui", scheme: "device.electric-supply.monitor.feeder-cabinet" },
    { label: "电容补偿柜监控", icon: "dianrongbuchanggui", scheme: "device.electric-supply.monitor.capacitance-compensation-cabinet" },
    { label: "联络柜监控", icon: "lianluogui", scheme: "device.electric-supply.monitor.bus-tie-cabinet" },
    { label: "柴发监控", icon: "chaidian", scheme: "device.electric-supply.monitor.diesel-power-generator" },
    { label: "光伏监控", icon: "guangfu", scheme: "device.electric-supply.monitor.pv-power-generator" },
    { label: "生活水泵监控", icon: "shenghuoshuibeng", scheme: "device.water-supply.monitor.domestic-pump" },
    { label: "中水水泵监控", icon: "zhongshuishuibeng", scheme: "device.water-supply.monitor.peclaimed-pump" },
    { label: "消防管网水泵监控", icon: "xiaofangshuibeng", scheme: "device.water-supply.monitor.fire-service-pump" },
    { label: "电梯监控", icon: "dianti", scheme: "device.elevator.monitor.base" },
    { label: "新风监控", icon: "xinfeng", scheme: "device.air-purification.monitor.base" },
    { label: "空调风机监控", icon: "kogntiaofengji", scheme: "device.air-conditioning.monitor.base" },
    { label: "监控探头", icon: "qiangji", scheme: "device.camera.video.base" },
    { label: "态势监控探头", icon: "taishiqiangji", scheme: "device.camera.video.recognition" },
    { label: "红外对射", icon: "zhoujie", scheme: "device.boundary.sentry.infrared" },
    { label: "监控对射", icon: "jiankongduishe", scheme: "device.boundary.sentry.camera" },
]

export const areaSchemes = [
    { label: "区域", scheme: "building.region" },
    { label: "楼", scheme: "building.tower" },
    { label: "设备间", scheme: "building.machine-room" },
    { label: "停车场", scheme: "building.car-parking" },
]

export const systems = [
    {
        icon: "iconanfang",
        label: "智能安防卡口",
        categories: [
            // 门禁
            "device.gate-ac.footway.base",
            // 闸机
            "device.gate-ac.footway.gate",

        ]
    },
    {
        icon: "iconanfang",
        label: "智能访客系统",
        categories: [
            // 访客对讲
            "device.gate-ac.footway.intercom",
        ]
    },
    {
        icon: "icondaozha",
        label: "智能停车道闸",
        categories: [
            // 道闸
            "device.gate-ac.motorway.base",
            // 车位监控
            "device.car-parking.spots.monitor",
        ]
    },
    {
        icon: "iconzhoujie",
        label: "智能周界系统",
        categories: [
            // 红外对射
            "device.boundary.sentry.infrared",
            // 监控对射
            "device.boundary.sentry.camera",
        ]
    },
    {
        icon: "iconqiangji",
        label: "智能监控系统",
        categories: [
            // 监控探头
            "device.camera.video.base",
            // 态势监控探头
            "device.camera.video.recognition"
        ]
    }
]