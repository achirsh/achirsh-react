import React from "react";
import { PanelType } from "models/map";
import * as Wrapper from "./wrapper"
export { Wrapper }

interface IProps {
    panelType: PanelType;
    expand: Wrapper.expandState;
    onExpand: (expand: Wrapper.expandState) => void;
}

export class FeaturePanel extends React.Component<IProps> {
    public render() {
        const { panelType, expand, onExpand } = this.props;

        if (panelType === "video-monitor") {
            return null
        } else if (panelType === "access-monitor") {
            return null
        } else if (panelType === "security-warning-monitor") {
            return null
        } else if (panelType === 'energy-supply-monitor') {
            return null
        } else {
            return null;
        }
    }
}