  (function() { 
      console.log("呼び出されました")
    /**
     * いらすとやアプリの制御を行うコントローラ
     */
    const listAddController = {
      __name: 'sample.irasutoya.ListAddController',
      /**
       * コントローラの初期化が終わったときに行う処理
       */
      __ready: function() {},

      '.right-icon click': function(context, $el) {
        $('.hidden-menu').slideToggle();
      }
    }
    h5.core.expose(listAddController);


   const listClickController = {
     __name: 'sample.irasutoya.ListClickController',
     /**
      * コントローラの初期化が終わったときに行う処理
      */
     __ready: function() {},

     '.hidden-menu-list-item click': function(context, $el) {
       this.$find('#now-point').removeAttr('id');
       $el.attr('id', 'now-point');
       $('.hidden-menu').slideToggle();
     }
   }
   h5.core.expose(listClickController);
})();