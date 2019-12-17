import React from "react";

import { RoutesType, ComponentProps } from "./index";
import Store from "../pages/store";

const routes: RoutesType[] = [
    {
        title: "ストア",
        id: 30001,
        path: "/store",
        prevId: null,
        component: Store
    }
];

export default routes;