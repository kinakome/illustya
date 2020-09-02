(function() { 
  const CreateStockLogic = sample.irasutoya.CreateStockLogic;

  const imageStockController = {
    __name: 'sample.irasutoya.imageStockController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    _createStockLogic: CreateStockLogic,


    '.stock-button click': function(context, $el) {
      var itemList =[];
      $(".checked").
      map(function(index, item) {
        var url =  $(item).data("item-url");
        var title = $(item).data("item-title");
        var img = $(item).data("item-img");
        var itemData = {url: url, title: title, img: img}
        itemList.push(itemData);      })
        
      CreateStockLogic.createStock(itemList);

      $(".stock-decide-form").slideUp();
      $(".checked").addClass("used").removeClass("checked");
    }
  }
  h5.core.expose(imageStockController);
})();