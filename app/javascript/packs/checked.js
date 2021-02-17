function check() {
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    // 要素にdata-load = "true"と属性を追加
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => { });
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // オブジェクトを生成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化、第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式を指定
      XHR.responseType = "json";
      // sendメソッドを記述で、はじめてリクエストが行える。(引数の指定は必要なし)
      XHR.send();
      // onloadは、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // posts_controller.rbのcheckedアクションで返却したitemは、XHR.response.postで取得
        const item = XHR.response.post;
        // 既読であるかどうかを判断し、情報を切り替える処理
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
}
// check関数が1秒に1度実行されるように記述
setInterval(check, 1000);