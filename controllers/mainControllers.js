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

                $scope.error = true;
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

.controller('AvailabilityCtrl', function ($scope, AuthService, API_ENDPOINT, $http, $state) {
     
    $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


    $scope.shifts = { //stores start and end times for selected shifts for each day
        'Monday' : [],
        'Tuesday' : [],
        'Wednesday' : [],
        'Thursday' : [],
        'Friday' : [],
    };
    // shifts look like: 
    // ex: {start: "8:00AM", end: "11:00AM", startId: 8, endId: 11, name: "8:00AM-11:00AM"}

   $scope.availableTimes = [
        {id: 8, name: '8:00 AM'},
        {id: 8.5, name: '8:30 AM'},
        {id: 9, name: '9:00 AM'},
        {id: 9.5, name: '9:30 AM'},
        {id: 10, name: '10:00 AM'},
        {id: 10.5, name: '10:30 AM'},
        {id: 11, name: '11:00 AM'},
        {id: 11.5, name: '11:30 AM'},
        {id: 12, name: '12:00 PM'},
        {id: 12.5, name: '12:30 PM'},
        {id: 13, name: '1:00 PM'},
        {id: 13.5, name: '1:30 PM'},
        {id: 14, name: '2:00 PM'},
        {id: 14.5, name: '2:30 PM'},
        {id: 15, name: '3:00 PM'},
        {id: 15.5, name: '3:30 PM'},
        {id: 16, name: '4:00 PM'},
        {id: 16.5, name: '4:30 PM'},
        {id: 17, name: '5:00 PM'},
        {id: 17.5, name: '5:30 PM'},
        {id: 18, name: '6:00 PM'},
        {id: 18.5, name: '6:30 PM'},
        {id: 19, name: '7:00 PM'},
        {id: 19.5, name: '7:30 PM'},
        {id: 20, name: '8:00 PM'},
        {id: 20.5, name: '8:30 PM'},
        {id: 21, name: '9:00 PM'},
        {id: 21.5, name: '9:30 PM'},
        {id: 22, name: '10:00 PM'},
   ];

   $scope.startSelect = $scope.availableTimes[0]; // sets initial values for the select boxes
   $scope.endSelect = $scope.availableTimes[1];


   $scope.getId = function(name) { 
        for(var i = 0; i < $scope.availableTimes.length; i++) {
            if($scope.availableTimes[i].name == name) {
                return $scope.availableTimes[i].id;
            }
        }
   }

   

    
   $scope.addShift = function(row, strt, en) { //adds to the shifts object in the controller, used for submitting and affects the buttons displayed. "strt" and "end" are strings


    var startId = $scope.getId(strt);
    var endId = $scope.getId(en);

    if(startId >= endId) {
        alert('Invalid Time!');
        return;
    }

    for(var i = 0; i < $scope.shifts[row].length; i++) {
        var currStartId = $scope.shifts[row][i].startId;
        var currEndId = $scope.shifts[row][i].endId;
        var currStart = $scope.shifts[row][i].start;
        var currEnd = $scope.shifts[row][i].end;

        if(currStartId == startId) {
            if(endId <= currEndId) { //same start time, earlier or same end time, no update
                return;
            } else { //same start time, later end time, update end
                $scope.removeShift(row,currStartId, currEndId);
                $scope.shifts[row].push({start : strt, end : en, name: strt+ "-" + en, startId: startId, endId: endId});
                return;
            }
        } else if (startId < currStartId) { 
            if(endId >= currEndId) {    //earlier start time, later or same end time, update start and end
                $scope.removeShift(row,currStartId, currEndId);
                $scope.shifts[row].push({start : strt, end : en, name: strt+ "-" + en, startId: startId, endId: endId});
                return;
            } else if(endId < currEndId && endId >= currStartId){ // starts before and ends before(and overlaps), update start 
                $scope.removeShift(row,currStartId, currEndId);
                $scope.shifts[row].push({start : strt, end : currEnd, name: strt+ "-" + currEnd, startId: startId, endId: currEndId});
                return;
            }
        } else if (startId > currStartId) {
            if(endId > currEndId && startId <= currEndId) { //starts after, ends after(and overlaps), update end
                $scope.removeShift(row,currStartId, currEndId);
                $scope.shifts[row].push({start : currStart, end : en, name: currStart+ "-" + en, startId: currStartId, endId: endId});
                return;
            } else if(endId < currEndId){ //starts after, ends before, no update
                return;
            }
        }
    }
    $scope.shifts[row].push({start : strt, end : en, name: strt+ "-" + en, startId: startId, endId: endId}); //no overlaps or conflicts, just add
}

        
   $scope.removeShift = function(row, start, end) { //removes from the shifts object. start and end are Ids
        for(i = 0; i < $scope.shifts[row].length; i++) {
            if($scope.shifts[row][i].startId == start) {
                if($scope.shifts[row][i].endId = end) {
                    $scope.shifts[row].splice(i, 1);
                    return;
                }
            }
        }
   }

   $scope.submitAvailability = function() {
       //process the info stored in the shifts object and send appropriate info to the db
    };

})
.controller('CalendarCtrl', function() {

});
