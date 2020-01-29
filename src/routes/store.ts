import { RoutesType } from "./index";
import Store from "../pages/store/Store";
import StoreDetail from "../pages/store/StoreDetail";

const routes: RoutesType[] = [
    {
        title: "ストア",
        id: 30001,
        path: "/store",
        prevId: null,
        component: Store
    },
        {
            title: "ストア詳細",
            id: 30002,
            path: "/store/:storeId",
            prevId: 30001,
            component: StoreDetail
        }
];

export default routes;