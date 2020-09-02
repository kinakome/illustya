(function() {
  const SEARCH_API_URL = process.env.APP_URL;
  const TOKEN = process.env.APP_TOKEN;

  /**
   * いらすとやAPIを使って画像を検索するロジック
   */
  const IrasutoyaLogic = {
    __name: "sample.irasutoya.IrasutoyaLogic",
    searchIrasutoya: async function(text) {
      const promise = new Promise((resolve, reject) => {
        h5.ajax(SEARCH_API_URL, {
          type: "POST",
          data: JSON.stringify({
            text: text,
            limit: 10   // 検索件数を10件までに制限
          }),
          headers: {
            "Ocp-Apim-Subscription-Key": TOKEN
          }
        }).done(resolve).fail(reject);
      })
      return promise;
    }
  };
  h5.core.expose(IrasutoyaLogic);
})();
