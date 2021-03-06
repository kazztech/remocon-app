import { RouteComponentProps } from "react-router";

import controllerRoutes from "./remocons";
import editRoutes from "./edit";
import storeRoutes from "./store";
import settingRoutes from "./batches";
import NotFound from "../pages/NotFound";

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps {}

export type RoutesType = Readonly<{
  title: string;
  id: number;
  path: string;
  prevId: number | null;
  component: React.FC<any>;
}>;

export const routes: RoutesType[] = [
  ...controllerRoutes,
  ...editRoutes,
  ...storeRoutes,
  ...settingRoutes,
  // WARNING: NotFoundは必ず最後
  {
    title: "404",
    id: 99999,
    path: "*",
    prevId: null,
    component: NotFound
  }
];

// idからrouteを取得
export function routeFindById(id: number | null): RoutesType {
  const route = routes.find(v => v.id === id);
  if (typeof route !== "undefined") {
    return route;
  } else {
    return routes[routes.length - 1];
  }
}

// idからトップレベルページを取得
export function getRootPageById(id: number): number {
  return Math.floor(id / 10000) * 10000 + 1;
}

// pathパラメータの同期
export function pathAndParamsMatch(
  prevPath: string,
  currentPath: string
): string {
  let pathBuildWork: string[] = [];
  prevPath.split("/").map((hierarchy, index) => {
    if (hierarchy.indexOf(":") === 0) {
      pathBuildWork.push(currentPath.split("/")[index]);
    } else {
      pathBuildWork.push(hierarchy);
    }
  });
  const resultPath = pathBuildWork.join("/");
  return resultPath;
}
