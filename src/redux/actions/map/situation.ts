export const STORE_ACTIVE_SITUATION = "STORE_ACTIVE_SITUATION";
export const CLEAR_ACTIVE_SITUATION = "CLEAR_ACTIVE_SITUATION";

export function storeActiveSituation(situation: any) {
    return { type: STORE_ACTIVE_SITUATION, situation }
}

export function clearActiveSituation() {
    return { type: CLEAR_ACTIVE_SITUATION }
}