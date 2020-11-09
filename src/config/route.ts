import HomePage from "pages/home";

// template
import ChartPage from "pages/template/echarts"
import MapPage from "pages/template/map"
import ExcelToJson from "pages/template/excelToJson"
import HookPage from "pages/template/hook"

const defaultRoutes = [
    { path: "/", component: HomePage }
];

const templateRoutes = [
    { path: "/template/chart", component: ChartPage },
    { path: "/template/map", component: MapPage },
    { path: "/template/exceltojson", component: ExcelToJson },
]

export const routes = [
    ...defaultRoutes,
    ...templateRoutes
];