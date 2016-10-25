describe('shoppinglist component',function(){
  var $compile;
  var $rootScope;

  var expectedHtml = '<h3 class="ng-binding">test title</h3>\
  <ol>\
    <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      1 of item 1 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      2 of item 2 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --> \
  </ol>'.replace(/\s/g, ''); // removes spaces

  beforeEach(module('ShoppingListDirectiveApp'));

  beforeEach(inject(function(_$compile_,_$rootScope_){
    $compile=_$compile_;
    $rootScope=_$rootScope_;
  }));

  beforeEach(inject(function($templateCache){
    var directiveTemplate=null;
    var req=new XMLHttpRequest;
    req.onload=function(){
      directiveTemplate=this.responseText;
    };
    req.open('get','shoppingList.html',false);//false is a 同步call;
    req.send();
    $templateCache.put('shoppingList.html',directiveTemplate);
  }));

  it('replace the element with the approapriate content',function(){
    var list={};
    list.items=[{
      name:'item1',
      quantity:"1"
    },{
      name:'item2',
      quantity:"2"
    }];
    $rootScope.list=list;
    var html='<shopping-list my-list="list" title="test title"></shopping-list>';
    var element=$compile(html)($rootScope);
    $rootScope.$digest();

    expect(element.html().replace(/\s/g,'')).toContain(expectedHtml);
  })


});
