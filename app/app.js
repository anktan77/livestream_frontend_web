(function () {
    angular.module('liveStream', [
        'liveStream.products',
        'liveStream.common',
        'liveStream.league',
    ]).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('base', {
            url: "",
            templateUrl: "app/shared/views/baseView.html",
            abstract: true
        })
            .state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/app/home/homeView.html",
                controller: "homeController"
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/login/loginView.html",
                controller: "loginController"
            });
            
        $urlRouterProvider.otherwise('/login');
    }
})();