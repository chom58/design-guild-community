// Google Apps Script コード v2（CORS対応版）
// このコードをGoogle Apps Scriptエディタにコピーしてください

function doPost(e) {
  try {
    // デバッグログ
    console.log('Received POST request:', e);
    
    // パラメータまたはJSONデータを解析
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed JSON data:', data);
      } catch (jsonError) {
        // JSONパースエラーの場合、パラメータとして処理
        data = e.parameter;
        console.log('Using parameter data:', data);
      }
    } else {
      data = e.parameter;
      console.log('No postData, using parameter:', data);
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
    
    console.log('Sending to Google Forms:', payload);
    
    // フォームに送信
    const options = {
      'method': 'post',
      'payload': payload,
      'muteHttpExceptions': true,
      'followRedirects': false
    };
    
    const response = UrlFetchApp.fetch(formUrl, options);
    const responseCode = response.getResponseCode();
    
    console.log('Google Forms response code:', responseCode);
    
    // 成功レスポンスを返す（302リダイレクトも成功とみなす）
    if (responseCode === 200 || responseCode === 302 || responseCode === 303) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'success',
          'message': '送信が完了しました',
          'code': responseCode,
          'data': data
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('Unexpected response code: ' + responseCode);
    }
      
  } catch(error) {
    console.error('Error in doPost:', error.toString());
    
    // エラーレスポンスを返す
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GETリクエスト用（テスト用）
function doGet(e) {
  // パラメータがある場合はフォーム送信として処理
  if (e.parameter && e.parameter.name) {
    return doPost(e);
  }
  
  // テスト用レスポンス
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Google Apps Script is working!',
      'version': 'v2.0',
      'timestamp': new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// テスト関数（エディタから実行可能）
function testFormSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト太郎',
        email: 'test@example.com',
        lineId: 'test_line',
        profession: 'designer',
        experience: '3-5',
        motivation: 'テスト送信です',
        portfolio: 'https://example.com'
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}