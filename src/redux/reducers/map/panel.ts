import * as Action from "redux/actions"

const {
    STORE_PANEL_ROOT_AREA_EXPANDED,
    STORE_PANEL_SYSTEM_FILTER_EXPANDED,
    STORE_PANEL_AREA_EXPANED,
    CONTROL_PANEL_BOTTOM,
    CONTROL_PANEL_RIGHT,
    CONTROL_PANEL_DEVICE,
    CONTROL_PANEL_DEVICE_SECONDARY,
    CONTROL_PANEL_CENTER
} = Action.Panel;

export function panelRootAreaExpanded(state = false, action: any) {
    switch (action.type) {
        case STORE_PANEL_ROOT_AREA_EXPANDED:
            return action.isExpanded;
        default:
            return state;
    }
}

export function panelAreaExpanded(state = false, action: any) {
    switch (action.type) {
        case STORE_PANEL_AREA_EXPANED:
            return action.isExpanded;
        default:
            return state;
    }
}

export function panelSystemFilterExpanded(state = false, action: any) {
    switch (action.type) {
        case STORE_PANEL_SYSTEM_FILTER_EXPANDED:
            return action.isExpanded;
        default:
            return state;
    }
}

export function panelBottom(state = { isExpanded: false, content: undefined }, action: any) {
    switch (action.type) {
        case CONTROL_PANEL_BOTTOM:
            return action.panel;
        default:
            return state;
    }
}

export function panelRight(state = { isExpanded: false, content: undefined }, action: any) {
    switch (action.type) {
        case CONTROL_PANEL_RIGHT:
            return action.panel;
        default:
            return state;
    }
}

export function panelDevice(state = { isExpanded: false, content: undefined }, action: any) {
    switch (action.type) {
        case CONTROL_PANEL_DEVICE:
            return action.panel;
        default:
            return state;
    }
}

export function panelDeviceSecondary(state = { isExpanded: false, content: undefined }, action: any) {
    switch (action.type) {
        case CONTROL_PANEL_DEVICE_SECONDARY:
            return action.panel;
        default:
            return state;
    }
}

export function panelCenter(state = { isExpanded: false, content: undefined }, action: any) {
    switch (action.type) {
        case CONTROL_PANEL_CENTER:
            return action.panel
        default:
            return state;
    }
}