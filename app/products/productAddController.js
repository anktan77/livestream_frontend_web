(function (app) {
    app.controller('productAddController', productAddController);
    productAddController.$inject = ['$scope', '$http', '$state','notificationService'];

    function productAddController($scope, $http, $state, notificationService) {
        $scope.AddProduct = AddProduct;
        $scope.uploadFile = uploadFile;
        $scope.data = [
            { id: 0, name: 'Khóa tài khoản' },
            { id: 1, name: 'Tài khoản đang hoạt động' },
            { id: 2, name: 'Tài khoản không hoạt động' }
        ];
        $scope.SelectFile = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.PreviewImage = e.target.result;
                $scope.product.ImageView = e.target.result;
                $scope.$apply();
            };
            reader.readAsDataURL(e.target.files[0]);
        };
        function uploadFile() {
            $('#filePath').on('change', function () {
                var filePath = $(this).val();
                $scope.ImageView = filePath;
            });
        }
        function AddProduct() {
            $http.post('http://127.0.0.1:8097/api/Customers/PostCustomer', $scope.product)
                .then(function (response) {
                    notificationService.displayInfo("Thêm dữ liệu thành công");
                    $state.go('products');
                    console.log("OK:", response.data);
                }).catch(function (response) {
                    notificationService.displayError("Thêm không thành công");
                    console.log("ERROR:", response);
                });
        }      
    }
})(angular.module('liveStream.products'));