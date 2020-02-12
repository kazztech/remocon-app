import { RoutesType } from "./index";
import Edit from "../pages/edit";
import EditRemoconList from "../pages/edit/RemoconList";
import EditRemoconDetail from "../pages/edit/RemoconDetail";

import EditRemoconCreateInput from "../pages/edit/RemoconCreateInput";
import EditRemoconCreateConfirm from "../pages/edit/RemoconCreateConfirm";
import EditRemoconCreateComplete from "../pages/edit/RemoconCreateComplete";
import EditRemoconUpdateInput from "../pages/edit/RemoconUpdateInput";
import EditRemoconUpdateConfirm from "../pages/edit/RemoconUpdateConfirm";
import EditRemoconUpdateComplete from "../pages/edit/RemoconUpdateComplete";
import EditRemoconDeleteConfirm from "../pages/edit/RemoconDeleteConfirm";
import EditRemoconDeleteComplete from "../pages/edit/RemoconDeleteComplete";

import EditWidgetCreateInput from "../pages/edit/WidgetCreateInput";
import EditWidgetCreateConfirm from "../pages/edit/WidgetCreateConfirm";
import EditWidgetCreateComplete from "../pages/edit/WidgetCreateComplete";
import EditWidgetUpdateInput from "../pages/edit/WidgetUpdateInput";
import EditWidgetUpdateConfirm from "../pages/edit/WidgetUpdateConfirm";
import EditWidgetUpdateComplete from "../pages/edit/WidgetUpdateComplete";
import EditWidgetDeleteConfirm from "../pages/edit/WidgetDeleteConfirm";
import EditWidgetDeleteComplete from "../pages/edit/WidgetDeleteComplete";

import EditBatchList from "../pages/edit/BatchList";
import EditBatchDetail from "../pages/edit/BatchDetail";
import EditBatchCreateInput from "../pages/edit/BatchCreateInput";
import EditBatchCreateConfirm from "../pages/edit/BatchCreateConfirm";
import EditBatchCreateComplete from "../pages/edit/BatchCreateComplete";
import EditBatchDeleteConfirm from "../pages/edit/BatchDeleteConfirm";
import EditBatchDeleteComplete from "../pages/edit/BatchDeleteComplete";

import BatchAddRemoconSelect from "../pages/edit/BatchAddRemoconSelect";
import EditBatchAddWidgetSelect from "../pages/edit/BatchAddWidgetSelect";

