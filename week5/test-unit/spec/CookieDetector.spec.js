describe('CookieDetector',function(){
  var itemsWithoutCookies;
  var itemsWithCookies;

  beforeEach(function(){
    itemsWithoutCookies=['apples','pears','bananas'];
    itemsWithCookies=['bread','milk','Cookie'];
  });
  //have cookie
  it('should be able to detect cookies',function(){
    var result=detecCookie(itemsWithCookies);
    expect(result).toBe(true);
  });
  //not have cookie
  it('should be able to detect no cookies',function(){
    var result=detecCookie(itemsWithoutCookies);
    expect(result).not.toBe(true);
  });



})
