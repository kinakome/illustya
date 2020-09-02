// $(function() { ... }); とするとドキュメントのロードが終わった時（DOMContentLoaded）に関数が実行される
$(function() {
    h5.core.controller('#app', sample.irasutoya.ListAddController);
    h5.core.controller('#app', sample.irasutoya.ListClickController);
    // h5.core.controller('#app', sample.irasutoya.StockClickController);
    // h5.core.controller('#app', sample.irasutoya.StockClickAllController);
    // h5.core.controller('#app', sample.irasutoya.StockRemoveAllController);
    // h5.core.controller('#app', sample.irasutoya.StockDeleteController);
    h5.core.controller('#app', sample.irasutoya.CreateRoomController);
    h5.core.controller('#app', sample.irasutoya.ChangeBoxController);
    h5.core.controller('#app', sample.irasutoya.ExitRoomController);
    h5.core.controller('#app', sample.irasutoya.FriendItemCheckController);
    h5.core.controller('#app', sample.irasutoya.FriendStockAddController);
    
    //websocket receive data
    socket.on("server_to_client", function(data){console.log(data.value)});

    //定員オーバー
    socket.on("info", function(data){
        if(data.value == "fail"){
            $(".friend-box").fadeOut();
            $(".my-box").fadeOut();
            $(".join-room").fadeToggle("fast");
            $(".search-room").fadeToggle("fast");
            alert("部屋が満員です(最大２人)")
        }
    });

    function updateFriendView(item){
        var html = `
            <li class="result-item friend-result-item" id="hidden-item">
            <img class="item-image" src="${ item.img }"/>
            <div class="check-field">
                <div class="item-check friend-item-check" data-item-img="${ item.img }" data-item-title="${ item.title }" data-item-url="${ item.url }"><i class="fa fa-check" aria-hidden="true"></i></div>
            </div>
            <div class="item-title-box">
                <span class="item-title">${ item.title }</span>
            </div>
            <a href="${ item.url }"></a>
            </li>
        `;
        $('.friend-result-list').append(html);
    }
    // ルームに入ったらストック送信
    socket.on("server_to_client_stock", function(data){
        $(".stock-decide-form").slideUp();
        $(".result-item").fadeOut(function(){
            $(".friend-result-list").empty();
            data.stock.forEach(function(item) {
                updateFriendView(item);
            });
            $(".result-item").fadeIn();
            // console.log(data.stock)
            var StockLogic = sample.irasutoya.StockLogic;
            var stockList = StockLogic.getStock();
            stockList.then(function(stockList){
                socket.emit('client_to_server_my-stock', {stock: stockList});
            })
        });
    });

    socket.on("server_to_client_stock-callback", function(data){
        $(".result-item").fadeOut(function(){
            $(".friend-result-list").empty();
            data.stock.forEach(function(item) {
                updateFriendView(item);
            });
            $(".result-item").fadeIn();
        });
    });

});
