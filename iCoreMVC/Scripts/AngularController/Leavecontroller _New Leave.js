
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

        if (refNo != 1)
        {
            Condition = "WHERE is_approved = 0 and approval_manager= " + refNo;
        }
        else
        {
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

            for (var i = 0 ; i < vm.PendingLeaves.length ; i++)
            {
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
            }).then(function (response)
            {
                vm.EmployeeDetails = response.data

                mgrRole = vm.EmployeeDetails[0].role_id;

            }, function (error) {

            });

        }, function (error) {

        });

    };

    vm.BindEmployees = function (ref) {

        empRef = ref

        if (ref == 1 || ref == 2 || ref == 200)
        {
            var Condition = "WHERE delete_status = 0 ";
        }
        else
        {
            var Condition = "WHERE report_to_manager = " + empRef;
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

    };

    vm.getLeaveCounts = function(leaveType, empId, totalNoofDays)
    {

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

            leaveTake = parseFloat(vm.empLeaveDetails[0][leaveType]) + nofday;

            if (nofday > parseFloat(vm.empLeaveDetails[0][leaveType])) {

                msgalert("Error", "You are not eligible for this Leave type", 3);

                return;
            }

            leaveTot = parseFloat(vm.empLeaveDetails[0][leaveType]) - nofday;

            valueData = "{" + leaveType + ": " + leaveTake + "," + leaveType + ": " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

            if (leaveType == 1) //Earned
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["Casual_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["Casual_total"])) {

                    msgalert("Error", "You are not eligible for this Leave type",3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["Casual_total"]) - nofday;

                valueData = "{Casual_taken: " + leaveTake + ", Casual_total: " + leaveTot + ", updated_date: '" + curDate + "', updated_by: " + empRef + "}";

            }
            else if (leaveType == 2) //Casual
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["Sick_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["Casual_total"])) {

                    msgalert("Error", "You are not eligible for this Leave type", 3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["Sick_total"]) - nofday;

                valueData = "{Sick_taken: '" + leaveTake + "', Sick_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 3) //Maternity
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["Maternity_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["Casual_total"])) {

                    msgalert("Error", "You are not eligible for this Leave type", 3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["Maternity_total"]) - nofday;

                valueData = "{Maternity_taken: '" + leaveTake + "', Maternity_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 4) //Paternity
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["Paternity_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["Casual_total"])) {

                    msgalert("Error", "You are not eligible for this Leave type", 3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["Paternity_total"]) - nofday;

                valueData = "{Paternity_taken: '" + leaveTake + "', Paternity_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 5) //Comp Off
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["CompOff_taken"]) + nofday;

                if (nofday > parseFloat(vm.empLeaveDetails[0]["Casual_total"])) {

                    msgalert("Error", "You are not eligible for this Leave type", 3);

                    return;
                }

                leaveTot = parseFloat(vm.empLeaveDetails[0]["CompOff_total"]) - nofday;

                valueData = "{CompOff_taken: '" + leaveTake + "', CompOff_total: '" + leaveTot + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            else if (leaveType == 6) //Medical Leave
            {
                leaveTake = parseFloat(vm.empLeaveDetails[0]["OnDuty_taken"]) + nofday;

                valueData = "{OnDuty_taken: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            }
            //else if (leaveType == 7)
            //{
            //    leaveTake = parseFloat(vm.empLeaveDetails[0]["LossofPay_taken"]) + nofday;
            //    valueData = "{LossofPay_taken: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            //}
            //else if (leaveType == 8)
            //{
            //    leaveTake = parseFloat(vm.empLeaveDetails[0]["Compassionate_taken"]) + nofday;
            //    valueData = "{Compassionate_taken: '" + leaveTake + "', updated_date: '" + curDate + "', updated_by: '" + empRef + "'}";
            //}

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

        if (leaveType < 0)
        {
            msgalert("Error", "Please Choose Leave Type", 3);
            return;
        }
        if (reason == "")
        {
            msgalert("Error", "Please Enter Leave Reason", 3);
            return;
        }
        if (frmDt == "")
        {
            msgalert("Error", "Please Choose From Date", 3);
            return;
        }
        if (toDt == "") {
            msgalert("Error", "Please Choose to Date", 3);
            return;
        }
        
        var curDate = formatDate(new Date());

        var leaveDate = new Date(frmDt)

        var mn = leaveDate.getMonth() + 1;
        
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

            var Data = "{type: 'Leave Request', manager_ref_no: '" + rpttomgr + "', emp_ref_no: '" + empRef + "', page_name: 'ApproveLeave()', role_id: '" + mgrRole + "', delete_status: 0 }";

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

    vm.openModal = function (emp_ref, leaveEntry,isAccept,leavetyp,totdays) {

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


        if(reason == null || reason == "")
        {
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

                    if (sDate != eDate)
                    {
                        while (sDate <= eDate)
                        {
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
                    else
                    {

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

            });

        }

    };

    vm.MyLeaveHistory = function (refNo,type) {

        empRef = refNo;

        var d = new Date();
        var n = d.toISOString();

        var n = n.replace("T", " ");

        var todayDate = n.replace("Z", " ");

        vm.LeaveHistory = [];

        vm.TodayDate = todayDate;

        if (type == 1)
        {
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

                for (var i = 0 ; i < vm.LeaveHistory.length ; i++) {
                    var startdate = vm.LeaveHistory[i]["start_date"].split('T');

                    var enddate = vm.LeaveHistory[i]["end_date"].split('T');

                    vm.LeaveHistory[i]["start_date"] = startdate[0];

                    vm.LeaveHistory[i]["end_date"] = enddate[0];

                }

            }, function (error) {

            });
        }
        else if (type == 2)
        {
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

                for (var j = 0; j < vm.LHistory.length; j++)
                {
                    if (vm.LHistory[j]["is_approved"] == 1 && vm.LHistory[j]["end_date"] > todayDate)
                    {
                        vm.LeaveHistory.push( vm.LHistory[j]);
                    }
                    else if (vm.LHistory[j]["is_approved"] == 0)
                    {
                        vm.LeaveHistory.push( vm.LHistory[j]);
                    }
                }

                //vm.LeaveHistory = response.data

                vm.CurrenDate = new Date();

                for (var i = 0 ; i < vm.LeaveHistory.length ; i++)
                {
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

        var sCondition = "WHERE emp_ref_no = " + ref + " and year = "+ cYear ;

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

            vm.EmpLeaveHistory[0]["start_date"] = startdate[0];

            vm.EmpLeaveHistory[0]["end_date"] = enddate[0];

            $("#ddlLeaveType").val(vm.EmpLeaveHistory[0]["leave_type_id"]).change();

            $("#history").addClass('hidden');
            $("#modify").removeClass('hidden');

            vm.GetLeaveEligible(empRef);


        }, function (error) {

        });
    };

    vm.GetLeaveType = function (leaveType){

        if (leaveType == 1)
        {
            return "Casual";
        }
        else if (leaveType == 2)
        {

            return "Sick";
           
        }
        else if (leaveType == 3)
        {
            return "Maternity";
            
        }
        else if (leaveType == 4)
        {
            return "Paternity";
           
        }
        else if (leaveType == 5)
        {
            return "CompOff";
            
        }
        else if (leaveType == 6)
        {
            return "OnDuty";
            
        }
        else if (leaveType == 7)
        {
            return "LossofPay";
            
        }
        else if (leaveType == 8)
        {
            return "Compassionate";
        }
    };

    vm.CancelLeave = function ( type,LNo, LDays, LType ) {

        if (type == 1)
        {
            totDays = parseInt(LDays.replace("    ",""));

            leaveType = LType;

            leaveEntNo = LNo;
        }
        else if (type == 2)
        {
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

                    var leave = vm.GetLeaveType(leaveType)

                    var taken = parseInt(vm.empLeaveCount[0][leave + "_taken"]) - totDays;

                    var balance = parseInt(vm.empLeaveCount[0][leave + "_total"]) + totDays;
                    
                    var valueData = "{" + leave + "_taken:" + taken + "," + leave + "_total:" + balance + " }";

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
                
        if(type == 1) //Update Leave
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
        else if(type == 2) // Cancel Leave
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

                if (vm.Monthlyleavecnt[i]["levcnt"] != 0)
                {
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
});

