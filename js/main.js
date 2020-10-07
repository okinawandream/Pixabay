
  //} DOM の取得
  const button = document.getElementById('btn'); 
  const ol = document.querySelector('ol');
  const text = document.getElementById('text');

  //} リクエスト URL の作成
  function createURL() {
    const API_KEY = '18566202-1410d3f6508d109fb1a22a1f6';
    const baseUrl = 'https://pixabay.com/api/?key=' + API_KEY;
    const keyword = '&q=' + text.value;  //| テキストフォームに入力した値をリクエスト
    const option = '&orientation=horizontal&per_page=10'; //+ オプションで結果表示数を設定
    const URL = baseUrl + keyword + option;
    
    return URL;
  }

  //} 非同期処理 
  async function getImages() {  
    const res = await fetch(createURL())
    const users = await res.json();

    //} エラー処理
    if (users.totalHits === 0) {
      alert('該当する写真はありません');
      reset();
    }

    users.hits.forEach(addList) 
    return users;
  }

  //} DOM 生成 => 追加
  function addList(user) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = user.previewURL;
    
    const a = document.createElement('a');
    a.href = user.pageURL;
    a.target = '_blank';
    
    li.appendChild(a)
    a.appendChild(img);
    ol.appendChild(li);
  }

  //} 検索する毎に text の値をリセット
  function reset() {
    text.value = '';
    text.focus();
  }
  
  button.addEventListener('click', async () => {

    //} 検索する毎に、前回の検索結果を削除
    while (ol.firstChild) {
      ol.removeChild(ol.firstChild)
    }

    getImages();
    reset();
  });
