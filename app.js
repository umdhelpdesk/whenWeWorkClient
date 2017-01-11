var app = angular.module('hdsp', ['ui.router','ui.bootstrap']);

app.config( function($stateProvider, $urlRouterProvider, $locationProvider){
    //$locationProvider.html5Mode(true);
    $stateProvider
    .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'LoginCtrl'
    })
    .state('signup',{
        url:'/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
    })
    .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
    })
    .state('dashboard.addAvailability',{
        url:'/availability',
        templateUrl: 'views/availability.html',
        controller: 'AvailabilityCtrl'
    })
    .state('calendar',{
        url:'/calendar',
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl'
    });


    $urlRouterProvider.otherwise('/signin');
});

//.run is like a main function
app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS){
   $rootScope.$on('stateChangeStart', function(event, next, nextParams, fromState){
       if(!AuthService.isAuthenticated()){
           console.log(next.name);
           if(next.name !== 'signin' && next.name !== 'signup'){
              event.preventDefault();
              $state.go('signin');
           }
       }
   });
});
