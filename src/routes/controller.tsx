import React from "react";

import { RoutesType, ComponentProps } from "./index";
import Controller from "../pages/controller";

const routes: RoutesType[] = [
    {
        title: "リモコン",
        id: 10001,
        path: "/controller",
        prevId: null,
        component: Controller
    }
];

export default routes;