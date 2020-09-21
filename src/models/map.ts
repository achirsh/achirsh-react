import React from "react";
import { Thing } from "things";

// 点
export type Position = [number, number];
export type PanelType =
    "access-monitor" // 人行/车行卡口出入监控
    | "video-monitor" // 智能视频态势监控
    | "security-warning-monitor" // 安防紧急告警监控
    | "gas-monitor" // 水泵/泡沫/气体监控
    | "emergency-monitor" // 喷淋/排烟/应急状态监控
    | "fire-warning-monitor" // 消防紧急告警监控
    | "energy-supply-monitor" // 供配电/给排水监控
    | "energy-device-monitor" // 电梯/新风/空调设备状态监控
    | "energy-data-monitor" // 智能能源数据监控
    | "system-status-monitor" // 系统状态监控
    | "patrol-status-monitor" // 巡更/巡检状态监控
    | "ops-event-monitor" // 运维事件监控

export type SystemsListType = "list" | "block";

// 区域
export interface IArea extends Thing {
    mapObjId?: number; // 地图对应实例id
}

// 设备
export interface IDevice extends Thing {
    mapObjId?: number;
}

// 态势
export interface ISituation {
    label: string;
    icon?: string;
    panels: PanelType[];
}

// 系统
export interface ISystem {
    icon?: string;
    label?: string;
    categories: string[];
}

// 底部面板
export interface IPanelBottom {
    isExpanded: boolean;
    content?: React.ReactNode | React.ReactNode[] | undefined;
    segment?: number;
}

// 右侧面板
export interface IPanelRight {
    isExpanded: boolean;
    content?: React.ReactNode | undefined;
    size?: "small" | "middle" | "big";
}

// 设备面板
export interface IPanelDevice {
    isExpanded: boolean;
    keepMapView?: boolean;
    // deviceId?: string;
    content?: React.ReactNode | undefined;
    iconType?: string;
}

// 设备二级面板
export interface IPanelDeviceSecondary {
    isExpanded: boolean;
    content?: React.ReactNode | undefined;
}

// 屏幕中央面板
export interface IPanelCenter {
    isExpanded: boolean;
    content?: React.ReactNode | undefined;
}