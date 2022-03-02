'use strict';
angular.module('myApp')
    .factory('subjectFactory',['$http', function ($http) {
        var subjectFactory = {};
        var list =[];
        var self = this;

        subjectFactory.getSubjects=function(){
            console.log("Test ");
            var promise = $http.get('http://localhost:8080/subjects').then(response => {
                list = response.data;
                //console.log(response.data);
                return list;
            }).catch(reason => alert(reason));
            // var promise = $http.get('db/Subjects.json').then(response => {
            //     list = response.data;
            //     //console.log(response.data);
            //     return list;
            // }).catch(reason => alert(reason));

            return promise;
        };
        subjectFactory.getList=function () {
            console.log('Get List Function');
            console.log(list);
            return list;
        };

        return subjectFactory;
    }]);