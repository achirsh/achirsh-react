import * as React from "react";
import * as echarts from "echarts";

export default class extends React.Component<{
    xData: any[],
    min: number,
    max: number
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
        this.draw()
    }

    public componentDidUpdate() {
        this.draw()
    }

    public draw() {
        let { xData, min, max } = this.props;
        const option = {

            series: [
                {
                    name: '',
                    type: 'gauge',
                    min: min || 0,
                    max: max || 100,
                    detail: {
                        formatter: '{value}',
                        offsetCenter: [0, '95%'],
                        fontSize: 17,
                        color: 'rgba(195, 229, 249, 1)'
                    },
                    data: xData,
                    title: {  //标题
                        offsetCenter: [0, '70%'],
                        fontSize: 12,
                        color: 'rgba(195, 229, 249, 0.7)'
                    },
                    axisTick: { // 坐标轴小标记
                        show: false
                    },
                    axisLine: {
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.25, 'rgba(29, 152, 255, 1)'],//根据实际数据动态改变  
                                [0.75, 'rgba(9, 109, 217, 1)'],    
                                [1, 'rgba(114, 46, 209, 1)'],

                            ],
                            width: 10, //仪表盘宽度
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 0  //仪表盘的边框
                        }
                    },
                    splitLine: {
                        length: 10, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: 'transparent', //分割线
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 0
                        }
                    },
                }
            ]
        };

        this.chart.setOption(option);
    }

    public render() {
        return (
            <div ref={this.containerRef} style={{ height: "100%" }}>
                <div ref={this.chartRef} style={{ height: "100%" }} />
            </div>
        );
    }
}
