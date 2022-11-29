/** ニフクラ mobile backend 連携処理 **/

// APIキー
var applicationKey = 'fb54ef44c4e8f4026067cfaf963537346c820119c4719cf7684d5e83cc4db5bc';
var clientKey = '60e6e76c28ae0366582514516b85c815526bfae0a9dd4bb8eadc89e8abc8750d';

// SDK初期化
var ncmb = new NCMB(applicationKey, clientKey);

mb = {
    /***** データストア保存 *****/
    saveData: function(data) { 
         var Books = ncmb.DataStore("Books");
         var books = new Books();
       console.log(data);
          books.set("src", data[0])
         .set("book_title",data[1])
         .set("book_subtitle", data[2])
         .set("book_authors", data[3])
         .set("book_description",data[4])
         .set("book_publishedDate", data[5])
         .save()
         .then(function(gameScore){
          // 保存後の処理
         })
         .catch(function(err){
           // エラー処理
         });


        //  gameScore.set("score", 8888)
        //  .set("playerName", "テスト")
        //  .set("cheatMode", false)
        //  .save()
        //  .then(function(gameScore){
        //   // 保存後の処理
        //  })
        //  .catch(function(err){
        //    // エラー処理
        //  });












    },
    /***** データストア全件検索 *****/
    getAllData: function() {        
        var Books = ncmb.DataStore("Books");
        Books.order('createData',true)
        .fetchAll()
        .then(function(result){
        // 成功時の処理
        console.log(result);
        console.log('取得件数' + result.length);
        setData('全件検索',result,'#dataList')
       })
    .catch(function(error){
        // 失敗時の処理
        ons.notification.alert('データ取得に失敗しました');
        console.log('全件検索失敗');
       });

    },
    /***** データストア条件検索 *****/
    getSearchData: function(feild, inputData) {
         var Inquiry = ncmb.DataStore("Inquiry");
         Inquiry.order('createData',true)
         .equalTo(feild,inputData)
         .fetchAll()
         .then(function(results){
              console.log('取得件数' + results.length);
              setData('条件検索',results,'#searchDataList1')
         })
          .catch(function(error){
        // 失敗時の処理
        ons.notification.alert('データ取得に失敗しました');
        console.log('条件検索失敗');
       });









    },
    /***** データストア条件検索（範囲指定） *****/
    getRangeSearchData: function(feild, inputDataGreaterThan, inputDataLessThan) {








    }
};

