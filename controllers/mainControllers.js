angular.module('hdsp')

.controller('LoginCtrl', function ($scope, AuthService, $state) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.login = function () {
            AuthService.login($scope.user).then(function (msg) {
                $state.go('dashboard'); //If succesfull
            }, function (errMsg) {
                console.log("Error");
            });
        };

    })

.controller('SignupCtrl', function ($scope, AuthService, $state) {
    $scope.user = {
        firstName: '',
        lastName: '',
        password: '',
        email: ''
    };

    $scope.signup = function () {
        AuthService.signup($scope.user).then(function (msg) {
            $state.go('signin');
            //todo success message

        }, function (errMsg) {
            //Todo failed signup message
        });
    };
})

.controller('DashboardCtrl', function ($scope, AuthService, API_ENDPOINT, $http, $state) {
    //For bootstrap ui
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;






    $scope.memberinfo = "";
    $scope.getInfo = function () {
        $http.get(API_ENDPOINT.url + '/memberinfo').then(function (result) {
            $scope.memberinfo = result.data;
        }, function(err){
            $state.go('signin');// when user is not signed in
        });
    };

    $scope.getInfo();

    $scope.logout = function() { //Call function to logout
       AuthService.logout();
       $state.go('signin');
    };
})

.controller('AvailabilityCtrl', function() {
    // TODO: Sprint #2
});
