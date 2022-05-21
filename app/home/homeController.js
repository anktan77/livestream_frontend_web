(function (app) {
    app.controller('homeController', homeController);
    homeController.$inject = ['$scope', '$http', '$cookies'];
    function homeController($scope, $http, $cookies) {
        $scope.getTotalPerson = getTotalPerson;
        $scope.totalPerson = 0;
        $scope.blockUser = 0;
        $scope.userNotActive = 0;
        $scope.userActive = 0;
        var baseUrl = 'http://127.0.0.1:8098/'
        var accessToken = $cookies.get('access_token');
        console.log("token:", accessToken);
        function getTotalPerson() {
            var req = {
                method: 'GET',
                url: baseUrl + 'api/Customers/Getcustomers',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            }

            $http(req)
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