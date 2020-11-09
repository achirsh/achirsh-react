import React from "react";
import styles from "./index.module.css";

interface IProps {
    isExpanded?: boolean;
    height?: number;
    width?: number;
    position?: "top" | "bottom" | "middle";
}

class Pop extends React.Component<IProps> {
    public render() {
        const { isExpanded = false, height = 488, width = 290, position = "top" } = this.props;

        let popStyle: any = {
            height: isExpanded ? `${height}px` : 0,
            width: isExpanded ? `${width}px`: 0,
        }

        position === "top" && (popStyle = { top: 0, ...popStyle })
        position === "bottom" && (popStyle = { bottom: 0, ...popStyle})
        position === "middle" && (popStyle = { bottom: "-160px", ...popStyle })

        return <div
            className={isExpanded ? styles.containerActive : styles.container}
            style={popStyle}
        >
            <div className={styles.content}>
                {this.props.children}
            </div>
        </div>
    }
}

export default Pop;