import { IArea } from "models/map";

export const STORE_AREAS = "STORE_AREAS";
export const STORE_ACTIVE_AREAS = "STORE_ACTIVE_AREAS";
export const STORE_ROOT_AREAS = "STORE_ROOT_AREAS";
export const STORE_ACTIVE_ROOT_AREA = "STORE_ACTIVE_ROOT_AREA";

export function storeAreas(areas: IArea[]) {
    return { type: STORE_AREAS, areas }
}

export function storeActiveAreas(areas: IArea[]) {
    return { type: STORE_ACTIVE_AREAS, areas }
}

export function storeRootAreas(rootAreas: IArea[]) {
    return { type: STORE_ROOT_AREAS, rootAreas }
}

export function storeActiveRootArea(activeRootArea: IArea) {
    return { type: STORE_ACTIVE_ROOT_AREA, activeRootArea }
}