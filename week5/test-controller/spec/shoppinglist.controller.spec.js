describe("ShoppingListController", function() {

  beforeEach(module('ShoppingListApp'));

  var $controller;
  var shoppingListController;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var ShoppingListServiceErrorMock = {};
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };
    ShoppingListServiceErrorMock.getItems = function () {
      return null;
    };

    shoppingListController =
      $controller('ShoppingListController', //对应app.js中ShoppingListController
                  {ShoppingListService: ShoppingListServiceErrorMock}); //reference to app.js中ShoppingListService

  }));

  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
