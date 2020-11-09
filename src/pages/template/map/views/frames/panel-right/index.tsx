import React from "react";
import { connect } from "react-redux";
import { IPanelRight } from "models/map";
import styles from "./index.module.css";

interface IProps {

}

interface StateProps {
    panelRight: IPanelRight;
}

interface DispatchProps {

}

class PanelRightSmall extends React.Component<IProps & StateProps & DispatchProps> {
    public render() {
        const { panelRight } = this.props;

        const isExpanded = panelRight.isExpanded;
        const content = panelRight.content;
        const size = panelRight.size || "small";

        let containerStyle: any = {};

        size === "small" && (containerStyle = { height: "480px", top: "100px" });
        size === "middle" && (containerStyle = { height: "670px", top: "100px" });
        size === "big" && (containerStyle = { height: "960px", top: "100px" });

        return <div className={isExpanded ? styles.containerExpanded : styles.container} style={containerStyle}>
            <div className={styles.lightLine}></div>
            {content}
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelRight: state.panelRight
        }
    },
    () => {
        return {}
    }
)(PanelRightSmall)