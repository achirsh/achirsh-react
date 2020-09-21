import * as Action from "redux/actions"

const { STORE_ACTIVE_SITUATION, CLEAR_ACTIVE_SITUATION } = Action.Situation;

export function activeSituation(state = null, action: any) {
    switch (action.type) {
        case STORE_ACTIVE_SITUATION:
            return action.situation
        case CLEAR_ACTIVE_SITUATION:
            return null
        default:
            return state
    }
}