
var myApp = angular.module('Employeedetails', []);

myApp.controller('Employees', function ($scope, $http, $location, $window) {
    var vm = $scope;
    $scope.cust = {};
    $scope.message = '';
    $scope.result = "color-default";
    $scope.isViewLoading = false;
    $scope.refNo = $window.refNo;
    $scope.roleId = $window.roleId;
    //$scope = vm;

    var password, refNo, userRef, delRef, delExp, userRoleID;

    var scale_name, scale_id;

    var curDate;

    var salaryFill;

    var oAPICall = new APICall();

    vm.assignRef = function (ref) {

        userRef = ref;

    };

    vm.setExpId = function (id) {

        delExp = id;

    };

    vm.setRef = function (ref) {

        delRef = ref;

    };

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [month, day, year].join('/');
    }

    vm.DeleteEmployeeExperience = function () {

        var sCondition = "where emp_exp_det_id = " + delExp

        var valueData = "{delete_status: '1' }";

        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: "POST",
            url: "UpdateEmployeeExperience",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            msgalert("Success", "Experience Deleted", 1);

            //  var exModal = document.getElementById('experience_info');

            //  exModal.style.display = "none";

            //  var exDelModal = document.getElementById('Exper_DeleteModal');

            //  exDelModal.style.display = "none";

            vm.BindValues(sEmpRefNo);

        }, function (error) {

        });
    };

    vm.saveEmployeeExperience = function (id, type) {

        var company = $('#txtCompany' + id).val();
        var location = $('#txtLocation' + id).val();
        var exper = $('#txtExp' + id).val();
        var design = $('#txtDesi' + id).val();
        var refName = $('#txtReference' + id).val();
        var refCont = $('#txtPhonenumber' + id).val();

        if (company == '') {

            msgalert("Error", "Please Enter Company Name", 3);

            return;
        }
        if (location == '') {

            msgalert("Error", "Please Enter Location", 3);

            return;
        }
        if (exper == '') {

            msgalert("Error", "Please Enter Experience", 3);

            return;
        }
        if (design == '') {

            msgalert("Error", "Please Enter Job Position", 3);

            return;
        }


        if (type == 1) {
            var valueData = "{emp_ref_no:'" + sEmpRefNo + "', company_name: '" + company + "', location: '" + location + "',experience: '" + exper + "',designation: '" + design
                + "',reference: '" + refName + "',phone_number: '" + refCont + "',delete_status: '0' }";

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: "POST",
                url: "CreateEmployeeExperience",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {

                msgalert("Success", "Details Saved Successfully", 1);

                vm.BindValues(sEmpRefNo);

            }, function (error) {

            });
        }
        else {
            var sCondition = "where emp_exp_det_id = " + id;

            var valueData = "{company_name: '" + company + "', location: '" + location + "',experience: '" + exper + "',designation: '" + design
                + "',reference: '" + refName + "',phone_number: '" + refCont + "' }";

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: "POST",
                url: "UpdateEmployeeExperience",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {

                msgalert("Success", "Details Updated Successfully", 1);

                //var exModal = document.getElementById('experience_info');

                // exModal.style.display = "none";

                vm.BindValues(sEmpRefNo);

            }, function (error) {

            });
        }



    };

    $scope.GetEmpExp = function (refNo) {
        vm.details = [];
        // $(loading).modal('show');

        var param = {
            WorkWeek: 1

        }

        var Condition = "where delete_status=0 and emp_ref_no=" + refNo;

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'GetEmpExpr',
            data: msg2
        }).then(function (response) {

            vm.details = response.data


        }, function (error) {

        });

    };

    vm.GetEmplist = function (roleId, refNo) {
        var Condition;
        var param = {
            WorkWeek: 1
        }

        userRoleID = roleId;

        var paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(refNo);

        paramNames.push('RoleId');

        paramValues.push(roleId);

        paramNames.push('type');

        paramValues.push(1);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLists',
            data: msg2
        }).then(function (response) {
            vm.EmpList = response.data

            for (var i = 0; i < vm.EmpList.length; i++) {
                if (vm.EmpList[i]["file_path"] === undefined) {
                    vm.EmpList[i]["file_path"] = "../Content/Image/avatar.png";
                }
            }

        }, function (error) {

        });

    };


    vm.GetAttendanceMasterValues = function () {

        var Condition = "";

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectAttendanceMaster',
            data: msg2
        }).then(function (response) {
            vm.AttendanceType = response.data

            //for (var i = 0; i < vm.EmpList.length; i++) {

            //}

        }, function (error) {

        });


    };

    vm.SaveAttendance = function (refNo, roleId) {

        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this)[0].id;
        });

        if (val.length == 0) {
            msgalert("Error", "Please Choose any one Employee", 3)
            return;
        }

        var atype = $('#ddlAttType').val();

        if (atype == -2) {
            msgalert("Error", "Please Choose valid attendance type", 3)
            document.getElementById('ddlAttType').style.borderColor = "red";
            return;
        }
        else {
            document.getElementById('ddlAttType').style.borderColor = "#e3e3e3";
        }

        if (val[0] == "checkall") {
            val[0] = 0;
        }

        var dt = $('#txtDate').val();

        var spDt = dt.split('/');

        var day = spDt[0];

        var month = spDt[1];

        var year = spDt[2];

        curDate = oAPICall.GetServerDateOm();

        var success;

        var temp = 0;

        for (var i = 0; i < val.length; i++) {
            var values = val[i] + '~' + month + '~' + year + '~' + day + '~' + atype + '~';

            var paramNames = [], paramValues = [];

            paramNames.push('sRefNo');

            paramValues.push(refNo);

            paramNames.push('sProcBulkData');

            paramValues.push(values);

            var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: 'POST',
                url: 'SaveAttendance',
                data: msg2
            }).then(function (response) {
                if (temp == 0) {
                    loader(1);
                }


                vm.Sample = response.data

                temp++;

                if (temp == val.length) {
                    var result = vm.Sample[0]["ResultMsg"];

                    if (result == "Inserted" || result == "Updated") {
                        vm.GetOneDayValue(refNo, roleId)

                        loader(0);

                        if (month < 4 && atype == 5) {

                        }

                        msgalert("Success", "Attendance Marked Successfully", 1);
                    }
                    else {
                        msgalert("Error", "Unknown Error Occured...!", 3);
                    }
                }



            }, function (error) {

            });

        }


    };

    vm.GetOneDayValue = function (refno, roleID) {

        var dt = $('#txtDate').val();

        var spDt = dt.split('/');

        var day = spDt[0];

        var month = spDt[1];

        var year = spDt[2];

        if (roleID == 1 || roleID == 9 || roleID == 10) {
            var Condition = "where month = " + month + " and year = " + year + "  and day = " + day + " and delete_status = 0 order by attendance_type desc";
        }
        else {
            var Condition = "where month = " + month + " and year = " + year + "  and day = " + day + " and report_to_manager = " + refno + " and delete_status = 0 order by attendance_type desc";
        }

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectCurrentAttendance',
            data: msg2
        }).then(function (response) {
            vm.CurrentAttendance = response.data

            if (vm.CurrentAttendance.length >= 0) {
                if (roleID == 1 || roleID == 9 || roleID == 10) {
                    var Condition = "where delete_status = 0 order by emp_ref_no asc";
                }
                else {
                    var Condition = "where report_to_manager = " + refno + " and delete_status = 0 order by emp_ref_no asc";
                }

                var strJsonDatas = eval({ strCondition: Condition });

                var msg2 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'SelectEmployeeDetails',
                    data: msg2
                }).then(function (response) {
                    vm.CurrentDateAttendance = response.data

                    var temp = 0;

                    if (vm.CurrentDateAttendance.length != 0) {
                        var presentValue = vm.CurrentAttendance;

                        var curValue = presentValue;

                        var length = curValue.length;

                        for (var i = 0; i < vm.CurrentDateAttendance.length; i++) {
                            temp = 1;

                            if (length != 0) {
                                for (var j = 0; j < length; j++) {
                                    if (curValue[j]["emp_ref_no"] != vm.CurrentDateAttendance[i]["emp_ref_no"]) {
                                        var obj = {
                                            emp_ref_no: vm.CurrentDateAttendance[i]["emp_ref_no"],
                                            emp_name: vm.CurrentDateAttendance[i]["emp_first_name"] + ' ' + vm.CurrentDateAttendance[i]["emp_last_name"]
                                        };
                                    }
                                    else {
                                        temp = 0;
                                    }
                                }
                                if (temp != 0) {
                                    vm.CurrentAttendance.push(obj);
                                }


                            }
                            else {
                                var obj = {
                                    emp_ref_no: vm.CurrentDateAttendance[i]["emp_ref_no"],
                                    emp_name: vm.CurrentDateAttendance[i]["emp_first_name"] + ' ' + vm.CurrentDateAttendance[i]["emp_last_name"]
                                };

                                vm.CurrentAttendance.push(obj);
                            }
                        }

                        for (var i = 0; i < vm.CurrentAttendance.length; i++) {
                            //for attendance

                            if (vm.CurrentAttendance[i]["attendance_type"] == 1) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-green";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 2) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-orange";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 3) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-black";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 4) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-light-green";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 5) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-red";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 6) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-yellow";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 7) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-blue";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 8) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-light-blue";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 9) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-brown";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 10) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-pink";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 11) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-purple";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 12) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-magenta";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 13) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-dark-blue";
                            }
                            else if (vm.CurrentAttendance[i]["attendance_type"] == 14) {
                                vm.CurrentAttendance[i]["class_name"] = "atType back-grey";
                            }


                            //if (vm.CurrentAttendance[i]["attendance_type"] == 0) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-green";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 1) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-red";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 2) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-blue";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 3) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-orange";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 4) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-dark-blue";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 5) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-brown";
                            //}
                            //else if (vm.CurrentAttendance[i]["attendance_type"] == 6) {
                            //    vm.CurrentAttendance[i]["class_name"] = "atType back-magenta";
                            //}
                        }
                    }

                }, function (error) {

                });
            }
            else {
                for (var i = 0; i < vm.CurrentAttendance.length; i++) {

                    //for attendance

                    if (vm.CurrentAttendance[i]["attendance_type"] == 1) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-green";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 2) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-orange";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 3) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-black";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 4) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-light-green";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 5) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-red";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 6) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-yellow";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 7) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-blue";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 8) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-light-blue";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 9) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-brown";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 10) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-pink";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 11) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-purple";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 12) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-magenta";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 13) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-dark-blue";
                    }
                    else if (vm.CurrentAttendance[i]["attendance_type"] == 14) {
                        vm.CurrentAttendance[i]["class_name"] = "atType back-grey";
                    }

                    //if (vm.CurrentAttendance[i]["attendance_type"] == 0) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-green";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 1) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-red";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 2) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-blue";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 3) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-orange";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 4) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-dark-blue";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 5) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-brown";
                    //}
                    //else if (vm.CurrentAttendance[i]["attendance_type"] == 6) {
                    //    vm.CurrentAttendance[i]["class_name"] = "atType back-magenta";
                    //}
                }
            }

        }, function (error) {

        });


    };

    vm.changeBackground = function (id) {
        var value = $('#' + id).val();

        if (value == 0) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 1) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 2) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 3) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 4) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 5) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }
        else if (value == 6) {
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).style.color = "white";
        }

    };

    vm.GetAttendance = function (roleId, refNo) {
        var month = $('#ddlMonth').val();

        var year = $('#ddlYear').val();

        if (month == 0) {
            msgalert("Error", "Please choose Month", 3);
            return;
        }

        if (year == 0) {
            msgalert("Error", "Please choose Year", 3);
            return;
        }

        var paramNames = [], paramValues = [];

        paramNames.push('sRoleID');

        paramValues.push(roleId);

        paramNames.push('sRefNo');

        paramValues.push(refNo);

        paramNames.push('sMonth');

        paramValues.push(month);

        paramNames.push('sYear');

        paramValues.push(year);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeAttendance',
            data: msg2
        }).then(function (response) {
            vm.AttendaceList = response.data

            vm.GetAttendanceMasterValues();

            if (vm.AttendaceList.length == 0) {
                msgalert("Error", "No Datas Found for this Month", 3);
                return;
            }

            var cdate = new Date();

            var month = cdate.getMonth() + 1;

            var year = cdate.getFullYear();

            $('#txtDate').val(cdate.getDate() + '/' + month + '/' + year);

            vm.GetOneDayValue(refNo, roleId);

            vm.AL = vm.AttendaceList;

            for (var i = 0; i < vm.AL.length; i++) {

                for (var j = 1; j <= 31; j++) {
                    switch (vm.AL[i]["d" + j]) {

                        //For Attendance
                        case 1:
                            //vm.AttendaceList[i]["text" + j] = "N/A";
                            vm.AttendaceList[i]["day" + j] = "fa fa-user-plus";
                            break;
                        case 2:
                            vm.AttendaceList[i]["day" + j] = "fa fa-hourglass-end";
                            break;
                        case 3:
                            vm.AttendaceList[i]["day" + j] = "fa fa-level-down";
                            break;
                        case 4:
                            vm.AttendaceList[i]["day" + j] = "fa fa-check";
                            break;
                        case 5:
                            vm.AttendaceList[i]["day" + j] = "fa fa-times";
                            break;
                        case 6:
                            vm.AttendaceList[i]["day" + j] = "fa fa-clock-o";
                            break;
                        case 7:
                            vm.AttendaceList[i]["day" + j] = "fa fa-user-times";
                            break;
                        case 8:
                            vm.AttendaceList[i]["day" + j] = "fa fa-info";
                            break;
                        case 9:
                            vm.AttendaceList[i]["day" + j] = "fa fa-hourglass-o";
                            break;
                        case 10:
                            vm.AttendaceList[i]["day" + j] = "fa fa-female";
                            break;
                        case 11:
                            vm.AttendaceList[i]["day" + j] = "fa fa-male";
                            break;
                        case 12:
                            vm.AttendaceList[i]["day" + j] = "fa fa-stethoscope";
                            break;
                        case 13:
                            vm.AttendaceList[i]["day" + j] = "fa fa-long-arrow-left";
                            break;
                        case 14:
                            vm.AttendaceList[i]["day" + j] = "fa fa-power-off";
                            break;

                        //case -1:
                        //    vm.AttendaceList[i]["text" + j] = "N/A";
                        //    vm.AttendaceList[i]["day" + j] = "fs-9";
                        //    break;
                        //case 0:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-check";
                        //    break;
                        //case 1:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-clock-o";
                        //    break;
                        //case 2:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-stethoscope";
                        //    break;
                        //case 3:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-hourglass-end";
                        //    break;
                        //case 4:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-user-times";
                        //    break;
                        //case 5:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-close";
                        //    break;
                        //case 6:
                        //    vm.AttendaceList[i]["day" + j] = "fa fa-wheelchair";
                        //    break;
                    }
                }

            }

        }, function (error) {

        });

        //    console.log($scope.type);

    };


    vm.GetMyAttendance = function (refNo) {

        var year = $('#ddlYear').val();


        if (year == 0) {
            msgalert("Error", "Please choose Year", 3);
            return;
        }

        var paramNames = [], paramValues = [];

        paramNames.push('sRefNo');

        paramValues.push(refNo);

        paramNames.push('sYear');

        paramValues.push(year);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectAttendance',
            data: msg2
        }).then(function (response) {
            vm.MyAttendaceList = response.data

            //vm.GetAttendanceMasterValues();

            if (vm.MyAttendaceList.length == 0) {
                msgalert("Error", "No Datas Found for this Year", 3);
                return;
            }

            vm.AL = vm.MyAttendaceList;

            for (var i = 0; i < vm.AL.length; i++) {

                for (var j = 1; j <= 31; j++) {
                    switch (vm.AL[i]["d" + j]) {

                        //For Attendance
                        case 1:
                            //vm.AttendaceList[i]["text" + j] = "N/A";
                            vm.AttendaceList[i]["day" + j] = "fa fa-user-plus";
                            break;
                        case 2:
                            vm.AttendaceList[i]["day" + j] = "fa fa-hourglass-end";
                            break;
                        case 3:
                            vm.AttendaceList[i]["day" + j] = "fa fa-level-down";
                            break;
                        case 4:
                            vm.AttendaceList[i]["day" + j] = "fa fa-check";
                            break;
                        case 5:
                            vm.AttendaceList[i]["day" + j] = "fa fa-times";
                            break;
                        case 6:
                            vm.AttendaceList[i]["day" + j] = "fa fa-clock-o";
                            break;
                        case 7:
                            vm.AttendaceList[i]["day" + j] = "fa fa-user-times";
                            break;
                        case 8:
                            vm.AttendaceList[i]["day" + j] = "fa fa-info";
                            break;
                        case 9:
                            vm.AttendaceList[i]["day" + j] = "fa fa-hourglass-o";
                            break;
                        case 10:
                            vm.AttendaceList[i]["day" + j] = "fa fa-female";
                            break;
                        case 11:
                            vm.AttendaceList[i]["day" + j] = "fa fa-male";
                            break;
                        case 12:
                            vm.AttendaceList[i]["day" + j] = "fa fa-stethoscope";
                            break;
                        case 13:
                            vm.AttendaceList[i]["day" + j] = "fa fa-long-arrow-left";
                            break;
                        case 14:
                            vm.AttendaceList[i]["day" + j] = "fa fa-power-off";
                            break;

                        //case -1:
                        //    vm.MyAttendaceList[i]["text" + j] = "N/A";
                        //    vm.MyAttendaceList[i]["day" + j] = "fs-9";
                        //    break;
                        //case 0:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-check";
                        //    break;
                        //case 1:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-clock-o";
                        //    break;
                        //case 2:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-stethoscope";
                        //    break;
                        //case 3:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-hourglass-end";
                        //    break;
                        //case 4:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-user-times";
                        //    break;
                        //case 5:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-close";
                        //    break;
                        //case 6:
                        //    vm.MyAttendaceList[i]["day" + j] = "fa fa-wheelchair";
                        //    break;
                    }
                }

            }

        }, function (error) {

        });

        //    console.log($scope.type);

    };

    vm.getTitle = function (iconClass) {
        switch (iconClass) {
            case "fa fa-user-plus":
                return "Full Day";
            case "fa fa-hourglass-end":
                return "Half Day";
            case "fa fa-level-down":
                return "Loss of Pay";
            case "fa fa-check":
                return "Present";
            case "fa fa-times":
                return "Absent";
            case "fa fa-clock-o":
                return "Planned Leave";
            case "fa fa-user-times":
                return "Casual Leave";
            case "fa fa-info":
                return "Comp Off";
            case "fa fa-hourglass-o":
                return "LOP Half Day";
            case "fa fa-female":
                return "Maternity Leave";
            case "fa fa-male":
                return "Paternity Leave";
            case "fa fa-stethoscope":
                return "Medical Leave";
            case "fa fa-long-arrow-left":
                return "Previous Year Leave";
            case "fa fa-power-off":
                return "Holiday";
            default:
                return "";
        }
    };

    vm.DeleteEmployee = function () {

        var valueData = "{ delete_status: 1}";

        var sCondition = "WHERE emp_ref_no = " + delRef;

        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        //  var leave = getLeaveCounts(leaveType);

        var post = $http({
            method: "POST",
            url: "UpdateEmployeeDetails",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {

            var valueData = "{ delete_status: 1}";

            var sCondition = "WHERE ref_no = " + delRef;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post1 = $http({
                method: "POST",
                url: "UpdateEmployeeUserMaster",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post1.success(function (data, status) {

                msgalert("Success", "Employee Deleted Successfully", 1);

                window.location.reload();

            });

        });

    };

    vm.GetScalelist = function (refNo) {

        var paramNames = [], paramValues = [];

        paramNames.push('empRef');

        paramValues.push(refNo);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSalarySlabScaleList',
            data: msg2
        }).then(function (response) {

            vm.ScaleList = response.data


        }, function (error) {

        });

    };

    vm.GetSalaryValues = function () {

        var id = $("#ddlSalaryScale").val();

        scale_id = id;

        var Condition = "where sl_no= " + id;

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSalaryScale',
            data: msg2
        }).then(function (response) {

            vm.ScaleValue = response.data

            scale_name = vm.ScaleValue[0]["scale_name"];

        }, function (error) {

        });
    };

    vm.GetSalaryDetails = function (sEmpRefNo) {

        var paramNames = [], paramValues = [];

        paramNames.push('empRef');

        paramValues.push(sEmpRefNo);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeSalaryDetails',
            data: msg2
        }).then(function (response) {

            vm.SalaryValue = response.data

            vm.ScaleValue = response.data

            vm.EmpScaleId = vm.ScaleValue[0]["scale_id"];

            if (vm.ScaleValue[0]["bank_name"] === undefined) {
                vm.ScaleValue[0]["bank_name"] = "HDFC";
            }

            $("#paymentMethod").val(vm.ScaleValue[0]["payment_method"]).change();

            if (vm.ScaleValue[0]["pf_na"] == 1) {
                document.getElementById("pfNA").checked = true;
            }

            if (vm.ScaleValue[0]["esi_na"] == 1) {
                document.getElementById("esiNA").checked = true;
            }

        }, function (error) {

        });

    };

    vm.GetEmployeeSalaryDetails = function (ref) {

        var Condition = "where ref_no= " + ref;

        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeSalary',
            data: msg2
        }).then(function (response) {

            vm.SalaryAmount = response.data

        }, function (error) {

        });

    };

    vm.GetMyInfo = function (ref) {

        vm.GetEmpExp(ref);

        // vm.GetSalaryDetails(ref);

    };

    function resetValues() {
        $("#txtScaleName").val("");
        $("#txtSalBasic").val("");
        $("#txtSalHRA").val("");
        $("#txtSalLiving").val("");
        $("#txtSalConveyance").val("");
        $("#txtSalSpecial").val("");
        $("#txtSalPF").val("");
        $("#txtSalESI").val("");
        $("#txtSalPFemp").val("");
        $("#txtSalESIemp").val("");
        $("#txtSalGratuity").val("");
        $("#txtSalAnnual").val("");
        $("#txtSalGrossPay").val("");
        $("#txtSalNetPay").val("");
        $("#txtSalTotalCost").val("");
    }

    vm.ExpEdit = function (index) {

        var table = document.getElementById('exptbl');

        var rows = index + 1;

        parent.$("#txtexpCmpName").val(table.rows[rows].cells[0].innerText);
        parent.$("#txtexpLoc").val(table.rows[rows].cells[1].innerText);
        parent.$("#txtexpYears").val(table.rows[rows].cells[2].innerText);
        parent.$("#txtexpPos").val(table.rows[rows].cells[3].innerText);
        parent.$("#txtexpContname").val(table.rows[rows].cells[4].innerText);
        parent.$("#txtexpContnumber").val(table.rows[rows].cells[5].innerText);
        parent.$("#hdnExpID").val(table.rows[rows].cells[6].innerText);


        var fName = table.rows[rows].cells[7].innerText;

        var fPath = table.rows[rows].cells[8].innerText;

        var fileName = fPath + '/' + fName;

        if (fName != "") {
            var fileType = fName.split('.');

            fileType = fileType[1];

            if (fileType != "pdf") {

                parent.$('#expDocImg').attr('src', '../content/Image/image_icon.png');

            }

            var a = parent.document.getElementById('expDocDown');

            parent.$('#expDocUpload').addClass('hidden');

            parent.$('#expDocView').removeClass('hidden');

            var sourceFname = fName.split('_');

            sourceFname = sourceFname[sourceFname.length - 1];

            parent.$('#expDoclbl').text(sourceFname);

            a.href = fileName;
        }

        parent.addExper(sEmpRefNo, sEmpName);

    };

    var sEmpRefNo, sEmpName;

    var a_basic, a_HRA, a_living_allowance, a_conveyance_allowance, a_production_allowance, a_transfer_allowance, a_medical_allowance, a_incentives, a_prof_tax, a_pension, a_income_tax;
    var a_others, a_gross_pay, a_PF, a_ESI, a_net_pay, a_PF_employer, a_ESI_employer, a_gratuity, a_annual_bonus, a_total_cost_company, a_total_deduction;

    vm.CalculateAnnualSalary = function () {

        a_basic = parseInt($("#txtSalBasic").val()) * 12;
        a_HRA = parseInt($("#txtSalHRA").val()) * 12;
        a_living_allowance = parseInt($("#txtSalLiving").val()) * 12;
        a_conveyance_allowance = parseInt($("#txtSalConveyance").val()) * 12;
        a_production_allowance = parseInt($("#txtSalProduction").val()) * 12;
        //a_transfer_allowance = parseInt($("#txtSalTransfer").val()) * 12;
        a_medical_allowance = parseInt($("#txtSalMedical").val()) * 12;
        a_incentives = parseInt($("#txtSalIncentive").val()) * 12;
        a_gratuity = parseInt($("#txtSalGratuity").val()) * 12;
        a_annual_bonus = parseInt($("#txtSalAnnual").val()) * 12;
        a_pension = parseInt($("#txtSalPension").val()) * 12;
        a_others = parseInt($("#txtSalOthers").val()) * 12;
        a_prof_tax = parseInt($("#txtSalProftax").val()) * 12;
        a_total_deduction = parseInt($("#txtSalDeduction").val()) * 12;
        a_gross_pay = parseInt($("#txtSalGrossPay").val()) * 12;
        a_net_pay = parseInt($("#txtSalNetPay").val()) * 12;
        a_total_cost_company = parseInt($("#txtSalTotalCost").val()) * 12;
        a_PF = parseInt($("#txtSalPF").val()) * 12;
        a_ESI = parseInt($("#txtSalESI").val()) * 12;
        a_PF_employer = parseInt($("#txtSalPFemp").val()) * 12;
        a_ESI_employer = parseInt($("#txtSalESIemp").val()) * 12;
        a_income_tax = parseInt($("#txtSalIncometax").val()) * 12;

    };

    vm.saveEmployeeSalary = function () {

        var scale = $("#txtScaleName").val();

        var scale_id = $("#ddlSalaryScale").val();

        var basic = $("#txtSalBasic").val();
        var hra = $("#txtSalHRA").val();
        var living = $("#txtSalLiving").val();
        var conveyance = $("#txtSalConveyance").val();
        var production = $("#txtSalProduction").val();
        //var transfer = $("#txtSalTransfer").val();
        var medical = $("#txtSalMedical").val();
        var incentive = $("#txtSalIncentive").val();
        var gratuity = $("#txtSalGratuity").val();
        var Annual = $("#txtSalAnnual").val();
        var pension = $("#txtSalPension").val();
        var incomeTax = $("#txtSalIncometax").val();
        var others = $("#txtSalOthers").val();
        var proftax = $("#txtSalProftax").val();
        var GrossPay = $("#txtSalGrossPay").val();
        var total_deduction = $("#txtSalDeduction").val();
        var NetPay = $("#txtSalNetPay").val();
        var TotalCost = $("#txtSalTotalCost").val();
        var pf = $("#txtSalPF").val();
        var PFemp = $("#txtSalPFemp").val();
        var esi = $("#txtSalESI").val();
        var ESIemp = $("#txtSalESIemp").val();

        var payment = $("#paymentMethod").val();

        var bankName = $("#txtBankname").val();

        if (scale == "" || scale == null) {
            msgalert("Warning", "Please Enter Scale Name", 2);

            return;
        }
        if (basic == "" || basic == null) {
            msgalert("Warning", "Please Enter Basic Salary", 2);

            return;
        }
        if (hra == "" || hra == null) {
            msgalert("Warning", "Please Enter HRA", 2);

            return;
        }
        if (living == "" || living == null) {
            msgalert("Warning", "Please Enter Living Allowance", 2);

            return;
        }
        if (conveyance == "" || conveyance == null) {
            msgalert("Warning", "Please Enter Conveyance Allowance", 2);

            return;
        }
        if (production == "" || production == null) {
            msgalert("Warning", "Please Enter Production Allowance", 2);

            return;
        }
        //if (transfer == "" || transfer == null) {
        //    msgalert("Warning", "Please Enter Transfer Allowance", 2);

        //    return;
        //}
        if (medical == "" || medical == null) {
            msgalert("Warning", "Please Enter Medical Allowance", 2);

            return;
        }
        if (gratuity == "" || gratuity == null) {
            msgalert("Warning", "Please Enter Gratuity", 2);

            return;
        }
        //if (proftax == "" || proftax == null) {
        //    msgalert("Warning", "Please Enter Professional Tax", 2);

        //    return;
        //}
        if (GrossPay == "" || GrossPay == null) {
            msgalert("Warning", "Please Enter Gross Pay", 2);

            return;
        }
        if (total_deduction == "" || total_deduction == null) {
            msgalert("Warning", "Please Enter Total Deduction", 2);

            return;
        }
        if (NetPay == "" || NetPay == null) {
            msgalert("Warning", "Please Enter Net Pay", 2);

            return;
        }
        if (TotalCost == "" || TotalCost == null) {
            msgalert("Warning", "Please Enter Total Cost", 2);

            return;
        }
        if (pf == "" || pf == null) {
            msgalert("Warning", "Please Enter PF", 2);

            return;
        }

        if (PFemp == "" || PFemp == null) {
            msgalert("Warning", "Please Enter PF Employer Contribution", 2);

            return;
        }
        if (esi == "" || esi == null) {
            //msgalert("Warning", "Please Enter ESI", 2);

            //return;

            esi = 0;
        }

        if (ESIemp == "" || ESIemp == null) {
            //msgalert("Warning", "Please Enter ESI Employer Contribution", 2);

            //return;

            ESIemp = 0;
        }

        if (payment < 0) {
            msgalert("Warning", "Please Choose Payment Method", 2);

            return;
        }

        if (payment == 1 && bankName == "") {
            msgalert("Warning", "Please Enter Bank Name", 2);

            return;
        }

        vm.CalculateAnnualSalary();

        //scale_name, scale_id are from GetSalaryValues()

        var curDate = formatDate(new Date());

        var pf_na = 0, esi_na = 0;

        if (document.getElementById("pfNA").checked == true) {
            pf_na = 1;
        }

        if (document.getElementById("esiNA").checked == true) {
            esi_na = 1;
        }

        var valueData = "{scale_name:'" + scale + "',scale_id:'" + scale_id + "',basic:" + basic + ",HRA:" + hra + ",living_allowance:" + living + ",conveyance_allowance:" + conveyance
            + ",production_allowance:" + production + ", medical_allowance:" + medical + ",incentives:" + incentive + ",total_deduction:" + total_deduction + ",pension:" + pension
            + ",income_tax:" + incomeTax + ",others:" + others + ",gross_pay:" + GrossPay + ",PF:" + pf + ",ESI:" + esi + ",net_pay:" + NetPay
            + ",PF_employer:" + PFemp + ",ESI_employer:" + ESIemp + ",gratuity:" + gratuity + ",annual_bonus:" + Annual + ",total_cost_company:" + TotalCost
            + ",a_basic:" + a_basic + ",a_HRA:" + a_HRA + ",a_living_allowance:" + a_living_allowance + ",a_conveyance_allowance:" + a_conveyance_allowance + ",a_production_allowance:" + a_production_allowance
            + ",a_medical_allowance:" + a_medical_allowance + ",a_incentives:" + a_incentives + ",a_total_deduction:" + a_total_deduction + ",a_pension:" + a_pension + ",a_income_tax:" + a_income_tax
            + ",a_others:" + a_others + ",a_gross_pay:" + a_gross_pay + ",a_PF:" + a_PF + ",a_ESI:" + a_ESI + ",a_net_pay:" + a_net_pay + ",a_PF_employer:" + a_PF_employer
            + ",a_ESI_employer:" + a_ESI_employer + ",a_gratuity:" + a_gratuity + ",a_annual_bonus:" + a_annual_bonus + ",a_total_cost_company: " + a_total_cost_company
            + ", payment_method: '" + payment + "',bank_name: '" + bankName + "',updated_by: '" + userRef + "',updated_date: '" + curDate + "',pf_na : " + pf_na + ", esi_na : " + esi_na + "}";

        var sCondition = "where ref_no = " + sEmpRefNo;

        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        var post = $http({
            method: "POST",
            url: "UpdateSalaryDetails",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            if (salaryFill != 1) {
                var sCondition = "where emp_ref_no = " + sEmpRefNo;

                var valueData = "{salary_fill: 1}";

                var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas);

                var post = $http({
                    method: "POST",
                    url: "UpdateEmployeeDetails",
                    data: msg2,
                    dataType: 'json',
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {

                    var Data = "{type: 'Employee Approval', manager_ref_no: '', emp_ref_no: '" + sEmpRefNo + "', page_name: 'Employee Pending Approval', page_url: '../Employee/EmployeePendingApproval', page_id: 10012, role_id: 1, delete_status: 0 }";

                    var strJsonDatas1 = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas1);

                    $http({
                        method: 'POST',
                        url: 'InsertNotification',
                        data: msg2
                    }).then(function (response) {

                        msgalert("Success", "Salary Updated Successfully", 1);

                    });


                }, function (error) {

                });
            }
            else {
                msgalert("Success", "Salary Updated Successfully", 1);
            }


        }, function (error) {

        });
    };

    vm.saveEmployeeEducationDetails = function (ref) {

        var sCondition = "where ref_no = " + ref;

        var sslcDocum, twelthDocum, gradDocum, pgradDocum, syllabus = 0;

        var sslcPer = $('#txtsslcper').val();
        var sslcSyllabus = $('#ddlsslcsyllabus').val();
        var sslcYOP = $('#txtsslcyop').val();
        //var sslcDoc = document.getElementById('sslcDocDown').getAttribute("href");
        var twelthPer = $('#txttwelthper').val();
        var twelthSyllabus = $('#ddltwelthsyllabus').val();
        var twelthYOP = $('#txttwelthyop').val();
        //var twelthDoc = document.getElementById('twelthDocDown').getAttribute("href");
        var grad = $('#ddlGraduate').val();
        var gradYOP = $('#txtgradyop').val();
        //var gradDoc = document.getElementById('gradDocDown').getAttribute("href");
        var postgrad = $('#ddlPGraduate').val();
        var postgradYOP = $('#txtpgradyop').val();
        //var postgradDoc = document.getElementById('pgradDocDown').getAttribute("href");


        if (sslcPer == "") {

            msgalert("Error", "Enter SSLC Percentage", 3);

            return;
        }
        if (sslcSyllabus < 0) {

            msgalert("Error", "Choose SSLC Syllabus", 3);

            return;
        }
        if (sslcYOP == "") {
            msgalert("Error", "Enter SSLC Passed Out Year", 3);

            return;
        }

        if (sslcSyllabus == -1) {
            sslcSyllabus = syllabus;
        }
        if (twelthSyllabus == -1) {
            twelthSyllabus = syllabus;
        }
        if (grad == -1) {
            grad = syllabus;
        }
        if (postgrad == -1) {
            postgrad = syllabus;
        }


        //if (sslcDoc != "null")
        //{
        //    sslcDocum = sslcDoc;
        //}
        //if (twelthDoc != "null")
        //{
        //    twelthDocum = twelthDoc;
        //}
        //if (gradDoc != "null")
        //{
        //    gradDocum = gradDoc;
        //}
        //if (postgradDoc != "null")
        //{
        //    pgradDocum = postgradDoc;
        //}


        //valueData = "{sslc_mark: '" + sslcPer + "', sslc_syllabus: '" + sslcSyllabus + "',sslc_pass_year: '" + sslcYOP + "',sslc_doc: '" + sslcDocum
        //    + "',twelth_mark: '" + twelthPer + "',twelth_syllabus: '" + twelthSyllabus + "',twelth_pass_year: '" + twelthYOP + "',twelth_doc: '" + twelthDocum
        //    + "',graduation: '" + grad + "',graduation_year: '" + gradYOP + "',graduation_doc: '" + gradDocum + "',post_graduation: '" + postgrad
        //    + "',post_graduation_year: '" + postgradYOP + "',post_graduation_doc: '" + pgradDocum + "',is_filled: '1' }";

        valueData = "{sslc_mark: '" + sslcPer + "', sslc_syllabus: '" + sslcSyllabus + "',sslc_pass_year: '" + sslcYOP + "',twelth_mark: '" + twelthPer
            + "',twelth_syllabus: '" + twelthSyllabus + "',twelth_pass_year: '" + twelthYOP + "',graduation: '" + grad + "',graduation_year: '" + gradYOP
            + "',post_graduation: '" + postgrad + "',post_graduation_year: '" + postgradYOP + "',is_filled: '1' }";


        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: "POST",
            url: "UpdateEmployeeEducationDetails",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            msgalert("Success", "Details Updated Successfully", 1);

            //window.location.reload();

        }, function (error) {

        });
    };

    vm.saveEmployeeDetails = function (ref, type) {

        if (ref == "") {
            msgalert("Error", "Invalid Employee", 3);

            return;
        }

        if (type == "") {
            msgalert("Error", "Invalid Details type", 3);

            return;
        }

        var valueData, sCondition;

        var curdate = formatDate(new Date());

        sCondition = "WHERE emp_ref_no = " + ref;

        if (type == "basic") {

            // answer = x > 10 ? 'greater than 10' : 'less than 10';

            var fName = $("#txtFirstName").val();
            var lName = $("#txtLastName").val();
            var dob = $("#txtDOB").val();
            var email = $("#txtEmail").val();
            var gender = $("#EmpGender").val();
            var addr1 = $("#txtAddr1").val();
            var addr2 = $("#txtAddr2").val();
            var city = $("#txtCity").val();
            var state = $("#txtState").val();
            var country = $("#txtCountry").val();
            var pincode = $("#txtPincode").val();
            var mobile = $("#txtContact").val();
            var department = $("#EmpDepartment").val();
            var level = $("#EmpLevel").val();
            var joiningDate = $("#txtJoin").val();

            var designation = $("#EmpDesignation").val();

            var reportManager = $("#EmpManager").val();

            if (fName == "") {
                msgalert("Error", "Enter First Name", 3);

                return;
            }
            if (lName == "") {
                msgalert("Error", "Enter Last Name", 3);

                return;
            }
            if (dob == "") {
                msgalert("Error", "Enter Date of Birth", 3);

                return;
            }
            if (email == "") {
                msgalert("Error", "Enter Email", 3);

                return;
            }
            if (joiningDate == "") {
                msgalert("Error", "Enter Joining Date", 3);

                return;
            }
            if (gender < 0) {
                msgalert("Error", "Choose Gender", 3);

                return;
            }
            if (addr1 == "") {
                msgalert("Error", "Enter Address", 3);

                return;
            }
            if (city == "") {
                msgalert("Error", "Enter City", 3);

                return;
            }
            if (state == "") {
                msgalert("Error", "Enter State", 3);

                return;
            }
            if (country == "") {
                msgalert("Error", "Enter Country", 3);

                return;
            }
            if (pincode == "") {
                msgalert("Error", "Enter Pincode", 3);

                return;
            }
            if (mobile == "") {
                msgalert("Error", "Enter Contact Number", 3);

                return;
            }
            if (department < 0) {
                msgalert("Error", "Choose Department", 3);

                return;
            }
            if (level < 0) {
                msgalert("Error", "Choose Employee Level", 3);

                return;
            }
            if (designation < 0) {
                msgalert("Error", "Choose Designation", 3);

                return;
            }
            if (reportManager < 0) {
                msgalert("Error", "Choose Reporting Manager", 3);

                return;
            }

            if (employeeCompany == 3) {
                var empShift = $("#ddlShift").val();

                var empShiftTime = $("#ddlShiftTime").val();

                if (empShift <= 0) {
                    msgalert("Error", "Choose Employee Shift", 3);

                    return;
                }

                if (empShiftTime <= 0) {
                    msgalert("Error", "Choose Employee working hours", 3);

                    return;
                }
            }

            var roleId = $('#EmpDesignation').children(":selected").attr("id");

            var dt = dob.split('/');

            if (dt[0] > 12) {
                dob = dt[1] + '/' + dt[0] + '/' + dt[2];
            }

            //var roleId = $('#EmpDesignation').val();

            if (department == 9 && designation == 1) //System Admin //subash
            {
                roleId = 2;
            }

            if (level == 1) {
                if (designation == 17) {
                    roleId = 12;
                }
                //else
                //{
                //    roleId = 2;
                //}
            }

            valueData = "{emp_first_name: '" + fName + "', emp_last_name: '" + lName + "',date_of_birth: '" + dob + "',email_id: '" + email + "',emp_joining_date: '" + joiningDate
                + "',gender: '" + gender + "',local_street: '" + addr1 + "',local_level: '" + addr2 + "',local_unit: '" + city + "',local_state: '" + state
                + "',local_country: '" + country + "',local_postal_code: '" + pincode + "',mobile_number: '" + mobile + "',emp_department: '" + department
                + "',emp_level: '" + level + "',emp_desgination: '" + designation + "',report_to_manager: '" + reportManager + "',role_id: '" + roleId + "',updated_date: '" + curdate +
                "',updated_by: '" + userRef + "'}";

            if (employeeCompany == 3) {
                valueData = "{emp_first_name: '" + fName + "', emp_last_name: '" + lName + "',date_of_birth: '" + dob + "',email_id: '" + email + "',emp_joining_date: '" + joiningDate
                    + "',gender: '" + gender + "',local_street: '" + addr1 + "',local_level: '" + addr2 + "',local_unit: '" + city + "',local_state: '" + state
                    + "',local_country: '" + country + "',local_postal_code: '" + pincode + "',mobile_number: '" + mobile + "',emp_department: '" + department
                    + "',emp_level: '" + level + "',emp_desgination: '" + designation + "',report_to_manager: '" + reportManager + "',role_id: '" + roleId + "',updated_date: '" + curdate +
                    "',updated_by: '" + userRef + "',emp_shift: '" + empShift + "',emp_shift_time: '" + empShiftTime + "'}";
            }

            var sCondition1 = "WHERE ref_no = " + ref;

            valueData1 = "{role_id: '" + roleId + "'}";

            var strJsonDatas = eval({ strJsonData: valueData1, strCondition: sCondition1, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: "POST",
                url: "UpdateEmployeeUserMaster",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {



            }, function (error) {

            });

        }
        else if (type == "personal") {

            var passport = $('#txtPassport').val();
            var blood = $('#EmpBlood').val();
            var marital = $('#marital').val();
            var spouseName = $('#txtspouseName').val();
            var spouseCont = $('#txtspouseContact').val();
            var busstop = $('#txtbusStop').val();
            var bankAC = $('#txtbankacno').val();
            var aadhaar = $('#txtaadhaarno').val();
            var pan = $('#txtpanno').val();
            var pf = $('#txtpfno').val();
            var esi = $('#txtesino').val();
            var UAN = $('#txtuanno').val();


            if (blood < 0) {

                msgalert("Error", "Choose Blood Group", 3);

                return;
            }
            if (marital < 0) {

                msgalert("Error", "Choose Marital", 3);

                return;
            }
            if (marital == 2) {
                if (spouseName == "") {
                    msgalert("Error", "Enter Spouse Name", 3);

                    return;
                }
                if (spouseCont == "") {
                    msgalert("Error", "Enter Spouse Contact", 3);

                    return;
                }
            }
            if (busstop == "") {
                msgalert("Error", "Enter Nearest Bus Stop", 3);

                return;
            }
            //if (bankAC == "")
            //{
            //    msgalert("Error", "Enter Bank Account Number", 3);

            //    return;
            //}
            if (aadhaar == "") {
                msgalert("Error", "Enter Aadhaar Number", 3);

                return;
            }
            //if (pan == "")
            //{
            //    msgalert("Error", "Enter PAN Number", 3);

            //    return;
            //}
            if (esi == "") {

                esi = 0;
            }
            if (UAN == "") {
                msgalert("Error", "Enter UAN Number", 3);

                return;
            }

            valueData = "{passport_number: '" + passport + "', blood_group: '" + blood + "',maritial_status: '" + marital + "',spouse_name: '" + spouseName
                + "',spouse_contact: '" + spouseCont + "',nearest_bus_stop: '" + busstop + "',bank_account_no: '" + bankAC + "',aadhar_no: '" + aadhaar
                + "',pan_card_no: '" + pan + "',PF_no: '" + pf + "',ESI_no: '" + esi + "',UAN_No: '" + UAN + "',updated_date: '" + curdate + "',updated_by: '" + userRef + "'}";

        }
        else if (type == "emergency") {

            var name1 = $('#txtEmName1').val();
            var relationship1 = $('#txtEmRel1').val();
            var address1 = $('#txtEmAdd1').val();
            var contact1 = $('#txtEmPhone1').val();
            var name2 = $('#txtEmName2').val();
            var relationship2 = $('#txtEmRel2').val();
            var address2 = $('#txtEmAdd2').val();
            var contact2 = $('#txtEmPhone2').val();


            if (name1 == "") {

                msgalert("Error", "Enter Primary Emergency Contact Name", 3);

                return;
            }
            if (relationship1 == "") {

                msgalert("Error", "Enter Primary Emergency Contact Relationship", 3);

                return;
            }
            if (address1 == "") {
                msgalert("Error", "Enter Primary Emergency Contact Address", 3);

                return;
            }
            if (contact1 == "") {
                msgalert("Error", "Enter Primary Emergency Contact Number", 3);

                return;
            }


            valueData = "{emrergency_contact_name: '" + name1 + "', emergency_contact_relationship: '" + relationship1 + "',emrergency_contact_address: '" + address1
                + "',emrergency_contact_number: '" + contact1 + "',emergency_contact_name1: '" + name2 + "',emergency_contact_relationship1: '" + relationship2
                + "',emergency_contact_address1: '" + address2 + "',emergency_contact_number1: '" + contact2 + "',updated_date: '" + curdate + "',updated_by: '" + userRef + "'}";

        }

        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: "POST",
            url: "UpdateEmployeeDetails",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            msgalert("Success", "Details Updated Successfully", 1);

            vm.BindValues(ref);

            //window.location.reload();

        }, function (error) {

        });
    };

    vm.GetManagerList = function (refNo) {

        var paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(refNo);

        paramNames.push('type');

        paramValues.push(3);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLists',
            data: msg2
        }).then(function (response) {

            vm.ManagerList = response.data

        }, function (error) {

        });
    };

    vm.Designation = function () {

        var sCondition;

        if ($("#EmpLevel").val() == 1) {
            if ($("#EmpDepartment").val() == 1) {
                sCondition = "where department_id in(1,2) and role_id in (2,12,18,19) order by designation_id asc";
            }
            else {
                sCondition = "where department_id =" + $("#EmpDepartment").val() + " and role_id in (2,12,18,19) order by designation_id asc";
            }
        }
        else if ($("#EmpLevel").val() == 2) {
            if ($("#EmpDepartment").val() == 1) {
                sCondition = "where department_id in(1,2) and role_id NOT IN (2,12,18,19) order by designation_id asc";
            }
            else {
                sCondition = "where department_id =" + $("#EmpDepartment").val() + " and role_id NOT IN (2,12,18,19) order by designation_id asc";
            }
        }

        var strJsonDatas = eval({ strCondition: sCondition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectDesignation',
            data: msg2
        }).then(function (response) {

            vm.Designations = response.data

        }, function (error) {

        });


    };

    vm.bindSyllabus = function (type) {

        var sCondition = "WHERE enumeration_key in ('" + type + "')";

        var strJsonDatas = eval({ strCondition: sCondition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectMandatoryValues',
            data: msg2
        }).then(function (response) {

            vm.SSLCSyll = response.data

        }, function (error) {

        });
    };

    vm.bindGraduation = function (type) {

        var sCondition = "WHERE enumeration_key in ('" + type + "')";

        var strJsonDatas = eval({ strCondition: sCondition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectMandatoryValues',
            data: msg2
        }).then(function (response) {

            vm.Grads = response.data

            for (var i = 0; i < vm.Grads.length; i++) {
                if (vm.Grads[i]["value"] == vm.Result[0]["graduation"]) {
                    vm.Result[0]["graduation"] = vm.Grads[i]["display_value"];
                }
            }

        }, function (error) {

        });
    };

    vm.bindPostGraduation = function (type) {

        var sCondition = "WHERE enumeration_key in ('" + type + "')";

        var strJsonDatas = eval({ strCondition: sCondition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectMandatoryValues',
            data: msg2
        }).then(function (response) {

            vm.PostGrads = response.data

        }, function (error) {

        });
    };

    vm.bindBloodGroup = function () {

        var sCondition = "WHERE enumeration_key in ('Blood_group')";

        var strJsonDatas = eval({ strCondition: sCondition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectMandatoryValues',
            data: msg2
        }).then(function (response) {

            vm.Blood = response.data

        }, function (error) {

        });
    };

    var employeeCompany;

    vm.BindValues = function (empRefNo) {

        sEmpRefNo = empRefNo;

        vm.Result = null;

        var paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(empRefNo);

        paramNames.push('type');

        paramValues.push(2);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLists',
            data: msg2
        }).then(function (response) {

            vm.Result = response.data

            vm.GetScalelist(empRefNo);

            dob = vm.Result[0]["date_of_birth"]

            //if (dob != null || dob != "" || dob != "undefined") {

            //    dob = dob.split('T');

            //    vm.Result[0]["date_of_birth"] = dob[0];
            //}

            vm.BloodGroup = vm.Result[0]["blood_group_id"];

            vm.bindBloodGroup();

            salaryFill = vm.Result[0]["salary_fill"];

            if (vm.Result[0]["sslc_syllabus"] !== undefined) {
                vm.sslcSyllabus = vm.Result[0]["sslc_syllabus"];

                vm.bindSyllabus('Syllabus');
            }
            else {
                vm.sslcSyllabus = 0;

                vm.bindSyllabus('Syllabus');
            }

            if (vm.Result[0]["twelth_syllabus"] !== undefined) {
                vm.twelthSyllabus = vm.Result[0]["twelth_syllabus"];

                vm.bindSyllabus('Syllabus');
            }
            else {
                vm.twelthSyllabus = 0;

                vm.bindSyllabus('Syllabus');
            }

            if (vm.Result[0]["graduation"] !== undefined) {
                vm.graduation = vm.Result[0]["graduation"];

                if (vm.Result[0]["graduation"] == 0) {
                    vm.Result[0]["graduation_value"] = "";
                }

                vm.bindGraduation('Graduation');
            }
            else {
                vm.graduation = 0;

                vm.bindGraduation('Graduation');
            }

            if (vm.Result[0]["post_graduation"] !== undefined) {
                vm.pgraduation = vm.Result[0]["post_graduation"];

                if (vm.Result[0]["post_graduation"] == 0) {
                    vm.Result[0]["post_graduation_value"] = "";
                }

                vm.bindPostGraduation('Post_Graduation');
            }
            else {
                vm.pgraduation = 0;

                vm.bindPostGraduation('Post_Graduation');
            }

            if (userRoleID == 9 && vm.Result[0]["role_id"] == 2) {
                $('#bankStatutory').addClass('hidden');
            }

            $('#EmpGender').val(vm.Result[0]["gender"]).change();

            $('#EmpDepartment').val(vm.Result[0]["emp_department"]).change();

            $('#EmpLevel').val(vm.Result[0]["emp_level"]).change();

            vm.Design = vm.Result[0]["emp_desgination"];

            BindDesig();

            $('#EmpDesignation').val(vm.Result[0]["emp_desgination"]).change();

            employeeCompany = vm.Result[0]["company_id"];

            if (vm.Result[0]["company_id"] == 3) {
                $('#ddlShift').val(vm.Result[0]["emp_shift"]).change();

                $('#ddlShiftTime').val(vm.Result[0]["emp_shift_time"]).change();

                $('#mechDiv').removeClass("hidden");
            }

            //vm.Designation();

            if (vm.Result[0]["gender"] == 1) {
                vm.Result[0]["gender"] = "Male";
            }
            else if (vm.Result[0]["gender"] == 2) {
                vm.Result[0]["gender"] = "Female"
            }

            $('#marital').val(vm.Result[0]["maritial_status"]).change();

            if (vm.Result[0]["maritial_status"] == 1) {
                vm.Result[0]["maritial_status"] = "Single";

                $("#spouse").addClass("hidden");

                $("#spouseDIV").addClass("hidden");
            }
            else if (vm.Result[0]["maritial_status"] == 2) {
                vm.Result[0]["maritial_status"] = "Married";

                $("#spouse").removeClass("hidden");

                $("#spouseDIV").removeClass("hidden");
            }

            var Result = vm.Result;

            if (Result[0]["local_level"] === undefined) {
                Result[0]["local_level"] = "";
            }

            if (vm.Result[0]["designation"] === undefined) {
                vm.Result[0]["designation"] = 'Production Team';
            }

            if (vm.Result[0]["department"] === undefined) {
                vm.Result[0]["department"] = 'BPO';
            }

            sEmpName = (Result[0]["emp_first_name"] + ' ' + Result[0]["emp_last_name"]);

            vm.reportManager = Result[0]["report_to_manager"];

            $('#first').addClass('hidden');
            $('#detView').removeClass('hidden');

            $('#detailEdit').addClass('hidden');
            $('#detailView').removeClass('hidden');

            //BindEducationDetails(sEmpRefNo);

            freshers(Result[0]["is_fresher"]);

            $("#ddlGender").val(Result[0]["gender"]).change();

            //BindFields(Result[0]["blood_group_id"]);

            $("#ddlMarital").val(Result[0]["maritial_status"]).change();

            //bindMaritalStatus(Result[0]["maritial_status"]);

            $("#ddlcompany").val(Result[0]["company_id"]).change();

            $("#ddllocation").val(Result[0]["emp_comp_id"]).change();

            $("#ddldivision").val(Result[0]["emp_department"]).change();

            $("#ddllevel").val(Result[0]["emp_level"]).change();

            bindDesignation(Result[0]["emp_desgination"]);

            $("#ddlnotice").val(Result[0]["emp_notice_period"]).change();

            $("#ddlreview").val(Result[0]["emp_first_review"]).change();

            bindManager(Result[0]["report_to_manager"], empRefNo);

            if (Result[0]["file_path"] === undefined) {
                Result[0]["file_path"] = "../Content/Employee/EmployeeImages/AdministratorECESIS_59887f8ca64d1.png";
            }

            if (Result[0]["manager_pic"] === undefined) {
                Result[0]["manager_pic"] = "../Content/Employee/EmployeeImages/AdministratorECESIS_59887f8ca64d1.png";
            }

            if (Result[0]["file_path"] != "") {
                $('#userProfileView').attr('src', Result[0]["file_path"]);
                $('#imagePreview').attr('src', Result[0]["file_path"]);
            }

            vm.GetDocumentDetails();

            vm.GetEmpExp(empRefNo);

            vm.GetManagerList(empRefNo);

            vm.GetSalaryDetails(empRefNo);

        });
    };

    vm.GetDocumentDetails = function () {

        var EmployeeDocuments = [
            { doc_name: "Personal File Checklist", doc_completed: "" },
            { doc_name: "JOINING FORMS", doc_completed: "" },
            { doc_name: "Interview Evaluation Form", doc_completed: "", fileName: "" },
            { doc_name: "Biodata/CV/Application Forms", doc_completed: "" },
            { doc_name: "Id Proof", doc_completed: "" },
            { doc_name: "CERTIFICATES", doc_completed: "" },
            { doc_name: "SSLC/ School Leaving Certificate", doc_completed: "" },
            { doc_name: "PU or Equivalent", doc_completed: "" },
            { doc_name: "UG Degree Certificates", doc_completed: "" },
            { doc_name: "PG Degree Certificates", doc_completed: "" },
            { doc_name: "Any Other Certificates (if any)", doc_completed: "" },
            { doc_name: "Experience Certificate (if any)", doc_completed: "" },
            { doc_name: "Salary Certificate From previous employer", doc_completed: "" },
            { doc_name: "Relieving Order from previous employer (if any)", doc_completed: "" },
            { doc_name: "Reference Check", doc_completed: "" },
            { doc_name: "STATUTORY", doc_completed: "" },
            { doc_name: "Appointment Letter/ Agreement/Contract/Bond", doc_completed: "" },
            { doc_name: "Non Disclosure Agreement", doc_completed: "" },
            { doc_name: "Form 11 of EPF", doc_completed: "" },
            { doc_name: "Form F of Gratuity", doc_completed: "" },
            { doc_name: "Form 1 ESI", doc_completed: "" }];

        var Result = vm.Result[0];

        vm.EmployeeDocuments = EmployeeDocuments;

        if (Result["interview_form"] === undefined) {
            EmployeeDocuments[0]["doc_completed"] = "fa fa-times";
        }
        else {
            EmployeeDocuments[0]["doc_completed"] = "fa fa-check";
        }

        if (Result["interview_form"] === undefined) {
            EmployeeDocuments[2]["doc_completed"] = "fa fa-times";

            $('#interviewFormView').addClass('hidden');
            $('#interviewFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[2]["doc_completed"] = "fa fa-check";

            var res = Result["interview_form"].split("_");
            var length = res.length;
            EmployeeDocuments[2]["fileName"] = res[length - 1]

            $('#interviewFormView').removeClass('hidden');
            $('#interviewFormUpload').addClass('hidden');
        }

        if (Result["cv"] === undefined) {
            EmployeeDocuments[3]["doc_completed"] = "fa fa-times";

            $('#cvFormView').addClass('hidden');
            $('#cvFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[3]["doc_completed"] = "fa fa-check";

            var res = Result["cv"].split("_");
            var length = res.length;
            EmployeeDocuments[3]["fileName"] = res[length - 1]

            $('#cvFormView').removeClass('hidden');
            $('#cvFormUpload').addClass('hidden');
        }

        if (Result["id_proof"] === undefined) {
            EmployeeDocuments[4]["doc_completed"] = "fa fa-times";

            $('#idFormView').addClass('hidden');
            $('#idFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[4]["doc_completed"] = "fa fa-check";

            var res = Result["id_proof"].split("_");
            var length = res.length;
            EmployeeDocuments[4]["fileName"] = res[length - 1]

            $('#idFormView').removeClass('hidden');
            $('#idFormUpload').addClass('hidden');
        }

        if (Result["sslc_certificate"] === undefined) {
            EmployeeDocuments[6]["doc_completed"] = "fa fa-times";

            $('#sslcFormView').addClass('hidden');
            $('#sslcFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[6]["doc_completed"] = "fa fa-check";

            var res = Result["sslc_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[6]["fileName"] = res[length - 1]

            $('#sslcFormView').removeClass('hidden');
            $('#sslcFormUpload').addClass('hidden');
        }

        if (Result["pu_certificate"] === undefined) {
            EmployeeDocuments[7]["doc_completed"] = "fa fa-times";

            $('#puFormView').addClass('hidden');
            $('#puFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[7]["doc_completed"] = "fa fa-check";

            var res = Result["pu_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[7]["fileName"] = res[length - 1]

            $('#puFormView').removeClass('hidden');
            $('#puFormUpload').addClass('hidden');
        }

        if (Result["ug_certificate"] === undefined) {
            EmployeeDocuments[8]["doc_completed"] = "fa fa-times";

            $('#ugFormView').addClass('hidden');
            $('#ugFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[8]["doc_completed"] = "fa fa-check";

            var res = Result["ug_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[8]["fileName"] = res[length - 1]

            $('#ugFormView').removeClass('hidden');
            $('#ugFormUpload').addClass('hidden');
        }

        if (Result["pg_certificate"] === undefined) {
            EmployeeDocuments[9]["doc_completed"] = "fa fa-times";

            $('#pgFormView').addClass('hidden');
            $('#pgFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[9]["doc_completed"] = "fa fa-check";

            var res = Result["pg_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[9]["fileName"] = res[length - 1]

            $('#pgFormView').removeClass('hidden');
            $('#pgFormUpload').addClass('hidden');
        }

        if (Result["other_certificate"] === undefined) {
            EmployeeDocuments[10]["doc_completed"] = "fa fa-times";

            $('#otherFormView').addClass('hidden');
            $('#otherFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[10]["doc_completed"] = "fa fa-check";

            var res = Result["other_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[10]["fileName"] = res[length - 1]

            $('#otherFormView').removeClass('hidden');
            $('#otherFormUpload').addClass('hidden');
        }

        if (Result["experience_certificate"] === undefined) {
            EmployeeDocuments[11]["doc_completed"] = "fa fa-times";

            $('#experienceFormView').addClass('hidden');
            $('#experienceFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[11]["doc_completed"] = "fa fa-check";

            var res = Result["experience_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[11]["fileName"] = res[length - 1]

            $('#experienceFormView').removeClass('hidden');
            $('#experienceFormUpload').addClass('hidden');
        }

        if (Result["salary_certificate"] === undefined) {
            EmployeeDocuments[12]["doc_completed"] = "fa fa-times";

            $('#salaryFormView').addClass('hidden');
            $('#salaryFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[12]["doc_completed"] = "fa fa-check";

            var res = Result["salary_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[12]["fileName"] = res[length - 1]

            $('#salaryFormView').removeClass('hidden');
            $('#salaryFormUpload').addClass('hidden');
        }

        if (Result["releiving_certificate"] === undefined) {
            EmployeeDocuments[13]["doc_completed"] = "fa fa-times";

            $('#releivingFormView').addClass('hidden');
            $('#releivingFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[13]["doc_completed"] = "fa fa-check";

            var res = Result["releiving_certificate"].split("_");
            var length = res.length;
            EmployeeDocuments[13]["fileName"] = res[length - 1]

            $('#releivingFormView').removeClass('hidden');
            $('#releivingFormUpload').addClass('hidden');
        }

        if (Result["reference_check"] === undefined) {
            EmployeeDocuments[14]["doc_completed"] = "fa fa-times";

            $('#referenceFormView').addClass('hidden');
            $('#referenceFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[14]["doc_completed"] = "fa fa-check";

            var res = Result["reference_check"].split("_");
            var length = res.length;
            EmployeeDocuments[14]["fileName"] = res[length - 1]

            $('#referenceFormView').removeClass('hidden');
            $('#referenceFormUpload').addClass('hidden');
        }

        if (Result["appoinment_letter"] === undefined) {
            EmployeeDocuments[16]["doc_completed"] = "fa fa-times";

            $('#appoinmentFormView').addClass('hidden');
            $('#appoinmentFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[16]["doc_completed"] = "fa fa-check";

            var res = Result["appoinment_letter"].split("_");
            var length = res.length;
            EmployeeDocuments[16]["fileName"] = res[length - 1]

            $('#appoinmentFormView').removeClass('hidden');
            $('#appoinmentFormUpload').addClass('hidden');
        }

        if (Result["non_disclosure_agreement"] === undefined) {
            EmployeeDocuments[17]["doc_completed"] = "fa fa-times";

            $('#nondisclosureFormView').addClass('hidden');
            $('#nondisclosureFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[17]["doc_completed"] = "fa fa-check";

            var res = Result["non_disclosure_agreement"].split("_");
            var length = res.length;
            EmployeeDocuments[17]["fileName"] = res[length - 1]

            $('#nondisclosureFormView').removeClass('hidden');
            $('#nondisclosureFormUpload').addClass('hidden');
        }

        if (Result["form_11"] === undefined) {
            EmployeeDocuments[18]["doc_completed"] = "fa fa-times";

            $('#epfFormView').addClass('hidden');
            $('#epfFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[18]["doc_completed"] = "fa fa-check";

            var res = Result["form_11"].split("_");
            var length = res.length;
            EmployeeDocuments[18]["fileName"] = res[length - 1]

            $('#epfFormView').removeClass('hidden');
            $('#epfFormUpload').addClass('hidden');
        }

        if (Result["form_f"] === undefined) {
            EmployeeDocuments[19]["doc_completed"] = "fa fa-times";

            $('#gratuityFormView').addClass('hidden');
            $('#gratuityFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[19]["doc_completed"] = "fa fa-check";

            var res = Result["form_f"].split("_");
            var length = res.length;
            EmployeeDocuments[19]["fileName"] = res[length - 1]

            $('#gratuityFormView').removeClass('hidden');
            $('#gratuityFormUpload').addClass('hidden');
        }

        if (Result["form_1"] === undefined) {
            EmployeeDocuments[20]["doc_completed"] = "fa fa-times";

            $('#esiFormView').addClass('hidden');
            $('#esiFormUpload').removeClass('hidden');
        }
        else {
            EmployeeDocuments[20]["doc_completed"] = "fa fa-check";

            var res = Result["form_1"].split("_");
            var length = res.length;
            EmployeeDocuments[20]["fileName"] = res[length - 1]

            $('#esiFormView').removeClass('hidden');
            $('#esiFormUpload').addClass('hidden');
        }

        vm.EmployeeDocuments = EmployeeDocuments;

    };

    vm.Notification = function (ref, type) {

        var Data;

        switch (type) {

            case "1": // HR
                Data = "{type: 'New User Registered', manager_ref_no: '', emp_ref_no: '" + ref + "', page_name: 'Employee Pending Approval', page_url: '../Employee/EmployeePendingApproval', page_id: 10012,  delete_status: '0', role_id: '9' }";
                break;
            case "2":// Accounts
                Data = "{type: 'New User Registered', manager_ref_no: '', emp_ref_no: '" + ref + "', page_name: 'Employee Pending Approval', page_url: '../Employee/EmployeePendingApproval', page_id: 10012,  delete_status: '0', role_id: '10' }";
                break;
            case "3":// CEO
                Data = "{type: 'New User Registered', manager_ref_no: '', emp_ref_no: '" + ref + "', page_name: 'Employee Pending Approval', page_url: '../Employee/EmployeePendingApproval', page_id: 10012,  delete_status: '0', role_id: '1' }";
                break;
            //case "4":// Manager
            //    Data = "{type: 'User Approval Accepted', manager_ref_no: '" + ref + "', emp_ref_no: '2', page_name: 'ApproveLeave()', delete_status: '0', role_id: '0' }";
            //    break;
            //case "5":// Common
            //    Data = "{type: 'Dear All....', manager_ref_no: '0', emp_ref_no: '" + ref + "', page_name: 'ApproveLeave()', delete_status: '0', role_id: '0' }";
            //    break;
        }

        var strJsonDatas = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'InsertNotification',
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            return "Success";

        }, function (error) {

        });
    };

    vm.DoEmployeeAction = function (ref, manager, empName, value) {

        var sMailTo, sManagerName, username, password, sMailBody;

        var Condition = "WHERE delete_status = 0 and emp_ref_no = " + manager;

        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeDetails',
            data: msg
        }).then(function (response1) {

            vm.Result = response1.data

            sMailTo = vm.Result[0]["email_id"];

            sManagerName = vm.Result[0]["emp_first_name"];

            sManagerName = sManagerName + ' ' + vm.Result[0]["emp_last_name"];

        });


        if (value == 1)//1 for Accept
        {
            var valueData = "{ is_accept: 1}";

            var sCondition = "WHERE emp_ref_no = " + ref;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            //  var leave = getLeaveCounts(leaveType);

            var post1 = $http({
                method: "POST",
                url: "UpdateEmployeeDetails",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response3) {

                //var Condition1 = "where ref_no = " + ref;

                //var strJsonDatas1 = eval({ strCondition: Condition1 });

                //var msg1 = JSON.stringify(strJsonDatas1);

                var paramNames = [], paramValues = [];

                paramNames.push('sRefNo');

                paramValues.push(ref);

                var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

                var msg1 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'SelectPassword',
                    data: msg1
                }).then(function (response2) {

                    vm.LoginDetails = response2.data

                    username = vm.LoginDetails[0]["username"];

                    password = decodeBase64(vm.LoginDetails[0]["password"]);

                    //sMailBody = vm.CreateMailBody(empName, sManagerName, username, password);

                    var sMailData;

                    var Conditions = "WHERE mail_type = 26";

                    var strJsonDatass = eval({ strCondition: Conditions, strFieldNames: null, strSessionID: null });

                    var msgs = JSON.stringify(strJsonDatass);

                    $http({
                        method: 'POST',
                        url: 'SelectMailTemplate',
                        data: msgs
                    }).then(function (response4) {

                        vm.Result = response4.data

                        sMailData = vm.Result[0]["mail_body"];

                        document.getElementById('MailData').innerHTML = sMailData;
                        document.getElementById('manager_name').innerHTML = sManagerName;
                        document.getElementById('employee_name').innerHTML = empName;
                        document.getElementById('user_name').innerHTML = username;
                        document.getElementById('user_password').innerHTML = password;

                        sMailBody = document.getElementById('MailData').innerHTML;

                        var Data2 = "{mail_to: '" + sMailTo + "', mail_subject: 'Employee Approved', mail_body: '" + sMailBody + "'}";

                        var strJsonDatas2 = eval({ strJsonData: Data2, strFieldNames: null, strSessionID: null });

                        var msg2 = JSON.stringify(strJsonDatas2);

                        $http({
                            method: 'POST',
                            url: 'sendmail',
                            data: msg2,
                            dataType: 'json',
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response3) {

                            var sMailData;

                            var Conditions = "WHERE mail_type = 28";

                            var strJsonDatass = eval({ strCondition: Conditions, strFieldNames: null, strSessionID: null });

                            var msgs = JSON.stringify(strJsonDatass);

                            $http({
                                method: 'POST',
                                url: 'SelectMailTemplate',
                                data: msgs
                            }).then(function (response4) {

                                msgalert("Success", "Employee Approved Successfully....", 1);

                                window.location.reload();

                                //vm.Result = response4.data

                                //sMailData = vm.Result[0]["mail_body"];

                                //document.getElementById('MailData').innerHTML = sMailData;
                                //document.getElementById('employee_name').innerHTML = empName;
                                //document.getElementById('user_name').innerHTML = username;

                                //sMailBody = document.getElementById('MailData').innerHTML;

                                //var mail1 = 'ramkfaizi97@gmail.com'
                                //var mail2 = 'anoop.a@ecesistech.com'

                                //var Data2 = "{mail_to: '" + mail1 + "', mail_to1: '" + mail2 + "', mail_subject: 'Employee Access Permission', mail_body: '" + sMailBody + "'}";

                                //var strJsonDatas2 = eval({ strJsonData: Data2, strFieldNames: null, strSessionID: null });

                                //var msg2 = JSON.stringify(strJsonDatas2);

                                //$http({
                                //    method: 'POST',
                                //    url: 'sendmailtoAdmin',
                                //    data: msg2,
                                //    dataType: 'json',
                                //    headers: { "Content-Type": "application/json" }
                                //}).then(function (response3) {

                                //    msgalert("Success", "Employee Approved Successfully....", 1);

                                //    window.location.reload();

                                //}, function (error) {

                                //});

                            });

                        }, function (error) {

                        });

                    });


                }, function (error) {

                });

            });
        }
        else if (value == 2) //2 fro Reject
        {
            var valueData = "{ is_accept: 2}";

            var sCondition = "WHERE emp_ref_no = " + ref;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            //  var leave = getLeaveCounts(leaveType);

            var post1 = $http({
                method: "POST",
                url: "UpdateEmployeeDetails",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response3) {

                //var Condition1 = "where ref_no = " + ref;

                //var strJsonDatas1 = eval({ strCondition: Condition1 });

                //var msg1 = JSON.stringify(strJsonDatas1);

                var paramNames = [], paramValues = [];

                paramNames.push('sRefNo');

                paramValues.push(ref);

                var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

                var msg1 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'SelectPassword',
                    data: msg1
                }).then(function (response2) {

                    vm.LoginDetails = response2.data

                    username = vm.LoginDetails[0]["username"];

                    password = decodeBase64(vm.LoginDetails[0]["password"]);

                    //sMailBody = vm.CreateMailBody(empName, sManagerName, username, password);

                    var sMailData;

                    var Conditions = "WHERE mail_type = 27";

                    var strJsonDatass = eval({ strCondition: Conditions, strFieldNames: null, strSessionID: null });

                    var msgs = JSON.stringify(strJsonDatass);

                    $http({
                        method: 'POST',
                        url: 'SelectMailTemplate',
                        data: msgs
                    }).then(function (response4) {

                        vm.Result = response4.data

                        sMailData = vm.Result[0]["mail_body"];

                        document.getElementById('MailData').innerHTML = sMailData;
                        document.getElementById('manager_name').innerHTML = sManagerName;
                        document.getElementById('employee_name').innerHTML = empName;


                        sMailBody = document.getElementById('MailData').innerHTML;

                        var Data2 = "{mail_to: '" + sMailTo + "', mail_subject: 'Employee Rejected', mail_body: '" + sMailBody + "'}";

                        var strJsonDatas2 = eval({ strJsonData: Data2, strFieldNames: null, strSessionID: null });

                        var msg2 = JSON.stringify(strJsonDatas2);

                        $http({
                            method: 'POST',
                            url: 'sendmail',
                            data: msg2,
                            dataType: 'json',
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response3) {

                            msgalert("Success", "Employee Rejected", 1);

                            window.location.reload();

                        }, function (error) {

                        });

                    });


                }, function (error) {

                });

            });
        }

    };

    vm.GetPendingList = function (roleId, ref) {

        userRef = ref;

        var Condition;

        var paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(ref);

        paramNames.push('RoleId');

        paramValues.push(roleId);

        paramNames.push('type');

        paramValues.push(5);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLists',
            data: msg2
        }).then(function (response) {
            vm.emppendinglist = response.data


        }, function (error) {

        });

    };

    vm.Navigate = function (refeNo) {

        parent.editEmployee();

        parent.document.getElementById('pageName').innerHTML = "Edit / Delete Employee Details";
        parent.document.getElementById('framecontent').src = "../Employee/ModifyEmployeeDetails";

        //var s = parent.document.getElementById('framecontent');

        var s = parent.document.getElementById('framecontent').contentWindow;

        //.myClick(refeNo)
        // parent.window.frames['framecontent'].myClick();
        // vm.BindValues(refeNo);
    };

    vm.GetPassword = function (ref) {

        refNo = ref;

        var paramNames = [], paramValues = [];

        paramNames.push('sRefNo');

        paramValues.push(ref);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        //var Condition = "where ref_no = "+ ref ;

        //var strJsonDatas = eval({ strCondition: Condition });

        //var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectPassword',
            data: msg2
        }).then(function (response) {

            vm.LoginDetails = response.data

            password = decodeBase64(vm.LoginDetails[0]["password"]);

        }, function (error) {

        });
    };

    vm.checkPassword = function () {

        var cup = $("#curPass").val();

        if (cup != password) {
            msgalert("Error", "Incorrect Current Password", 3);

            $('#btnSubmit').attr('disabled', 'disabled');

            return;
        }

    };

    vm.UpdatePassword = function () {

        var newPass = $("#newPass").val();

        var newConfPass = $("#confNewPass").val();

        if (newPass != newConfPass) {
            msgalert("Error", "Password doesn't match", 3);

            return;
        }
        if (newPass.length < 8) {
            msgalert("Warning", "Password Length Should be of minimum 8 characters", 2);

            return;
        }

        var curDate = formatDate(new Date());

        var sPass = encode64(newPass);

        var valueData = "{password: '" + sPass + "', updated_by: '" + refNo + "', updated_date: '" + curDate + "'}";

        var sCondition = "WHERE ref_no = " + refNo;

        var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: "POST",
            url: "UpdateEmployeeUserMaster",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            alert("Password Changed Successfully! Now you can login..!");

            window.location.reload();

        }, function (error) {

        });

    };

    vm.CheckUsername = function () {

        var username = $("#usernames").val();

        if (username == "" || username == null) {
            $("#errorClass").removeClass("hidden");

            $("#errorClass1").addClass("hidden");

            return;
        }

        var Condition = "where emp_ref_code = '" + username + "'";

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeDetails',
            data: msg2
        }).then(function (response) {

            vm.sUserDetails = response.data

            var name = vm.sUserDetails[0];

            if (name === undefined) {
                $("#errorClass").addClass("hidden");
                $("#errorClass1").removeClass("hidden");
            }
            else {
                var name = vm.sUserDetails[0]["emp_first_name"] + ' ' + vm.sUserDetails[0]["emp_last_name"];

                var ref = vm.sUserDetails[0]["emp_ref_no"];

                var mailTo = vm.sUserDetails[0]["email_id"];

                var verificationCode = GenerateVerificationCode();

                $("#hdnCode").val(verificationCode);

                $("#hdnUsername").val(username);

                $("#hdnRef").val(ref);

                refNo = ref;

                var sMailData;

                var Conditions = "WHERE mail_type = 24";

                var strJsonDatass = eval({ strCondition: Conditions, strFieldNames: null, strSessionID: null });

                var msgs = JSON.stringify(strJsonDatass);

                $http({
                    method: 'POST',
                    url: 'SelectMailTemplate',
                    data: msgs
                }).then(function (response4) {

                    vm.Result = response4.data

                    sMailData = vm.Result[0]["mail_body"];

                    document.getElementById('MailData').innerHTML = sMailData;
                    document.getElementById('sEmailVerifyCode').innerHTML = verificationCode;


                    sMailBody = document.getElementById('MailData').innerHTML;

                    var Data2 = "{mail_to: '" + mailTo + "', mail_subject: 'Reset Password', mail_body: '" + sMailBody + "'}";

                    var strJsonDatas2 = eval({ strJsonData: Data2, strFieldNames: null, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas2);

                    $http({
                        method: 'POST',
                        url: 'sendmail',
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response3) {

                        $("#username").addClass("hidden");

                        $("#verificationCode").removeClass("hidden");

                    }, function (error) {

                    });

                });
            }

        }, function (error) {

        });
    };

    vm.CheckVerificationCode = function () {

        var cod = $("#VerifyCode").val();

        var sCod = $("#hdnCode").val();

        if (cod != sCod) {

            $("#errorClass3").removeClass("hidden");;

            return;
        }
        else {
            $("#verificationCode").addClass("hidden");

            $("#newPassword").removeClass("hidden");
        }
    };

    function GenerateVerificationCode() {

        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var charCount = 0;
        var numCount = 0;

        for (var i = 0; i < string_length; i++) {
            // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value.
            if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
                charCount += 1;
            }

        }

        return randomstring;

        //////////////////////////////////////////////////////////Random password end ///////////////////////////////////////////////

    }

    var separationRef, sepManager, sepManagerRole, notice, noticeDate;

    vm.MySeparat = function (ref) {

        separationRef = ref;

        var paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(ref);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeSeparationDetails',
            data: msg2
        }).then(function (response) {

            vm.Result = response.data

            sepManager = vm.Result[0]["report_to_manager"];

            sepManagerRole = vm.Result[0]["role_id"];

            noticeDate = vm.Result[0]["NoticeDate"];

        });

    };

    var mgrMeeting = 0, mgrNotifi = 0;

    vm.chooseOne = function (id) {

        if (id == "managerMeeti") {
            document.getElementById("managerNoti").checked = false;
        }
        else if (id == "managerNoti") {
            document.getElementById("managerMeeti").checked = false;
        }
    };

    vm.ApplySepartion = function () {

        var reason = $("#txtReason").val();

        var date = $("#txtfromdt").val();

        if (reason == "") {
            $("#reasonError").removeClass("hidden");

            return;
        }
        else {
            $("#reasonError").addClass("hidden");
        }

        if (date == "") {
            $("#dateError").removeClass("hidden");

            return;
        }
        else {
            $("#dateError").addClass("hidden");
        }

        if (document.getElementById("managerNoti").checked == true) {
            mgrNotifi = 1;
        }
        else {
            mgrNotifi = 0;
        }

        if (document.getElementById("managerMeeti").checked == true) {
            mgrMeeting = 1;
        }
        else {
            mgrMeeting = 0;
        }

        var curDate = formatDate(new Date());

        if (mgrNotifi == 1) {
            var valueData = "{ref_no:'" + separationRef + "',applied_date:'" + curDate + "',preferred_date:'" + date + "',notice_date:'" + noticeDate + "',reason:'" +
                reason + "',report_to_manager: 2, status: 0, is_manager_approve: 0,is_ceo_approve: 0 ,is_direct_admin: 1 }";

            var strJsonDatas = eval({ strJsonData: valueData, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "CreateSeparation",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                var Data = "{type: 'Seperation Request', manager_ref_no: '', emp_ref_no: '" + separationRef + "', page_name: 'Employee Separation', page_url: '../Employee/SeparationList', page_id: 10023,  delete_status: '0', role_id: '1' }"

                //var Data = "{type: 'Seperation Request', manager_ref_no: '', emp_ref_no: '" + separationRef + "', page_name: 'SeparationList()', role_id: 1, delete_status: 0 }";

                var strJsonDatas1 = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas1);

                $http({
                    method: 'POST',
                    url: 'InsertNotification',
                    data: msg2
                }).then(function (response) {

                    msgalert("Success", "Separation Applied", 1);

                    window.location.reload();

                });

            });
        }
        else {
            var valueData = "{ref_no:'" + separationRef + "', applied_date:'" + curDate + "',preferred_date:'" + date + "',notice_date:'" + noticeDate + "', reason:'" +
                reason + "', report_to_manager:'" + sepManager + "', status: 0, is_manager_approve:0, is_ceo_approve:0, is_direct_admin: 0}";

            var strJsonDatas = eval({ strJsonData: valueData, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "CreateSeparation",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                var Data = "{type: 'Seperation Request', manager_ref_no: '" + sepManager + "', emp_ref_no: '" + separationRef + "', page_name: 'Employee Seperation', page_url:'../Employee/SeparationList', page_id: 10023, role_id: '" + sepManagerRole + "', delete_status: 0 }";

                var strJsonDatas1 = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas1);

                $http({
                    method: 'POST',
                    url: 'InsertNotification',
                    data: msg2
                }).then(function (response) {

                    if (mgrMeeting == 1) {
                        var Data = "{type: 'Meeting....', manager_ref_no: '" + sepManager + "', emp_ref_no: '" + separationRef + "', page_name: 'Employee Seperation', page_url:'../Employee/SeparationList', page_id: 10023, role_id: '" + sepManagerRole + "', delete_status: 0 }";

                        var strJsonDatas1 = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

                        var msg2 = JSON.stringify(strJsonDatas1);

                        $http({
                            method: 'POST',
                            url: 'InsertNotification',
                            data: msg2
                        }).then(function (response) {

                            msgalert("Success", "Separation Applied", 1);

                            window.location.reload();

                        });
                    }
                    else {
                        msgalert("Success", "Separation Applied", 1);

                        window.location.reload();
                    }

                });

            });
        }


    };

    vm.GetSeperationList = function (roleID, ref) {

        var paramNames = [], paramValues = [];

        paramNames.push('roleID');

        paramValues.push(roleID);

        paramNames.push('refNo');

        paramValues.push(ref);

        paramNames.push('type');

        paramValues.push(1);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSeperationList',
            data: msg2
        }).then(function (response) {

            if (response.data == []) {
                vm.SeparationList["reason"] = "No Datas Found";
            }
            else {
                vm.SeparationList = response.data

                $('#sepList').removeClass('hidden');

                $('#penList').addClass('hidden');

                $('#pendingList').removeClass('hidden');

                $('#seperationList').addClass('hidden');
            }



        }, function (error) {

        });

    };

    vm.GetAllSeperationList = function (roleID, ref) {

        var paramNames = [], paramValues = [];

        paramNames.push('roleID');

        paramValues.push(roleID);

        paramNames.push('refNo');

        paramValues.push(ref);

        paramNames.push('type');

        paramValues.push(2);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSeperationList',
            data: msg2
        }).then(function (response) {

            if (response.data == []) {
                vm.SeparationList["reason"] = "No Datas Found";
            }
            else {
                vm.SeparationList = response.data

                $('#sepList').addClass('hidden');

                $('#penList').removeClass('hidden');

                $('#pendingList').addClass('hidden');

                $('#seperationList').removeClass('hidden');
            }



        }, function (error) {

        });
    };

    vm.GenerateEmployeeReport = function (refNo, fName, lName) {

        var report_codition = "where emp_ref_no =" + refNo;

        var report_id = "62";

        var file_name = "Employee Details " + fName + " " + lName;

        parent.document.getElementById('reportFrame').src = '../Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition + '&file_name=' + file_name;

        parent.$("#employee_report").modal({
            "backdrop": "static",
            "keyboard": true,
            "show": true
        });

    };

    var seperation;

    vm.SeperationValues = function (seperationID) {

        seperation = seperationID;
    };

    vm.SeperationAction = function (type, refNo) {

        var resignDate;

        if (document.getElementById('notice').checked == true) {
            resignDate = 1;
        }
        else if (document.getElementById('prefer').checked == true) {
            resignDate = 2;
        }

        if (type == 1) {
            var paramNames = [], paramValues = [];

            paramNames.push('type');

            paramValues.push(type);

            paramNames.push('refNo');

            paramValues.push(refNo);

            paramNames.push('date');

            paramValues.push(resignDate);

            paramNames.push('seperationId');

            paramValues.push(seperation);
        }
        else if (type == 2) {

            var reason = $('#txtReason').val();

            var paramNames = [], paramValues = [];

            paramNames.push('type');

            paramValues.push(type);

            paramNames.push('refNo');

            paramValues.push(refNo);

            paramNames.push('date');

            paramValues.push(1);

            paramNames.push('seperationId');

            paramValues.push(seperation);

            paramNames.push('cancelledReason');

            paramValues.push(reason);
        }

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SeperationAction',
            data: msg2
        }).then(function (response) {

            if (type == 1)
                msgalert("Success", "Employee Seperation Approved", 1);
            else if (type == 2)
                msgalert("Success", "Employee Seperation Rejected", 1);

            window.location.reload();

        }, function (error) {

        });

    };

    var BirthEmployees = "       <br/><br/>", BirthEmpCode;

    vm.GetBirthdayEmployees = function (refNo, roleId) {

        var paramNames = [], paramValues = [];

        paramNames.push('sRoleId');

        paramValues.push(roleId);

        paramNames.push('type');

        paramValues.push(1);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectBirthdayEmployees',
            data: msg2
        }).then(function (response) {

            vm.BirthdayEmployees = response.data;

            for (var i = 0; i < vm.BirthdayEmployees.length; i++) {
                if (i == 0) {
                    //BirthEmployees = vm.BirthdayEmployees[i].emp_full_name;

                    BirthEmployees = BirthEmployees + '<br/><br/>' + vm.BirthdayEmployees[i].emp_full_name;

                    BirthEmpCode = vm.BirthdayEmployees[i].emp_ref_code;
                }
                else {
                    BirthEmployees = BirthEmployees + '<br/><br/>' + vm.BirthdayEmployees[i].emp_full_name;

                    BirthEmpCode = BirthEmpCode + '&nbsp;' + vm.BirthdayEmployees[i].emp_ref_code;
                }


            }

            var paramNames = [], paramValues = [];

            paramNames.push('sRoleId');

            paramValues.push(roleId);

            paramNames.push('type');

            paramValues.push(3);

            var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: 'POST',
                url: 'SelectBirthdayEmployees',
                data: msg2
            }).then(function (response) {

                vm.MailId = response.data;

                vm.EmpMailId = '';

                for (var i = 0; i < vm.MailId.length; i++) {

                    if (i == 0) {
                        vm.EmpMailId = vm.MailId[i].mail_id;
                    }
                    else {
                        vm.EmpMailId = vm.EmpMailId + ',' + vm.MailId[i].mail_id;
                    }
                }

            }, function (error) {

            });

        }, function (error) {

        });

    };

    var Birthtemplate;

    vm.SelectTemplate = function (template) {

        if (template == 'temp1') {
            Birthtemplate = 'temp1';

            document.getElementById("temp1").style.border = "4px solid rgb(46, 177, 40)";

            document.getElementById("temp2").style.border = "2px solid white";
        }
        else if (template == 'temp2') {
            Birthtemplate = 'temp2';

            document.getElementById("temp2").style.border = "4px solid rgb(46, 177, 40)";

            document.getElementById("temp1").style.border = "2px solid white";
        }

    };

    vm.sendBirthdayMail = function () {

        var tempId, imagePath;

        var toMailId = $("#txtToMail").val();

        if (toMailId == "") {
            msgalert("ERROR", "Please Enter TO Mail Id to send Birthday Mail", 3);

            return;
        }

        var ccMail = "kv@ecesistech.com, tk@ecesistech.com, hr@ecesistech.com";

        if (Birthtemplate == 'temp1') {

            tempId = 28;

            imagePath = document.getElementById('temp1').src;
        }
        else if (Birthtemplate == 'temp2') {

            tempId = 29;
        }

        if (tempId == "") {
            msgalert("ERROR", "Please Choose any one template", 3);

            return;
        }

        var sMailData;

        var Conditions = "WHERE mail_type = " + tempId;

        var strJsonDatass = eval({ strCondition: Conditions, strFieldNames: null, strSessionID: null });

        var msgs = JSON.stringify(strJsonDatass);

        $http({
            method: 'POST',
            url: 'SelectMailTemplate',
            data: msgs
        }).then(function (response4) {

            vm.Result = response4.data

            sMailData = vm.Result[0]["mail_body"];

            document.getElementById('MailData').innerHTML = sMailData;
            document.getElementById('empCodes').innerHTML = BirthEmpCode;
            document.getElementById('employeeName').innerHTML = BirthEmployees;

            sMailBody = document.getElementById('MailData').innerHTML;

            var Data2 = "{mail_to: '" + toMailId + "', mail_cc: '" + ccMail + "', mail_subject: '!!!***!!!Birthday Wishes!!!***!!!', mail_body: '" + sMailBody + "'}";

            var strJsonDatas2 = eval({ strJsonData: Data2, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas2);

            $http({
                method: 'POST',
                url: 'sendBirthdaymail',
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function (response3) {

                msgalert("Success", "Mail Send Successfully", 1);

                return;

            });


        });
    };

    var wage = parent.document.getElementById("searchBox");

    wage.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            vm.FindString();
        }
    });

    var TRange = null;

    vm.FindString = function () {

        var str = parent.$("#searchBox").val();

        if (parseInt(navigator.appVersion) < 4) return;
        var strFound;
        if (window.find) {

            // CODE FOR BROWSERS THAT SUPPORT window.find

            strFound = self.find(str);
            if (!strFound) {
                strFound = self.find(str, 0, 1);
                while (self.find(str, 0, 1)) continue;
            }
        }
        else if (navigator.appName.indexOf("Microsoft") != -1) {

            // EXPLORER-SPECIFIC CODE

            if (TRange != null) {
                TRange.collapse(false);
                strFound = TRange.findText(str);
                if (strFound) TRange.select();
            }
            if (TRange == null || strFound == 0) {
                TRange = self.document.body.createTextRange();
                strFound = TRange.findText(str);
                if (strFound) TRange.select();
            }
        }
        else if (navigator.appName == "Opera") {
            alert("Opera browsers not supported, sorry...")
            return;
        }
        if (!strFound) alert("String '" + str + "' not found!")
        return;
    };

    function getDaysInWeek(selectedYear, selectedMonth, selectedWeek) {
        // Create a date object for the first day of the selected month
        let firstDay = new Date(selectedYear, selectedMonth - 1, 1); // Month is 0-indexed

        // Get the day of the week for the 1st day (0 = Sunday, 6 = Saturday)
        let firstDayOfWeek = firstDay.getDay();

        // Calculate the start of the selected week
        let startOfWeek = (selectedWeek - 1) * 7 + 1 - firstDayOfWeek;

        // Calculate the end of the week (7 days from the start of the week)
        let endOfWeek = startOfWeek + 6;

        // Get the total number of days in the selected month
        let lastDayOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();

        // Adjust the start and end of the week if they fall outside the month's bounds
        startOfWeek = Math.max(1, startOfWeek);
        endOfWeek = Math.min(lastDayOfMonth, endOfWeek);

        // Return an array of days to display
        let daysInWeek = [];
        for (let i = startOfWeek; i <= endOfWeek; i++) {
            daysInWeek.push(i);
        }

        return daysInWeek;
    }

    // Example usage
    //let selectedYear = 2024;
    //let selectedMonth = 9; // September
    //let selectedWeek = 1; // Week 1
    //let days = getDaysInWeek(selectedYear, selectedMonth, selectedWeek);
    //console.log("Days in selected week: ", days);
    $scope.isViewVisible = false; // Initially hidden

    // Watch for when the view becomes visible
    $scope.$watch('isViewVisible', function (newValue, oldValue) {
        if (newValue === true) {
            // Call your function to update days in the week when view becomes visible
            updatedaysinweek($scope.selectedYear, $scope.selectedMonth, $scope.selectedWeek);
            $scope.GetHours($scope.roleId, $scope.refNo);
        }
    });

    // Example function to toggle the visibility

    function updatedaysinweek(year, month, week) {
        // Assuming getDaysInWeek returns an array of days for the given year, month, and week
        let days = getDaysInWeek(year, month, week);

        // Update the daysInWeek in $scope
        $scope.daysInWeek = days;

        // If days are available, set the WeekStartDay and WeekEndDay
        if (days.length > 0) {
            $scope.WeekStartDay = days[0]; // First day in the array
            $scope.WeekEndDay = days[days.length - 1]; // Last day in the array
        } else {
            // Handle the case where there are no days (error handling)
            $scope.WeekStartDay = null;
            $scope.WeekEndDay = null;
            msgalert("Error", "No days found for the selected week", 3);
        }
    }


    vm.selectedWeek = 1;
    // Get the current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0-11

    // Initialize the selected year and month with current values
    vm.selectedYear = currentYear.toString();
    vm.selectedMonth = currentMonth.toString();

    vm.GetEmpManagerlist = function (roleId, refNo) {
        var Condition;
        var param = {
            WorkWeek: 1
        };

        if (roleId == 1) {
            Condition = "where delete_status = 0 order by emp_full_name asc";
        } else if (roleId == 9 || roleId == 10) {
            Condition = "where delete_status = 0 AND company_id != 3 order by emp_full_name asc";
        } else if (roleId == 27) {
            Condition = "where delete_status = 0 AND company_id = 3 order by emp_full_name asc";
        } else if (roleId == 2) {
            Condition = "where delete_status = 0 and report_to_manager = " + refNo + " order by emp_full_name asc";
        }

        var strJsonDatas = eval({ strCondition: Condition });
        var msg2 = JSON.stringify(strJsonDatas);

        // Return the promise from the HTTP request
        return $http({
            method: 'POST',
            url: 'SelectManagerandEmployee',
            data: msg2
        }).then(function (response) {
            vm.EmpManagerList = response.data;

            for (var i = 0; i < vm.EmpManagerList.length; i++) {
                if (vm.EmpManagerList[i]["file_path"] === undefined) {
                    vm.EmpManagerList[i]["file_path"] = "../Content/Image/avatar.png";
                }
            }
        }, function (error) {
            console.error("Error fetching employee manager list:", error);
        });
    };

    vm.GetEmpWeeklyAttendance = function (year, month, WeekStartDay, WeekEndDay) {
        var paramNames = [], paramValues = [];
        paramNames.push('Year');
        paramValues.push(year);
        paramNames.push('Month');
        paramValues.push(month);
        paramNames.push('WeekStartDay');
        paramValues.push(WeekStartDay);
        paramNames.push('WeekEndDay');
        paramValues.push(WeekEndDay);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });
        var msg2 = JSON.stringify(strJsonDatas);

        // Return the promise from the HTTP request
        return $http({
            method: 'POST',
            url: 'SelectEmpWeeklyAttendance',
            data: msg2
        }).then(function (response) {
            vm.WeeklyAttendance = response.data;
        }, function (error) {
            console.error("Error fetching weekly attendance:", error);
        });
    };

    // Getting working hours and OT hours function
    vm.GetHours = function (roleId, refNo) {
        var month = $('#viewWHandOT #ddlMonth').val();
        var year = $('#viewWHandOT #ddlYear').val();
        var week = $('#viewWHandOT #ddlWeek').val();

        if (month == 0) {
            msgalert("Error", "Please choose Month", 3);
            return;
        }

        if (year == 0) {
            msgalert("Error", "Please choose Year", 3);
            return;
        }

        if (week == 0) {
            msgalert("Error", "Please choose Week", 3);
            return;
        }

        updatedaysinweek(year, month, week);

        // Call GetEmpManagerlist and wait for it to complete
        vm.GetEmpManagerlist(roleId, refNo).then(function () {
            // After GetEmpManagerlist has completed, call GetEmpWeeklyAttendance
            return vm.GetEmpWeeklyAttendance(year, month, $scope.WeekStartDay, $scope.WeekEndDay);
        }).then(function () {
            // This block executes after GetEmpWeeklyAttendance completes

            // Reset the valid attendance list
            vm.validempweeklyattendance = [];

            // Loop through WeeklyAttendance
            for (var i = 0; i < vm.WeeklyAttendance.length; i++) {
                var attendanceEntry = vm.WeeklyAttendance[i];

                // Check if the employee exists in EmpManagerList
                var employeeExists = vm.EmpManagerList.some(function (emp) {
                    return emp.emp_ref_no === attendanceEntry.emp_ref_no; // Assuming emp_ref_no is the unique identifier
                });

                // If employee exists, push the attendance entry into validempweeklyattendance
                if (employeeExists) {
                    vm.validempweeklyattendance.push(attendanceEntry);
                }
            }

            var attendanceRecords = [];

            // Group by employee reference number (emp_ref_no)
            var groupedAttendance = {};
            vm.validempweeklyattendance.forEach(function (entry) {
                if (!groupedAttendance[entry.emp_ref_no]) {
                    // Initialize the group for each employee
                    groupedAttendance[entry.emp_ref_no] = {
                        emp_name: entry.emp_name,
                        emp_ref_no: entry.emp_ref_no,
                        days: [],
                        totalHours: 0,
                        totalWH: 0,
                        totalRH: 0,
                        totalOT: 0
                    };
                }

                // Process day-wise data
                var employee = groupedAttendance[entry.emp_ref_no];

                // Add the day's data to the employee's days array
                employee.days.push({
                    day: entry.Day,
                    WH: entry.WH,
                    RH: Math.max(0, entry.RH), // Set RH to 0 if less than 0
                    OT: entry.OT,
                    Status: entry.Status,
                    TotalHours: entry.TotalHours
                });

                // Add to the employee's total values
                employee.totalHours += entry.TotalHours;
                employee.totalWH += entry.WH;
                employee.totalRH += Math.max(0, entry.RH); // Ignore negative RH
                employee.totalOT += entry.OT;

                // Format the totals to two decimal places
                employee.totalHours = parseFloat(employee.totalHours.toFixed(2));
                employee.totalWH = parseFloat(employee.totalWH.toFixed(2));
                employee.totalRH = parseFloat(employee.totalRH.toFixed(2));
                employee.totalOT = parseFloat(employee.totalOT.toFixed(2));

            });

            // Convert grouped data into an array
            for (var emp_ref_no in groupedAttendance) {
                if (groupedAttendance.hasOwnProperty(emp_ref_no)) {
                    attendanceRecords.push(groupedAttendance[emp_ref_no]);
                }
            }


            // Sort the attendanceRecords array by totalHours in descending order
            attendanceRecords.sort(function (a, b) {
                return b.totalHours - a.totalHours; // Sort by totalHours descending
            });


            // Update the $scope with the formatted data
            $scope.attendanceRecords = attendanceRecords;

            console.log($scope.attendanceRecords); // Check the formatted records
        }).catch(function (error) {
            // Handle any errors that occur in either of the promises
            console.error("Error fetching data:", error);
        });
    };

    //$scope.attendanceRecords = [
    //{
    //    emp_name: 'JIJA JOSEPH',
    //    emp_ref_no: 108,
    //    totalHours: 16,     // Higher total hours, appears first
    //    totalWH: 13.5,
    //    totalRH: 6.5,
    //    totalOT: 4,
    //    days: [
    //        { day: 22, WH: 12.00, RH: 0.00, OT: 4.00, Status: 'FULL DAY', TotalHours: 8 },
    //        { day: 24, WH: 1.50, RH: 6.50, OT: 0.00, Status: 'FULL DAY', TotalHours: 8 }
    //    ]
    //},
    //{
    //    emp_name: 'Test Admin',
    //    emp_ref_no: 1,
    //    totalHours: 0,      // Lower total hours, appears later
    //    totalWH: 0,
    //    totalRH: 0,
    //    totalOT: 0,
    //    days: [
    //        { day: 24, WH: 0.00, RH: 0.00, OT: 0.00, Status: 'PLANNED LEAVE', TotalHours: 0 }
    //    ]
    //}
    //];



    // Get attendance for a specific day
    $scope.getAttendanceForDay = function (days, day) {
        return days.find(function (d) { return d.day === day; }) || null;
    };

    //// Calculate total hours (WH, RH, OT) for each employee
    //$scope.getTotalHours = function (days) {
    //    return days.reduce(function (total, record) {
    //        return total + record.WH + record.RH + record.OT;
    //    }, 0);
    //};


    // Initialize the selected year and month
    // Get the current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0-11

    // Initialize the selected year and month with current values
    $scope.selectedYear = currentYear.toString();
    $scope.selectedMonth = currentMonth.toString();

    //for attendance module
    $scope.openModal = function (empRefNo, day, year, month, empName, title) {
        var empName = empName;
        var title = title;

        $("#attendance_info .modal-body .card-title small").empty();
        $("#attendance_info .modal-body .punch-det.empName p").empty();
        $("#attendance_info .modal-body .punch-det.attendance-title p").empty();
        $("#attendance_info .modal-body .punch-info .punch-hours.total-hours span").empty();
        $("#attendance_info .modal-body .punch-info .punch-hours.worked-hours span").empty();
        $("#attendance_info .modal-body .punch-info .punch-hours.break-hours span").empty();
        $("#attendance_info .modal-body .statistics .stats-box.basic-working-hours h3").empty();
        $("#attendance_info .modal-body .statistics .stats-box.overtime h3").empty();
        $("#attendance_info .modal-body .res-activity-list.activities").empty();
        $("#attendance_info .modal-body .res-activity-list.breakactivites").empty();

        // Create a new Date object
        var date = new Date(year, month - 1, day); // month - 1 because JavaScript Date object is 0-indexed for months

        // Format the date with weekday, year, month, and day
        var formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Update the text of the element
        $("#attendance_info .modal-body .card-title small").empty().text(formattedDate);

        day = day.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');

        var logintimemerged = year + "-" + month + "-" + day + "T00:00:00.000Z"; //2024-08-05T00:00:00.000Z

        fetchAttendanceData(empRefNo, logintimemerged, empName, title, function (attendanceData, BreakTimeData, empName, title) {
            updateModalContent(attendanceData, BreakTimeData, empName, title);

            // Open the modal
            parent.$("#attendance_info").modal({
                "backdrop": "static",
                "keyboard": true,
                "show": true
            });

            // Open the modal
            //$('#attendance_info').modal('show');
        });
    };

    function fetchAttendanceData(empRefNo, logintimemerged, empName, title, callback) {
        console.log(empName);
        console.log(title);
        var GetAllAttendancesApiUrl = 'http://13.202.88.154/Impulse_Attendance/api/Attendance/GetAllTodayAttendances';
        var GetAllBreakTimesApiUrl = 'http://13.202.88.154/Impulse_Attendance/api/Attendance/GetAllBreakTimes';
        var requestBody = {
            attendance_Id: 0,
            emp_Ref_No: empRefNo,
            emp_Code: "string",
            login_Time: logintimemerged,
            logout_Time: new Date().toISOString(),
            attendance_Status: 0,
            remarks: "string",
            delete_Status: 0
        };

        fetch(GetAllAttendancesApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.apiStatus === 0) {
                    try {
                        // Extract and parse the attendanceRecord from apiStatusMessage
                        var apiStatusMessage = data.apiStatusMessage;
                        var jsonStartIndex = apiStatusMessage.indexOf('[');
                        var jsonEndIndex = apiStatusMessage.lastIndexOf(']') + 1;
                        var jsonString = apiStatusMessage.substring(jsonStartIndex, jsonEndIndex);
                        var attendanceRecord = JSON.parse(jsonString);

                        if (attendanceRecord.length === 0) {

                            $("#attendance_info .modal-body .punch-det.empName p").empty().text(empName);
                            $("#attendance_info .modal-body .punch-det.attendance-title p").empty().text(title);

                            $("#attendance_info .modal-body .punch-info .punch-hours.total-hours span").empty().text("00:00:00 hrs");
                            $("#attendance_info .modal-body .punch-info .punch-hours.worked-hours span").empty().text("00:00:00 hrs");
                            $("#attendance_info .modal-body .punch-info .punch-hours.break-hours span").empty().text("00:00:00 hrs");
                            $("#attendance_info .modal-body .statistics .stats-box.basic-working-hours h3").empty().text("0 hrs");
                            $("#attendance_info .modal-body .statistics .stats-box.overtime h3").empty().text("0 hrs");

                            var activityList = $("#attendance_info .modal-body .res-activity-list.activities");
                            activityList.empty(); // Clear existing list

                            var breakactivityList = $("#attendance_info .modal-body .res-activity-list.breakactivites");
                            breakactivityList.empty(); // Clear existing list

                            var punchInItem = '<li>' +
                                '<p class="mb-0">Punch In at</p>' +
                                '<p class="res-activity-time">' +
                                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                                '</p>' +
                                '</li>';

                            activityList.append(punchInItem);

                            var punchOutItem = '<li>' +
                                '<p class="mb-0">Punch Out at</p>' +
                                '<p class="res-activity-time">' +
                                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                                '</p>' +
                                '</li>';

                            activityList.append(punchOutItem);

                            var breakpunchInItem = '<li>' +
                                '<p class="mb-0">Break In at</p>' +
                                '<p class="res-activity-time">' +
                                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                                '</p>' +
                                '</li>';
                            breakactivityList.append(breakpunchInItem);

                            var breakpunchOutItem = '<li>' +
                                '<p class="mb-0">Break In at</p>' +
                                '<p class="res-activity-time">' +
                                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                                '</p>' +
                                '</li>';
                            breakactivityList.append(breakpunchOutItem);

                        }
                        else {
                            var attendanceIds = attendanceRecord.map(function (record) {
                                return record.Attendance_Id;
                            });


                            console.log(attendanceIds);

                            var requestBodyBreakTimes = {
                                break_Id: 0,
                                emp_Ref_No: 0,
                                attendance_Ids: attendanceIds,
                                break_In_Time: "string",
                                break_Out_Time: "string",
                                total_Break_Hours: "string",
                                remarks: "string"
                            }

                            fetch(GetAllBreakTimesApiUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(requestBodyBreakTimes)
                            })
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (data) {
                                    if (data.apiStatus === 0) {
                                        try {
                                            // Extract and parse the attendanceRecord from apiStatusMessage
                                            var breaktimeapiStatusMessage = data.apiStatusMessage;
                                            var breaktimejsonStartIndex = breaktimeapiStatusMessage.indexOf('[');
                                            var breaktimejsonEndIndex = breaktimeapiStatusMessage.lastIndexOf(']') + 1;
                                            var breaktimejsonString = breaktimeapiStatusMessage.substring(breaktimejsonStartIndex, breaktimejsonEndIndex);
                                            var BreakTimeRecord = JSON.parse(breaktimejsonString);

                                            callback(attendanceRecord, BreakTimeRecord, empName, title);
                                        }
                                        catch (e) {
                                            console.error("Error parsing break time data:", e);
                                        }
                                    }
                                })
                                .catch(function (error) {
                                    console.error("Fetch Error:", error);
                                });
                        }



                    } catch (e) {
                        console.error("Error parsing attendance data:", e);
                    }
                } else {
                    console.error("API Error: " + data.apiStatusMessage);
                }
            })
            .catch(function (error) {
                console.error("Fetch Error:", error);
            });
    }

    function updateModalContent(attendanceData, BreakTimeData, empName, title) {
        if (attendanceData.length === 0) {
            console.log("No attendance data available.");
            return;
        }

        if (BreakTimeData.length === 0) {
            console.log("No breaktime data available.");

            // Assuming the first record for punch in and out times
            var firstRecord = attendanceData[0];
            var punchInTime = firstRecord.Login_Time;
            var punchOutTime = firstRecord.Logout_Time;

            var punchInDate = new Date(punchInTime);
            var punchOutDate = new Date(punchOutTime);

            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

            var loginDateText = punchInDate.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            //$("#attendance_info .modal-body .card-title small").text(loginDateText);

            // Update the employee name
            $("#attendance_info .modal-body .punch-det.empName p").empty().text(empName);

            // Update the attendance status title
            $("#attendance_info .modal-body .punch-det.attendance-title p").empty().text(title);

            ////////////////////////////////////////////////////////////////////////////
            // Get the current date and time
            var currentTime = new Date();

            // Calculate the time difference for the last login time if logout time is null
            var timeDifference = attendanceData.reduce(function (acc, record) {
                if (record.Logout_Time === null) {
                    var loginTimeValue = new Date(record.Login_Time);
                    acc += currentTime - loginTimeValue;
                }
                return acc;
            }, 0);

            // Sum the total time differences between login and logout times
            var totalTimeDifferenceMs = attendanceData.reduce(function (acc, record) {
                if (record.Logout_Time !== null) {
                    var loginTime = new Date(record.Login_Time);
                    var logoutTime = new Date(record.Logout_Time);
                    acc += (logoutTime - loginTime);
                }
                return acc;
            }, 0);

            totalTimeDifferenceMs += timeDifference

            var totalSeconds = Math.floor(totalTimeDifferenceMs / 1000);
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;
            var formattedTotalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            ///////////////////////////////////

            var breaktimeformatted = "00" + ":" + "00" + ":" + "00";

            //////////////////////////////////////////////////////////////////////////////////////////////////////

            // Convert formattedTotalTime to total seconds
            var totalTimeParts = formattedTotalTime.split(':').map(Number);
            var totalTimeInSeconds = (totalTimeParts[0] * 3600) + (totalTimeParts[1] * 60) + totalTimeParts[2];

            // Convert breaktimeformatted to total seconds
            var breakTimeParts = breaktimeformatted.split(':').map(Number);
            var breakTimeInSeconds = (breakTimeParts[0] * 3600) + (breakTimeParts[1] * 60) + breakTimeParts[2];

            // Subtract break time from total time
            var workedTimeInSeconds = totalTimeInSeconds - breakTimeInSeconds;

            // Convert workedTimeInSeconds back to HH:MM:SS format
            var workedHours = Math.floor(workedTimeInSeconds / 3600);
            workedTimeInSeconds %= 3600;
            var workedMinutes = Math.floor(workedTimeInSeconds / 60);
            var workedSeconds = workedTimeInSeconds % 60;

            var workedTime = String(workedHours).padStart(2, '0') + ':' + String(workedMinutes).padStart(2, '0') + ':' + String(workedSeconds).padStart(2, '0');

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var totalhours = formattedTotalTime + " hrs";
            var workedhourtime = workedTime + " hrs";
            var breakhours = breaktimeformatted + " hrs";

            var basicworkinghour = workedHours + " hrs";


            // Calculate overtime hours if basic working hour is greater than 8
            var overtimeHours = 0;
            var overtime = 0;
            if (workedHours > 8) {
                overtimeHours = workedHours - 8;
            }
            var overtime = overtimeHours + " hrs";

            $("#attendance_info .modal-body .punch-info .punch-hours.total-hours span").empty().text(totalhours);
            $("#attendance_info .modal-body .punch-info .punch-hours.worked-hours span").empty().text(workedhourtime);
            $("#attendance_info .modal-body .punch-info .punch-hours.break-hours span").empty().text(breakhours);


            $("#attendance_info .modal-body .statistics .stats-box.basic-working-hours h3").empty().text(basicworkinghour);
            $("#attendance_info .modal-body .statistics .stats-box.overtime h3").empty().text(overtime);

            ////////////////////////////////////////////////////////////////////////////



            // Update activity list
            var activityList = $("#attendance_info .modal-body .res-activity-list.activities");
            activityList.empty(); // Clear existing list

            var breakactivityList = $("#attendance_info .modal-body .res-activity-list.breakactivites");
            breakactivityList.empty(); // Clear existing list

            var breakpunchInItem = '<li>' +
                '<p class="mb-0">Break In at</p>' +
                '<p class="res-activity-time">' +
                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                '</p>' +
                '</li>';
            breakactivityList.append(breakpunchInItem);

            var breakpunchOutItem = '<li>' +
                '<p class="mb-0">Break In at</p>' +
                '<p class="res-activity-time">' +
                '<i class="fa fa-clock-o"></i> ' + 'N/A' +
                '</p>' +
                '</li>';
            breakactivityList.append(breakpunchOutItem);

            attendanceData.forEach(function (record) {
                if (record.Login_Time) {
                    var punchInItem = '<li>' +
                        '<p class="mb-0">Punch In at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(record.Login_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    activityList.append(punchInItem);
                }
                if (record.Logout_Time) {
                    var punchOutItem = '<li>' +
                        '<p class="mb-0">Punch Out at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(record.Logout_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    activityList.append(punchOutItem);
                }
            });

        }
        else {
            // Assuming the first record for punch in and out times
            var firstRecord = attendanceData[0];
            var punchInTime = firstRecord.Login_Time;
            var punchOutTime = firstRecord.Logout_Time;

            var punchInDate = new Date(punchInTime);
            var punchOutDate = new Date(punchOutTime);

            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

            var loginDateText = punchInDate.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            //$("#attendance_info .modal-body .card-title small").text(loginDateText);

            // Update the employee name
            $("#attendance_info .modal-body .punch-det.empName p").empty().text(empName);

            // Update the attendance status title
            $("#attendance_info .modal-body .punch-det.attendance-title p").empty().text(title);

            ////////////////////////////////////////////////////////////////////////////
            // Get the current date and time
            var currentTime = new Date();

            // Calculate the time difference for the last login time if logout time is null
            var timeDifference = attendanceData.reduce(function (acc, record) {
                if (record.Logout_Time === null) {
                    var loginTimeValue = new Date(record.Login_Time);
                    acc += currentTime - loginTimeValue;
                }
                return acc;
            }, 0);

            // Sum the total time differences between login and logout times
            var totalTimeDifferenceMs = attendanceData.reduce(function (acc, record) {
                if (record.Logout_Time !== null) {
                    var loginTime = new Date(record.Login_Time);
                    var logoutTime = new Date(record.Logout_Time);
                    acc += (logoutTime - loginTime);
                }
                return acc;
            }, 0);

            totalTimeDifferenceMs += timeDifference

            var totalSeconds = Math.floor(totalTimeDifferenceMs / 1000);
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;
            var formattedTotalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            ///////////////////////////////////

            var totalSeconds = BreakTimeData.reduce(function (acc, record) {
                var timeParts = record.Total_Break_Hours.split(':').map(function (part) {
                    return parseInt(part, 10);
                });

                var hours = timeParts[0];
                var minutes = timeParts[1];
                var seconds = timeParts[2];

                return acc + (hours * 3600) + (minutes * 60) + seconds;
            }, 0);

            var totalHours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            var totalMinutes = Math.floor(totalSeconds / 60);
            var totalSecondsLeft = totalSeconds % 60;

            var formattedHours = String(totalHours).padStart(2, '0');
            var formattedMinutes = String(totalMinutes).padStart(2, '0');
            var formattedSeconds = String(totalSecondsLeft).padStart(2, '0');

            var breaktimeformatted = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

            //////////////////////////////////////////////////////////////////////////////////////////////////////

            // Convert formattedTotalTime to total seconds
            var totalTimeParts = formattedTotalTime.split(':').map(Number);
            var totalTimeInSeconds = (totalTimeParts[0] * 3600) + (totalTimeParts[1] * 60) + totalTimeParts[2];

            // Convert breaktimeformatted to total seconds
            var breakTimeParts = breaktimeformatted.split(':').map(Number);
            var breakTimeInSeconds = (breakTimeParts[0] * 3600) + (breakTimeParts[1] * 60) + breakTimeParts[2];

            // Subtract break time from total time
            var workedTimeInSeconds = totalTimeInSeconds - breakTimeInSeconds;

            // Convert workedTimeInSeconds back to HH:MM:SS format
            var workedHours = Math.floor(workedTimeInSeconds / 3600);
            workedTimeInSeconds %= 3600;
            var workedMinutes = Math.floor(workedTimeInSeconds / 60);
            var workedSeconds = workedTimeInSeconds % 60;

            var workedTime = String(workedHours).padStart(2, '0') + ':' + String(workedMinutes).padStart(2, '0') + ':' + String(workedSeconds).padStart(2, '0');

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var totalhours = formattedTotalTime + " hrs";
            var workedhourtime = workedTime + " hrs";
            var breakhours = breaktimeformatted + " hrs";

            var basicworkinghour = workedHours + " hrs";


            // Calculate overtime hours if basic working hour is greater than 8
            var overtimeHours = 0;
            var overtime = 0;
            if (workedHours > 8) {
                overtimeHours = workedHours - 8;
            }
            var overtime = overtimeHours + " hrs";

            $("#attendance_info .modal-body .punch-info .punch-hours.total-hours span").empty().text(totalhours);
            $("#attendance_info .modal-body .punch-info .punch-hours.worked-hours span").empty().text(workedhourtime);
            $("#attendance_info .modal-body .punch-info .punch-hours.break-hours span").empty().text(breakhours);


            $("#attendance_info .modal-body .statistics .stats-box.basic-working-hours h3").empty().text(basicworkinghour);
            $("#attendance_info .modal-body .statistics .stats-box.overtime h3").empty().text(overtime);

            ////////////////////////////////////////////////////////////////////////////



            // Update activity list
            var activityList = $("#attendance_info .modal-body .res-activity-list.activities");
            activityList.empty(); // Clear existing list

            var breakactivityList = $("#attendance_info .modal-body .res-activity-list.breakactivites");
            breakactivityList.empty(); // Clear existing list


            attendanceData.forEach(function (record) {
                if (record.Login_Time) {
                    var punchInItem = '<li>' +
                        '<p class="mb-0">Punch In at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(record.Login_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    activityList.append(punchInItem);
                }
                if (record.Logout_Time) {
                    var punchOutItem = '<li>' +
                        '<p class="mb-0">Punch Out at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(record.Logout_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    activityList.append(punchOutItem);
                }
            });



            BreakTimeData.forEach(function (breakrecord) {
                if (breakrecord.Break_In_Time) {
                    var breakpunchInItem = '<li>' +
                        '<p class="mb-0">Break In at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(breakrecord.Break_In_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    breakactivityList.append(breakpunchInItem);
                }
                if (breakrecord.Break_Out_Time) {
                    var breakpunchOutItem = '<li>' +
                        '<p class="mb-0">Break Out at</p>' +
                        '<p class="res-activity-time">' +
                        '<i class="fa fa-clock-o"></i> ' + new Date(breakrecord.Break_Out_Time).toLocaleString('en-US', options) +
                        '</p>' +
                        '</li>';
                    breakactivityList.append(breakpunchOutItem);
                }
            });
        }


    }

});

