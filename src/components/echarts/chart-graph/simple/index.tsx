/**
 * 关系图  
 */

import * as React from "react";
import * as echarts from "echarts";

export default class extends React.Component<any, {}> {
    private containerRef: any;
    private chartRef: any;
    private chart: any;

    public state = {
        
    }

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

    // edgeSymbol 边两端的标记类型
    // edgeSymbolSize 边两端的标记大小
    // symbolSize 关系图节点标记的大小，
    // focusNodeAdjacency 是否在鼠标移动到节点上的时候突出显示节点以及节点的边和邻接节点
    /**
     *  data: [
     *      name: '1',
     *      x: 10,
     *      y: 10,
     *      value: 10
     *  ]
     *  x, y要设置边界
     */

    /**
     *  links: [{
     *      source: 'n1',
     *      target: 'n2'
     *  }]
     * 
     *  source： 源节点名称
     *  target： 目标节点名称
     */


    public draw() {
        const option = {
            series: [
                {
                    top:0,
					left:0,
					right:0,
					bottom:1,
                    type: 'graph',
                    edgeSymbol: ['none', 'arrow'],
                    edgeSymbolSize: 0,
                    symbolSize: 5,
                    focusNodeAdjacency: true,
                    tooltip: {
                    },
                    z: 3,
                    data: this.props.GraphData,
                    links: this.props.GraphLink,
                    lineStyle: {
						normal: {
							color: 'source',
							opacity: 1,
							curveness: 0.8
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
