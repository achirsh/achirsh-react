import HomePage from "pages/home";

// template
import ChartPage from "pages/template/echarts"
import MapPage from "pages/template/map"
import HookPage from "pages/template/hook"

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