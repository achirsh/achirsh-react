import React from "react";
import { connect } from "react-redux";
import * as Action from "redux/actions"
import styles from './index.module.css';
import { 
    IPanelDevice,
    IArea 
} from "models/map";
import * as Panel from "../../panel";
import { BaseMap } from "utils/map";

const {
    storePanelRootAreaExpanded, 
    storePanelAreaExpanded,
    controlPanelDevice,
    storePanelSystemFilterExpanded,
    storeActiveRootArea
} = {
    ...Action.Panel,
    ...Action.Area
}

interface IProps {
    
}

interface StateProps {
    panelRootAreaExpanded: boolean;
    activeRootArea: IArea;
}

interface DispatchProps {
    storePanelRootAreaExpanded: (isExpanded: boolean) => void;
    storePanelAreaExpanded: (isExpanded: boolean) => void;
    controlPanelDevice: (panel: IPanelDevice) => void;
    storePanelSystemFilterExpanded: (isExpanded: boolean) => void;   
    storeActiveRootArea: (area: IArea) => void; 
}

const rootAreas = [
    {
        id: 1,
        label: '门禁',
        address: '地址',
        scheme: "device.gate-ac.footway.base",
        coordinates: [116.405178,39.950156]
    },
    {
        id: 2,
        label: '人行闸机',
        address: '地址',
        scheme: "device.gate-ac.footway.gate",
        coordinates: [116.406895,39.950156]
    }
]

class RootAreaSelector extends React.Component<IProps & StateProps & DispatchProps> {
    public async componentWillReceiveProps(nxtProps: IProps & StateProps & DispatchProps) {
        if (!nxtProps.panelRootAreaExpanded) {
            BaseMap.clear();
        }
    }

    public async onChangeRootArea(rootArea: any) {
        // 清空地图
        await BaseMap.clear();
        // 存储根级区域信息
        //this.props.storePanelRootAreaExpanded(false);
        // 定位地图范围
        // await  BaseMap.setBounds([116.319665, 39.855919], [116.468324,39.9756]);
        BaseMap.drawMarker(rootArea)
    }

    public render() {
        const { panelRootAreaExpanded, activeRootArea } = this.props;
        return <div className={styles.container}>
            <div 
                className={panelRootAreaExpanded ? styles.textWrapperActive : styles.textWrapper}
                onClick={async () => {
                    if (panelRootAreaExpanded) {
                        this.props.storePanelRootAreaExpanded(false);
                    } else {
                        this.props.storePanelAreaExpanded(false);
                        this.props.controlPanelDevice({ isExpanded: false });
                        this.props.storePanelSystemFilterExpanded(false);
                        this.props.storePanelRootAreaExpanded(true);
                    }
                }}
            >
                <i className="el-icon-setting" style={{ fontSize: panelRootAreaExpanded ? 0 : '14px' }}></i>
            </div>
            <Panel.Pop isExpanded={panelRootAreaExpanded} height={488}>
                <div className={styles.panelContainer}>
                    {
                        rootAreas.map((rootArea: any) => {
                            const actived = rootArea.id === activeRootArea.id;
                            return <div
                                key={rootArea.id}
                                className={actived ? styles.rootAreaActived : styles.rootArea}
                                onClick={() => this.onChangeRootArea(rootArea)}
                            >
                                <span className={styles.thumbnail}>
                                    <img src={require("static/imgs/panel/root-area-default.png")} alt="thumbnail" />
                                </span>
                                <div className={styles.info}>
                                    <div className={styles.label}>{rootArea.label}</div>
                                    <div className={styles.address}>
                                        <i className="el-icon-setting" style={{ fontSize: '12px' }}></i>
                                        <span>{rootArea.address}</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </Panel.Pop>
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            activeRootArea: state.activeRootArea,
            panelRootAreaExpanded: state.panelRootAreaExpanded,
        }
    },
    (dispatch) => {
        return {
            storeActiveRootArea: (area: IArea) => dispatch(storeActiveRootArea(area)),
            storePanelRootAreaExpanded: (isExpanded: boolean) => dispatch(storePanelRootAreaExpanded(isExpanded)),
            storePanelAreaExpanded: (isExpanded: boolean) => dispatch(storePanelAreaExpanded(isExpanded)),
            controlPanelDevice: (panel: IPanelDevice) => dispatch(controlPanelDevice(panel)),
            storePanelSystemFilterExpanded: (isExpanded: boolean) => dispatch(storePanelSystemFilterExpanded(isExpanded)),
        }
    }
)(RootAreaSelector)