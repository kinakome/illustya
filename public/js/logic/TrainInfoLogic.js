(function() {
    const SEARCH_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=z9-iqcasxUEmrU165NnIdmIuw0eBr9ZhFprAMeN8rukGSDiN3nIx_tFpuYCQwqbSdLd4WzNUIAh4IG1cbhcYdRqzsCZQZc3Lm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBtTQ11ppFZzLzHvmGul9WUGw-WH8H6iZWXhL2JxAWyYhy3PeC5vBAJR4NgV1jRkGw&lib=MG7rzwzdiqPMO8AZkAGGln2NrafBaN4Nv";
  
    /**
     * 電車の遅延情報を取得するロジック
     */
    
    const TrainInfoLogic = {
      __name: "sample.irasutoya.TrainInfoLogic",
      getTrainInfo: function() {
        
        var callback = function(data){
          console.log(data)
        }
        const promise = new Promise((resolve, reject) => {
          $.ajax(SEARCH_API_URL, {
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "callback",
            cache:false,
          
          }).done(resolve).fail(function(xhr, textStatus, errorThrown) {
        });

        })
        return promise;
      }
    };
    h5.core.expose(TrainInfoLogic);
  })();
  