 
var myApp = angular.module('HomeApp', []);

myApp.controller('Homes', function ($scope, $http, $location, $window) {
    var vm = $scope;
        $scope.cust = {};
        $scope.message = '';
        $scope.result = "color-default";
        $scope.isViewLoading = false;

        var notificationDeatils;

        $scope.sRefNo = $window.sRefNo;

        var refNo;

        vm.GetNotification = function (sRefNo, sRoleId) {

            refNo = sRefNo;

            var Condition;

            if (sRoleId == 2)
            {
                Condition = "WHERE manager_ref_no in(" + refNo + ",0) and role_id = "+sRoleId+" and delete_status=0";
            }
            else if (sRoleId == 1 || sRoleId == 9 || sRoleId == 10)
            {
                Condition = "WHERE role_id in(" + sRoleId + ",0) and delete_status=0";
            }
            else
            {
                Condition = "WHERE role_id = 0 and delete_status=0";
            }

            var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: 'POST',
                url: 'GetNotification',
                data:msg2
            }).then(function (response) {

                vm.notificationDeatils = response.data;


                $scope.notiCount = response.data.length;



            }, function (error) {

            });
           
        };

        //vm.ViewEmployeeInfo = function () { //two controller call Don't delete

        //    $scope.$emit('eventName', { message: refNo });  --> First Controller
    //};
        //$scope.$on('eventName', function (event, args) {---> Second Controller

        //    alert("Worked");   

        //});
});
   
