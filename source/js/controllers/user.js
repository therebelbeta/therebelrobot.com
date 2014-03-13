app.controller('UserCtrl', ['$scope','$http','$window','$timeout','Utils', 
  function ($scope, $http, $window, $timeout, Utils) {
    $scope.user = {
      email: 'john@doe.com', 
      password: 'foobar',
      id: 234658,
      socId:false,
      socToken:false
    };
    if ($window.sessionStorage.token){
      var token = $window.sessionStorage.token
      $scope.isAuthenticated = true;
      var encodedProfile = token.split('.')[1];
      var profile = JSON.parse(Utils.url_base64_decode(encodedProfile));
      $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
    }
    else{
      $scope.isAuthenticated = false;
      $scope.welcome = '';
      $scope.message = '';
    }
    $scope.submit = function () {
      /*TODO: separate out into service*/
      $http
      .post('/api/auth/local', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(Utils.url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
    };
    $scope.logout = function () {
      /*TODO: separate out into service*/
      $scope.welcome = '';
      $scope.message = '';
      $scope.isAuthenticated = false;
      delete $window.sessionStorage.token;
    };
    $scope.callRestricted = function () {
      $http({url: '/api/user/restricted', method: 'GET'})
      .success(function (data, status, headers, config) {
      $scope.message = $scope.message + ' ' + data.name + ' ' + data.email; // Should log 'foo'
    })
      .error(function (data, status, headers, config) {
        alert(data);
      });
    };
    $scope.facebookAuth = function () {
      /*TODO: separate out into service*/
      var popupWin = $window.open('http://localhost:8080/auth/facebook','','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=580, height=600');
      var success = false;
      $window.addEventListener('message', function(res){ 
        console.log(res.data);
        if (res.data.success){
          success = true;
          $scope.user = {
            email: false, 
            password: false,
            id:false,
            socId:res.data.userid,
            socToken:res.data.accessToken
          };
          /*SEND DATA TO SERVER API IN USER CHECK/CREATION*/
          $http.post('/api/auth/facebook', $scope.user)
            .success(function (data, status, headers, config) {
              /*IF SERVER RETURNS SUCCESS, CONTINUE*/
              // $window.sessionStorage.token = data.token;
              // $scope.isAuthenticated = true;
              // var encodedProfile = data.token.split('.')[1];
              // var profile = JSON.parse(Utils.url_base64_decode(encodedProfile));
              // $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
            })
            .error(function (data, status, headers, config) {
              /*IF SERVER RETURNS FAIL, SHOW ERROR*/
              // // Erase the token if the user fails to log in
              // delete $window.sessionStorage.token;
              // $scope.isAuthenticated = false;
              // // Handle login errors here
              // $scope.error = 'Error: Invalid user or password';
              // $scope.welcome = '';
            });

        }
      });
      var checkClose = function(){
        /*SET FACEBOOK BUTTON TO WAITING*/
        $timeout(function(){
          if(popupWin.closed && !success){
            /*LOGIN BAILED: SET FACEBOOK BUTTON TO INIT*/
          }
          else if(popupWin.closed){
            /*LOGIN COMPLETE: SET FACEBOOK BUTTON TO INACTIVE*/
          }
          else{
            checkClose();
          }
        },500);
      };
      checkClose();
    }
  }
]);