import React from "react";

import { routesType, ComponentProps } from "./index";
import Controller from "../pages/controller";

const routes: routesType[] = [
    {
        title: "リモコン",
        id: 10001,
        path: "/controller",
        prevId: null,
        component: Controller
    }
];

export default routes;