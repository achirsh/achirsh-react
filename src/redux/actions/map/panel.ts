// import { IPanelBottom, IPanelRight, IPanelDevice, IPanelDeviceSecondary, IPanelCenter } from "models";

export const STORE_PANEL_ROOT_AREA_EXPANDED = "STORE_PANEL_ROOT_AREA_EXPANDED";
export const STORE_PANEL_AREA_EXPANED = "STORE_PANEL_AREA_EXPANED";
export const STORE_PANEL_SYSTEM_FILTER_EXPANDED = "STORE_PANEL_SYSTEM_FILTER_EXPANDED";
export const CONTROL_PANEL_BOTTOM = "CONTROL_PANEL_BOTTOM";
export const CONTROL_PANEL_RIGHT = "CONTROL_PANEL_RIGHT";
export const CONTROL_PANEL_CENTER = "CONTROL_PANEL_CENTER";
export const CONTROL_PANEL_DEVICE = "CONTROL_PANEL_DEVICE";
export const CONTROL_PANEL_DEVICE_SECONDARY = "CONTROL_PANEL_DEVICE_SECONDARY";

export function storePanelRootAreaExpanded(isExpanded: boolean) {
    return { type: STORE_PANEL_ROOT_AREA_EXPANDED, isExpanded }
}

export function storePanelAreaExpanded(isExpanded: boolean) {
    return { type: STORE_PANEL_AREA_EXPANED, isExpanded }
}

export function storePanelSystemFilterExpanded(isExpanded: boolean) {
    return { type: STORE_PANEL_SYSTEM_FILTER_EXPANDED, isExpanded }
}

export function controlPanelBottom(panel: any) {
    return { type: CONTROL_PANEL_BOTTOM, panel }
}

export function controlPanelRight(panel: any) {
    return { type: CONTROL_PANEL_RIGHT, panel }
}

export function controlPanelCenter(panel: any) {
    return { type: CONTROL_PANEL_CENTER, panel }
}

export function controlPanelDevice(panel: any) {
    return { type: CONTROL_PANEL_DEVICE, panel }
}

export function controlPanelDeviceSecondary(panel: any) {
    return { type: CONTROL_PANEL_DEVICE_SECONDARY, panel }
}