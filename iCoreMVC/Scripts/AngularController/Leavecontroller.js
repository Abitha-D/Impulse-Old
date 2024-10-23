
var myApp = angular.module('Leave', []);

myApp.controller('LeaveController', function ($scope, $http, $location, $window) {
    var vm = $scope;
    $scope.cust = {};
    $scope.message = '';
    $scope.result = "color-default";
    $scope.isViewLoading = false;
    $scope.refNo = $window.refNo;
    $scope.isChecked = 1;
    var empRef, rpttomgr, mgrRole, totLeave, empLeaveDetails, empLeaveCount, EmpLeaveHistory;

    var totDays, leaveType, leaveEntNo;

    var leavEmp, leavId, leavAccept, leave_type, tot_days;

    var sLeave;

    vm.empLeaveCount;

    $scope.GetPendingApproval = function (refNo) {

        empRef = refNo;

        var Condition;

        if (refNo != 1) {
            Condition = "WHERE is_approved = 0 and approval_manager= " + refNo;
        }
        else {
            Condition = "WHERE is_approved = 0";
        }


        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);
        $http({
            method: 'POST',
            url: 'GetPendingApproval',
            data: msg2
        }).then(function (response) {
            vm.PendingLeaves = response.data

            for (var i = 0; i < vm.PendingLeaves.length; i++) {
                var startdate = vm.PendingLeaves[i]["start_date"].split('T');

                var enddate = vm.PendingLeaves[i]["end_date"].split('T');

                vm.PendingLeaves[i]["start_date"] = startdate[0];

                vm.PendingLeaves[i]["end_date"] = enddate[0];
            }

        }, function (error) {

        });

    };

    vm.GetUserDetails = function (s) {

        empRef = s;

        var Condition = "WHERE emp_ref_no = " + empRef;

        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);
        $http({
            method: 'POST',
            url: 'SelectEmployeeDetails',
            data: msg2
        }).then(function (response) {

            vm.EmployeeDetail = response.data

            rpttomgr = vm.EmployeeDetail[0].report_to_manager;

            var Condition = "WHERE emp_ref_no = " + rpttomgr;

            var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);
            $http({
                method: 'POST',
                url: 'SelectEmployeeDetails',
                data: msg2
            }).then(function (response) {
                vm.EmployeeDetails = response.data

                mgrRole = vm.EmployeeDetails[0].role_id;

            }, function (error) {

            });

        }, function (error) {

        });

    };

    vm.BindEmployees = function (ref) {

        empRef = ref;

        //alert(roleId);

        var Condition = "WHERE emp_ref_no = " + empRef;

        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);
        $http({
            method: 'POST',
            url: 'SelectEmployeeDetails',
            data: msg2
        }).then(function (response) {

            vm.EmployeeDetail = response.data

            roleId = vm.EmployeeDetail[0].role_id;

            if (roleId == 1) { //if (ref == 1 || ref == 2) {
                var Condition = "WHERE delete_status = 0 ";
            }
            else if (roleId == 9 || roleId == 10) { //else if (ref == 396 || ref == 39) {
                var Condition = "WHERE delete_status = 0 AND company_id != 3 ";
            }
            else if (roleId == 27) { //else if (ref == 439) {
                var Condition = "WHERE delete_status = 0 AND company_id = 3 ";
            }
            else {
                var Condition = "WHERE delete_status = 0 AND report_to_manager = " + empRef;
            }

            var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);
            $http({
                method: 'POST',
                url: 'SelectEmployees',
                data: msg2
            }).then(function (response) {

                vm.Employees = response.data;

            }, function (error) {

            });

        }, function (error) {

        });

    };

    vm.getLeaveCounts = function (leaveType, empId, totalNoofDays) {

        var valueData;

        var curDate = formatDate(new Date());

        var d = new Date();

        var cYear = d.getFullYear();

        var leaveTake = "", leaveTot = "";

        var sCondition = "WHERE emp_ref_no = " + empId + " and year = " + cYear;

        var strJsonDatas1 = eval({ strCondition: sCondition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas1);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLeaveDetails',
            data: msg2
        }).then(function (response1) {

            vm.empLeaveDetails = response1.data;

            var nofday = parseFloat(totalNoofDays);

            if (leaveType == 1) { //Casual

                if (nofday == 0.5) //Half day
                {
                    leaveTake = parseFloat(vm.empLeaveDetails[0]["Half"]) + 1;

                    if (nofday > parseFloat(vm.empLeaveDetails[0]["CL_total"])) {

                        msgalert("Error", "You are not eligible for this Leave type", 3);

                        return;
                    }

                    leaveTot = parseFloat(vm.empLeaveDetails[0]["CL_total"]) - nofday;

                    valueData = "{Half: " + leaveTake + ", CL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                }
                else //full leave
                {
                    leaveTake = parseFloat(vm.empLeaveDetails[0]["CL_taken"]) + nofday;

                    if (nofday > parseFloat(vm.empLeaveDetails[0]["CL_total"])) {

                        msgalert("Error", "You are not eligible for this Leave type", 3);

                        return;
                    }

                    leaveTot = parseFloat(vm.empLeaveDetails[0]["CL_total"]) - nofday;

                    valueData = "{CL_taken: " + leaveTake + ", CL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                }


            }
            else if (leaveType == 2) { //Planned Leave

                if (nofday == 0.5) { //Half day

                    leaveTake = parseFloat(vm.empLeaveDetails[0]["Half"]) + 1;

                    if (nofday > parseFloat(vm.empLeaveDetails[0]["PL_total"])) {

                        msgalert("Error", "You are not eligible for this Leave type", 3);

                        return;
                    }

                    leaveTot = parseFloat(vm.empLeaveDetails[0]["PL_total"]) - nofday;

                    valueData = "{Half: " + leaveTake + ", PL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                }
                else {
                    leaveTake = parseFloat(vm.empLeaveDetails[0]["PL_taken"]) + nofday;

                    if (nofday > parseFloat(vm.empLeaveDetails[0]["PL_total"])) {

                        msgalert("Error", "You are not eligible for this Leave type", 3);

                        return;
                    }

                    leaveTot = parseFloat(vm.empLeaveDetails[0]["PL_total"]) - nofday;

                    valueData = "{PL_taken: '" + leaveTake + "', PL_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
                }
            }
            else if (leaveType == 3) { //Comp Off

                leaveTake = parseFloat(vm.empLeaveDetails[0]["Compoff"]) + nofday;

                valueData = "{Compoff: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

            }
            else if (leaveType == 7) { //LossofPay

                if (nofday == 0.5) { //Half day

                    leaveTake = parseFloat(vm.empLeaveDetails[0]["LossofPay_Half"]) + 1;

                    valueData = "{LossofPay_Half: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                }
                else {

                    leaveTake = parseFloat(vm.empLeaveDetails[0]["LossofPay"]) + nofday;

                    valueData = "{LossofPay: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";
                }
            }
            else if (leaveType == 5) { //Maternity

                leaveTake = parseFloat(vm.empLeaveDetails[0]["Maternity"]) + nofday;

                valueData = "{Maternity: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 6) { //Medical

                leaveTake = parseFloat(vm.empLeaveDetails[0]["Medical"]) + nofday;

                valueData = "{Medical: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 8) { //PreviousYearLeave

                leaveTake = parseFloat(vm.empLeaveDetails[0]["py_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["py_balance"])) {

                    msgalert("Error", "You are not eligible for this Leave type", 3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["py_balance"]) - nofday;

                valueData = "{py_taken: '" + leaveTake + "', py_balance: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }


            var sCondition1 = "WHERE emp_ref_no = " + empId + " and year = " + cYear;

            var strJsonDatas1 = eval({ strJsonData: valueData, strCondition: sCondition1, strSessionID: null });

            var msg = JSON.stringify(strJsonDatas1);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveCount",
                data: msg,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                msgalert("Success", "Leave Accepted", 1);

                window.location.reload();

            });

        }, function (error) {

        });

    }

    vm.GetNofDays = function () {

        var frmDt = $('#txtfromdt').val();

        var toDt = $('#txtTodate').val();

        var fDate = new Date(frmDt);

        var tDate = new Date(toDt);

        var res = Math.abs(tDate - fDate) / 1000;
        var days = Math.floor(res / 86400);

        days = days + 1;

        var halfday = $('#isHalf').prop("checked");

        if (halfday == true) {

            totLeave = .5;

            $('#txttotal').val(.5);
        }
        else {

            totLeave = days;

            $('#txttotal').val(days);
        }

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

    vm.InsertLeaveDeatils = function () {

        var leaveType = $('#ddlLeaveType').val();

        var reason = $('#txtReason').val();

        var frmDt = $('#txtfromdt').val();

        var toDt = $('#txtTodate').val();

        var nofday = $('#txttotal').val();

        if (leaveType < 0) {
            msgalert("Error", "Please Choose Leave Type", 3);
            return;
        }
        if (reason == "") {
            msgalert("Error", "Please Enter Leave Reason", 3);
            return;
        }
        if (frmDt == "") {
            msgalert("Error", "Please Choose From Date", 3);
            return;
        }
        if (toDt == "") {
            msgalert("Error", "Please Choose to Date", 3);
            return;
        }

        nofday = parseFloat(nofday);

        if (leaveType == 1) {
            if (nofday > parseFloat(vm.empLeaveCount[0]["CL_total"])) {

                msgalert("Error", "You are not eligible for this Leave type", 3);

                return;
            }
        }
        else if (leaveType == 2) {

            if (nofday > parseFloat(vm.empLeaveCount[0]["PL_total"])) {

                msgalert("Error", "You are not eligible for this Leave type", 3);

                return;
            }

        }
        //else if (leaveType == 3)
        //{

        //    if (nofday > parseFloat(vm.empLeaveCount[0]["Maternity_total"])) {

        //        msgalert("Error", "You are not eligible for this Leave type", 3);

        //        return;
        //    }
        //}
        //else if (leaveType == 4)
        //{
        //    if (nofday > parseFloat(vm.empLeaveCount[0]["Paternity_total"])) {

        //        msgalert("Error", "You are not eligible for this Leave type", 3);

        //        return;
        //    }
        //}
        //else if (leaveType == 5)
        //{
        //    if (nofday > parseFloat(vm.empLeaveCount[0]["CompOff_total"])) {

        //        msgalert("Error", "You are not eligible for this Leave type", 3);

        //        return;
        //    }
        //}
        else if (leaveType == 8) {
            if (nofday > parseFloat(vm.empLeaveCount[0]["py_balance"])) {

                msgalert("Error", "You are not eligible for this Leave type", 3);

                return;
            }
        }

        var curDate = formatDate(new Date());

        var leaveDate = new Date(frmDt)

        var mn = leaveDate.getMonth() + 1;

        reason = reason.replace("'", "");

        var year = leaveDate.getFullYear();

        var valueData = "{emp_ref_no: '" + empRef + "', leave_type_id: '" + leaveType + "', applied_date: '" + curDate + "', applied_by: '" + empRef
            + "', approval_manager: '" + rpttomgr + "', start_date: '" + frmDt + "', end_date: '" + toDt + "', no_of_days: '" + nofday + "', reason: '" + reason
            + "', is_approved: 0, is_cancelled:0, leave_month:" + mn + ", leave_year:" + year + "}";

        var strJsonDatas = eval({ strJsonData: valueData, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        var post = $http({
            method: "POST",
            url: "InsertLeaveEntry",
            data: msg2,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {

            var Data = "{type: 'Leave Request', manager_ref_no: '" + rpttomgr + "', emp_ref_no: '" + empRef + "', page_name: 'Approve Leave', page_url: '../Leave/ApproveLeave', page_id: 10025, role_id: '" + mgrRole + "', delete_status: 0 }";

            var strJsonDatas1 = eval({ strJsonData: Data, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas1);

            var post1 = $http({
                method: "POST",
                url: "InsertNotification",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post1.success(function (data, status) {

                msgalert("Success", "Leave Applied Successfully", 1);

                window.location.reload();

            });


        });

    };

    vm.openModal = function (emp_ref, leaveEntry, isAccept, leavetyp, totdays) {

        leavEmp = emp_ref;

        leavId = leaveEntry;

        leavAccept = isAccept;

        leave_type = leavetyp;

        tot_days = totdays;

        $("#txtReason").val("");
    };

    vm.LeaveApprove = function () {

        var reason = $("#txtReason").val();


        var curDate = formatDate(new Date());


        if (reason == null || reason == "") {
            msgalert("Warning", "Please Enter Reason", 2);
            return;
        }

        if (leavAccept == 1) { //Accept

            var valueData = "{is_approved: 1, status_reason: '" + reason + "', approved_by: '" + empRef + "', approved_date: '" + curDate + "'}";

            var sCondition = "WHERE emp_ref_no = " + leavEmp + " and leave_ent_ref_no= " + leavId;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveEntry",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                var Condition1 = "WHERE emp_ref_no = " + leavEmp + " and leave_ent_ref_no= " + leavId;

                var strJsonDatas1 = eval({ strCondition: Condition1, strFieldNames: null, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas1);

                $http({
                    method: 'POST',
                    url: 'GetLeaveDetails',
                    data: msg2
                }).then(function (response) {

                    vm.LeaveDet = response.data

                    var sDate = vm.LeaveDet[0]["start_date"];

                    sDate = new Date(sDate);

                    var eDate = vm.LeaveDet[0]["end_date"];

                    eDate = new Date(eDate);

                    var mngr = vm.LeaveDet[0]["approval_manager"];

                    var reason = vm.LeaveDet[0]["reason"];

                    if (sDate != eDate) {
                        while (sDate <= eDate) {
                            var dat = formatDate(sDate);

                            var Data1 = "{leave_entry_no: '" + leavId + "', ref_no: '" + leavEmp + "', leave_date: '" + dat + "', leave_type: '" + leave_type + "', manager: '" + mngr + "', no_of_days: '" + tot_days + "', reason: '" + reason + "'}";

                            var strJsonDatas2 = eval({ strJsonData: Data1, strFieldNames: null, strSessionID: null });

                            var msg2 = JSON.stringify(strJsonDatas2);

                            var post1 = $http({
                                method: "POST",
                                url: "InsertApprovedTable",
                                data: msg2,
                                dataType: 'json',
                                headers: { "Content-Type": "application/json" }
                            });
                            post1.success(function (data, status) {



                            });

                            sDate.setDate(sDate.getDate() + 1);
                        }
                    }
                    else {

                        var dat = formatDate(sDate);

                        var Data1 = "{leave_entry_no: '" + leavId + "', ref_no: '" + leavEmp + "', leave_date: '" + dat + "', leave_type: '" + leave_type + "', manager: '" + mngr + "', no_of_days: '" + tot_days + "', reason: '" + reason + "',}";

                        var strJsonDatas2 = eval({ strJsonData: Data1, strFieldNames: null, strSessionID: null });

                        var msg2 = JSON.stringify(strJsonDatas2);

                        var post1 = $http({
                            method: "POST",
                            url: "InsertApprovedTable",
                            data: msg2,
                            dataType: 'json',
                            headers: { "Content-Type": "application/json" }
                        });
                        post1.success(function (data, status) {


                        });
                    }

                    vm.getLeaveCounts(leave_type, leavEmp, tot_days);


                }, function (error) {

                });

            });


        } else if (leavAccept == 2) {  //Reject

            var valueData = "{is_approved: 2, status_reason: '" + reason + "', approved_by: '" + empRef + "', approved_date: '" + curDate + "'}";

            var sCondition = "WHERE emp_ref_no = " + leavEmp + " and leave_ent_ref_no= " + leavId;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveEntry",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                msgalert("Success", "Leave Cancelled", 1);

                window.location.reload();

            });

        }

    };

    vm.MyLeaveHistory = function (refNo, type) {

        empRef = refNo;

        var d = new Date();
        var n = d.toISOString();

        var n = n.replace("T", " ");

        var todayDate = n.replace("Z", " ");

        vm.LeaveHistory = [];

        vm.TodayDate = todayDate;

        if (type == 1) {
            var Condition = "WHERE emp_ref_no = " + refNo;

            var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);
            $http({
                method: 'POST',
                url: 'GetPendingApproval',
                data: msg2
            }).then(function (response) {

                vm.LeaveHistory = response.data

                vm.CurrenDate = new Date();

                for (var i = 0; i < vm.LeaveHistory.length; i++) {
                    var startdate = vm.LeaveHistory[i]["start_date"].split('T');

                    var enddate = vm.LeaveHistory[i]["end_date"].split('T');

                    vm.LeaveHistory[i]["start_date"] = startdate[0];

                    vm.LeaveHistory[i]["end_date"] = enddate[0];

                }

            }, function (error) {

            });
        }
        else if (type == 2) {
            //var Condition = "WHERE is_approved in (0,1) and end_date > '" + todayDate + "' and emp_ref_no = " + refNo;

            var Condition = "WHERE is_approved in (0,1) and emp_ref_no = " + refNo;


            var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);
            $http({
                method: 'POST',
                url: 'GetPendingApproval',
                data: msg2
            }).then(function (response) {

                vm.LHistory = response.data

                for (var j = 0; j < vm.LHistory.length; j++) {
                    if (vm.LHistory[j]["is_approved"] == 1 && vm.LHistory[j]["end_date"] > todayDate) {
                        vm.LeaveHistory.push(vm.LHistory[j]);
                    }
                    else if (vm.LHistory[j]["is_approved"] == 0) {
                        vm.LeaveHistory.push(vm.LHistory[j]);
                    }
                }

                //vm.LeaveHistory = response.data

                vm.CurrenDate = new Date();

                for (var i = 0; i < vm.LeaveHistory.length; i++) {
                    var startdate = vm.LeaveHistory[i]["start_date"].split('T');

                    var enddate = vm.LeaveHistory[i]["end_date"].split('T');

                    vm.LeaveHistory[i]["start_date"] = startdate[0];

                    vm.LeaveHistory[i]["end_date"] = enddate[0];
                }



            }, function (error) {

            });
        }
    }

    vm.GetLeaveEligible = function (ref) {

        var d = new Date();

        var cYear = d.getFullYear();

        var sCondition = "WHERE emp_ref_no = " + ref + " and year = " + cYear;

        var strJsonDatas1 = eval({ strCondition: sCondition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas1);

        $http({
            method: 'POST',
            url: 'SelectEmployeeLeaveDetails',
            data: msg2
        }).then(function (response1) {

            vm.empLeaveCount = response1.data;
        }, function (error) {

        });
    }

    vm.ModifyLeave = function (leavRefId) {

        var Condition = "WHERE leave_ent_ref_no = " + leavRefId;

        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);
        $http({
            method: 'POST',
            url: 'GetPendingApproval',
            data: msg2
        }).then(function (response) {

            vm.EmpLeaveHistory = response.data

            var startdate = vm.EmpLeaveHistory[0]["start_date"].split('T');

            var enddate = vm.EmpLeaveHistory[0]["end_date"].split('T');

            var sDate = formatDate(startdate[0]);

            var eDate = formatDate(enddate[0]);

            vm.EmpLeaveHistory[0]["start_date"] = sDate;

            vm.EmpLeaveHistory[0]["end_date"] = eDate;

            setDates(sDate, eDate);

            $("#ddlLeaveType").val(vm.EmpLeaveHistory[0]["leave_type_id"]).change();

            $("#history").addClass('hidden');

            $("#modify").removeClass('hidden');

            vm.GetLeaveEligible(empRef);


        }, function (error) {

        });
    };

    vm.GetLeaveType = function (leaveType) {

        if (leaveType == 1) {
            return "Casual";
        }
        else if (leaveType == 2) {

            return "Sick";

        }
        else if (leaveType == 3) {
            return "Maternity";

        }
        else if (leaveType == 4) {
            return "Paternity";

        }
        else if (leaveType == 5) {
            return "CompOff";

        }
        else if (leaveType == 6) {
            return "OnDuty";

        }
        else if (leaveType == 7) {
            return "LossofPay";

        }
        else if (leaveType == 8) {
            return "Compassionate";
        }
    };

    vm.CancelLeave = function (type, LNo, LDays, LType) {

        if (type == 1) {
            totDays = parseInt(LDays.replace("    ", ""));

            leaveType = LType;

            leaveEntNo = LNo;
        }
        else if (type == 2) {
            //alert(empRef + "  " + totDays + "  " + leaveType + "  " + leaveEntNo);

            var reason = $('#txtCancelReason').val();

            var valueData = "{is_cancelled: 1, is_approved: 3, cancellation_reason: '" + reason + "', cancellation_date: '" + curDate + "',updated_date: '" + curDate + "',updated_by: '" + empRef + "' }";

            //var valueData = "{is_approved: 1}";

            var sCondition = "WHERE emp_ref_no = " + empRef + " and leave_ent_ref_no= " + leaveEntNo;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveEntry",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                var d = new Date();

                var cYear = d.getFullYear();

                var sCondition = "WHERE emp_ref_no = " + empRef + " and year = " + cYear;

                var strJsonDatas1 = eval({ strCondition: sCondition, strFieldNames: null, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas1);

                $http({
                    method: 'POST',
                    url: 'SelectEmployeeLeaveDetails',
                    data: msg2
                }).then(function (response1) {

                    vm.empLeaveCount = response1.data;

                    //var leave = vm.GetLeaveType(leaveType)

                    if (leaveType == 1) { //Casual

                        if (totDays == 0.5) //Half day
                        {
                            leaveTake = parseFloat(vm.empLeaveDetails[0]["Half"]) - 1;

                            leaveTot = parseFloat(vm.empLeaveDetails[0]["CL_total"]) + totDays;

                            valueData = "{Half: " + leaveTake + ", CL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                        }
                        else //full leave
                        {
                            leaveTake = parseFloat(vm.empLeaveDetails[0]["CL_taken"]) - totDays;

                            leaveTot = parseFloat(vm.empLeaveDetails[0]["CL_total"]) + totDays;

                            valueData = "{CL_taken: " + leaveTake + ", CL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                        }


                    }
                    else if (leaveType == 2) { //Planned Leave

                        if (totDays == 0.5) { //Half day

                            leaveTake = parseFloat(vm.empLeaveDetails[0]["Half"]) - 1;

                            leaveTot = parseFloat(vm.empLeaveDetails[0]["PL_total"]) + totDays;

                            valueData = "{Half: " + leaveTake + ", PL_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                        }
                        else {
                            leaveTake = parseFloat(vm.empLeaveDetails[0]["PL_taken"]) - totDays;

                            leaveTot = parseFloat(vm.empLeaveDetails[0]["PL_total"]) + totDays;

                            valueData = "{PL_taken: '" + leaveTake + "', PL_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
                        }
                    }
                    else if (leaveType == 3) { //Comp Off

                        leaveTake = parseFloat(vm.empLeaveDetails[0]["Compoff"]) - totDays;

                        valueData = "{Compoff: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                    }
                    else if (leaveType == 7) { //LossofPay

                        if (totDays == 0.5) { //Half day

                            leaveTake = parseFloat(vm.empLeaveDetails[0]["LossofPay_Half"]) - 1;

                            valueData = "{LossofPay_Half: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

                        }
                        else {

                            leaveTake = parseFloat(vm.empLeaveDetails[0]["LossofPay"]) - totDays;

                            valueData = "{LossofPay: " + leaveTake + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";
                        }
                    }
                    else if (leaveType == 5) { //Maternity

                        leaveTake = parseFloat(vm.empLeaveDetails[0]["Maternity"]) - totDays;

                        valueData = "{Maternity: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
                    }
                    else if (leaveType == 6) { //Medical

                        leaveTake = parseFloat(vm.empLeaveDetails[0]["Medical"]) - totDays;

                        valueData = "{Medical: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
                    }

                    //var taken = parseInt(vm.empLeaveCount[0][leave + "_taken"]) - totDays;

                    //var balance = parseInt(vm.empLeaveCount[0][leave + "_total"]) + totDays;

                    //var valueData = "{" + leave + "_taken:" + taken + "," + leave + "_total:" + balance + " }";

                    var sCondition = "WHERE emp_ref_no = " + empRef + " and year = " + cYear;

                    var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas);

                    var post = $http({
                        method: "POST",
                        url: "UpdateLeaveCount",
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    });
                    post.success(function (data, status) {

                        msgalert("Success", "Leave Cancelled", 1);

                        window.location.reload();

                    });

                }, function (error) {

                });

            });
        }

    };

    var curDate = formatDate(new Date())

    vm.UpdateLeaveDetails = function (type, leaveEntId) {

        if (type == 1) //Update Leave
        {
            var leaveType = $('#ddlLeaveType').val();

            var reason = $('#txtReason').val();

            var frmDt = $('#txtfromdt').val();

            var toDt = $('#txtTodate').val();

            var nofday = $('#txttotal').val();

            if (leaveType < 0) {
                msgalert("Error", "Please Choose Leave Type", 3);
                return;
            }
            if (reason == "") {
                msgalert("Error", "Please Enter Leave Reason", 3);
                return;
            }
            if (frmDt == "") {
                msgalert("Error", "Please Choose From Date", 3);
                return;
            }
            if (toDt == "") {
                msgalert("Error", "Please Choose to Date", 3);
                return;
            }

            var curDate = formatDate(new Date())

            var valueData = "{leave_type_id: '" + leaveType + "', start_date: '" + frmDt + "', end_date: '" + toDt
                + "', no_of_days: '" + nofday + "', reason: '" + reason + "',updated_date: '" + curDate + "',updated_by: '" + empRef + "' }";

            var sCondition = "WHERE emp_ref_no = " + empRef + " and leave_ent_ref_no= " + leaveEntId;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveEntry",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                msgalert("Success", "Leave Details Updated Successfully", 1);

                window.location.reload();

            });
        }
        else if (type == 2) // Cancel Leave
        {

            var reason = $('#txtCancelReason').val();

            if (reason == "") {
                msgalert("Error", "Please Enter Cancel Reason", 3);
                return;
            }

            var valueData = "{is_cancelled: 1 ,is_approved: 3, cancellation_reason: '" + reason + "', cancellation_date: '" + curDate + "',updated_date: '" + curDate + "',updated_by: '" + empRef + "' }";

            var sCondition = "WHERE emp_ref_no = " + empRef + " and leave_ent_ref_no= " + sLeave;

            var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

            var msg2 = JSON.stringify(strJsonDatas);

            var post = $http({
                method: "POST",
                url: "UpdateLeaveEntry",
                data: msg2,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                msgalert("Success", "Leave Cancelled", 1);

                window.location.reload();

            });
        }
        else if (type == 3) // Saving Id
        {
            sLeave = leaveEntId;
        }
    };

    vm.GetMonthlyLeaveCount = function (date, month, year, ref) {

        if (date == 1) {

            var d = new Date();

            month = d.getMonth() + 1;

            year = d.getFullYear();

            date = year + "-" + month + "-01";

        }

        var paramNames = [], paramValues = [];
        paramNames.push('iDate');
        paramNames.push('iMonth');
        paramNames.push('iYear');
        paramNames.push('iRef');

        paramValues.push(date);
        paramValues.push(month);
        paramValues.push(year);
        paramValues.push(ref);


        var strJsonDatas = eval({ strSessionID: UserSession, ProcParameters: paramNames, ProcInputData: paramValues });
        var msg2 = JSON.stringify(strJsonDatas);
        $http({
            method: 'POST',
            url: 'GetMonthlyLeave',
            data: msg2
        }).then(function (response) {
            vm.Monthlyleavecnt = response.data

            var length = vm.Monthlyleavecnt.length;

            for (var i = 0; i < length; i++) {

                document.getElementById(i + 2).innerHTML = 0;

                if (vm.Monthlyleavecnt[i]["levcnt"] != 0) {
                    document.getElementById(i + 2).innerHTML = vm.Monthlyleavecnt[i]["levcnt"];

                    var s = '#' + parseInt(i + 2);

                    $(s).removeClass("hidden");
                }


            }

            //s.style.backgroundColor = 'red';

        }, function (error) {

        });

    };

    vm.GetLeaveDate = function (dd, mm, yy, ref) {

        mm = mm + 1;

        var dt = yy + '-' + mm + '-' + dd;

        if (ref == 1 || ref == 2 || ref == 200) {
            var sCondition = "WHERE leave_date = '" + dt + "'";
        }
        else {
            var sCondition = "WHERE leave_date = '" + dt + "' and manager =" + ref;
        }


        var strJsonDatas = eval({ strCondition: sCondition, strFieldNames: null, strSessionID: null });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'GetLeaveDetailsByDate',
            data: msg2
        }).then(function (response) {

            vm.LeaveDetails = response.data;

        }, function (error) {

        });

    };

    vm.GetEmployeeByCompany = function (refNo, roleId) {

        var company = $("#ddlCompany").val();

        if (company == 0) {
            msgalert("Error", "Please choose company", 3);
            return;
        }

        paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(refNo);

        paramNames.push('RoleId');

        paramValues.push(roleId);

        paramNames.push('type');

        paramValues.push(4);

        paramNames.push('companyId');

        paramValues.push(company);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeDetailsByCompany',
            data: msg2
        }).then(function (response) {

            vm.Employees = response.data;  //Select all employees from Table

            //vm.GetEmployeeLeaveCount(month, year, user);

        }, function (error) {

        });

    };

    vm.saveLOP = function (refNo) {

        var employee = $("#ddlEmployee").val();

        var month = $("#ddlMonth").val();

        var year = $("#ddlYear").val();

        var lopDays = $("#txtLopDays").val();

        var reason = $("#txtReason").val();

        if (reason == "") {
            msgalert("Error", "Please Enter LOP Reason", 3);
            return;
        }

        if (lopDays == "" || lopDays == 0) {
            msgalert("Error", "Please Enter LOP Days. LOP Days must be greater than 0", 3);
            return;
        }

        if (employee == 0) {
            msgalert("Error", "Please choose Employee", 3);
            return;
        }

        if (month == 0) {
            msgalert("Error", "Please choose Month", 3);
            return;
        }

        if (year == 0) {
            msgalert("Error", "Please choose year", 3);
            return;
        }

        var paramNames = [], paramValues = [];

        paramNames.push('sUserRef');

        paramValues.push(refNo);

        paramNames.push('sEmpNo');

        paramValues.push(employee);

        paramNames.push('sMonth');

        paramValues.push(month);

        paramNames.push('sYear');

        paramValues.push(year);

        paramNames.push('sReason');

        paramValues.push(reason);

        paramNames.push('sNoOfDays');

        paramValues.push(lopDays);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SaveEmployeeLOP',
            data: msg2
        }).then(function (response) {

            vm.LOPUpdated = response.data;

            if (vm.LOPUpdated[0].ResultMsg == "Success") {
                msgalert("Success", "LOP Applied Successfully", 1);

                window.location.reload();
            }

        }, function (error) {

        });

    };

    vm.GetEmployeeLeaveCounts = function (refNo, type) {

        var year = $("#ddlYear").val();

        if (year == 0) {
            msgalert("Error", "Please choose any year", 3);
            return;
        }

        $http({
            method: 'POST',
            url: 'GetEmployeeLeaveValue',
            data: { refNo: refNo, sYear: year, type: type }
        }).then(function (response) {

            vm.EmployeeLeaveValue = response.data

            //s.style.backgroundColor = 'red';

        }, function (error) {

        });

    };

    vm.GetEmployeeLeaveValue = function (refNo, type) {

        var year = $("#ddlYear").val();

        if (year == 0) {
            msgalert("Error", "Please choose any year", 3);
            return;
        }

        $http({
            method: 'POST',
            url: 'GetEmployeeLeaveValue',
            data: { refNo: refNo, sYear: year, type: type }
        }).then(function (response) {

            vm.EmployeeLeave = response.data

            //s.style.backgroundColor = 'red';

        }, function (error) {

        });

    };

    vm.UpdateEmployeeLeaveValue = function (refNo, userRef) {

        var year = $("#ddlYear").val();

        var pl_taken = $("#txtPLTaken").val();

        var pl_balance = $("#txtPLBalance").val();

        var cl_taken = $("#txtCLTaken").val();

        var cl_balance = $("#txtCLTotal").val();

        var py_taken = $("#txtPYTaken").val();

        var py_balance = $("#txtPYBalance").val();

        var compOff = $("#txtCompOff").val();

        var half = $("#txtHalf").val();

        var LossofPay = $("#txtLossofPay").val();

        var LossofPay_Half = $("#txtLossofPay_Half").val();

        var maternity = $("#txtMaternity").val();

        var medical = $("#txtMedical").val();

        var paternity_taken = $("#txtPaternityTaken").val();

        var paternity_total = $("#txtPaternityTotal").val();

        if (pl_taken == "") {
            msgalert("Error", "Please Enter PL taken Value", 3);
            return;
        }
        if (pl_balance == "") {
            msgalert("Error", "Please Enter PL Balance Value", 3);
            return;
        }
        if (cl_taken == "") {
            msgalert("Error", "Please Enter CL Taken Value", 3);
            return;
        }
        if (cl_balance == "") {
            msgalert("Error", "Please Enter CL Balance Value", 3);
            return;
        }
        if (py_taken == "") {
            msgalert("Error", "Please Enter PY Taken Value", 3);
            return;
        }
        if (py_balance == "") {
            msgalert("Error", "Please Enter PY Balance Value", 3);
            return;
        }
        if (compOff == "") {
            msgalert("Error", "Please Enter Comp Off Value", 3);
            return;
        }
        if (half == "") {
            msgalert("Error", "Please Enter Half Value", 3);
            return;
        }
        if (LossofPay == "") {
            msgalert("Error", "Please Enter LOP Value", 3);
            return;
        }
        if (LossofPay_Half == "") {
            msgalert("Error", "Please Enter Half LOP Value", 3);
            return;
        }
        if (maternity == "") {
            msgalert("Error", "Please Enter Maternity Value", 3);
            return;
        }
        if (medical == "") {
            msgalert("Error", "Please Enter Medical Value", 3);
            return;
        }

        if (paternity_taken == "" || paternity_taken < 0) {
            msgalert("Error", "Please Enter a valid Paternity Taken Value", 3);
            return;
        }

        if (paternity_total == "" || paternity_total < 0) {
            msgalert("Error", "Please Enter a valid Paternity Balance Value", 3);
            return;
        }

        var sPcBulkData = pl_taken + '~' + pl_balance + '~' + cl_taken + '~' + cl_balance + '~' + py_taken + '~' + py_balance + '~' + compOff + '~' + half +
            '~' + LossofPay + '~' + LossofPay_Half + '~' + maternity + '~' + medical + '~' + year + '~' + paternity_taken + '~' + paternity_total + '~';

        var paramNames = [], paramValues = [];

        paramNames.push('sRefNo');

        paramValues.push(refNo);

        paramNames.push('sProcBulkData');

        paramValues.push(sPcBulkData);

        paramNames.push('sUserRef');

        paramValues.push(userRef);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'UpdateEmployeeLeaveValue',
            data: msg2
        }).then(function (response) {

            vm.LeaveUpdated = response.data;

            if (vm.LeaveUpdated[0].ResultMsg == "Success") {
                msgalert("Success", "Leave Values Updated Successfully", 1);

            }

        }, function (error) {

        });

    };

    vm.CancelApprovedLeave = function (leaveRefNo, reason, userRef) {

        var paramNames = [], paramValues = [];
        paramNames.push('leaveRefNo');
        paramNames.push('reason');
        paramNames.push('updatedBy');

        paramValues.push(leaveRefNo);
        paramValues.push(reason);
        paramValues.push(userRef);


        var strJsonDatas = eval({ strSessionID: UserSession, ProcParameters: paramNames, ProcInputData: paramValues });

        var msg = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'CancelApprovedLeave',
            data: msg
        }).then(function (response) {

            var result = response.data;

            if (result[0].ResultMsg == "Success") {
                msgalert("Success", "Leave cancelled Successfully", 1);

                location.reload();
            }

        }, function (error) {

        });

    };

});

