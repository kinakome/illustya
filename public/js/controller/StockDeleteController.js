(function() { 
    const StockLogic = sample.irasutoya.StockLogic;
    const DeleteStockLogic = sample.irasutoya.DeleteStockLogic;

    /**
   * いらすとやアプリの制御を行うコントローラ
   */
  const stockClickController = {
    __name: 'sample.irasutoya.StockClickController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.item-check click': function(context, $el) {
      $el.toggleClass('delete-checked')
      if($(".delete-checked").length == 0){
        $(".stock-decide-form").slideUp();
      }else{
        $(".stock-decide-form").slideDown();
      }
    }
  }
  h5.core.expose(stockClickController);

  const stockClickAllController = {
    __name: 'sample.irasutoya.StockClickAllController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.select-all-button click': function(context, $el) {
      $(".item-check").addClass('delete-checked')
      if($(".delete-checked").length == 0){
        $(".stock-decide-form").slideUp();
      }else{
        $(".stock-decide-form").slideDown();
      }
    }
  }
  h5.core.expose(stockClickAllController);

  const stockRemoveAllController = {
    __name: 'sample.irasutoya.StockRemoveAllController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.remove-all-button click': function(context, $el) {
      $(".item-check").removeClass('delete-checked')
      if($(".delete-checked").length == 0){
        $(".stock-decide-form").slideUp();
      }else{
        $(".stock-decide-form").slideDown();
      }
    }
  }
  h5.core.expose(stockRemoveAllController);

    const stockDeleteController = {
    __name: 'sample.irasutoya.StockDeleteController',

    __templates: ['js/view/searchAll.ejs'],

    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.delete-button click': function(context, $el) {
        var itemList =[];
        var view = this.view;
        $(".stock-decide-form").slideUp();
        $(".result-item").fadeOut('fast');
        $(".delete-checked").
        map(function(index, item) {
          var url =  $(item).data("item-url");
          itemList.push(url);     
        })
        DeleteStockLogic.deleteStock(itemList).then(function(){
            var stockList = StockLogic.getStock();
            stockList.then(function(stockList){
                view.update('.search-result', 'result', { stockList });
                $(".result-item").fadeIn();
            })
         });
    }
  }
  h5.core.expose(stockDeleteController);

})();







