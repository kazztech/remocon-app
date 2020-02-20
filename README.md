# remocon-app

## API

[https://github.com/kazztech/remocon-api](https://github.com/kazztech/remocon-api)

## 今後

1. 全体リファクタリング
   - 状態管理の見直し
     - redux or context hooks
   - カスタム Hook で処理の共通化
   - 型の有効活用
     - 型宣言の共通化、別ファイル化
   - 非同期通信の管理
     - redux の場合は saga 導入
2. テストコード
   - jest
3. Dockerイメージ化
4. doc 作成

## 配布

ビルドしたアプリケーションを配布し、ラズパイとセンサーを用意すれば誰でもスマートリモコンを使えるようにする。
