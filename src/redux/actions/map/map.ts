import { IDevice } from "models/map";

export const STORE_MAP_LOAD_STATUS = "STORE_MAP_LOAD_STATUS";
export const STORE_MAP_FOCUS_DEVICE = "STORE_MAP_FOCUS_DEVICE";
export const CLEAR_MAP_FOCUS_DEVICE = "CLEAR_MAP_FOCUS_DEVICE";

export function storeMapLoadStatus(status: boolean) {
    return { type: STORE_MAP_LOAD_STATUS, status }
}

export function storeMapFocusDevice(device: IDevice) {
    return { type: STORE_MAP_FOCUS_DEVICE, device }
}

export function clearMapFocusDevice() {
    return { type: CLEAR_MAP_FOCUS_DEVICE }
}