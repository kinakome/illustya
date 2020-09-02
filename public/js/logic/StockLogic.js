(function() {
    /**
     * いらすとやをストックするロジック
     */
    const StockLogic = {
      __name: "sample.irasutoya.StockLogic",
      getStock: function() {
        var stcokList = [];
        const promise = new Promise((resolve, reject) => {
          var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
          // var stcokList = [];
          if (indexedDB) {
            var openRequest = indexedDB.open("illustList");
            openRequest.onupgradeneeded = function(e) {
              var db = e.target.result;
              var store = db.createObjectStore( "illustList" , { keyPath : "url"} );
              store.createIndex("img", "img", { unique: false });
              store.createIndex("title", "title", { unique: false });
              store.transaction.oncomplete = function(e) {
                db.transaction("illustList", "readwrite").objectStore("illustList");
              };
            };
            openRequest.onsuccess = function(e) {
              var db = e.target.result;
              var objectStore = db.transaction("illustList").objectStore("illustList");
              objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if(cursor){
                  var item = cursor.value;
                  stcokList.push(item);
                  cursor.continue();
                }else{
                  resolve(stcokList);
                }
              }
            };
          } else {
            window.alert("このブラウザではストック機能は使用できません。");
          }  
        })
        return promise;
      }
    };
    h5.core.expose(StockLogic);
  })();
