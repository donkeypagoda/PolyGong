function testRoutes() {

    const test = {
      contentType: 'application/json',
      type: 'GET',
      url: '/polygongs'
    };
    $.ajax(test)
      .then((stuff) => {
        console.log(stuff);
      })
      .catch(($xhr) => {
        console.log($xhr);
      });

}
testRoutes();
