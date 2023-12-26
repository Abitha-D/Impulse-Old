



function APICall() {

    var ServiceName = '';
    this.GetServerDateOm = function (strJsonDatas) {


        $.support.cors = true;
        var Result = '';


        //var ServiceName = "AdminSetupService.svc/rsoft/getserverdatentime";

        var _url = "GetserverdateOm";


        var msg2 = JSON.stringify(strJsonDatas);

        $.ajax({
            // crossDomain: true,
            async: false,
            // cache: true,
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            //url: url,
            //data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            //dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                Result = msg;

            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    WriteLog('Unable to connect to server');
                else
                    WriteLog(error.toString());

            }
        });

        return Result;
    }

    this.PopulateJQGrid = function (strJsonDatas, strFunction, thegrid) {

        thegrid.clearGridData();
        $.support.cors = true;
        var Result = '';


        var ServiceName = this.ServiceName;

        //var _url = RestServiceURL + ServiceName + strFunction;

        var msg2 = JSON.stringify(strJsonDatas);

        $.ajax({
            // crossDomain: true,
            async: false,
            //    cache: true,  
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False

            success: function (msg) {//On Successfull service call 

                var data = msg;
                if (data == '[]') {
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {


                        Result = jQuery.parseJSON(data);

                    }
                    catch (exception) {
                        Result = null;
                    }

                    if (Result != null) {

                        for (var i = 0; i < Result.length; i++)
                            thegrid.addRowData(i + 1, Result[i]);
                    }
                    else
                        WriteLog(data.toString());


                }




            },
            complete: function (xhr, textStatus) {
                $.hideprogress();  // #info must be defined somehwere
            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    WriteLog('Unable to connect to server');
                else
                    WriteLog(error.toString());

            }
        });
        return Result;
    }

    this.PopulateJQGridUsingURL = function (strJsonDatas, _url, thegrid) {

        thegrid.clearGridData();
        $.support.cors = true;
        var Result = '';

        var msg2 = JSON.stringify(strJsonDatas);

        $.ajax({
            // crossDomain: true,
            async: false,
            //    cache: true,  
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 

                var data = msg;
                if (data == '[]') {
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {


                        Result = jQuery.parseJSON(data);

                    }
                    catch (exception) {
                        Result = null;
                    }

                    if (Result != null) {

                        for (var i = 0; i < Result.length; i++)
                            thegrid.addRowData(i + 1, Result[i]);
                    }
                    else
                        WriteLog(data.toString());


                }




            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    WriteLog('Unable to connect to server');
                else
                    WriteLog(error.toString());

            }
        });
        return Result;
    }

    this.SelectData = function (strJsonDatas, strFunction) {


        $.support.cors = true;
        var Result = '';


        var ServiceName = this.ServiceName;


        var _url = strFunction;
        //_url = "MVCApplication1/CommonSearch/" + strFunction + "";
        //_url= '@Url.Action("' + strFunction + '", "CommonSearch")';
        //var _url = RestServiceURL + ServiceName + strFunction;
        //var _url = '@Url.Action("getID","Employee")';


        var msg2 = JSON.stringify(strJsonDatas);

        $.ajax({
            // crossDomain: true,
            async: false,
            // cache: true,
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 
                msg = JSON.stringify(msg);
                var data = msg;
                if (data == '[]') {
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {

                        Result = jQuery.parseJSON(data);

                    }
                    catch (exception) {
                        Result = null;
                    }

                    if (Result == null)
                        WriteLog(data.toString());

                }

            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    WriteLog('Unable to connect to server');
                else
                    WriteLog(error.toString());

            }
        });

        return Result;
    }

    this.DeleteData = function (strJsonDatas, strFunction) {

        $.support.cors = true;
        var Result = '';



        //var ServiceName = this.ServiceName;


        var _url = strFunction;

        var msg2 = JSON.stringify(strJsonDatas);


        $.ajax({
            // crossDomain: true,
            async: false,
            // cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                if (data = 'Success')
                    Result = data;
                else {
                    Result = 'Error';
                    WriteLog(Result);
                }


            },
            error: function (xhr, status, error) {

                Result = null;
                Result = xhr.responseText;
                //if (error.toString() == 'Unknown')
                //    Result = 'Unable to connect to server';
                //else
                //    Result = xhr.responseText;
                //WriteLog(Result);

            },
            complete: function (xhr, stat) {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    AuditTrail(xhr, stat);
                }
            }
        });
        return Result;
    }

    this.DeletePhoto = function (strJsonDatas, strFunction) {

        $.support.cors = true;
        var Result = '';



        //var ServiceName = this.ServiceName;


        var _url = strFunction;

        var msg2 = JSON.stringify(strJsonDatas);


        $.ajax({
            // crossDomain: true,
            async: false,
            // cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                if (data = 'Success')
                    Result = data;
                else {
                    Result = 'Error';
                    WriteLog(Result);
                }


            },
            error: function (xhr, status, error) {

                Result = null;
                Result = xhr.responseText;
                //if (error.toString() == 'Unknown')
                //    Result = 'Unable to connect to server';
                //else
                //    Result = xhr.responseText;
                //WriteLog(Result);

            },
            complete: function (xhr, stat) {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    AuditTrail(xhr, stat);
                }
            }
        });
        return Result;
    }

    this.UpdateData = function (strJsonDatas, strFunction, Condition) {

        $.support.cors = true;
        var Result = '';



        //var ServiceName = this.ServiceName;

        var _url = strFunction;
        //peeeru written by 24-8-2017
        try {
            strJsonDatas = JSON.stringify(strJsonDatas).replace(/'/g, "''");
        }
        catch (e) {
            strJsonDatas = JSON.stringify(strJsonDatas);
        }

        strJsonDatas = JSON.parse(strJsonDatas);
        //end
        var dt = JSON.stringify(strJsonDatas);

        var msg2 = eval({ strSessionID: UserSession, strJsonData: dt, strCondition: Condition });

        msg2 = JSON.stringify(msg2);

        $.ajax({
            //    crossDomain: true,
            async: false,
            //        cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            async: false,
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: 'text', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 
                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                if (data = 'Success')
                    Result = data;
                else {
                    Result = 'Error';
                    WriteLog(Result);
                }

                return Result;
            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    Result = 'Unable to connect to server';
                else
                    Result = 'error.toString()';
                WriteLog(Result);

            },
            complete: function (xhr, stat) {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    AuditTrail(xhr, stat);
                }
            }
        });

        return Result;
    }

    function AuditTrail(xhr, stat) {

    }

    this.Sendmail = function (strJsonDatas, strFunction) {
        $.support.cors = true;
        var Result = null;
        var _url = strFunction;
        var dt = JSON.stringify(strJsonDatas);
        var msg2 = eval({ strJsonData: dt, strSessionID: UserSession });
        msg2 = JSON.stringify(msg2);
        $.ajax({

            //    crossDomain: true,
            //   cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            async: false,
            dataType: 'text', //Expected data format from server
            processdata: true, //True or False
            success: function (data) {//On Successfull service call 
                Result = data;
            },
            error: function (data) {
                //YAHOO.example.container.wait.hide();
                Result = data.responseText;
                // $.hideprogress();
            }
            //error: function (xhr, status, error) {
            //    Result = error;
            //    //Result = null;
            //    //if (error.toString() == 'Unknown')
            //    //    Result = 'Unable to connect to server';
            //    //else
            //    //    Result = 'error.toString()';
            //    //WriteLog(Result);

            //},
        });
        return Result;
    }

    this.InsertData = function (strJsonDatas, strFunction) {
        $.support.cors = true;
        var Result = '';
        // var RestServiceURL = this.RestServiceURL;


        var ServiceName = this.ServiceName;

        var _url = strFunction;

        //peeeru written by 24-8-2017
        strJsonDatas = JSON.stringify(strJsonDatas).replace(/'/g, "''");
        strJsonDatas = JSON.parse(strJsonDatas);
        //end
        var dt = JSON.stringify(strJsonDatas);

        var msg2 = eval({ strJsonData: dt, strSessionID: null });

        msg2 = JSON.stringify(msg2);

        $.ajax({

            //    crossDomain: true,
            //   cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            async: false,
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                else if (data == 'Success') {
                    Result = data;
                }
                else {

                    //try {
                    //    Result = jQuery.parseJSON(data);
                    //}
                    //catch (err) {
                    //    WriteLog('Parse Error');
                    //    WriteLog(err);
                    Result = data;
                    //}
                }




            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    Result = 'Unable to connect to server';
                else
                    Result = '';
                WriteLog(Result);

            },
            complete: function (xhr, stat) {
                //    if (xhr.readyState === 4 && xhr.status === 200) {

                //        AuditTrail(xhr, stat);
                //    }
            }
        });
        return Result;
    }

    this.InsertDataom = function (strJsonDatas, strFunction) {
        $.support.cors = true;
        var Result = '';
        // var RestServiceURL = this.RestServiceURL;


        var ServiceName = this.ServiceName;

        var _url = strFunction;


        var dt = JSON.stringify(strJsonDatas);

        var msg2 = eval({ strJsonData: dt, strSessionID: null });

        msg2 = JSON.stringify(msg2);

        $.ajax({

            //    crossDomain: true,
            //   cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            async: false,
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                else if (data == 'Success') {
                    Result = data;
                }
                else {

                    //try {
                    //    Result = jQuery.parseJSON(data);
                    //}
                    //catch (err) {
                    //    WriteLog('Parse Error');
                    //    WriteLog(err);
                    Result = data;
                    //}
                }




            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    Result = 'Unable to connect to server';
                else
                    Result = '';
                WriteLog(Result);

            },
            complete: function (xhr, stat) {
                //    if (xhr.readyState === 4 && xhr.status === 200) {

                //        AuditTrail(xhr, stat);
                //    }
            }
        });
        return Result;
    }

    this.InsertData_fixedstring = function (strJsonDatas, strFunction, fixedstring) {
        $.support.cors = true;
        var Result = '';
        // var RestServiceURL = this.RestServiceURL;


        var ServiceName = this.ServiceName;

        var _url = strFunction;


        var dt = JSON.stringify(strJsonDatas);

        var msg2 = eval({ strJsonData: dt, strSessionID: fixedstring, });

        msg2 = JSON.stringify(msg2);

        $.ajax({

            //    crossDomain: true,
            //   cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            async: false,
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                else if (data == 'Success') {
                    Result = data;
                }
                else {

                    //try {
                    //    Result = jQuery.parseJSON(data);
                    //}
                    //catch (err) {
                    //    WriteLog('Parse Error');
                    //    WriteLog(err);
                    Result = data;
                    //}
                }




            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    Result = 'Unable to connect to server';
                else
                    Result = 'error.toString()';
                WriteLog(Result);

            },
            complete: function (xhr, stat) {
                //    if (xhr.readyState === 4 && xhr.status === 200) {

                //        AuditTrail(xhr, stat);
                //    }
            }
        });
        return Result;
    }

    this.InsertAuditData = function (strJsonDatas, strFunction) {
        $.support.cors = true;
        var Result = '';
        // var RestServiceURL = this.RestServiceURL;


        var ServiceName = this.ServiceName;

        var _url = RestServiceURL + ServiceName + strFunction;


        var dt = JSON.stringify(strJsonDatas);

        var msg2 = eval({ strJsonData: dt, strSessionID: UserSession });

        msg2 = JSON.stringify(msg2);

        $.ajax({

            //    crossDomain: true,
            //   cache: true, 
            type: "POST", //GET or POST or PUT or DELETE verb
            url: _url,
            data: msg2, //Data sent to server
            contentType: "application/json; charset=utf-8", // content type sent to server
            async: false,
            dataType: 'json', //Expected data format from server
            processdata: true, //True or False
            success: function (msg) {//On Successfull service call 


                var data = msg;
                if (data == '[]') {
                    Result = 'Error';
                    WriteLog(Result);
                }
                else if (data == null) {
                    Result = 'Unable to connect to server';
                    WriteLog(Result);
                }
                else if (data == 'Success') {
                    Result = data;
                }
                else {

                    try {
                        Result = jQuery.parseJSON(data);
                    }
                    catch (err) {
                        WriteLog('Parse Error');
                        WriteLog(err);
                        Result = data;
                    }
                }




            },
            error: function (xhr, status, error) {

                Result = null;
                if (error.toString() == 'Unknown')
                    Result = 'Unable to connect to server';
                else
                    Result = 'error.toString()';
                WriteLog(Result);

            },
            complete: function (xhr, stat) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    return Result;
                }
            }
        });
        return Result;
    }

    this.GetCurrentDate = function () {
        var x = new Date()
        var y = x.getFullYear()
        var m = x.getMonth() + 1  // added +1 because javascript counts month from 0
        var d = x.getDate()
        var Today = y + '/' + m + '/' + d;
        return Today;


    }

    this.CallAPIServerFunction = function (url, strJsonDatas) {

        try {


            var dt = JSON.stringify(strJsonDatas);

            $.support.cors = true;
            var Result = '';


            $.ajax({
                type: "POST", //GET or POST or PUT or DELETE verb
                url: url,
                data: dt, //Data sent to server
                contentType: "application/json; charset=utf-8", // content type sent to server
                dataType: 'json', //Expected data format from server
                async: false,
                processdata: true, //True or False
                success: function (msg) {//On Successfull service call 


                    var data = msg;
                    if (data == '[]') {
                        Result = 'Error';
                        WriteLog(Result);
                    }
                    else if (data == null) {
                        Result = 'Unable to connect to server';
                        WriteLog(Result);
                    }
                    else if (data == 'Success') {
                        Result = data;
                    }
                    else {

                        try {
                            Result = jQuery.parseJSON(data);
                        }
                        catch (err) {
                            WriteLog('Parse Error');
                            WriteLog(err);
                            Result = data;
                        }
                    }




                },
                error: function (xhr, status, error) {

                    Result = null;
                    if (error.toString() == 'Unknown')
                        Result = 'Unable to connect to server';
                    else
                        Result = 'error.toString()';
                    WriteLog(Result);

                }
            });
            return Result;


        }

        catch (ex) {
            return null;
        }
    }

}

