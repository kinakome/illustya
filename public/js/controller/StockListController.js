(function() { 
    const StockLogic = sample.irasutoya.StockLogic;
  
    const stockListController = {
      __name: 'sample.irasutoya.StockListController',
      /**
       * コントローラの初期化が終わったときに行う処理
       */
      __templates: ['js/view/searchAll.ejs'],

      __ready: function() {
        var view = this.view;
        var stockList = StockLogic.getStock();
        stockList.then(function(stockList){
            view.update('.search-result', 'result', { stockList });
            $(".result-item").fadeIn();
        })
      },
    }
    h5.core.expose(stockListController);
  })();