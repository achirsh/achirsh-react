import { deviceSchemes } from "config";
import { Position } from "models/map";

let mapInstance: any;
let mapObjs: any[] = [];

export const BaseMap = {
    setBaseMapInstance: (map: any) => mapInstance = map,
    getBaseMapInstance: () => mapInstance,
    setCenter: (coordinates: number[]) => {
        mapInstance.setCenter(coordinates)
    },
    setZoom: (zoom: number) => {
        mapInstance.setZoom(zoom);
    },
    setCoordinatesFitView: (coordinates: number[][] | undefined) => {  // 设置显示的范围区域(坐标点)
        const markers = (coordinates || []).map(x => new (window as any).AMap.Marker({
            position: x
        }));

        mapInstance.setFitVIew(markers, false, [0, 0, 0, 0], 18);
    },
    setOverlayFitView: (objs: any[]) => {
        mapInstance.setFitView(objs, false, [0, 0, 0, 0], 18);
    },
    setBounds: (sw: number[], ne: number[]) => {   // 设置遮挡物左上角坐标
        const bounds = new (window as any).AMap.Bounds(sw, ne);
        mapInstance.setBounds(bounds);
    },
    drawPolygon: (coordinates: number[][] | undefined) => {
        const polygon = new (window as any).AMap.Polygon({
            path: coordinates,
            strokeColor: "#1F55FE",
            strokeWeight: 4,
            fillColor: "#3983E2",
            fillOpacity: 0.4,
            strokeStyle: "dashed"
        });

        mapInstance.add(polygon);

        return polygon;
    },
    drawPolyline: (coordinates: number[][]) => {  // 画多边形
        const polyline = new (window as any).AMap.Polyline({
            path: coordinates,
            strokeColor: "#1F55FE",
            strokeWeight: 4,
            fillColor: "#3983E2",
            fillOpacity: 0.4,
            strokeStyle: "dashed"
        })

        mapInstance.add(polyline);

        return polyline;
    },
    drawMarker: (device: any) => {
        const deviceScheme = deviceSchemes.find(x => x.scheme === device.scheme);

        if (deviceScheme) {
            const content = `
                <div class='map-marker'>
                    <img src='${require("static/imgs/map/" + deviceScheme.icon + "-default.png")}' />
                </div>
            `;

            const marker = new (window as any).AMap.Marker({
                content,
                position: device.coordinates,
                offset: new (window as any).AMap.Pixel(-20, -95)
            });

            mapInstance.add(marker)
            MapObjs.add(marker);

            return marker._amap_id;
        } else {
            return null;
        }
    },
    setMarkerState: (device: any, state: "default" | "active" | "focus" | "warning") => {
        const mapObjId = device.mapObjId;
        const deviceScheme = deviceSchemes.find(x => x.scheme === device.scheme);
  
        if (mapObjId && deviceScheme) {
            const marker = MapObjs.get(mapObjId);
            if (marker) {
                let content: string = "";
                if (state === "active" || state === "warning") {
                    content = `
                        <div class='map-marker'>
                            <img src='${require("static/imgs/map/" + deviceScheme.icon + "-" + state + ".png")}' />
                        </div>
                    `
                } else if (state === "focus") {
                    content = `
                        <div class='map-marker focus'>
                            <img src='${require("static/imgs/map/" + deviceScheme.icon + "-active.png")}' />
                        </div>
                    `
                } else {
                    content = `
                        <div class='map-marker'>
                            <img src='${require("static/imgs/map/" + deviceScheme.icon + "-default.png")}' />
                        </div>
                    `
                }
                marker.setContent(content);
            }
        }
    },
    setMarkerClickDefault: (device: any) => {
        const marker = MapObjs.get(device.mapObjId);

        if (marker) {
            marker.on("click", () => {

            })
        }
    },
    showAll: () => {
        mapObjs.forEach(obj => obj.show());
    },
    remove: (objs: any[]) => {
        mapInstance.remove(objs);
    },
    clear: () => {
        mapInstance.clearMap();
    }
}

export const MapObjs = {
    add: (obj: any): number => {
        const id = obj._amap_id;

        if (id) {
            mapObjs = mapObjs.concat([obj]);
        }

        return id;
    },
    get: (objId: number | undefined) => {
        return mapObjs.find(x => x._amap_id === objId)
    },
    remove: (objId: number | undefined) => {
        mapObjs = mapObjs.filter(x => x._amap_id !== objId);  
    },
    reset: () => {
        mapObjs = [];
    }
}

export function calcMinCoordinate(coordinates: number[][]): Position {
    let minPosition: any;

    coordinates.forEach(coordinate => {
        if (!(minPosition instanceof Array)) {
            minPosition = coordinate;
        } else {
            if (coordinate[0] <= minPosition[0] && coordinate[1] <= minPosition[1]) {
                minPosition = coordinate;
            }
        }
    })

    return minPosition;
}

export function calcMaxCoordinate(coordinates: number[][]): Position {
    let maxPosition: any;

    coordinates.forEach(coordinate => {
        if (!(maxPosition instanceof Array)) {
            maxPosition = coordinate;
        } else {
            if (coordinate[0] >= maxPosition[0] && coordinate[1] >= maxPosition[1]) {
                maxPosition = coordinate;
            }
        }
    })

    return maxPosition;
}