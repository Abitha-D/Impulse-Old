var myApp = angular.module('PayrollDetails', []);

myApp.controller('Payroll', function ($scope, $http, $location, $window) {
    var vm = $scope;
    $scope.cust = {};
    $scope.message = '';
    $scope.result = "color-default";
    $scope.isViewLoading = false;
    $scope.refNo = $window.refNo;
    $scope.roleId = $window.roleId;
    //$scope = vm;

    var oAPICall = new APICall();

    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var basic, hra, living, conveyance, production, transfer, medical, incentive, gratuity, Annual, pension, others, proftax, GrossPay, NetPay, TotalCost, pf, PFemp, esi, ESIemp, incomeTax, totDeduction;

    var a_basic, a_hra, a_living, a_conveyance, a_production, a_transfer, a_medical, a_incentive, a_gratuity, a_Annual, a_pension, a_others, a_proftax, a_GrossPay, a_NetPay, a_TotalCost, a_pf, a_esi, a_PFemp, a_ESIemp, a_incomeTax, a_totDeduction;

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [month, day, year].join('/');
    }

    vm.GetScalelist = function () {

        var Condition = "";

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSalaryScale',
            data: msg2
        }).then(function (response) {

            vm.ScaleList = response.data


        }, function (error) {

        });

        //    console.log($scope.type);

    };

    vm.GetSalaryValues = function () {

        var id = $("#ddlSalaryScale").val();

        var Condition = "where sl_no= " + id;

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectSalaryScale',
            data: msg2
        }).then(function (response) {

            vm.ScaleValue = response.data

            $("#txtPFTax").val(vm.ScaleValue[0]["tax"]);

        }, function (error) {

        });
    };

    vm.GetMyInfo = function (ref) {

        vm.GetEmpExp(ref);

        vm.GetSalaryDetailss(ref);

    };

    vm.SaveTax = function () {

        var tax = $("#txtPFTax").val();

        if (tax == "" || tax == null) {

            msgalert("Warning", "Please Enter TAX", 2);

            return;
        }

        var modal = document.getElementById("Salarytax");

        modal.style.display = "none";

        $(".modal-backdrop").remove();
    }

    vm.CalculatePF = function () {

        var tax = $("#txtPFTax").val();

        if (tax == null || tax == "") {
            $("#txtPFTax").val(12);
            tax = 0.12;
        }

        basic = $("#txtSalBasic").val();
        hra = $("#txtSalHRA").val();
        living = $("#txtSalLiving").val();
        conveyance = $("#txtSalConveyance").val();
        production = $("#txtSalProduction").val();
        //transfer = $("#txtSalTransfer").val();
        medical = $("#txtSalMedical").val();
        incentive = $("#txtSalIncentive").val();
        gratuity = $("#txtSalGratuity").val();
        Annual = $("#txtSalAnnual").val();
        pension = $("#txtSalPension").val();
        others = $("#txtSalOthers").val();
        incomeTax = $("#txtSalIncometax").val();
        proftax = $("#txtSalProftax").val();
        NetPay = $("#txtSalNetPay").val();
        TotalCost = $("#txtSalTotalCost").val();

        pf = $("#txtSalPF").val();


        if (basic == "" || basic == null) {

            basic = 0;
        }

        if (hra == "" || hra == null) {

            hra = 0;
        }
        if (living == "" || living == null) {

            living = 0;
        }
        if (conveyance == "" || conveyance == null) {

            conveyance = 0;
        }
        if (production == "" || production == null) {

            production = 0;
        }
        //if (transfer == "" || transfer == null) {

        //    transfer = 0;
        //}

        if (medical == "" || medical == null) {

            medical = 0;
        }
        if (incentive == "" || incentive == null) {

            incentive = 0;
        }
        //if (gratuity == "" || gratuity == null) {

        //    gratuity = 0;
        //}
        //if (Annual == "" || Annual == null) {

        //    Annual = 0;
        //}
        if (pension == "" || pension == null) {

            pension = 0;
        }
        if (others == "" || others == null) {

            others = 0;
        }
        if (incomeTax == "" || incomeTax == null) {

            incomeTax = 0;
        }
        if (proftax == "" || proftax == null) {

            proftax = 0;
        }

        if (NetPay == "" || NetPay == null) {

            NetPay = 0;
        }

        var GrossPay = parseInt(basic) + parseInt(hra) + parseInt(living) + parseInt(conveyance) + parseInt(production) + parseInt(medical);// + parseInt(transfer);

        var grossMin = GrossPay - hra;

        if (production != 0 && pf == 0) {
            pf = 0;
        }
        else if (grossMin >= 15000) {
            pf = 1800;
        }
        else {
            pf = (parseInt(GrossPay) - parseInt(hra)) * parseInt(tax) / 100;
        }


        if (GrossPay >= 21000) {
            esi = 0;

            ESIemp = 0;
        }
        else {
            esi = parseInt(GrossPay) * (0.75 / 100); //EmployeeESI Tax Percentage //1.75 old

            ESIemp = parseInt(GrossPay) * (3.25 / 100); //Employer ESI Tax Percentage //4.75 old
        }

        totDeduction = parseInt(pf) + parseInt(esi);

        //var ptax = parseInt(basic) * 6;

        //if (ptax > 12000 && ptax < 17999) {
        //    proftax = 120;
        //}
        //else if (ptax > 18000 && ptax < 29999) {
        //    proftax = 180;
        //}
        //else if (ptax > 30000 && ptax < 44999) {
        //    proftax = 300;
        //}
        //else if (ptax > 45000 && ptax < 59999) {
        //    proftax = 450;
        //}
        //else if (ptax > 60000 && ptax < 74999) {
        //    proftax = 600;
        //}
        //else if (ptax > 75000 && ptax < 99999) {
        //    proftax = 750;
        //}
        //else if (ptax > 100000 && ptax < 124999) {
        //    proftax = 1000;
        //}
        //else if (ptax > 125000) {
        //    proftax = 1250;
        //}

        gratuity = (((parseInt(basic) * 15) / 26) * 1) / 12;

        Annual = (parseInt(basic) + parseInt(living)) * (8.33 / 100);

        Annual = Math.round(Annual);

        gratuity = Math.round(gratuity);

        NetPay = parseFloat(GrossPay) - (parseFloat(pf) + parseFloat(esi) + parseFloat(incomeTax) + parseFloat(others));

        TotalCost = parseFloat(GrossPay) + parseFloat(pf) + parseFloat(ESIemp) + parseFloat(gratuity) + parseFloat(Annual);

        GrossPay = Math.round(GrossPay);

        pf = Math.round(pf);

        esi = Math.round(esi);

        ESIemp = Math.round(ESIemp);

        TotalCost = Math.round(TotalCost);

        NetPay = Math.round(NetPay);

        //proftax = Math.round(proftax);

        $("#txtSalGrossPay").val(GrossPay);

        $("#txtSalPF").val(pf);

        $("#txtSalPFemp").val(pf);

        $("#txtSalESI").val(esi);

        $("#txtSalESIemp").val(ESIemp);

        $("#txtSalTotalCost").val(TotalCost);

        $("#txtSalNetPay").val(NetPay);

        $("#txtSalGratuity").val(gratuity);

        $("#txtSalAnnual").val(Annual);

        $("#txtSalDeduction").val(totDeduction);

        //$("#txtSalProftax").val(proftax);

        a_basic = 12 * parseInt(basic);
        a_hra = 12 * parseInt(hra);
        a_living = 12 * parseInt(living);
        a_conveyance = 12 * parseInt(conveyance);
        a_production = 12 * parseInt(production);
        //a_transfer = 12 * parseInt(transfer);
        a_medical = 12 * parseInt(medical);
        a_incentive = 12 * parseInt(incentive);
        a_gratuity = 12 * parseInt(gratuity);
        a_Annual = 12 * parseInt(Annual);
        a_pension = 12 * parseInt(pension);
        a_incomeTax = 12 * parseInt(incomeTax);
        a_others = 12 * parseInt(others);
        a_proftax = 12 * parseInt(proftax);
        a_GrossPay = 12 * parseInt(GrossPay);
        a_pf = 12 * parseInt(pf);
        a_esi = 12 * parseInt(esi);
        a_NetPay = 12 * parseInt(NetPay);
        a_PFemp = 12 * parseInt(pf);
        a_ESIemp = 12 * parseInt(ESIemp);
        a_TotalCost = 12 * parseInt(TotalCost);
        a_totDeduction = 12 * parseInt(totDeduction);

    }

    vm.SaveScale = function (ref) {

        parent.swal({
            title: "Are you sure to Save / Update Scale ?",
            //text: "" + text + "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true,

        },
        function (isConfirm) {

            if (isConfirm) {

                var scale = $("#txtScaleName").val();
                basic = $("#txtSalBasic").val();
                hra = $("#txtSalHRA").val();
                living = $("#txtSalLiving").val();
                conveyance = $("#txtSalConveyance").val();
                production = $("#txtSalProduction").val();
                //transfer = $("#txtSalTransfer").val();
                medical = $("#txtSalMedical").val();
                incentive = $("#txtSalIncentive").val();
                gratuity = $("#txtSalGratuity").val();
                Annual = $("#txtSalAnnual").val();
                pension = $("#txtSalPension").val();
                incomeTax = $("#txtSalIncometax").val();
                others = $("#txtSalOthers").val();
                proftax = 0;
                totDeduction = $("#txtSalDeduction").val();
                GrossPay = $("#txtSalGrossPay").val();
                NetPay = $("#txtSalNetPay").val();
                TotalCost = $("#txtSalTotalCost").val();
                pf = $("#txtSalPF").val();
                PFemp = $("#txtSalPFemp").val();
                esi = $("#txtSalESI").val();
                ESIemp = $("#txtSalESIemp").val();

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
                    msgalert("Warning", "Please Enter ESI", 2);

                    return;
                }

                if (ESIemp == "" || ESIemp == null) {
                    msgalert("Warning", "Please Enter ESI Employer Contribution", 2);

                    return;
                }
                if (pension == "" || pension == null) {

                    pension = 0;
                    a_pension = 0;
                }
                if (incomeTax == "" || incomeTax == null) {

                    incomeTax = 0;
                    a_incomeTax = 0;
                }
                if (incentive == "" || incentive == null) {

                    incentive = 0;
                    a_incentive = 0;
                }
                if (others == "" || others == null) {

                    others = 0;
                    a_others = 0;
                }
                if (medical == "" || medical == null) {

                    medical = 0;
                }

                // vm.CalculateAnnualSalary();

                var curDate = formatDate(new Date());

                var valueData = "{scale_name:'" + scale + "',basic:" + basic + ",HRA:" + hra + ",living_allowance:" + living + ",conveyance_allowance:" + conveyance
                    + ",production_allowance:" + production + ", medical_allowance:" + medical + ",incentives:" + incentive + ",prof_tax:" + proftax + ",pension:" + pension
                    + ",income_tax:" + incomeTax + ",others:" + others + ",gross_pay:" + GrossPay + ",PF:" + pf + ",ESI:" + esi + ",total_deduction:" + totDeduction + ",net_pay:" + NetPay
                    + ",PF_employer:" + PFemp + ",ESI_employer:" + ESIemp + ",gratuity:" + gratuity + ",annual_bonus:" + Annual + ",total_cost_company:" + TotalCost
                    + ",a_basic:" + a_basic + ",a_HRA:" + a_hra + ",a_living_allowance:" + a_living + ",a_conveyance_allowance:" + a_conveyance + ",a_production_allowance:" + a_production
                    + ",a_medical_allowance:" + a_medical + ",a_incentives:" + a_incentive + ",a_prof_tax:" + a_proftax + ",a_pension:" + a_pension + ",a_income_tax:" + a_incomeTax
                    + ",a_others:" + a_others + ",a_gross_pay:" + a_GrossPay + ",a_PF:" + a_pf + ",a_ESI:" + a_esi + ",a_total_deduction:" + a_totDeduction + ",a_net_pay:" + a_NetPay + ",a_PF_employer:" + a_PFemp
                    + ",a_ESI_employer:" + a_ESIemp + ",a_gratuity:" + a_gratuity + ",a_annual_bonus:" + a_Annual + ",a_total_cost_company: " + a_TotalCost + ",tax: " + $("#txtPFTax").val()
                    + ", updated_by: '" + ref + "',updated_date: '" + curDate + "'}";


                if ($('#hdnID').val() != '') {
                    id = $('#hdnID').val();

                    var sCondition = "where sl_no = " + id;

                    var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas);

                    var post = $http({
                        method: "POST",
                        url: "UpdateSalaryScale",
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    });
                    post.success(function (data, status) {

                        msgalert("Success", "Salary Scale Updated Successfully", 1);

                        window.location.reload();

                    });
                }
                else {
                    var strJsonDatas = eval({ strJsonData: valueData, strFieldNames: null, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas);

                    var post = $http({
                        method: "POST",
                        url: "InsertSalaryScale",
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    });
                    post.success(function (data, status) {

                        msgalert("Success", "Salary Scale Added Successfully", 1);

                        window.location.reload();

                    });
                }

            }
            else {
                return
            }
        }

       );
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

    vm.GenerateReport = function () {

        var ddlEmployeeId = $("#ddlEmployee").val();

        var DatecalendarId = $("#Datecalendar").val();

        var dt = new Date(DatecalendarId);

        var month = parseInt(dt.getMonth()) + 1;

        var year = dt.getFullYear();

        var report_codition = "";
        var report_id = "4";
        // var rowIds = $('#tblEmployeerptGrid').jqGrid('getDataIDs');
        //var Rowids = $("#tblEmployeerptGrid").getGridParam('selarrrow');
        // var Rowids = $('#tblEmployeerptGrid').jqGrid('getGridParam', 'selarrrow');
        var Emp_list = '';
        // if (Rowids.length > 0) {
        $('#divframe').removeClass("hidden")
        $('#divcred').addClass("hidden")
        // for (i = 0; i < Rowids.length; i++) {
        // var RowData = $("#tblEmployeerptGrid").jqGrid('getRowData', Rowids[i]);
        // Emp_list += RowData.EmpId + ',';
        report_codition = Emp_list.length > 0 ? 'where emp_ref_no in (' + Emp_list.replace(/,\s*$/, "") + ')' : '';
        // document.getElementById('frmreport').src = '';
        //document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=55&report_codition= where emp_ref_no in (328)';

        document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=55&report_codition= where emp_ref_no in (' + ddlEmployeeId + ') and payment_month = ' + month + ' and payment_year = ' + year;

        // document.getElementById('frmreport').src = '../../Impulse/Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition;
        $('#divframe').show();
        $('#EmpRpt').hide();
        // }
        // }
    };

    vm.GeneratePayslip = function (refNo, type) {
        // var ddlEmployeeId = $("#ddlEmployee").val();

        if (type == 1) {
            var ddlEmployeeId = $("#ddlEmployee").val();
        }
        else {
            var ddlEmployeeId = refNo;
        }

        //var DatecalendarId = $("#Datecalendar").val();
        //var dt = new Date(DatecalendarId);
        //DatecalendarId = dt.getMonth()
        //DatecalendarId = DatecalendarId + 1;

        var month = $("#ddlMonth").val();

        var year = $("#ddlYear").val();

        //var report_codition = " where emp_ref_no =" + ddlEmployeeId + " and payslip_month = " + month + " and payslip_year = " + year + " and is_submitted = 1";

        var report_codition = " where emp_ref_no =" + ddlEmployeeId + " and payslip_month = " + month + " and payslip_year = " + year + " and is_submitted = 1";

        var report_id = "55";
        // var rowIds = $('#tblEmployeerptGrid').jqGrid('getDataIDs');
        //var Rowids = $("#tblEmployeerptGrid").getGridParam('selarrrow');
        // var Rowids = $('#tblEmployeerptGrid').jqGrid('getGridParam', 'selarrrow');
        var Emp_list = '';
        // if (Rowids.length > 0) {
        $('#divframe').removeClass("hidden")
        $('#divcred').addClass("hidden")
        // for (i = 0; i < Rowids.length; i++) {
        // var RowData = $("#tblEmployeerptGrid").jqGrid('getRowData', Rowids[i]);
        // Emp_list += RowData.EmpId + ',';
        //report_codition = Emp_list.length > 0 ? 'where emp_ref_no in (' + Emp_list.replace(/,\s*$/, "") + ')' : '';
        // document.getElementById('frmreport').src = '';
        //document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=55&report_codition= where emp_ref_no in (328)';
        document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition;
        // document.getElementById('frmreport').src = '../../Impulse/Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition;
        $('#divframe').show();
        $('#EmpRpt').hide();
        // }
        // }
    };

    vm.GenerateReports = function (type, refNo, roleId) {

        var month = $("#ddlMonth").val();

        var year = $("#ddlYear").val();

        var company = $("#ddlCompany").val();

        var comp;

        if (month == -1) {
            msgalert("Error", "Please Choose month for Generating Reports", 3);

            return;
        }

        if (year == -1) {
            msgalert("Error", "Please Choose Year for Generating Reports", 3);

            return;
        }

        if (company == 0) {
            msgalert("Error", "Please Choose Company for Generating Reports", 3);

            return;
        }
        else if (company == 1)
        {
            comp = " and emp_comp_id = 2 and company_id = 1";
        }
        else if (company == 2)
        {
            comp = " and emp_comp_id = 1 and company_id = 1";
        }
        else if (company == 3)
        {
            comp = " and company_id = 2";
        }
        else if (company == 4) {
            comp = " and company_id = 3";
        }

        if (type == 1) {   //1 for Wage Report

            if (roleId == 9)
            {
                var report_codition = " where role_id not in (1,2,10,12) and payslip_month = " + month + " and payslip_year = " + year +" "+ comp + " order by emp_full_name asc";
            }
            else if (roleId == 1 || roleId == 10)
            {
                var report_codition = " where payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 27) {
                var report_codition = " where payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            

            var report_id = "63";

            var file_name = "Wage Report " + monthNames[month] + " " + year;
        }
        else if (type == 2) {  //2 for PF statement

            if (roleId == 9)
            {
                var report_codition = " where role_id not in (1,2,10,12) and is_submitted = 1 and PF > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 1 || roleId == 10)
            {
                var report_codition = " where is_submitted = 1 and PF > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 27) {
                var report_codition = " where is_submitted = 1 and PF > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            
            var report_id = "64";

            var file_name = "PF Statement " + monthNames[month] + " " + year;

        }
        else if (type == 3) { // 3 for ESI statement

            if (roleId == 9) {
                var report_codition = " where role_id not in (1,2,10,12) and is_submitted = 1 and ESI > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 1 || roleId == 10) {
                var report_codition = " where is_submitted = 1 and ESI > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 27) {
                var report_codition = " where is_submitted = 1 and ESI > 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }

            var report_id = "65";

            var file_name = "ESI Statement " + monthNames[month] + " " + year;

        }
        else if (type == 4) { // 4 for Bank Statement

            if (roleId == 9) {
                var report_codition = " where role_id not in (1,2,10,12) and is_submitted = 1 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 1 || roleId == 10) {
                var report_codition = " where is_submitted = 1 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 27) {
                var report_codition = " where is_submitted = 1 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }

            var report_id = "66";

            var file_name = "Bank Statement " + monthNames[month] + " " + year;
        }
        else if (type == 5) { // 5 for STPI Statement

            if (roleId == 9) {
                var report_codition = " where role_id not in (1,2,10,12) and PF != 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_ref_code asc";
            }
            else if (roleId == 1 || roleId == 10) {
                var report_codition = " where PF != 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_ref_code asc";
            }
            else if (roleId == 27) {
                var report_codition = " where PF != 0 and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_ref_code asc";
            }

            var report_id = "69";

            var file_name = "Monthly STPI Statement " + monthNames[month] + " " + year;
        }
        else if (type == 6) { // 6 for Monthly Salary Statement

            if (roleId == 9) {
                var report_codition = " where role_id not in (1,2,10,12) and payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 1 || roleId == 10) {
                var report_codition = " where payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }
            else if (roleId == 27) {
                var report_codition = " where payslip_month = " + month + " and payslip_year = " + year + " " + comp + " order by emp_full_name asc";
            }

            var report_id = "67";

            var file_name = "Monthly Salary Statement " + monthNames[month] + " " + year;
        }
        var Emp_list = '';

        document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition + '&file_name=' + file_name;

    };

    vm.GetEmployeeforSalary = function (refNo) {

        var dt = new Date();

        var month = dt.getMonth() + 1;

        var year = dt.getFullYear();

        var Condition = "where payslip_month = " + month + " and payslip_year = " + year + " order by ref_no asc";

        //var Condition = "where delete_status = 0 and emp_ref_no = 328 ";

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeMonthlySalaryDetails',
            data: msg2
        }).then(function (response) {
            vm.already = response.data

            if (vm.already.length > 0) {
                msgalert("Error", "Already Payroll created for this month", 3);

                return;
            }
            else {
                var inserted;

                var Condition = "where delete_status = 0 and salary_fill = 1 order by emp_ref_no asc";

                //var Condition = "where delete_status = 0 and emp_ref_no = 328 ";

                var strJsonDatas = eval({ strCondition: Condition });

                var msg2 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'SelectEmployeeDetails',
                    data: msg2
                }).then(function (response) {
                    vm.Employees = response.data;

                    for (var i = 0; i < vm.Employees.length; i++) {
                        if (i == 0) {
                            inserted = vm.calculateEarnings(vm.Employees[i]["emp_ref_no"], month, year, refNo, i);
                        }
                        else {
                            if (inserted == "Success") {
                                inserted = vm.calculateEarnings(vm.Employees[i]["emp_ref_no"], month, year, refNo, i);
                            }
                            else if (inserted == "Failed") {
                                break;
                            }
                        }

                    }

                }, function (error) {

                });
            }

        }, function (error) {

        });

        // console.log($scope.type);

    };

    vm.GetEmplist = function (roleId, refNo) {

        // $(loading).modal('show');
        var Condition;
        var param = {
            WorkWeek: 1
        }

        if (roleId == 1) {
            Condition = "where delete_status = 0 order by emp_full_name asc";
        }
        else if (roleId == 9 || roleId == 10) {

            Condition = "where delete_status = 0 AND company_id != 3 order by emp_full_name asc";
        }
        else if (roleId == 27) {

            Condition = "where delete_status = 0 AND company_id = 3 order by emp_full_name asc";
        }
        else if (roleId == 2) {

            Condition = "where delete_status = 0 and report_to_manager = " + refNo + " order by emp_full_name asc";
        }

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectManagerandEmployee',
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

        // console.log($scope.type);

    };

    vm.GetAllEmployees = function (roleID) {

        var Condition;
        var param = {
            WorkWeek: 1
        }

        var month = $('#ddlMonth').val();

        var year = $('#ddlYear').val();

        var mon = monthNames[month];

        var company = $("#ddlCompany").val();

        if (company == -1)
        {
            msgalert("Error", "Please choose any month", 3);

            return;
        }

        if (roleID == 1)
        {
            if (company == 1)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 2 and company_id = 1 order by emp_full_name asc";
            }
            else if (company == 2)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 1 and company_id = 1 order by emp_full_name asc";

            }
            else if (company == 3)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and company_id = 2 order by emp_full_name asc";
            }
            else if (company == 4)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and company_id = 3 order by emp_full_name asc";

            }
            
        }
        else if (roleID == 9)
        {
            if (company == 1)
            {
                Condition = "where role_id not in (1,2,10,12) and  payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 2 and company_id = 1 order by emp_full_name asc";
            }
            else if (company == 2)
            {
                Condition = "where role_id not in (1,2,10,12) and  payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 1 and company_id = 1 order by emp_full_name asc";
            }
            else if (company == 3)
            {
                Condition = "where role_id not in (1,2,10,12) and  payslip_month = " + month + " and payslip_year = " + year + " and company_id = 2 order by emp_full_name asc";
            }

            //Condition = "where role_id not in (1,2,10,12) and company_id in (1,2) and payslip_month = " + month + " and payslip_year = " + year + " order by emp_full_name asc";
        }
        else if (roleID == 10)
        {
            if (company == 1)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 2 and company_id = 1 order by emp_full_name asc";
            }
            else if (company == 2)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and emp_comp_id = 1 and company_id = 1 order by emp_full_name asc";
            }
            else if (company == 3)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and company_id = 2 order by emp_full_name asc";
            }

            //Condition = "where company_id in (1,2) and payslip_month = " + month + " and payslip_year = " + year + " order by emp_full_name asc";
        }
        else if (roleID == 27)
        {
            if (company == 4)
            {
                Condition = "where payslip_month = " + month + " and payslip_year = " + year + " and company_id = 3 order by emp_full_name asc";

            }

            //Condition = "where company_id in (3) and payslip_month = " + month + " and payslip_year = " + year + " order by emp_full_name asc";
        }
        else
        {
            msgalert("Error", "You are an unauthorized user, we inform this malware action to admin", 3);

            return;
        }

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeDetailsForSalary',
            data: msg2
        }).then(function (response) {

            vm.AllEmployeeList = response.data

            $('#pendingList').addClass('hidden');
            $('#detailView').addClass('hidden');

            if (vm.AllEmployeeList.length == 0) {
                msgalert("Error", "No Data Found for this Month..Please check if the salary slip generated for this month.", 3);

                return;
            }

            $('#pendingList').removeClass('hidden');


        }, function (error) {

        });

        // console.log($scope.type);

    };

    vm.GetEmployeeDetails = function (refNo) {

        for (var i = 0; i < vm.AllEmployeeList.length; i++) {

            if (vm.AllEmployeeList[i]["ref_no"] == refNo) {
                vm.EmployeeDetails = vm.AllEmployeeList[i];

                // vm.calculateEarnings(refNo, vm.AllEmployeeList[i]["payslip_month"], vm.AllEmployeeList[i]["payslip_year"]);

                $("#detailView").removeClass('hidden');
            }

        }


    };

    vm.GetEmployeeLeaveCount = function (month, year, user) {

        var values = vm.Employees;

        for (var i = 0; i < values.length; i++) {

            if (i != 0) {
                if (inserted == "Failed") {
                    break;
                }
            }

            var temp = 0;

            var leave = 0;

            var empList = [];

            var refNo = vm.Employees[i]["emp_ref_no"];

            vm.Employs = vm.Employees[i];

            var paramNames = [], paramValues = [];

            paramNames.push('sRefNo');

            paramValues.push(refNo);

            paramNames.push('sUserRef');

            paramValues.push(user);

            paramNames.push('sMonth');

            paramValues.push(month);

            paramNames.push('sYear');

            paramValues.push(year);

            var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: 'POST',
                url: 'SavePayroll',
                data: msg2
            }).then(function (response) {

                if (temp == 0) {
                    loader(1);
                }

                vm.Sample = response.data

                var result = vm.Sample[0]["ResultMsg"];

                if (result == "Inserted") {

                    empList.push("Success");
                }
                else {
                    empList.push("Failed");
                }

                temp++;

                if (temp == values.length) {

                    console.log(empList);

                    loader(0);

                    msgalert("Success", "Created Successfully", 1);

                }
                
            }, function (error) {

            });

        }
    };

    var inserted;
        
    vm.calculateEarnings = function (user) {

        //month = calculateMonth(month);

        var dt = new Date();

        var month = dt.getMonth() + 1;

        var year = dt.getFullYear();

        var company = $("#ddlCompany").val();

        if (company == 0)
        {
            msgalert("Error", "Please choose any one company", 3);

            return;
        }
        else if (company == 1)
        {
            var Condition = "where emp_comp_id = 2 and company_id = 1 and payslip_month = " + month + " and payslip_year = " + year + " order by ref_no asc";
        }
        else if (company == 2) {
            var Condition = "where emp_comp_id = 1 and company_id = 1 and payslip_month = " + month + " and payslip_year = " + year + " order by ref_no asc";
        }
        else if (company == 3) {
            var Condition = "where company_id = 2 and payslip_month = " + month + " and payslip_year = " + year + " order by ref_no asc";
        }
        
        //var Condition = "where delete_status = 0 and emp_ref_no = 328 ";

        var strJsonDatas = eval({ strCondition: Condition });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'SelectEmployeeDetailsForSalary',
            data: msg2
        }).then(function (response) {
            vm.already = response.data

            if (vm.already.length > 0) { //Check if the payroll is already created or not
                msgalert("Error", "Already Payroll created for this month", 3);

                return;
            }
            else {

                if (company == 1) {
                    var Condition = "where delete_status = 0 and salary_fill = 1 and emp_ref_no != 1 and emp_comp_id = 2 and company_id = 1 order by emp_ref_no asc";
                }
                else if (company == 2) {
                    var Condition = "where delete_status = 0 and salary_fill = 1 and emp_ref_no != 1 and emp_comp_id = 1 and company_id = 1 order by emp_ref_no asc";
                }
                else if (company == 3) {
                    var Condition = "where delete_status = 0 and salary_fill = 1 and emp_ref_no != 1 and company_id = 2 order by emp_ref_no asc";
                }

                //var Condition = "where delete_status = 0 and salary_fill = 1 and emp_ref_no != 1 order by emp_ref_no asc";

                //var Condition = "where delete_status = 0 and emp_ref_no = 328 ";

                var strJsonDatas = eval({ strCondition: Condition });

                var msg2 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'SelectEmployeeDetails',
                    data: msg2
                }).then(function (response) {

                    vm.Employees = response.data;  //Select all employees from Table

                    vm.GetEmployeeLeaveCount(month, year, user);

                }, function (error) {

                });
            }

        }, function (error) {

        });


    };

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function calculateMonth(month) {
        switch (month) {
            case "January":
                return 1;
                break;
            case "February":
                return 2;
                break;
            case "March":
                return 3;
                break;
            case "April":
                return 4;
                break;
            case "May":
                return 5;
                break;
            case "June":
                return 6;
                break;
            case "July":
                return 7;
                break;
            case "August":
                return 8;
                break;
            case "September":
                return 9;
                break;
            case "October":
                return 10;
                break;
            case "November":
                return 11;
                break;
            case "December":
                return 12;
                break;
        }
    }

    var EWDays, totEarn, totDed, lop, currentNet, otherDeductions;

    vm.SubmitSalary = function (userRef, roleId) {

        var val = [];

        $(':checkbox:checked').each(function (i) {
            val[i] = $(this)[0].id;
        });

        if (val.length == 0) {
            msgalert("Error", "Please Choose any one Employee", 3)
            return;
        }

        if (val[0] == "checkall") {
            val[0] = 0;
        }

        var incentive = $("#txtIncentive").val();

        var splIncentive = $("#txtSplIncentive").val();

        var nightIncentive = $("#txtNightIncentive").val();

        var deductions = $("#txtDeductions").val();

        var dedPercentage = $("#txtDeductPercentage").val();

        if (incentive == "") {
            incentive = 0;
        }

        if (splIncentive == "") {
            splIncentive = 0;
        }

        if (nightIncentive == "") {
            nightIncentive = 0;
        }

        if (deductions == "") {
            deductions = 0;
        }

        if (dedPercentage == "") {
            dedPercentage = 0;
        }

        var curDate = oAPICall.GetServerDateOm();

        var mn = $('#ddlMonth').val();

        var year = $('#ddlYear').val();

        var temp = 0;

        for (var i = 0; i < val.length; i++) {

            if (deductions != 0)
            {
                $http({
                    method: 'POST',
                    url: 'SelectEmployeeSalaryDetails',
                    data: {refNo : val[i], sMonth: mn , sYear : year}
                }).then(function (response) {

                    var data = response.data;

                    var totalDeduction = parseInt(data[0].total_deduction);

                    var netPay = parseInt(data[0].net_pay);

                    totalDeduction = parseInt(totalDeduction) + parseInt(deductions);

                    netPay = parseInt(netPay) - parseInt(deductions);

                    var valueData = "{is_submitted:'1', incentives:" + incentive + ",  special_incentives:" + splIncentive + ", night_incentives:" + nightIncentive + ", other_deduction:" + deductions
                        + ", total_deduction:" + totalDeduction + ", net_pay:" + netPay + ", payslip_submitted_date:'" + curDate + "',submitted_by:" + userRef + "}";

                    var sCondition = "where ref_no = " + val[0] + " and payslip_month = " + mn + " and payslip_year = " + year;

                    var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas);

                    var post = $http({
                        method: "POST",
                        url: "UpdateSalaryList",
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    });
                    post.success(function (data, status) {

                        if (temp == 0) {
                            loader(1);
                        }

                        temp++;

                        if (temp == val.length) {
                            loader(0);

                            msgalert("Success", "Submitted for Salary Successfully", 1);

                            window.location.reload();
                        }

                    });

                }, function (error) {

                });
            }
            if (dedPercentage != 0) {

                var paramNames = [], paramValues = [];

                paramNames.push('sRefNo');

                paramValues.push(val[i]);
                
                paramNames.push('sMonth');

                paramValues.push(mn);

                paramNames.push('sYear');

                paramValues.push(year);

                paramNames.push('deductPercentage');

                paramValues.push(dedPercentage);

                var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

                var msg2 = JSON.stringify(strJsonDatas);

                $http({
                    method: 'POST',
                    url: 'UpdateEmployeeSalarybyDedPercentage',
                    data: msg2
                }).then(function (response) {

                    var data = response.data;

                    var totalDeduction = parseInt(data[0].total_deduction);

                    var netPay = parseInt(data[0].net_pay);

                    totalDeduction = parseInt(totalDeduction) + parseInt(deductions);

                    netPay = parseInt(netPay) - parseInt(deductions);

                    var valueData = "{is_submitted:'1', incentives:" + incentive + ",  special_incentives:" + splIncentive + ", night_incentives:" + nightIncentive + ", other_deduction:" + deductions
                        + ", total_deduction:" + totalDeduction + ", net_pay:" + netPay + ", payslip_submitted_date:'" + curDate + "',submitted_by:" + userRef + "}";

                    var sCondition = "where ref_no = " + val[0] + " and payslip_month = " + mn + " and payslip_year = " + year;

                    var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                    var msg2 = JSON.stringify(strJsonDatas);

                    var post = $http({
                        method: "POST",
                        url: "UpdateSalaryList",
                        data: msg2,
                        dataType: 'json',
                        headers: { "Content-Type": "application/json" }
                    });
                    post.success(function (data, status) {

                        if (temp == 0) {
                            loader(1);
                        }

                        temp++;

                        if (temp == val.length) {
                            loader(0);

                            msgalert("Success", "Submitted for Salary Successfully", 1);

                            window.location.reload();
                        }

                    });

                }, function (error) {

                });
            }
            else
            {
                
                var valueData = "{is_submitted:'1', incentives:" + incentive + ",  special_incentives:" + splIncentive + ", night_incentives:" + nightIncentive + ", other_deduction:" + deductions + ", payslip_submitted_date:'" + curDate + "',submitted_by:" + userRef + "}";

                var sCondition = "where ref_no = " + val[i] + " and payslip_month = " + mn + " and payslip_year = " + year;

                var strJsonDatas = eval({ strJsonData: valueData, strCondition: sCondition, strSessionID: null });

                var msg2 = JSON.stringify(strJsonDatas);

                var post = $http({
                    method: "POST",
                    url: "UpdateSalaryList",
                    data: msg2,
                    dataType: 'json',
                    headers: { "Content-Type": "application/json" }
                });
                post.success(function (data, status) {

                    if (temp == 0) {
                        loader(1);
                    }

                    temp++;

                    if (temp == val.length) {
                        loader(0);

                        msgalert("Success", "Submitted for Salary Successfully", 1);

                        window.location.reload();
                    }

                });

            }

        }
    };

    var wage = document.getElementById("searchBox");

    wage.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            vm.FindString();
        }
    });

    var TRange = null;

    vm.FindString = function () {

        var str = $("#searchBox").val();

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

    vm.GetMyPayroll = function () {

        var ref = null;

        $http({
            method: 'POST',
            url: 'MySalaryPayroll?ref',
            data: null
        }).then(function (response) {

            vm.SalaryPayroll = response.data;

            vm.SalaryPayroll = vm.SalaryPayroll[0];

        }, function (error) {

        });

    };

    vm.GetEmployees = function () {

        $http({
            method: 'POST',
            url: 'GetEmployees'
        }).then(function (response) {

            vm.EmployeeList = response.data;

            //vm.EmployeeList = vm.EmployeeList[0];

        }, function (error) {

        });
    };

    vm.getPayrollDetails = function () {

        var emp = $("#ddlEmp").val();

        $http({
            method: 'POST',
            url: 'MySalaryPayroll?emp',
            data: null
        }).then(function (response) {

            vm.SalaryPayroll = response.data;

            if (vm.SalaryPayroll === undefined)
            {
                msgalert("Error", "No Data Found for this Employee", 3);

                $("#payrollDetails").addClass("hidden");
            }
            else
            {
                vm.SalaryPayroll = vm.SalaryPayroll[0];

                $("#payrollDetails").removeClass("hidden");
            }
            

        }, function (error) {

        });

    };

    vm.GetEmployeeByCompany = function (refNo, roleId) {

        var company = $("#ddlCompany").val();

        if (company == 0)
        {
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

            $('#pendingList').removeClass('hidden');

            //vm.GetEmployeeLeaveCount(month, year, user);

        }, function (error) {

        });

    };

    vm.GenerateWage = function (userRef, RoleId) {

        var val = [];

        $(':checkbox:checked').each(function (i) {
            val[i] = $(this)[0].id;
        });

        if (val.length == 0) {
            msgalert("Error", "Please Choose any one Employee", 3)
            return;
        }

        if (val[0] == "checkall") {
            val[0] = 0;

            var selectAll = 1;

            var length = val.length - 1;
        }
        else {
            var selectAll = 0;

            var length = val.length;
        }

        var mn = $('#ddlMonth').val();

        var year = $('#ddlYear').val();

        var otAllowance = $('#txtOTallowance').val();

        var deductionPer = $('#txtDeductPercentage').val();

        var transferAll = $('#txtTransfer').val();

        var temp = 0;

        for (var i = selectAll; i <= length; i++) {

            temp++;

            paramNames = [], paramValues = [];

            if (otAllowance > 0)
            {
                paramNames.push('sRefNo');

                paramValues.push(val[i]);

                paramNames.push('sUserRef');

                paramValues.push(userRef);

                paramNames.push('sMonth');

                paramValues.push(mn);

                paramNames.push('sYear');

                paramValues.push(year);

                paramNames.push('deductionPer');

                paramValues.push(deductionPer);

                paramNames.push('otAllowance');

                paramValues.push(otAllowance);

                paramNames.push('transfer');

                paramValues.push(transferAll);
            }
            else
            {
                paramNames.push('sRefNo');

                paramValues.push(val[i]);

                paramNames.push('sUserRef');

                paramValues.push(userRef);

                paramNames.push('sMonth');

                paramValues.push(mn);

                paramNames.push('sYear');

                paramValues.push(year);

                paramNames.push('deductionPer');

                paramValues.push(deductionPer);
                
                paramNames.push('transfer');

                paramValues.push(transferAll);
            }

            var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

            var msg2 = JSON.stringify(strJsonDatas);

            $http({
                method: 'POST',
                url: 'SavePayroll',
                data: msg2
            }).then(function (response) {

                vm.WageResult = response.data;

                if (vm.WageResult[0]["ResultMsg"] == "Inserted")
                {
                    msgalert("Success", "Wage Successfully created", 1);

                    vm.GetEmployeeByCompany(userRef, RoleId);

                }
                else if (vm.WageResult[0]["ResultMsg"] == "Already Exists")
                {
                    msgalert("Warning", "Already wage created for this month", 2);

                    vm.GetEmployeeByCompany(userRef, RoleId);

                }
                
            }, function (error) {

            });

        }

    };

    vm.GetSeperationEmployees = function (refNo) {
        
        var months = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
                
        var sMonth = $("#ddlMonth").val();

        var sYear = $("#ddlYear").val();

        if (sMonth == 0) {
            msgalert("Error", "Please choose Month", 3);
            return;
        }

        if (sYear == 0) {
            msgalert("Error", "Please choose Year", 3);
            return;
        }

        //var selectedMonthName = months[value[sMonth]];

        vm.ssMonth = $("#ddlMonth :selected").text();

        vm.ssMonth = vm.ssMonth + ' ' + sYear

        paramNames = [], paramValues = [];

        paramNames.push('refNo');

        paramValues.push(refNo);

        paramNames.push('sMonth');

        paramValues.push(sMonth);

        paramNames.push('sYear');

        paramValues.push(sYear);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'GetSeparationEmployees',
            data: msg2
        }).then(function (response) {

            vm.Employees = response.data;  //Select all employees from Table

            for (var i = 0; i < vm.Employees.length; i++)
            {
                vm.Employees[i]["prev_month"] = vm.ssMonth;
            }

            $('#menus').removeClass('hidden');

            $("#ddlEmployee").addClass("hidden");

            //vm.GetEmployeeLeaveCount(month, year, user);

        }, function (error) {

        });

    };

    vm.saveFinalSettlement = function (userRef, empRef, totalDays) {

        var resiSubmitted = $("#txtresignSubDate").val();

        var leavingDate = $("#txtLeavedate").val();

        var leavingReason = $("#ddlReason").val();

        var settlementDate = $("#txtSettledate").val();

        var noticePeriod = $("#txtNotice").val();

        var daysServed = $("#txtServed").val();

        var excessinNotice = $("#txtExcessNotice").val();

        var workdays = $("#txtWorkDays").val();

        var noofdays = $("#txtNoofDays").val();

        var remarks = $("#txtRemarks").val();

        var lopDays = $("#txtLop").val();

        if (document.getElementById('noticereq').checked == true)
        {
            var noticeRequired = 1;
        }
        else
        {
            var noticeRequired = 0;
        }
        var sPcBulkData = resiSubmitted + '~' + leavingDate + '~' + leavingReason + '~' + settlementDate + '~' + noticePeriod + '~' + daysServed + '~' + excessinNotice +
            '~' + workdays + '~' + noofdays + '~' + remarks + '~' + totalDays + '~' + noticeRequired + '~' + lopDays + '~';

        var paramNames = [], paramValues = [];

        paramNames.push('sRefNo');

        paramValues.push(refNo);

        paramNames.push('sEmpRef');

        paramValues.push(empRef);

        paramNames.push('sProcBulkData');

        paramValues.push(sPcBulkData);

        var strJsonDatas = eval({ strSessionID: '', ProcParameters: paramNames, ProcInputData: paramValues });

        var msg2 = JSON.stringify(strJsonDatas);

        $http({
            method: 'POST',
            url: 'CreateEmployeeFinalSettlement',
            data: msg2
        }).then(function (response) {

            vm.SeperationUpdated = response.data;

            if (vm.SeperationUpdated[0].ResultMsg == "Success") {

                var report_codition = "WHERE emp_ref_no = " + empRef;

                var report_id = "70";

                document.getElementById('framecontent').src = '../Content/ReportsData/ReportViewer.aspx?report_id=' + report_id + '&report_codition=' + report_codition;

                $('#mainContent').addClass('hidden');
                
            }

        }, function (error) {

        });

    };

    vm.GetEmployeeLists = function (refNo, roleId) {


        paramNames = [], paramValues = [];

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
            url: 'SelectEmployeeDetailsByCompany',
            data: msg2
        }).then(function (response) {

            vm.Employees = response.data;  //Select all employees from Table
            
        }, function (error) {

        });

    };

});