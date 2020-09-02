(function() {
  const IrasutoyaLogic = sample.irasutoya.IrasutoyaLogic;

  /**
   * いらすとやアプリの制御を行うコントローラ
   */
  const irasutoyaApplicationController = {
    __name: 'sample.irasutoya.IrasutoyaApplicationController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    /**
     * いらすとやの画像を検索するロジック
     */
    _irasutoyaLogic: IrasutoyaLogic,

    /**
     * ビューテンプレート
     */
    __templates: ['js/view/result.ejs'],

    /**
     * フォームを送信（submit）した時のイベントハンドラ
     */
    '.search-form submit': async function(context, $el) {
      // submitイベントの本来の挙動（POSTリクエストの送信）を抑制するために必要
      context.event.preventDefault();
      $(".stock-decide-form").slideUp();
      const text = this.$find('.search-query-input').val();
      const data = await IrasutoyaLogic.searchIrasutoya(text)
      const results = data.results;
      this.view.update('.search-result', 'result', { results });
      $(".result-item").fadeIn();

    }
  }
  // sample.irasutoya.IrasutoyaApplicationController という名前で
  // 上記のコントローラがグローバルに公開される
  h5.core.expose(irasutoyaApplicationController);
})();