(function() { 
  const StockLogic = sample.irasutoya.StockLogic;
  const CreateStockLogic = sample.irasutoya.CreateStockLogic;
  var wasEnter = 0;

  const createRoomController = {
    __name: 'sample.irasutoya.CreateRoomController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},
    __templates: ['js/view/searchAll.ejs'],


    '#connect-button click': function(context, $el) {
        var isEnter = false;
        var roomNo = $(".room-search-box").val();
        if(roomNo != ""){
            if (isEnter) {
                // socket.emit("client_to_server", {value : message});
            } else {
                var stockList = StockLogic.getStock();
                var view = this.view;
                // var stockList = StockLogic.getStock();
                stockList.then(function(stockList){
                    socket.emit('client_to_server_join', {value: roomNo, stock: stockList});
                    isEnter = true;
                    $(".search-room").fadeToggle("fast");
                    $(".join-room").fadeToggle("fast");
                    view.update('.search-result', 'result', { stockList });
                    $('.select-button').removeClass('now-button');
                    $('#my-box-button').addClass('now-button');
                    $(".friend-box").fadeOut(function(){
                        $(".my-box").fadeIn();
                    });
                    $(".result-item").fadeIn();

                })

            }
        }else{
            alert("ルーム番号を入力してください")
        }
    }
  }
  h5.core.expose(createRoomController);

  const changeBoxController = {
    __name: 'sample.irasutoya.ChangeBoxController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.select-button click': function(context, $el) {
        var buttonName = $el.attr('id');
        if(buttonName == 'my-box-button'){
            $('.select-button').removeClass('now-button');
            $el.addClass('now-button');
            $(".friend-box").fadeOut(function(){
                $(".my-box").fadeIn();
            });
        }else{
            $('.select-button').removeClass('now-button');
            $el.addClass('now-button');
            $(".my-box").fadeOut(function(){
                $(".friend-box").fadeIn();
            });
        }
    }
  }
  h5.core.expose(changeBoxController);

  
  const exitRoomController = {
    __name: 'sample.irasutoya.ExitRoomController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.exit-button click': function(context, $el) {
        $(".friend-box").fadeOut();
        $(".my-box").fadeOut();
        $(".join-room").fadeToggle("fast");
        $(".search-room").fadeToggle("fast");
        wasEnter = 1;
        socket.emit('client_to_server_exit');
        $(".friend-result-list").empty();
    }
  }
  h5.core.expose(exitRoomController);

  const friendItemCheckController = {
    __name: 'sample.irasutoya.FriendItemCheckController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.friend-item-check click': function(context, $el) {
        $el.toggleClass('checked')
        if($(".checked").length == 0){
          $(".stock-decide-form").slideUp();
        }else{
          $(".stock-decide-form").slideDown();
        }
    }
  }
  h5.core.expose(friendItemCheckController);

  const friendStockAddController = {
    __name: 'sample.irasutoya.FriendStockAddController',
    /**
     * コントローラの初期化が終わったときに行う処理
     */
    __ready: function() {},

    '.add-button click': function(context, $el) {
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
        function updateMyStockView(item){
            var html = `
                <li class="result-item" id="hidden-item">
                <img class="item-image" src="${ item.img }"/>
                <div class="check-field">
                    <div class="item-check item-check" data-item-img="${ item.img }" data-item-title="${ item.title }" data-item-url="${ item.url }"><i class="fa fa-check" aria-hidden="true"></i></div>
                </div>
                <div class="item-title-box">
                    <span class="item-title">${ item.title }</span>
                </div>
                <a href="${ item.url }"></a>
                </li>
            `;
            $('.result-list').append(html);
            $('.result-item').css('display', 'list-item');
        }
        itemList.forEach(function(item) {
            updateMyStockView(item);

        });
    }
  }
  h5.core.expose(friendStockAddController);
})();
