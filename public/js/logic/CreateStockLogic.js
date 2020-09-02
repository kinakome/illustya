(function() {
    /**
     * いらすとやをストックするロジック
     */
    const CreateStockLogic = {
      __name: "sample.irasutoya.CreateStockLogic",
      createStock: function(itemList) {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
        if (indexedDB) {
          var openRequest = indexedDB.open("illustList");
          openRequest.onupgradeneeded = function(e) {
            var db = e.target.result;
            var store = db.createObjectStore( "illustList" , { keyPath : "url"} );
            store.createIndex("img", "img", { unique: false });
            store.createIndex("title", "title", { unique: false });
            store.transaction.oncomplete = function(e) {
              var objectStore = db.transaction("illustList", "readwrite").objectStore("illustList");
              for (var i in itemList) {
                objectStore.add(itemList[i]);
              }
            };
            // db.close();
          };
      
          openRequest.onsuccess = function(e) {
            var db = e.target.result;
      
            var objectStore = db.transaction("illustList", "readwrite").objectStore("illustList");
            for (var i in itemList) {
              objectStore.add(itemList[i]);
            }
            // db.close();
          };
        } else {
          window.alert("このブラウザではストック機能は使用できません。");
        }  
      }
    };
    h5.core.expose(CreateStockLogic);
  })();
