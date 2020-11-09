import React from "react"
import { Table, Layout } from "element-react"
import { read, utils } from 'xlsx';
import styles from './index.module.css'
import { ChartLine, ChartMix } from 'components'

/* list of supported file types */
const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function (x) {
    return "." + x;
  }).join(",");

function getTime() {
    let times = []
    for (let i = 1; i <= 31; i++) {
        times.push('8-' + i)
    }
    return times
}

export default class extends React.Component<{}, {}> {
    public state = {
        jsonData: [],
        columns: [
            {
                label: "月份",
                prop: "month",
              },
            {
              label: "客流量",
              prop: "traffic",
            },
            {
              label: "消费的顾客",
              prop: "consumerCustomers"
            },
            {
                label: "销售额",
                prop: "sales"
            },
            {
                label: "成交笔数",
                prop: "numTransactions"
            },
            {
                label: "总面积",
                prop: "area",
            },
            {
                label: "客单价(元/人)",
                prop: "perTicketSales",
                render: (row: any) => {
                    return <div>{row.perTicketSales.toFixed(2)}</div>
                }
            },
            {
                label: "转化率",
                prop: "inversionRate",render: (row: any) => {
                    return <div>{row.inversionRate.toFixed(2)}</div>
                }
            },
            {
                label: "坪效(元/m2)",
                prop: "levelGroundEffect",
                render: (row: any) => {
                    return <div>{row.levelGroundEffect.toFixed(2)}</div>
                }
            },
            {
                label: "提袋率",
                prop: "bagRate",
                render: (row: any) => {
                    return <div>{row.bagRate.toFixed(2)}</div>
                }
            }
        ],
    }

    public onLoadFile = (e: { target: { files: any; }; }) => {
        const files = e.target.files;

        if (files && files[0]) this.handleFile(files[0]);
    }

    public handleFile = (file: any/*:File*/) => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        let wb;//读取完成的数据
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ jsonData: data })
        };
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    }

    // 折线图
    public lineStack() {
        return <ChartLine.Stack
            xData={getTime()}
            legendShow={true}
            yAxisStyle={{
                font: 12
            }}
            xAxisStyle={{
                font: 12
            }}
            yData={
                [
                    {
                        lineColor: ["rgba(51, 200, 253, 1)", "rgba(51, 200, 253, 1)"],
                        data: [60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000],
                        name: '进人数'
                    },
                    {
                        lineColor: ["rgba(223, 254, 129, 1)", "rgba(223, 254, 129, 1)"],
                        data: [61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 21000, 11000, 61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 21000, 11000, 61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 20000, 10000, 60000],
                        name: '销售额'
                    }
                ]
            } />
    }

    // 混合柱图
    public mixLineBar() {
        return <ChartMix.LineBar
            xData={getTime()}
            yAxis={[{}, {}]}
            legendShow={true}
            yAxisStyle={{
                font: 12
            }}
            xAxisStyle={{
                font: 12
            }}
            lineSeries={[
                {
                    legend: "进人数",
                    color: ["green", "green"],
                    data: [60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000, 70000, 50000, 50000, 40000, 30000, 50000, 60000, 20000, 10000, 60000],
                }
            ]}
            barSeries={[
                {
                    legend: "销售额",
                    color: ["rgba(51, 200, 253, 1)", "rgba(51, 200, 253, 1)"],
                    data: [61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 21000, 11000, 61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 21000, 11000, 61000, 71000, 51000, 51000, 41000, 31000, 51000, 61000, 20000, 10000, 60000],
                }
            ]}
        />
    }


    public render() {
        const { jsonData } = this.state
        return <div className={styles.container}>
            <Layout.Row type="flex" justify="center">
                <input type="file" onChange={this.onLoadFile} accept={SheetJSFT}/>
            </Layout.Row>
            <Layout.Row style={{ 
                marginTop: "20px", display: "flex", flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    marginBottom: "10px"
                }}>ZARA店铺月度数据分析</div>
                <Table
                    style={{ width: '70%' }}
                    columns={this.state.columns}
                    data={this.state.jsonData}
                />
            </Layout.Row>
            {/* <Layout.Row style={{ 
                marginTop: "20px", display: "flex", flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{ width: "400px", height: "400px", backgroundColor: "#02043f" }}>
                    {this.lineStack()}
                </div>
            </Layout.Row> */}
            <Layout.Row style={{ 
                marginTop: "20px", display: "flex", flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{ width: "600px", height: "400px", backgroundColor: "#02043f" }}>
                    {this.mixLineBar()}
                </div>
            </Layout.Row>
        </div>
    }
}