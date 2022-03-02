'use strict';

angular.module('myApp.quiz', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/takeQuiz/:subjectCode', {
            templateUrl: 'views/quizs/quiz.html',
            controller: 'QuizCtrl',
        });
    }])
    .controller('QuizCtrl', ['quizFactory','$scope','$routeParams','$interval',function (quizFactory, $scope, $routeParams,$interval) {
        console.log('Quiz controller')
        $scope.currentQuestion = 0;
        $scope.questions=[];
        $scope.time = 60;
        $scope.quizMarks = 0;
        $scope.answer = {};

        var stop = $interval(()=>{$scope.time --}, 1000);
        quizFactory.getQuestions($routeParams.subjectCode).then((data)=>{
            
            let shuffled = data
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .slice(0, 10)
                
            $scope.questions = shuffled;
            console.log(shuffled);
        });
        // quizFactory.getQuestions($routeParams.subjectCode).then((data)=>{
        //     $scope.questions = data;
        // });

        $scope.question = function ()  {
            console.log($scope.questions[$scope.currentQuestion]);
            return $scope.questions[$scope.currentQuestion];
        };
        $scope.setQuestionIndex = function (newIndex) {
            console.log('set question index: '+$scope.answer.choice + " ---- "+ $scope.question().AnswerId)
            if ($scope.answer.choice == $scope.question().answerId){
                $scope.quizMarks += $scope.question().marks;
                console.log("count marks");
            }

            $scope.currentQuestion = newIndex;

            return $scope.currentQuestion;
        };
        $scope.questionTotal = function (param) {
            return $scope.questions.length;
        }
        $scope.sumup = false;
        $scope.submitQuiz = function () {
            console.log($scope.answer + " --quiz-- "+ $scope.question().AnswerId)
            if ($scope.answer === $scope.question().answerId){
                $scope.quizMarks += $scope.question().marks;
                console.log("count marks");
            }

            $scope.sumup = true;
            $interval.cancel(stop);
        }
    }]);
