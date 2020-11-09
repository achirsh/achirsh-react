import React from 'react';
import { connect } from 'react-redux';
import * as Action from "redux/actions"
import { IPanelDevice } from "models/map";
import styles from "./index.module.css";
import * as Panel from "../../panel";

const {
    storePanelRootAreaExpanded, 
    storePanelAreaExpanded,
    controlPanelDevice,
    storePanelSystemFilterExpanded
} = Action.Panel;

interface IProps {

}

interface StateProps {
    panelDevice: IPanelDevice;
}

interface DispatchProps {
    storePanelRootAreaExpanded: (isExpanded: boolean) => void;
    storePanelAreaExpanded: (isExpanded: boolean) => void;
    controlPanelDevice: (panel: IPanelDevice) => void;
    storePanelSystemFilterExpanded: (isExpanded: boolean) => void;
}

class PanelDevice extends React.Component<IProps & StateProps & DispatchProps> {
    public render() {
        const { panelDevice } = this.props;
        const { isExpanded } = panelDevice;
        return <div className={styles.container}>
            <div
                className={isExpanded ? styles.thumbnailActive : styles.thumbnail}
                onClick={() => {
                    if (isExpanded) {
                        this.props.controlPanelDevice({ isExpanded: false });
                    } else {
                        this.props.storePanelAreaExpanded(false);
                        this.props.storePanelSystemFilterExpanded(false);
                        this.props.storePanelRootAreaExpanded(false);
                        this.props.controlPanelDevice({ isExpanded: true });
                    }
                }}
            >
                <i className="el-icon-setting" style={{ fontSize: isExpanded ? 0 : '14px' }}></i>
            </div>
            <Panel.Pop height={590} isExpanded={isExpanded} position="middle">
                
            </Panel.Pop>
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelDevice: state.panelDevice,
        }
    },
    (dispatch) => {
        return {
            storePanelRootAreaExpanded: (isExpanded: boolean) => dispatch(storePanelRootAreaExpanded(isExpanded)),
            storePanelAreaExpanded: (isExpanded: boolean) => dispatch(storePanelAreaExpanded(isExpanded)),
            controlPanelDevice: (panel: IPanelDevice) => dispatch(controlPanelDevice(panel)),
            storePanelSystemFilterExpanded: (isExpanded: boolean) => dispatch(storePanelSystemFilterExpanded(isExpanded))
        }
    }
)(PanelDevice);