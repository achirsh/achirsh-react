import * as React from "react";
import * as echarts from "echarts";



interface yAxisConfig {
    color: [string, string],
    data: number[]
    unit?: string,                   // 坐标单位
}


export default class extends React.Component<{
    legend: { name: [string, string], color: [string, string] }
    seriesName?: string
    xData: string[] | number[],
    yData: yAxisConfig,
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
        const { yData, xData } = this.props;
        let xAxis = {};
        let yAxis = {};
        let series: any[] = [];
        const supportData: number[] = [0];
        xAxis = {
            type: 'category',
            data: xData,
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.4)',//坐标值得具体的颜色
                    fontSize: 8
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(89,99,120,0.4)',//左边线的颜色
                    width: '0'//坐标线的宽度
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
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.4)',//坐标值得具体的颜色
                    fontSize: 8
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(89,99,120,0.15)"
                }
            },
            axisTick: {
                show: false
            }
        }
        let total: number = yData.data[0];
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
        // let echartsLegend={};
        //     echartsLegend={
        //             show:true,
        //             data:legend.map(item=>{
        //                 return {
        //                     name:item,
        //                     icon:"circle",
        //                 }
        //             }),
        //             // backgroundColor:yData.color[0],
        //             right:"1%",
        //             top:"13%"
        //     }
        const option = {
            // legend:echartsLegend ,
            xAxis,
            yAxis,
            grid: {
                left: '0',
                right: '0',
                bottom: '0',
                containLabel: true,
            },
            series
        };
        this.chart.setOption(option);

    }


    public render() {
        const { legend } = this.props;
        return <div ref={this.containerRef} style={{ height: "100%", position: "relative" }}>
            <div style={{ position: "absolute", right: "15px", top: "30px" }}>
                {legend.name.map((item, index) => {
                    return <div style={{ display: "inline-block", marginRight: 10 }} key={index}>
                        <div style={{ height: 4, width: 4, background: `${legend.color[index]}`, 
                        borderRadius: "50%", display: "inline-block", marginRight: 5, 
                        position: "relative", bottom: 1 }} />
                        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{item}</span>
                    </div>
                })}
            </div>
            <div ref={this.chartRef} style={{ height: "100%" }} />
        </div>
    }
}