import React from "react";

import { routesType, ComponentProps } from "./index";
import Edit from "../pages/edit";
import RemoconList from "../pages/edit/RemoconList";
import RemoconDetail from "../pages/edit/RemoconDetail";
import RemoconCreateInput from "../pages/edit/RemoconCreateInput";
import RemoconUpdateInput from "../pages/edit/RemoconUpdateInput";
import RemoconUpdateConfirm from "../pages/edit/RemoconUpdateConfirm";
import RemoconUpdateComplete from "../pages/edit/RemoconUpdateComplete";


const routes: routesType[] = [
    {
        title: "編集",
        id: 20001,
        path: "/edit",
        prevId: null,
        component: Edit
    },
        {
            title: "リモコン一覧",
            id: 21001,
            path: "/edit/remocons",
            prevId: 20001,
            component: RemoconList
        },
            {
                title: "リモコン作成",
                id: 21101,
                path: "/edit/remocons/create/input",
                prevId: 21001,
                component: RemoconCreateInput
            },
            {
                title: "リモコン詳細",
                id: 21002,
                path: "/edit/remocons/:remoconId",
                prevId: 21001,
                component: RemoconDetail
            },
                {
                    title: "リモコン更新",
                    id: 21201,
                    path: "/edit/remocons/:remoconId/update/input",
                    prevId: 21002,
                    component: RemoconUpdateInput
                },
                {
                    title: "リモコン更新",
                    id: 21202,
                    path: "/edit/remocons/:remoconId/update/confirm",
                    prevId: null,
                    component: RemoconUpdateConfirm
                },
                {
                    title: "リモコン更新",
                    id: 21203,
                    path: "/edit/remocons/:remoconId/update/complete",
                    prevId: null,
                    component: RemoconUpdateComplete
                },
        {
            title: "一括送信一覧",
            id: 22001,
            path: "/edit/batches",
            prevId: 20001,
            component: RemoconList
        }
];

export default routes;