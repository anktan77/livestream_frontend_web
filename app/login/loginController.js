(function (app) {
    app.controller('loginController', loginController);
    loginController.$inject = ['$scope', '$state', '$http', '$cookies', '$window'];
    function loginController($scope, $state, $http, $cookies, $window) {
        var baseUrl = 'http://127.0.0.1:8098/';
        const loginButton = document.getElementById("login-form-submit");
        const loginForm = document.getElementById("login-form");
        //const email = document.getElementById("email-field").value;
        //const password = document.getElementById("password-field").value;
        loginButton.addEventListener("click", (e) => {
             e.preventDefault(); // không cho gửi form khi nhấn vào submit
             checkLogin($scope.email, $scope.password);
        });

        loginButton.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                checkLogin($scope.email, $scope.password);
            }
        });

        function checkLogin(email, password) {
            var param = "username=" + email + "&password=" + password + "&grant_type=" + "password";
            var now = new $window.Date(),
                // this will set the expiration to 6 months
                exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
            $http.post(baseUrl + 'api/account/login', param)
                .then(function (response) {
                    // store cookies
                    $cookies.put('access_token', response.data.access_token);
                    $state.go('home');
                    console.log("OK:", response.data);
                }).catch(function (response) {
                    document.getElementById("invalid-login").innerHTML = "Sai tài khoản mật khẩu";
                    console.log("ERROR:", response);
                });
        }
    }
})(angular.module('liveStream'));