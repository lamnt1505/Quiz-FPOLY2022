'use strict';

angular.module('myApp.subject', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listSubjects', {
            templateUrl: 'views/subjects/list.html',
            controller: 'SubjectCtrl',
            resolve: {
                initialData: (subjectFactory) => {
                    return subjectFactory.getSubjects();
                }
            }
        });
    }])
    .controller('SubjectCtrl', ['subjectFactory','$scope',function (subjectFactory, $scope) {
        $scope.subjects = subjectFactory.getList();

        $scope.pageSize = 8;
        $scope.begin = 0;
        
        $scope.pageCount = Math.ceil($scope.subjects.length/$scope.pageSize);
        $scope.prop = "name";

        $scope.repaginate = function(){
            $scope.begin = 0;
            $scope.pageCount = Math.ceil($scope.subjects.length/$scope.pageSize);
        }
        $scope.first = function(){
            $scope.begin = 0;
        }
        $scope.previous = function(){
             if ($scope.begin > 0){
                 $scope.begin -= $scope.pageSize;
             }
        }
        $scope.next = function(){
            if ($scope.begin <  ($scope.pageCount - 1) * $scope.pageSize){
                $scope.begin = $scope.pageSize;
            }
        }
        $scope.last = function(){
            $scope.begin = ($scope.pageCount - 1) * $scope.pageSize;
        }

        $scope.sortBy = function(prop){
            $scope.prop = prop;
        }

        subjectFactory.getSubjects()
            .then(data =>{
                $scope.subjects = data;
                $scope.pageCount = Math.ceil($scope.subjects.length/$scope.pageSize);

            }, reason =>{
                $scope.error = reason;
            })

        $scope.viewby = 6;
        $scope.totalItems = $scope.subjects.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }
    }]);