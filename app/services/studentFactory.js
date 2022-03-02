'use strict';
angular.module('myApp')
    .factory('studentFactory',['$http', function ($http) {
        var studentFactory = {};
        var list =[];
        var isLogin = false;
        var self = this;

        studentFactory.getIsLogin=()=>{
            return isLogin;
        };
        studentFactory.setIsLogin =(value)=>{
            isLogin = value;
        }

        studentFactory.checkLogin=(username, password)=>{
            var params = {username: username, password:password};

            var promise = $http.post('http://localhost:8080/students/checkLogin',params)
            .then(response =>{
                return response.data;
            });
            return promise;
        }

        studentFactory.getStudents=function(){
            console.log("Test ");
            var promise = $http.get('http://localhost:8080/students/').then(response => {
                list = response.data;
                //console.log(response.data);
                return list;
            }).catch(reason => alert(reason));

            return promise;
        };
        studentFactory.getList=function () {
            console.log('Get List Function');
            console.log(list);
            return list;
        };

        return studentFactory;
    }]);