(function(){
  'use strict';
  angular.module('myApp')
  .controller('itemDetailController',itemDetailController);
  /*url*/
  // itemDetailController.$inject=['item'];
  // function itemDetailController(item){
  //   var itemDetail=this;
  //   itemDetail.description=item.description;
  //   itemDetail.name=item.name;
  //   itemDetail.quantity=item.quantity;
  // }
  /*child*/
  itemDetailController.$inject=['$stateParams','items'];
  function itemDetailController($stateParams,items){
    var itemDetail=this;
    var item=$stateParams.itemId;
    itemDetail.description=items[item].description;
    itemDetail.name=items[item].name;
    itemDetail.quantity=items[item].quantity;
  }
})();
