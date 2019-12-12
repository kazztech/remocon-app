import React from "react";

import { routesType, ComponentProps } from "./index";
import Store from "../pages/store";

const routes: routesType[] = [
    {
        title: "ストア",
        id: 30001,
        path: "/store",
        prevId: null,
        component: Store
    }
];

export default routes;