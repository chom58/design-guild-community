// Google Apps Script コード
// このコードをGoogle Apps Scriptエディタにコピーしてください
// https://script.google.com/home

function doPost(e) {
  try {
    // CORSヘッダーを設定
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // パラメータまたはJSONデータを解析
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // JSONパースエラーの場合、パラメータとして処理
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }
    
    // Google Formsに送信
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/formResponse';
    
    const payload = {
      'entry.1755098959': data.name || '',           // お名前
      'entry.1593853110': data.email || '',          // メールアドレス
      'entry.1887838426': data.lineId || '',         // LINE ID
      'entry.966592544': data.profession || '',      // 職種・専門分野
      'entry.1896235522': data.experience || '',     // 経験年数
      'entry.505500388': data.motivation || '',      // 参加動機
      'entry.1751089080': data.portfolio || ''       // ポートフォリオURL
    };
    
    // フォームに送信
    const options = {
      'method': 'post',
      'payload': payload,
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(formUrl, options);
    
    // 成功レスポンスを返す
    output.setContent(JSON.stringify({
      'result': 'success',
      'message': '送信が完了しました',
      'data': data
    }));
    
    return output;
      
  } catch(error) {
    // エラーレスポンスを返す
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }));
    return output;
  }
}

// GETリクエスト用（テスト用）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Google Apps Script is working!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ===== セットアップ手順 =====

1. Google Apps Scriptを開く
   https://script.google.com/home
   
2. 新しいプロジェクトを作成
   「新しいプロジェクト」をクリック
   
3. このコードをコピー＆ペースト
   デフォルトのコードを全て削除して、このコードを貼り付け
   
4. プロジェクトを保存
   ファイル → 保存（プロジェクト名: Design Guild Form Handler）
   
5. デプロイ
   - 「デプロイ」→「新しいデプロイ」
   - 種類：「ウェブアプリ」を選択
   - 実行ユーザー：「自分」
   - アクセスできるユーザー：「全員」
   - 「デプロイ」をクリック
   
6. URLをコピー
   デプロイ完了後に表示されるWebアプリのURLをコピー
   例: https://script.google.com/macros/s/xxxxx/exec
   
7. main.jsを更新
   コピーしたURLをmain.jsのGAS_URLに設定

============================= */