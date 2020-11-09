import * as Action from "redux/actions"

const { STORE_MAP_LOAD_STATUS, STORE_MAP_FOCUS_DEVICE, CLEAR_MAP_FOCUS_DEVICE } = Action.Map;

export function mapLoaded(state = false, action: any) {
    switch (action.type) {
        case STORE_MAP_LOAD_STATUS:
            return action.status;
        default:
            return state;
    }
}

export function mapFocusDevice(state = null, action: any) {
    switch (action.type) {
        case STORE_MAP_FOCUS_DEVICE:
            return action.device;
        case CLEAR_MAP_FOCUS_DEVICE:
            return null;
        default:
            return state;
    }
}