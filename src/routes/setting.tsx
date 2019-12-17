import React from "react";

import { RoutesType, ComponentProps } from "./index";
import Setting from "../pages/setting";

const routes: RoutesType[] = [
    {
        title: "設定",
        id: 40001,
        path: "/setting",
        prevId: null,
        component: Setting
    }
];

export default routes;