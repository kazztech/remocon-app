import { RoutesType } from "./index";
import BatchesController from "../pages/batches/Controller";

const routes: RoutesType[] = [
    {
        title: "一括操作",
        id: 40001,
        path: "/batch",
        prevId: null,
        component: BatchesController
    }
];

export default routes;