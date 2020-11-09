import { IDevice } from "models/map";

export const STORE_DEVICES = "STORE_DEVICES";

export function storeDevices(devices: IDevice[]) {
    return { type: STORE_DEVICES, devices }
}