(function() {
    /**
     * いらすとやをストックするロジック
     */
    const DeleteStockLogic = {
      __name: "sample.irasutoya.DeleteStockLogic",
      deleteStock: function(itemList) {
        const promise = new Promise((resolve, reject) => {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
            if (indexedDB) {
            var openRequest = indexedDB.open("illustList");

                openRequest.onsuccess = function(e) {
                    var db = e.target.result;
            
                    var objectStore = db.transaction("illustList", "readwrite").objectStore("illustList");
                    var finishCount = itemList.length - 1;
                    for (var i in itemList) {
                        if(i == finishCount){
                            var request = objectStore.delete(itemList[i]);
                        }else{
                            objectStore.delete(itemList[i]);
                        }
                    }
                    request.onsuccess = function(e) {
                        resolve();
                    };
                    // db.close();
                };
            } else {
            window.alert("このブラウザではストック機能は使用できません。");
            } 
        })
        return promise; 
      }
    };
    h5.core.expose(DeleteStockLogic);
  })();
