import React from "react";
import { connect } from "react-redux";
import { IArea, IPanelDevice } from "models/map";
import * as Action from "redux/actions"
import * as Panel from "../../panel";
import styles from "./index.module.css";

const {
    storePanelRootAreaExpanded, 
    storePanelAreaExpanded,
    controlPanelDevice,
    storePanelSystemFilterExpanded,
    storeActiveAreas
} = {
    ...Action.Panel,
    ...Action.Area
};

interface IProps {

}

interface StateProps {
    panelAreaExpanded: boolean;
    activeAreas: IArea[];
}

interface DispatchProps {
    storePanelRootAreaExpanded: (isExpanded: boolean) => void;
    storePanelAreaExpanded: (isExpanded: boolean) => void;
    controlPanelDevice: (panel: IPanelDevice) => void;
    storePanelSystemFilterExpanded: (isExpanded: boolean) => void;
    storeActiveAreas: (areas: IArea[]) => void;
}

interface IState {

}

class AreaSelector extends React.Component<IProps & StateProps & DispatchProps, IState> {
    public componentWillReceiveProps(nxtProps: IProps & StateProps & DispatchProps) {
        if (this.props.panelAreaExpanded && !nxtProps.panelAreaExpanded) {

        }
    }

    public onClickArea(area: any) {
        
    }

    public resetToRootView() {

    }

    public render() {
        const { panelAreaExpanded } = this.props;
        return <div className={styles.container}>
            <div
                className={panelAreaExpanded ? styles.thumbnailActive : styles.thumbnail}
                onClick={() => {
                    if (panelAreaExpanded) {
                        this.props.storePanelAreaExpanded(false);
                    } else {
                        this.props.controlPanelDevice({ isExpanded: false });
                        this.props.storePanelSystemFilterExpanded(false);
                        this.props.storePanelRootAreaExpanded(false);
                        this.props.storePanelAreaExpanded(true);
                    }
                }}
            >
                <i className="el-icon-setting" style={{
                    fontSize: panelAreaExpanded ? 0 : '14px'
                }}></i>
            </div>
            <Panel.Pop isExpanded={panelAreaExpanded} position="bottom" height={488}>

            </Panel.Pop>
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelAreaExpanded: state.panelAreaExpanded,
            activeAreas: state.activeAreas,
        }
    },
    (dispatch) => {
        return {
            storePanelRootAreaExpanded: (isExpanded: boolean) => dispatch(storePanelRootAreaExpanded(isExpanded)),
            storePanelAreaExpanded: (isExpanded: boolean) => dispatch(storePanelAreaExpanded(isExpanded)),
            controlPanelDevice: (panel: IPanelDevice) => dispatch(controlPanelDevice(panel)),
            storePanelSystemFilterExpanded: (isExpanded: boolean) => dispatch(storePanelSystemFilterExpanded(isExpanded)),
            storeActiveAreas: (areas: IArea[]) => dispatch(storeActiveAreas(areas)),
        }
    }
)(AreaSelector);