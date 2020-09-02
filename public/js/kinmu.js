// $(function() { ... }); とするとドキュメントのロードが終わった時（DOMContentLoaded）に関数が実行される
$(function() {
    h5.core.controller('#app', sample.irasutoya.ListAddController);
    h5.core.controller('#app', sample.irasutoya.ListClickController);
    h5.core.controller('#app', sample.irasutoya.TrainController);
  });
  