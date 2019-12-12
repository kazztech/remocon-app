import React from "react";

import { routesType, ComponentProps } from "./index";
import Edit from "../pages/edit";
import RemoconList from "../pages/edit/RemoconList";
import RemoconDetail from "../pages/edit/RemoconDetail";
import RemoconUpdateInput from "../pages/edit/RemoconUpdateInput";

const routes: routesType[] = [
    {
        title: "編集",
        id: 20001,
        path: "/edit",
        prevId: null,
        component: Edit
    },
    {
        title: "リモコン編集",
        id: 20002,
        path: "/edit/remocons",
        prevId: 20001,
        component: RemoconList
    },
    {
        title: "リモコン詳細",
        id: 20003,
        path: "/edit/remocons/:remocon_id",
        prevId: 20002,
        component: RemoconDetail
    },
    {
        title: "リモコン更新",
        id: 20004,
        path: "/edit/remocons/:remocon_id/update/input",
        prevId: 20003,
        component: RemoconUpdateInput
    }
];

export default routes;