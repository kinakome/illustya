(function() {
    const TrainInfoLogic = sample.irasutoya.TrainInfoLogic;
  
    /**
     * いらすとやアプリの制御を行うコントローラ
     */
    const trainController = {
      __name: 'sample.irasutoya.TrainController',
      /**
       * コントローラの初期化が終わったときに行う処理
       */
      __ready: function() {
        const data = TrainInfoLogic.getTrainInfo()
        data.then(function(trainDatas){
          trainDatas.forEach(function(trainData){
            console.log(trainData.name);
            var lateFrag = 0;
            if(trainData.name == "中央･総武各駅停車"){
              $(".line-sobu").css('background-color', 'red');
              lateFrag = 1;
              setInterval(function() {
                $('.line-sobu').fadeOut('slow', function() {
                  $(this).fadeIn('slow');
                });
              }, 1000);
            }
            if(trainData.name == "山手線" || trainData.name == "京浜東北線"){
              $(".line-yama").css('background-color', 'red');
              lateFrag = 1;
              setInterval(function() {
                $('.line-yama').fadeOut('slow', function() {
                  $(this).fadeIn('slow');
                });
              }, 1000);
            }
            if(trainData.name == "芸備線"){
              $(".line-yuri").css('background-color', 'red');
              lateFrag = 1;
              setInterval(function() {
                $('.line-yuri').fadeOut('slow', function() {
                  $(this).fadeIn('slow');
                });
              }, 1000);
            }
            if(lateFrag == 1){
              $(".train-judge").text("遅延が発生しています");
              $(".train-judge").css('color', 'red');
            }
          })
        });
      }
    }
    h5.core.expose(trainController);
  })();