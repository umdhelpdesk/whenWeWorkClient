angular.module('hdsp')
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
.constant('API_ENDPOINT', {
  //url: 'http://localhost:8080'
  // url: 'http://ec2-54-213-161-27.us-west-2.compute.amazonaws.com:8080/api'
  url: 'http://ec2-54-213-161-27.us-west-2.compute.amazonaws.com:8080/api'
});
