import * as Action from "redux/actions"

const { STORE_DEVICES } = Action.Device;

export function devices(state = [], action: any) {
    switch (action.type) {
        case STORE_DEVICES:
            return action.devices;
        default:
            return state;
    }
}