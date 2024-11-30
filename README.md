# Prismatic Diary
## About this
こちらは日記のように自分の呟きを入力していくと、周りのAIがそれぞれのパーソナリティで知らず知らずのうちに内容を書き換えてしまうシステムです  
自分の心の呟きや思い出がさまざまな捉え方で広がっていく様子を楽しむ作品として、[東京大学 制作展 2024](https://www.iii.u-tokyo.ac.jp/event/20241017event)に出展されました

FE: こちらのレポジトリ  
Socket Server: https://github.com/hrm1810884/prismatic-diary-socket  
BE: https://github.com/hrm1810884/prismatic-backend

## 始め方

1. frontendで以下のコマンドによりクライアントサーバを立てます．

    ```sh
    yarn install
    yarn dev
    ```

    サーバはユーザが入力を行うものとAIを立てるためのサーバ(最大4つ)を立ててください．サーバはそれぞれ(port: 3000, 3001, 3002, 3003, 3004)に立ちます．

2. socketで以下のコマンドによりソケットサーバを立ち上げます．

    ```sh
    yarn start
    ```
3. backedでバックエンドサーバを立てます
   ```sh
   make
   ```
4. 各デバイスでクライアントサーバに接続
   ブラウザ上で以下にそれぞれアクセスすることで最大4つのAIの書き換えを楽しめます
   
    > user : http://192.168.0.105:3000  
    > AI1 pi 1: http://192.168.0.105:3001/receiver/1  
    > AI2 pi 2: http://192.168.0.105:3002/receiver/2  
    > AI3 pi 3: http://192.168.0.105:3003/receiver/3  
    > AI4 pi 4: http://192.168.0.105:3004/receiver/4  

5. 3000番のポートから日記入力 -> 出力確認
