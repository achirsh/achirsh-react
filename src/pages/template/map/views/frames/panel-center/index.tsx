import React from "react";
import { connect } from "react-redux";
import { IPanelCenter } from "models/map";
import styles from "./index.module.css";

interface IProps {

}

interface StateProps {
    panelCenter: IPanelCenter
}

interface DispatchProps {

}

class PanelCenter extends React.Component<IProps & StateProps & DispatchProps> {
    public render() {
        const { panelCenter } = this.props;

        const { isExpanded, content } = panelCenter;

        return <div className={isExpanded ? styles.container : styles.containerExpanded}>
            { content }
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelCenter: state.panelCenter
        }
    },
    (dispatch) => {
        return {

        }
    }
)(PanelCenter);