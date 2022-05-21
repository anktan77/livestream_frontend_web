(function (app) {
    app.controller('productListController', productListController);
    productListController.$inject = ['$scope', '$http', '$ngBootbox','notificationService'];
    function productListController($scope, $http, $ngBootbox, notificationService ) {
        $scope.products = [];
        $scope.totalCount = 0;
        $scope.selectAll = selectAll;
        $scope.search = search;
        $scope.keyword = '';
        $scope.currentPage = 1;
        $scope.pageChangeHandler = pageChangeHandler;
        $scope.deleteProduct = deleteProduct;
        $scope.getProduct = getProduct;


        var baseUrl = "http://127.0.0.1:8098/api/Customers/Getcustomers";
        function getProduct() {
            $http.get(baseUrl)
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.totalCount = response.data.length;
                    notificationService.displayInfo("Có tất cả " + $scope.totalCount + " sản phẩm");
                }).catch(function (response) {
                    notificationService.displayError("Load không thành công");
                });
        }
       

        // chọn tất cả
        $scope.isAll = false;
        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.products, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.products, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }

        // tìm kiếm
        function search() {
            var config = $scope.keyword;
            if (config === '') {
                $http.get(baseUrl)
                    .then(function (response) {
                        $scope.products = response.data;
                        $scope.totalCount = response.data.length;
                        notificationService.displaySuccess("Tìm kiếm thành công , có tất cả " + $scope.totalCount + " sản phẩm");
                        console.log("OK:", response.data);
                    }).catch(function (response) {
                        console.log("ERROR:", response);
                    });
            } else {
                $http.get('http://127.0.0.1:8097/api/Customers/Getcustomer?email=' + config)
                    .then(function (response) {
                        $scope.products = response.data;
                        $scope.totalCount = response.data.length;
                        if ($scope.totalCount === 0) {
                            notificationService.displayWarning("Không có kết quả cần tìm");
                        }
                        else {
                            notificationService.displaySuccess("Tìm kiếm thành công , có tất cả " + $scope.totalCount + " sản phẩm");
                        }                       
                        
                    }).catch(function (response) {
                        notificationService.displayWarning("Không có kết quả cần tìm");
                    });
            }
           
        }

        function pageChangeHandler(number) {
            $scope.currentPage = number;
        }

        function deleteProduct(Id) {
            $ngBootbox.confirm('Bạn có chắc chắn muốn xóa Id: ' + Id).then(function () {
                $http.delete('http://127.0.0.1:8097/api/Customers/DeleteCustomer?id=' + Id)
                    .then(function (response) {
                        notificationService.displaySuccess("Xóa thành công");
                        getProduct();
                    }).catch(function (response) {
                        console.log("ERROR:", response);
                    });
            });           
        }

        getProduct();
                     
    }

    app.filter('statusFilter', function () {
        return function (input) {
            if (input === 0) {
                return "Tài khoản bị khóa";
            }
            else {
                if (input === 1) {
                    return "Tài khoản đang hoạt động";
                }
                else {
                    return "Tài khoản không hoạt động";
                }
            }
        }
    });
})(angular.module('liveStream.products'));