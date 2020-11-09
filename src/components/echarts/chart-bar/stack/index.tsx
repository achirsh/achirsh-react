import * as React from "react";
import * as echarts from "echarts";

interface SeriesConfig {
    legend?: string;
    data: number[];                            
    areaColor: [string, string];
}
export default class extends React.Component<{
    xData: string[];
    yData: SeriesConfig[],
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
        const { xData = [], yData } = this.props;
        const option = {
            xAxis: {
                type: 'category',
                data: xData,
                axisTick:{
                    show:false,     
                },
                axisLabel:{
                    rotate: 45,
                    align: "right",
                    // interval: 0,
                    lineHeight: 12,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: 8
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(89,99,120,0.4)',
                        width: '0'
                    }
                }
            },
            yAxis: {
                type: "value",
                min: 0,
                minInterval: 1,
                axisLine:{
                    show:false
                },
                axisLabel: {
                    lineHeight: 12,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.4)',//坐标值得具体的颜色
                        fontSize: 8
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:"rgba(89,99,120,0.15)"
                    }
                },
                axisTick:{
                    show:false
                }
            },
            grid: {
                left: 5,
                top: 25,
                right: 20,
                bottom: 0,
                containLabel: true
            },
            legend: {
                data: yData.map(o => o.legend).map(item=>{
                    return {
                        name:item,
                        icon:"circle",
                    }
                }),
                itemWidth:4,
                itemHeight:4,
                textStyle:{
                    fontSize:10,
                    fontWeight:400,
                    color:"rgba(255,255,255,0.4)"
    
                },
                right: 10,
                top: 0,
            },
            series: yData.map(o => ({
                name: o.legend,
                type: 'bar',
                stack:  'one',
                barMaxWidth: 20,
                itemStyle: !o.areaColor ? undefined : {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {
                                offset: 0,
                                color: o.areaColor[0],
                            }, {
                                offset: 1,
                                color: o.areaColor[1],
                            }
                        ]
                    ),
                },
                data: o.data,
            })),
        };

        this.chart.setOption(option);
    }

    public render() {
        return <div ref={this.containerRef} style={{height: "100%"}}>
            <div ref={this.chartRef} style={{height: "100%"}} />
        </div>
    }
}