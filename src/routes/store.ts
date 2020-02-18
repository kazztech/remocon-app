import { RoutesType } from "./index";

import Store from "../pages/store/Store";
import StoreDetail from "../pages/store/StoreDetail";
import UploadSelect from "../pages/store/UploadSelect";
import UploadInput from "../pages/store/UploadInput";
import UploadConfirm from "../pages/store/UploadConfirm";
import UploadComplete from "../pages/store/UploadComplete";

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
  },
  //
  {
    title: "アップロード",
    id: 31001,
    path: "/store/upload/select",
    prevId: 30001,
    component: UploadSelect
  },
  {
    title: "投稿内容入力",
    id: 31002,
    path: "/store/upload/:remoconId/input",
    prevId: 31001,
    component: UploadInput
  },
  {
    title: "投稿内容確認",
    id: 31003,
    path: "/store/upload/:remoconId/confirm",
    prevId: null,
    component: UploadConfirm
  },
  {
    title: "送信",
    id: 31004,
    path: "/store/upload/:remoconId/complete",
    prevId: null,
    component: UploadComplete
  }
];

export default routes;
