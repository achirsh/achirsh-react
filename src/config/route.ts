import HomePage from "pages/home";

// template
import ChartPage from "pages/template/echarts"
import MapPage from "pages/template/map"

const defaultRoutes = [
    { path: "/", component: HomePage }
];

const templateRoutes = [
    { path: "/template/chart", component: ChartPage },
    { path: "/template/map", component: MapPage }
]

export const routes = [
    ...defaultRoutes,
    ...templateRoutes
];