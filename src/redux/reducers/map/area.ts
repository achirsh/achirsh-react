import * as Action from "redux/actions"

const { STORE_AREAS, STORE_ACTIVE_AREAS, STORE_ROOT_AREAS, STORE_ACTIVE_ROOT_AREA } = Action.Area;

export function areas(state = [], action: any) {
    switch (action.type) {
        case STORE_AREAS:
            return action.areas;
        default:
            return state;
    }
}

export function activeAreas(state = [], action: any) {
    switch (action.type) {
        case STORE_ACTIVE_AREAS:
            return action.areas;
        default:
            return state;
    }
}

export function rootAreas(state = [], action: any) {
    switch (action.type) {
        case STORE_ROOT_AREAS:
            return action.rootAreas;
        default:
            return state;
    }
}

export function activeRootArea(state = {}, action: any) {
    switch (action.type) {
        case STORE_ACTIVE_ROOT_AREA:
            return action.activeRootArea;
        default:
            return state;
    }
}