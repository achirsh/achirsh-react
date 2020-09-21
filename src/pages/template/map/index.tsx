import React from 'react'
import { connect } from 'react-redux'
import { Map } from "components"
import { BaseMap } from "utils/map"
import { Header } from "./views"
import { PanelBottom, PanelRight, PanelCenter, DrawMarker, PanelDevice, AreaSelector, SystemFilter } from "./views/frames"
import { IPanelBottom, ISystem } from "models/map"; 
import styles from "./index.module.css"
import { systems } from 'config';
import * as Action from "redux/actions"

const { storeMapLoadStatus }  = Action.Map;

interface IState {

}

interface StateProps {
    panelBottom: IPanelBottom;
    mapLoaded: boolean;
}

interface DispathProps {
    storeMapLoadStatus: (status: boolean) => void;
}

class MapPage extends React.Component<{} & DispathProps & StateProps, IState> {
    private evtSrc!: EventSource;
    public onMapCreated = async (mapInstance: any) => {
        BaseMap.setBaseMapInstance(mapInstance);
        await this.props.storeMapLoadStatus(true);
    }

    public subscribeLogs = async () => {

    }

    public render() {
        const { panelBottom } = this.props;
        const { isExpanded } = panelBottom;
        console.log(isExpanded)
        return <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.map}>
                <Map 
                    onCreated={this.onMapCreated}
                    mapOptions={{
                        viewMode: '2D',
                        dragEnable: true,
                        zoomEnable: true,
                        scrollWheel: true,
                        zoom: 19,
                        center: [116.405178,39.950156]
                    }}
                />
            </div>
            <div className={styles.rootArea}>
                <DrawMarker />
            </div>
            <div className={isExpanded ? styles.devicePanelMoved : styles.devicePanel}>
                <PanelDevice />
            </div>
            <div className={isExpanded ? styles.areaMoved : styles.area}>
                <AreaSelector />
            </div>
            <div className={isExpanded ? styles.systemFilterMoved : styles.systemFilter}>
                <SystemFilter />
            </div>
            <PanelBottom />
            <PanelRight />
            <PanelCenter />
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelBottom: state.panelBottom,
            mapLoaded: state.mapLoaded,
        }   
    },
    (dispatch) => {
        return {
            storeMapLoadStatus: (status: boolean) => dispatch(storeMapLoadStatus(status)),
        }
    }
)(MapPage)