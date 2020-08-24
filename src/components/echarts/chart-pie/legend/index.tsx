import * as React from "react";
import * as echarts from "echarts";
import { SeriesItem } from "../index";
import styles from "../index.module.css";
import { number } from "prop-types";

interface bStyle {
    font: number,
    line: number
}

export default class extends React.Component<{ 
    colors: string[]; 
    series: SeriesItem[]; 
    name: string,
    bStyle?: bStyle,
    cStyle?: bStyle,
    lengendStyle?: any
}, {}> {
    private containerRef: any;
    private chartRef: any;
    private chart: any;

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.chartRef = React.createRef();
    }
    
    public componentDidMount() {
        this.chart = echarts.init(this.chartRef.current);
        this.draw();
    }

    public componentDidUpdate() {
        this.draw();
    }

    public draw() {
        const { colors = [], series = [], name, bStyle, cStyle } = this.props;
        const option = {
            series: [
                {
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '50%'],
                    label: {
                        normal: {
                            position: 'center',
                            formatter: '{c|{c}}\n{b|{b}}',
                            rich: {
                                b: {
                                    color: "rgba(255, 255, 255, .6)",
                                    fontSize: bStyle && bStyle.font ? bStyle.font : 14,
                                    lineHeight: bStyle && bStyle.line ? bStyle.line : 44,
                                },
                                c: {
                                    color: "#C3E5F9",
                                    fontWeight: 600,
                                    fontSize: cStyle && cStyle.font ? cStyle.font : 23,
                                    lineHeight: cStyle && cStyle.line ? cStyle.line : 28,
                                },
                            },
                        }
                    },
                    data: [{
                        name,
                        value: series.reduce((a, b) => a + b.value, 0),
                        itemStyle: {
                            color: "transparent",
                        },
                    }],
                },
                {
                    type:'pie',
                    radius: ['66%', '74%'],
                    label: {
                        show: false,
                    },
                    data: series.map((o: any, idx) => {
                        o["itemStyle"] = {
                            color: colors[idx],
                        }
                        return o;
                    }),
                }
            ]
        };

        this.chart.setOption(option);
    }

    public render() {
        return <div ref={this.containerRef} style={{height: "100%"}}>
            <div style={{display: "inline-block", verticalAlign: "top", height: "100%", width: "50%"}} >
                <div ref={this.chartRef} style={{height: "100%"}} />
            </div>
            <div style={{display: "inline-block", height: "100%", verticalAlign: "top", width: "50%", position: "relative", marginLeft: '-36px'}} >
                {this.renderLegend()}
            </div>
        </div>
    }

    private renderLegend = () => {
        const { colors = [], series = [], lengendStyle } = this.props;
        const total = series.reduce((a, b) => a + b.value, 0);
        return <div  className={styles.legendContainer} >
            <table>
                <tbody>
                    {series.map((o, idx) => <tr key={idx} className={styles.legend} style={{ 
                        lineHeight: lengendStyle && lengendStyle.line ? lengendStyle.line : '17px', 
                        fontSize: lengendStyle && lengendStyle.font ? lengendStyle.font : '12px' 
                    }}>
                        <td>
                            <span className={styles.legendMarker} style={{background: colors[idx]}} />
                        </td>
                        <td>
                            <span className={styles.legendName} >{o.name}</span>
                        </td>
                        {/* <td>
                            <span className={styles.legendPercent}>{(o.value > 0 ? o.value / total * 100 : 0).toFixed(2)}%</span>
                        </td> */}
                        <td>{o.value}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>;
    }
}
