// This is a JavaScript file
var jan_code;

//google books api利用時のモード用定数
const mode_ISBN = 0;
const mode_word = 1;

//バーコードスキャンのファンクション---------------------
let options = {
       preferFrontCamera : false,
                showFlipCameraButton : true,
                showTorchButton : false,
                torchOn: true, // Android only
                saveHistory: false, // Android only
                prompt : "スキャンエリアの中にバーコードを入れてください", // Android
                resultDisplayDuration: 500, // Android only
                // formats : "all",//QR_CODE,EAN_13,CODE_39 
                formats : "QR_CODE,EAN_8,EAN_13,CODE_39", 
                orientation : "unset", // Android only (portrait|landscape)
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
}
function onSuccess (result) {
    //キャンセルされたか？
    if (!result.cancelled){
        getGoole_books(mode_ISBN,result.text);

    }else{
        alert("キャンセルされました");
  }
}
function onError (error) {
    alert("スキャン失敗: " + error);
}
function scan() {
      //ここに処理を記述する 
      cordova.plugins.barcodeScanner.scan(
          onSuccess,
          onError,
          options
      );
}

//google books api関連ファンクション---------------------
function getGoole_books(mode, url_key){
    let url;
    if(mode == mode_ISBN){
        console.log(url_key);
        url=   `https://www.googleapis.com/books/v1/volumes?q=isbn:${url_key}`;
    }else{
        console.log(url_key);
        url=   `https://www.googleapis.com/books/v1/volumes?q=${url_key}`;
    }

  console.log(url);
  $.ajax({
    url: url,
    dataType: 'json'
  })
  .done(function(data) {
      console.log("成功");
      console.log("data.totalItems:" + data.totalItems);
      console.log(data);
      
      if(data.totalItems>0){
        document.querySelector('#navigator').pushPage('detail.html',{data: {books: data}});
        // document.querySelector('#navigator').pushPage('list.html',{data: {books: data}});


      }else{
        $("#content").text("該当データが見つかりません");
      }

  })
  .fail(function(data) {
      console.log('失敗');
  })        
}


//yahoo api関連ファンクション---------------------
function getyahoo(barcode){
  console.log(barcode);
  var url = `http://yuhinaka.php.xdomain.jp/hybrid/yahoo_shop_get.php?image_size=300&jan_code=${barcode}`;

  console.log(url);
  $.ajax({
    url: url,
    dataType: 'json'
  })
  .done(function(data) {
      // console.log('成功');
      // console.log("data.totalResultsAvailable:" + data.totalResultsAvailable);
      // console.log(data.hits[0].name);      

      if(data.totalResultsAvailable>0){
        var nav = document.querySelector('#navigator');
        nav.pushPage('yahoo_detail.html',{data: {recv_data: data}});
      }else{
        $("#content").text("該当データが見つかりません");
      }

  })
  .fail(function(data) {
      console.log('失敗');
  })        
}


//アラート
function alert(message){
    ons.notification.alert({
        title: '',
        message: message
    });      
}

function setData(str, results, listId) {
    $(listId).empty();
    var count = results.length;
    // ヘッダー
    var dom = "<li class='list-header'>" + str + " 結果：" + count + "件</li>";
    // リストアイテム
    for (var i = 0; i < results.length; i++) {
        var object   = results[i];
        var title = object.get('src');
        var contents = object.get('book_title');
        var name = object.get('book_subtitle');
        var emailAddress = object.get('book_authors');
        var age = object.get('book_description');
        var prefecture = object.get('book_publishedDate');
    
        var createDate = object.get('createDate');
        var jstCreateDate = replaceTimeForm(createDate);
         
        dom = dom + "<div style=\"color:blue\">" + "題名：" + contents + "</div>";
        dom = dom + "<img src=\"" + title + "\"" + ">"; // 誤字
        console.log(dom);
        dom = dom + "<li class='list-item list-item--material' style='text-align: left;' onClick='ons.notification.alert(\"" + contents + "\");'>";
        dom = dom + "<div class='list-item__center list-item--material__center'>";
        dom = dom + "<div class='list-item__title list-item--material__title'>" + "</div>";
        dom = dom + "<div class='list-item__subtitle list-item--material__subtitle'>";
        dom = dom + jstCreateDate + "<br>" + name + " (" + prefecture + ") -" + age + "- " + emailAddress;
        dom = dom + "</div></div></li>";
        
        console.log(dom)
    }
    
    $(listId).append(dom);
}



function replaceTimeForm(date) {
    var createDate = new Date(date);  
    var year = createDate.getFullYear();
    var month = createDate.getMonth() + 1;
    var day = createDate.getDate();
    var hour = createDate.getHours();
    var minute = createDate.getMinutes();
    var second = createDate.getSeconds();
   
    var jstCreateDate  = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    
    return jstCreateDate;
}