import React from "react";
import { connect } from "react-redux";
import * as Panel from "../../panel";
import * as Action from "redux/actions"
import styles from "./index.module.css";
import { IPanelDevice } from "models/map";

const {
    storePanelRootAreaExpanded, 
    storePanelAreaExpanded,
    controlPanelDevice,
    storePanelSystemFilterExpanded
} = Action.Panel;

interface IProps {

}

interface StateProps {
    panelSystemFilterExpanded: boolean;
}

interface DispatchProps {
    storePanelRootAreaExpanded: (isExpanded: boolean) => void;
    storePanelAreaExpanded: (isExpanded: boolean) => void;
    controlPanelDevice: (panel: IPanelDevice) => void;
    storePanelSystemFilterExpanded: (isExpanded: boolean) => void;
}

class SystemFilter extends React.Component<IProps & StateProps & DispatchProps> {
    public render() {
        const { panelSystemFilterExpanded } = this.props;
        return <div className={styles.container}>
            <div 
                className={panelSystemFilterExpanded ? styles.thumbnailActive : styles.thumbnail}
                onClick={() => {
                    if (panelSystemFilterExpanded) {
                        this.props.storePanelSystemFilterExpanded(false);
                    } else {
                        this.props.storePanelAreaExpanded(false);
                        this.props.controlPanelDevice({ isExpanded: false });
                        this.props.storePanelRootAreaExpanded(false);
                        this.props.storePanelSystemFilterExpanded(true);
                    }
                }}
            >
                <i className="el-icon-setting" style={{ fontSize: panelSystemFilterExpanded ? 0 : '14px' }}></i>
            </div>
            <Panel.Pop isExpanded={panelSystemFilterExpanded} position="bottom" height={488}>

            </Panel.Pop>
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelSystemFilterExpanded: state.panelSystemFilterExpanded
        }
    },
    (dispatch) => {
        return {
            storePanelSystemFilterExpanded: (isExpanded: boolean) => dispatch(storePanelSystemFilterExpanded(isExpanded)),
            storePanelRootAreaExpanded: (isExpanded: boolean) => dispatch(storePanelRootAreaExpanded(isExpanded)),
            storePanelAreaExpanded: (isExpanded: boolean) => dispatch(storePanelAreaExpanded(isExpanded)),
            controlPanelDevice: (panel: IPanelDevice) => dispatch(controlPanelDevice(panel)),
        }
    }   
)(SystemFilter)