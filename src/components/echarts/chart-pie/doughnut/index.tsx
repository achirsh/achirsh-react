import * as React from "react";
import * as echarts from "echarts";
import { SeriesItem } from "../index";

export default class extends React.Component<{ 
    colors: string[]; 
    series: SeriesItem[]; 
    interval?: number;
    textStyle?: any;
    richStyle?: any;
    formatter?: string;
    per_oneStyle?: any
}, {}> {

    private containerRef: any;
    private chartRef: any;
    private chart: any;

    private timeoutIndex: any;
    private markIndex = 0;

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.chartRef = React.createRef();
    }
    
    public componentDidMount() {
        this.chart = echarts.init(this.chartRef.current);
        this.startDraw();
    }

    public componentDidUpdate() {
        this.startDraw();
    }

    public componentWillUnmount() {
        clearInterval(this.timeoutIndex);
    }

    public loop = () => {
        this.timeoutIndex = setTimeout(() => this.startDraw(), this.props.interval || 3000);
    }

    public startDraw = () => {
        clearTimeout(this.timeoutIndex);
        this.draw();
        this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.markIndex,
        })
        let markIndex = 0;
        if (this.props.series[this.markIndex + 1]) {
            markIndex = this.markIndex + 1;
        }
        this.markIndex = markIndex;
        this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.markIndex,
        });
        this.loop();
    }

    public draw() {
        const { series = [], colors = [], textStyle, richStyle, formatter, per_oneStyle } = this.props;

        const option = {
            series: [
                {
                    type:'pie',
                    radius: ["68%", '74%'],
                    avoidLabelOverlap: false,
                    hoverOffset: 3,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            formatter: formatter ? formatter : '{per|{d}%}\n{b|{b}}',
                            position: "center",
                            textStyle: {
                                lineHeight: textStyle && textStyle.line ? textStyle.line : 20,
                                fontSize: textStyle && textStyle.font ? textStyle.font : 12,
                                color: "rgba(255, 255, 255, .6)",
                                padding: [10, 0, 0, 0],
                            },
                            rich: {
                                per: {
                                    lineHeight: richStyle && richStyle.line ? richStyle.line : 30,
                                    fontWeight: 600,
                                    fontSize: richStyle && richStyle.font ? richStyle.font : 14,
                                    color: "#C3E5F9",
                                },
                                per_one: {
                                    lineHeight: per_oneStyle && per_oneStyle.line ? per_oneStyle.line : 14,
                                    fontWeight: 500,
                                    fontSize: per_oneStyle && per_oneStyle.font ? per_oneStyle.font : 14,
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontFamily: 'GenShinGothic-Monospace-Regular',
                                    padding: per_oneStyle && per_oneStyle.padding ? per_oneStyle.padding : [0, 0, 0, 0]
                                }
                            },
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: series.map((o: any, idx) => {
                        if (colors[idx]) {
                            o["itemStyle"] = {
                                color: colors[idx],
                            };
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
            <div ref={this.chartRef} style={{height: "100%"}} />
        </div>
    }
}