const routes: RoutesType[] = [
  {
    title: "編集",
    id: 20001,
    path: "/edit",
    prevId: null,
    component: Edit
  },
  //
  {
    title: "リモコン一覧",
    id: 21001,
    path: "/edit/remocons",
    prevId: 20001,
    component: EditRemoconList
  },
  //
  {
    title: "リモコン作成",
    id: 21101,
    path: "/edit/remocons/create/input",
    prevId: 21001,
    component: EditRemoconCreateInput
  },
  {
    title: "リモコン作成",
    id: 21102,
    path: "/edit/remocons/create/confirm",
    prevId: null,
    component: EditRemoconCreateConfirm
  },
  {
    title: "リモコン作成",
    id: 21103,
    path: "/edit/remocons/create/complete",
    prevId: null,
    component: EditRemoconCreateComplete
  },
  //
  {
    title: "リモコン詳細",
    id: 21002,
    path: "/edit/remocons/:remoconId",
    prevId: 21001,
    component: EditRemoconDetail
  },
  //
  {
    title: "リモコン更新",
    id: 21201,
    path: "/edit/remocons/:remoconId/update/input",
    prevId: 21002,
    component: EditRemoconUpdateInput
  },
  {
    title: "リモコン更新",
    id: 21202,
    path: "/edit/remocons/:remoconId/update/confirm",
    prevId: null,
    component: EditRemoconUpdateConfirm
  },
  {
    title: "リモコン更新",
    id: 21203,
    path: "/edit/remocons/:remoconId/update/complete",
    prevId: null,
    component: EditRemoconUpdateComplete
  },
  //
  {
    title: "リモコン削除",
    id: 21301,
    path: "/edit/remocons/:remoconId/delete/confirm",
    prevId: 21002,
    component: EditRemoconDeleteConfirm
  },
  {
    title: "リモコン削除",
    id: 21302,
    path: "/edit/remocons/:remoconId/delete/complete",
    prevId: null,
    component: EditRemoconDeleteComplete
  },
  //
  {
    title: "ウィジェット作成",
    id: 21401,
    path: "/edit/remocons/:remoconId/widgets/create/input",
    prevId: 21002,
    component: EditWidgetCreateInput
  },
  {
    title: "ウィジェット作成",
    id: 21402,
    path: "/edit/remocons/:remoconId/widgets/create/confirm",
    prevId: null,
    component: EditWidgetCreateConfirm
  },
  {
    title: "ウィジェット作成",
    id: 21403,
    path: "/edit/remocons/:remoconId/widgets/create/complete",
    prevId: null,
    component: EditWidgetCreateComplete
  },
  //
  {
    title: "ウィジェット更新",
    id: 21501,
    path: "/edit/remocons/:remoconId/widgets/:widgetId/update/input",
    prevId: 21002,
    component: EditWidgetUpdateInput
  },
  {
    title: "ウィジェット更新",
    id: 21502,
    path: "/edit/remocons/:remoconId/widgets/:widgetId/update/confirm",
    prevId: null,
    component: EditWidgetUpdateConfirm
  },
  {
    title: "ウィジェット更新",
    id: 21503,
    path: "/edit/remocons/:remoconId/widgets/:widgetId/update/complete",
    prevId: null,
    component: EditWidgetUpdateComplete
  },
  //
  {
    title: "ウィジェット削除",
    id: 21601,
    path: "/edit/remocons/:remoconId/widgets/:widgetId/delete/confirm",
    prevId: null,
    component: EditWidgetDeleteConfirm
  },
  {
    title: "ウィジェット削除",
    id: 21602,
    path: "/edit/remocons/:remoconId/widgets/:widgetId/delete/complete",
    prevId: null,
    component: EditWidgetDeleteComplete
  },
  //
  {
    title: "一括操作一覧",
    id: 22001,
    path: "/edit/batches",
    prevId: 20001,
    component: EditBatchList
  },
  //
  {
    title: "一括操作詳細",
    id: 22002,
    path: "/edit/batches/:batchId",
    prevId: 22001,
    component: EditBatchDetail
  },
  //
  {
    title: "一括操作新規",
    id: 22101,
    path: "/edit/batches/create/input",
    prevId: 22001,
    component: EditBatchCreateInput
  },
  {
    title: "一括操作新規",
    id: 22102,
    path: "/edit/batches/create/confirm",
    prevId: null,
    component: EditBatchCreateConfirm
  },
  {
    title: "一括操作新規",
    id: 22103,
    path: "/edit/batches/create/complete",
    prevId: null,
    component: EditBatchCreateComplete
  },
  //
  {
    title: "操作追加",
    id: 22201,
    path: "/edit/batches/:batchId/add/select",
    prevId: 22002,
    component: BatchAddRemoconSelect
  },
  {
    title: "操作追加",
    id: 22202,
    path: "/edit/batches/:batchId/add/select/:remoconId",
    prevId: 22201,
    component: EditBatchAddWidgetSelect
  },
  //
  {
    title: "一括操作削除",
    id: 22301,
    path: "/edit/batches/:batchId/delete/confirm",
    prevId: 22002,
    component: EditBatchDeleteConfirm
  },
  {
    title: "一括操作削除",
    id: 22302,
    path: "/edit/batches/:batchId/delete/complete",
    prevId: null,
    component: EditBatchDeleteComplete
  }
];

export default routes;
