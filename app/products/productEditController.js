(function (app) {
    app.controller('productEditController', productEditController);
    productEditController.$inject = ['$scope', '$http', '$state', '$stateParams','notificationService'];
    function productEditController($scope, $http, $state, $stateParams, notificationService) {
        $scope.data = [
            { id: 0, name: 'Khóa tài khoản' },
            { id: 1, name: 'Tài khoản đang hoạt động' },
            { id: 2, name: 'Tài khoản không hoạt động' }
        ];
        $scope.UpdateProduct = UpdateProduct;
        $scope.SelectFile = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.products.ImageView = e.target.result;
                $scope.$apply();
            };
            reader.readAsDataURL(e.target.files[0]);
        };
        function loadProduct() {
            var config = $stateParams.id;
            $http.get('http://127.0.0.1:8097/api/Customers/GetCustomerById?id=' + config)
                .then(function (response) {
                    notificationService.displayInfo("Load Id: " + config + " thành công");
                    $scope.products = response.data;
                    console.log("Status:", $scope.products.Status);
                    console.log("OK:", response.data);
                }).catch(function (response) {
                    notificationService.displayError("Load không thành công");
                    console.log("ERROR:", response);
                });
        }

        function UpdateProduct() {
            $http.put('http://127.0.0.1:8097/api/Customers/PutCustomer?id=' + $stateParams.id, $scope.products )
                .then(function (response) {
                    notificationService.displaySuccess("Update thành công");
                    $state.go('products');                    
                    console.log("OK:", response.data);
                }).catch(function (response) {
                    notificationService.displayError("Update không thành công");
                    console.log("ERROR:", response);
                });
        }

        loadProduct();

    }
})(angular.module('liveStream.products'));