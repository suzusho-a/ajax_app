// memoという関数を定義
function memo() {
  // getElementByIdを用いて「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {});
    const formData = new FormData(document.getElementById("form"));
    // XMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数へ追記
    XHR.open("POST", "/posts", true);
    // レスポンスのタイプを指定する
    XHR.responseType = "json";
    // sendでリクエストを送信する
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // メモの入力フォームを取得
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // listという要素に対して、insertAdjacentHTMLでHTMLを追加。要素listの直後に挿入
      list.insertAdjacentHTML("afterend", HTML);
      // 「メモの入力フォームに入力されたままの文字」はリセット
      formText.value = "";
    };
    e.preventDefault();
}
// 既読機能と同様にwindow（ページ）をload（読み込み）時に実行
window.addEventListener("load", memo);