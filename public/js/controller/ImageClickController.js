(function() { 
    console.log("呼び出されました")
  /**
   * いらすとやアプリの制御を行うコントローラ
   */
  const imageClickController = {
    __name: 'sample.irasutoya.ImageClickController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.item-check click': function(context, $el) {
      $el.toggleClass('checked')
      if($(".checked").length == 0){
        $(".stock-decide-form").slideUp();
      }else{
        $(".stock-decide-form").slideDown();
      }
    }
  }
  h5.core.expose(imageClickController);

})();
