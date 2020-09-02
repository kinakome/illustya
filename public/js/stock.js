// $(function() { ... }); とするとドキュメントのロードが終わった時（DOMContentLoaded）に関数が実行される
$(function() {
    h5.core.controller('#app', sample.irasutoya.ListAddController);
    h5.core.controller('#app', sample.irasutoya.ListClickController);
    h5.core.controller('#app', sample.irasutoya.StockListController);
    h5.core.controller('#app', sample.irasutoya.StockClickController);
    h5.core.controller('#app', sample.irasutoya.StockClickAllController);
    h5.core.controller('#app', sample.irasutoya.StockRemoveAllController);
    h5.core.controller('#app', sample.irasutoya.StockDeleteController);
});
