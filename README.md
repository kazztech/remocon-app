# remocon-app



## API Repository

https://github.com/kazztech/remocon-api

## 構成

https://drive.google.com/file/d/1sjYKWqKJRJGPbpeE1U271uKUpQ4lbI4J/view

## Demo

https://www.youtube.com/watch?v=mBWabLToe5k

- デモ動画で紹介していない機能
   - リモコンストア機能
      - ユーザーがリモコンをアップロード/ダウンロードできる機能。リモコンを登録する前にリモコンストアで型番などを検索し、ヒットしたらそのままダウンロードして利用可能。もしなければ、自分でリモコンを作成し、それをアップロードすると他のユーザーが今後ダウンロードできるようになる。
      
## デバイスの画像

https://drive.google.com/file/d/118Z4_eudS2LpqLq6pOOb8YjYKrHX4rKZ/view

## 今後

1. 機能改善
   - リモコン、ボタンの管理画面にて順番をドラッグアンドドロップで変更可能に
   - 同じくボタンをドラッグ移動でレイアウト編集可能に
   - 各管理画面のinput -> confirm -> complete の画面遷移をなくし、モーダル切り替えで管理
      - UX向上 ＆ 直リンク対策にも
2. リファクタリング
   - 状態管理の見直し
      - redux or context hook
   - カスタム Hook で処理の共通化
   - 型の有効活用
      - 型宣言の共通化、別ファイル化
   - 非同期通信の管理
      - redux の場合は saga 導入
3. テストコードをかく
   - jest
4. Dockerイメージ化
   - ラズパイの負荷をみつつ判断
5. doc 作成

## 配布

ビルドしたアプリケーションを配布し、ラズパイとセンサーを用意すれば誰でもスマートリモコンを使えるようにする。
