describe('menucategories',function(){

  var menucategories;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function(){
    module('MenuCategoriesApp');
    inject(function($injector){
      menucategories=$injector.get('MenuCategoriesService');
      $httpBackend=$injector.get('$httpBackend');
      ApiBasePath=$injector.get('ApiBasePath');
    });
  });

  it('should be categories list',function(){
      $httpBackend.whenGET(ApiBasePath + "/categories.json")
                .respond(['lunch','Dessert']);
      menucategories.getMenuCategories().then(function(response){
        expect(response.data).toEqual(['lunch','Dessert']);
      });
      $httpBackend.flush();
  })


});
