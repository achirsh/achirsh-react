import * as React from "react";
import * as echarts from "echarts";



interface yAxisConfig {
    color: any,
    data: number[]
    unit?: string,                   // 坐标单位
}


export default class extends React.Component<{
    legend: any,
    seriesName?: string
    xData: string[] | number[],
    yData: yAxisConfig,
    legendFont?: any,
    itemStyle?: any,
    interval?: any,
    rotate?: any,
    margin?: any,
    xAxisFont?: any,
    yAxisFont?: any
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
        const { yData, xData, interval, rotate, margin, xAxisFont, yAxisFont } = this.props;
        let xAxis = {};
        let yAxis = {};
        let series: any[] = [];
        // let echartsLegend = {};
        const supportData: number[] = [0];
        xAxis = {
            type: 'category',
            data: xData,
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: interval ? interval : 0,
                rotate: rotate ? rotate: 0, // x轴label旋转角度
                lineHeight: 12,
                margin: margin && margin.xAxis ? margin.xAxis : 8,
                textStyle: {
                    color: '#3BB7FF',// x轴value值颜色
                    fontSize: xAxisFont ? xAxisFont : 8,
                    fontFamily: 'Helvetica-Bold,Helvetica'
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(16, 35, 158, 0.5)',//左边线的颜色
                    width: '0' //坐标线的宽度
                }
            }
        };
        yAxis = {
            name: "",
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: yData.unit ? `{value}${yData.unit}` : `{value}`,
                lineHeight: 12,
                margin: margin && margin.yAxis ? margin.yAxis : 8,
                textStyle: {
                    color: '#3BB7FF', // y轴value值颜色
                    fontSize: yAxisFont ? yAxisFont : 8,
                    fontFamily: 'Helvetica-Bold,Helvetica'
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(16, 35, 158, 0.5)"
                }
            },
            axisTick: {
                show: false
            }
        }
        let total: number = yData.data[0];
        // eslint-disable-next-line array-callback-return
        yData.data.map((o, oIn) => {
            if (oIn > 0) {
                supportData[oIn] = total - o
                total = total - o;
            }
        })
        series[0] = {
            name: "support",
            type: "bar",
            stack: "total",
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            barWidth: 20,
            data: supportData
        };
        series[1] = {
            name: this.props.seriesName || "example",
            type: "bar",
            stack: "total",
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: yData.color[0] },
                        { offset: 1, color: yData.color[1] },
                    ]
                )
            },
            barWidth: 20,
            data: yData.data
        }

        const option = {
            xAxis,
            yAxis,
            grid: {
                left: 10,
                right: 10,
                bottom: 10,
                containLabel: true,
            },
            series
        };
        console.log(option)
        this.chart.setOption(option);

    }


    public render() {
        const { legend } = this.props;
        return <div ref={this.containerRef} style={{ height: "100%", position: "relative" }}>
            <div style={{ position: "absolute", right: "0", top: "30px" }}>
                {legend.name.map((item: any, index: any) => {
                    return <div style={{ display: "inline-block", marginRight: 10 }} key={index}>
                        <div style={{ height: 4, width: 4, background: `${legend.color[index]}`, 
                        borderRadius: "50%", display: "inline-block", marginRight: 5, 
                        position: "relative", bottom: 1 }} />
                        <span style={{ 
                            display: 'inline-block',
                            fontSize: '12px', 
                            color: "rgba(255,255,255,0.4)",
                            transform: 'scale(0.83, 0.83)',
                            WebkitTransform: 'scale(0.83, 0.83)',
                            msTransform: 'scale(0.83, 0.83)'
                        }}>{item}</span>
                    </div>
                })}
            </div>
            <div ref={this.chartRef} style={{ height: "100%" }} />
        </div>
    }
}