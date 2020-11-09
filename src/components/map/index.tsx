import React from 'react';
import { Map as AMap } from 'react-amap';
import { AMAP_KEY, AMAP_VERSION, AMAP_MAPSTYLE } from 'config'

interface IProps {
    onCreated?: (instance: any) => void;
    mapOptions?: {
        viewMode?: any,            // 地图显示模式，2D/3D
        dragEnable?: boolean,      // 地图是否可通过鼠标拖拽平移
        zoom?: number,             // 地图显示的缩放级别
        rotation?: any,            // 地图顺时针旋转角度，取值范围[0-360]， 2D地图
        zooms?: any,               // 地图显示的缩放级别范围，在pc上，默认为[3,18], 取值范围[3-18]，移动[3,19]
        rotateEnable?: boolean,    // 地图是否可旋转，3D视图默认为true，2D视图默认是false
        resizeEnable?: boolean,    // 是否监控地图容器尺寸变化
        expandZoomRange?: boolean, // 是否支持可以扩展最大缩放级别，和zooms属性配合使用，
        zoomEnable?: boolean,      // 地图是否可以缩放
        doubleClickZoom?: boolean, // 地图是否可以通过双击鼠标放大地图
        scrollWheel?: boolean,     // 地图是否可以通过鼠标滚轮缩放浏览
        pitch?: any,               // 仰视角度， 3D
        center?: any,

        touchZoom?: boolean,       // 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false
        touchZoomCenter?: boolean, // 当touchZoomCenter=1的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心

        lang?: String,           // 地图语言类型，zh_cn：中文简体，en：英文，zh_en：中英文对照
        labelzIndex?: number,    // 地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物(圆、折线、面)之上
        defaultCursor?: String,  // 地图默认鼠标样式
        crs?: String,            // 地图显示的参考坐标系EPSG3857  EPSG3395  EPSG4326
        isHotspot?: boolean,     // 是否开启地图热点和标注的hover效果，pc端默认是true，移动端默认是false

    }
}

interface IState {
    preLoading?: boolean;
}

export default class extends React.Component<IProps, IState> {
    public mapEvts = {
        created: (mapInstance: any) => {
            this.props.onCreated && this.props.onCreated(mapInstance)
        }
    }

    public render() {
        const { mapOptions } = this.props
        return <div style={{ width: "100%", height: "100%" }}>
            <AMap 
                amapkey={AMAP_KEY}
                mapStyle={AMAP_MAPSTYLE}
                version={AMAP_VERSION}
                center={mapOptions && mapOptions.center}
                events={this.mapEvts}
                viewMode={(mapOptions && mapOptions.viewMode) || "3D"}
                dragEnable={(mapOptions && mapOptions.dragEnable) || false}
                animateEnable={true}
                keyboardEnable={false}
                scrollWheel={(mapOptions && mapOptions.scrollWheel) || false}
                zoomEnable={(mapOptions && mapOptions.zoomEnable) || false}
                rotateEnable={(mapOptions && mapOptions.rotateEnable) || false}
                resizeEnable={(mapOptions && mapOptions.resizeEnable) || false}
                expandZoomRange={(mapOptions && mapOptions.expandZoomRange) || false}
                doubleClickZoom={(mapOptions && mapOptions.doubleClickZoom) || false}
                pitch={(mapOptions && mapOptions.pitch) || 0}
                rotation={(mapOptions && mapOptions.rotation) || 0}
                zoom={(mapOptions && mapOptions.zoom) || 19}
                zooms={(mapOptions && mapOptions.zooms) || [10, 20]}
            />
        </div>
    }
}