function GridSearch() {
    var gridSearchCondition = '';
    $('.ui-search-input input').each(function () {
        if ($(this).val() != '') {
            gridSearchCondition += ' and  ' + $(this).prop('name') + " like '%" + $(this).val() + "%'";
        }
    });
    return gridSearchCondition;
}

function gridbind(pager_id, grid, Page, TotalPage, Total, Datas) {
    jQuery(grid).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn", autosearch: true });
    $(grid).jqGrid('setGridParam', {
        datatype: 'local',
        onPaging: function (pgButton) {
            var requestedPage = $(grid).getGridParam("page");
            var selectedvalue = $('#' + pager_id + ' .ui-pg-selbox').val();
            if (pgButton.replace(pager_id, '') == 'next_') {
                var searchQuery = GridSearch();
                ListGrid(requestedPage, selectedvalue, searchQuery);
            }
            else if (pgButton.replace(pager_id, '') == 'prev_') {

                requestedPage = $(grid).getGridParam("page") - 2;
                var searchQuery = GridSearch();
                ListGrid(requestedPage, selectedvalue, searchQuery);
            }
            else if (pgButton.replace(pager_id, '') == 'last_') {
                var lastPage = $(grid).getGridParam("lastpage")
                var searchQuery = GridSearch();
                ListGrid(lastPage - 1, selectedvalue, searchQuery);
            }
            else if (pgButton.replace(pager_id, '') == 'first_') {
                var searchQuery = GridSearch();
                ListGrid(0, selectedvalue, searchQuery);
            }
            else {
                var searchQuery = GridSearch();
                ListGrid(0, selectedvalue, searchQuery)
            }
        },

        localReader: {
            repeatitems: true,
            root: function () { return Datas; },
            page: function () { return Page; },
            total: function () { return TotalPage; },
            records: function () { return Total; }
        },

    }).trigger('reloadGrid');



    $('.ui-search-input input').each(function () {
        var id = $(this).attr('id');
        id = id.replace('gs_', '');
        $(this).attr('id', id);

    });

    $(".ui-pg-input").attr("id", "ui-pg-input");

    $('.ui-search-input input').keyup(function (event) {
        if (event.keyCode == 13) {
            if (event.handled !== true) {
                var searchQuery = GridSearch();
                var selectedvalue = $('#' + pager_id + ' .ui-pg-selbox').val();
                ListGrid(0, selectedvalue, searchQuery);
                event.handled = true;
            }
        }
    });

    //$('.ui-search-clear').click(function (event) {

    //    $('.ui-search-input input').each(function () { $(this).val(''); });
    //    var searchQuery = GridSearch();
    //    var selectedvalue = $('#' + pager_id + ' .ui-pg-selbox').val();
    //    if (event.handled !== true) {
    //        ListGrid(0, selectedvalue, searchQuery);
    //        event.handled = true;
    //    }
    //});

    $('.ui-pg-input').keyup(function (event) {
        if (event.keyCode == 13) {
            var searchQuery = GridSearch();
            var selectedvalue = $('#' + pager_id + ' .ui-pg-selbox').val();
            ListGrid(0, selectedvalue, searchQuery)

        }
    });



}

function WriteLog(LogMessage) {
    //   alert(LogMessage);
}

this.showmsg = function (msgEle, msgText, msgClass, msgIcon, msgHideIcon, autoHide) {
    var tblMsg;

    tblMsg = '<table width="100%" cellpadding="1" cellspacing="0" border="0" class="' + msgClass + '"><tr><td style="width:30px;" align="center" valign="middle">' + msgIcon + '</td><td>' + msgText + '</td><td style="width:30px;" align="center" valign="middle"><a href="javascript:void(0);" onclick="$(\'#' + msgEle + '\').toggle(400);">' + msgHideIcon + '</a></td></tr></table>';

    $("#" + msgEle).html(tblMsg);
    $("#" + msgEle).show();
    if (autoHide) {
        setTimeout(function () {
            $('#' + msgEle).fadeOut('normal')
        }, 10000
	        );
    }
}



//Grid function


