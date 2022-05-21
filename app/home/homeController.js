(function (app) {
    app.controller('homeController', homeController);
    homeController.$inject = ['$scope','$http'];
    function homeController($scope,$http) {
        $scope.getTotalPerson = getTotalPerson;
        $scope.totalPerson = 0;
        $scope.blockUser = 0;
        $scope.userNotActive = 0;
        $scope.userActive = 0;
        function getTotalPerson() {
            $http.get('http://127.0.0.1:8098/api/Customers/Getcustomers')
                .then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        if (value.Status === 0) {
                            $scope.blockUser++;
                        }
                        else {
                            if (value.Status === 2) {
                                $scope.userNotActive++;
                            }
                            else {
                                $scope.userActive++;
                            }
                        }
                    });
                    $scope.totalPerson = response.data.length;
                    console.log("OK:", response.data.length);
                    console.log("OK:", response.data);
                }).catch(function (response) {
                    console.log("ERROR:", response);
                });
        }
        getTotalPerson();
    }

   
})(angular.module('liveStream'));