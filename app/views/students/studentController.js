'use strict';

angular.module('myApp.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listStudents', {
            templateUrl: 'views/students/list.html',
            controller: 'StudentCtrl',
            resolve: {
                initialData: (studentFactory) => {
                    return studentFactory.getStudents();
                }
            }
        }).when('/login',{
            templateUrl: 'views/students/login.html',
            controller: 'LoginCtrl'
        }).when('/logout',{
            templateUrl: 'views/students/logout.html',
            controller: 'LogoutCtrl'
        });
    }])
    .controller('StudentCtrl', 
    ['studentFactory','$scope', function(studentFactory,$scope) {
        $scope.students = [];
        
        studentFactory.getStudents()
            .then(data=>{
                $scope.students = data;
            }, reason=>{
                $scope.error = reason;
            });

    }])
    .controller('LoginCtrl', 
    ['studentFactory','$scope','$location', function ( studentFactory, $scope, $location) {
        $scope.loginForm = {};
        $scope.errorMessage = null;

        $scope.checkLogin= function () {
            studentFactory.checkLogin($scope.loginForm.username, $scope.loginForm.password)
            .then(data => {
                if (data != null ){
                    studentFactory.setIsLogin(true);
                    $location.path('/');
                    $scope.errorMessage = null;
                }else{
                    studentFactory.setIsLogin(false);
                    $scope.errorMessage = "Invalid username or password";
                }

            }).catch(reason => {
                $scope.errorMessage = "Invalid username or password";
            });
        };
    }])
    .controller('LogoutCtrl', 
    ['studentFactory','$scope','$location', function ( studentFactory, $scope, $location) {
        $scope.logout = function () {
            studentFactory.setIsLogin(false);
            $location.path('/');
        };
        $scope.cancelLogout = function () {
            $location.path('/');
        };
    }]);

