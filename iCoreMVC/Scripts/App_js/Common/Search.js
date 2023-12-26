function Search() {
    var searchId = 21, pagelimit = 50, linkColumn = '', sortorder = ' ', IsMultiSelect, IsApprovalTemplate;
    var prevPage = 1, multiSelectData = [];
    var custid = 0;
    $optCondition = null;

    this.InitializeSearch = function () {
        UserSession = null;
        searchId = 1;
        IsMultiSelect = true;
        IsApprovalTemplate = true;
        if (!IsApprovalTemplate && !IsMultiSelect) { window.parent.$('#approvaltemplatectrls').hide(); window.parent.$('#multiselectctrls').hide(); }
        else if (IsMultiSelect && !IsApprovalTemplate) { window.parent.$('#multiselectctrls').show(); window.parent.$('#approvaltemplatectrls').hide(); }
        else if (IsMultiSelect && IsApprovalTemplate) { window.parent.$('#multiselectctrls').hide(); window.parent.$('#approvaltemplatectrls').show(); }
        BindSearchGrid(1, '');
        BindPager('');
        advancedsearch();
        var rowIds = $('#tblOrderListGrid').jqGrid('getDataIDs');
        for (i = 0; i < rowIds.length; i++) {//iterate over each row
            rowData = $('#tblOrderListGrid').jqGrid('getRowData', rowIds[i]);
        }

        $('.ui-search-input input').each(function () {
            var id = $(this).attr('id');
            id = id.replace('gs_', '');
            $(this).attr('id', id);

        });

        $('.ui-search-input input').keyup(function (event) {
            if (event.keyCode == 13) {
                var searchQuery = GridSearch();
                BindSearchGrid(1, searchQuery);
                BindPager(searchQuery);
            }
        });

        //$('.ui-search-clear').click(function () {
        //    BindPager('');
        //    BindSearchGrid(1, '');
        //    $('.ui-search-input input').each(function () { $(this).val(''); });
        //});
        
        $('#advancedsearch').click(function () {
            //$("#JQGridForAdvancedSearch").jqGrid('clearGridData');
            //$("#JQGridForAdvancedSearch").jqGrid('addRow', "new");
            $('#search').hide();
            $('#advancesearch').show('slide', { direction: "left" }, 500, callback);
            resizeModelDialog($('#advancesearch').height());
            $("[name='forhide']").addClass("hide");
        });
        $('#btnCancel').click(function () {
            hideAdvanceSearch();
        });
        $('.fa-plus').click(function () {
            var ids = $("#JQGridForAdvancedSearch").jqGrid('getDataIDs');
            var mymodel = $("#tblOrderListGrid").getGridParam('colModel');
            var totalRowsPermitted = 0;
            $.each(mymodel, function (i) {
                if (this.hidden == false && this.search == true) {
                    totalRowsPermitted++;
                }
            });
            if (ids.length < totalRowsPermitted) {
                $("#JQGridForAdvancedSearch").jqGrid('addRow', "new");
                $me = $('.jqgrid-new-row').first();
                $me.insertAfter($('.jqgrid-new-row').last());
                addStylestoSearchBoxes();
                resizeModelDialog($('#advancesearch').height());
            }
            else {
                msgalert('Warning', 'Reached maximum number (' + ids.length + ') of conditions', 2);
            }
        });
        $('#btnSearchfl').click(function () {
            var searchQuery = generateadvancedsearchquery();
            if (searchQuery.length > 0) {
                BindSearchGrid(1, searchQuery);
                BindPager(searchQuery);
                hideAdvanceSearch();
            }
        });
        $('#clearfilter').click(function () {
            BindPager('');
            BindSearchGrid(1, '');
            $('.ui-search-input input').each(function () { $(this).val(''); });
        });
       
        //});


        //-----------sameer
    };

   
    function IsElementExists(array, object) {
        var IsExists = false, field = '';
        if (object != null) {
            field = ((JSON.stringify(object).split(':')[0]).replace('"', '').replace('{', '')).replace('"', '');
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i][field] == object[field]) {
                IsExists = true;
                break;
            }
        }
        return IsExists;
    }
    function GetResult(pagelimit, pageNo, gridSearch) {
        //if (parent.sIsBackToConsole == 2) {
        //    return filresult;
        //}
        var pageLimit = 50;
        var SearchData = GetCondition();
        if (SearchData.Condition != '' && SearchData.Condition != null) {
            //if ($optCondition.val() != ' ') {
            //    //SearchData.Condition += ' and ' + $optCondition.val();
            //}
            if (gridSearch != '') {
                /*if ($optCondition.val() != ' ') {
                SearchData.Condition += ' and ' + $optCondition.val();
                }*/
                //order by order_no desc 
                var data = SearchData.Condition
                SearchData.Condition = (SearchData.Condition).replace('order by order_no desc', '');
                SearchData.Condition += ' and (' + gridSearch + ')';

            }
        }
        var paramNames = [], paramValues = [];
        paramNames.push('SEARCHID'); paramNames.push('FIELDS'); paramNames.push('CONDITION'); paramNames.push('PAGENO'); paramNames.push('PAGELIMIT');
        paramValues.push(searchId); paramValues.push('*'); paramValues.push(SearchData.Condition); paramValues.push(pageNo); paramValues.push(pageLimit);
        sortorder = sortorder || ' ';

        if (sortorder != ' ') {
            paramNames.push('SORTORDER');
            paramValues.push(sortorder);
        }
        //else if (sRoleId == 5) {
        //    paramNames.push('SORTORDER');
        //    paramValues.push('CASE WHEN ord_revision_flag = 1 THEN 1 ELSE 2 END');
        //}
        var strJsonDatas = eval({ strSessionID: UserSession, ProcParameters: paramNames, ProcInputData: paramValues });
        oAPICall.ServiceName = 'CommonService.svc/rsoft/';
        var Result;
        var rowData = [];

        if ($('#isback').val() == 2) {

            Result = parent.filterdata;
            $('#isback').val("");
        }
        else {
            Result = oAPICall.SelectData(strJsonDatas, "SearchResults");
        }
        if (searchId == 65) {
            parent.filterdata = [];
            parent.filterdata = Result;
        }

        var sOrderList = [];
        if (Result != '' && Result != null) {
            for (var i = 0; i < Result.length; i++) {
                var shdnOrderID = Result[i].order_no;
                //var sOrderCode = Result[i].order_code;
                var sOrderCode = Result[i].order_portal_no;
                var sOrderDate = Result[i].order_date;
                var sOrderDueDate = Result[i].order_due_date;
                var sOrderDD = sOrderDueDate;

                var sOrderAddress = Result[i].subject_address;
                var sOrderType = Result[i].ordertype_name;

                var sOrderStatus = Result[i].status_name;
                var sOrderStatusId = Result[i].order_status;;

                var sIsPhoto = Result[i].count_photo_upload;
                var sIsPhotoUplaod = Result[i].is_photo_upload;


                var sIsFile = Result[i].count_file_upoad;
                var sIsFilePhoto = sIsPhoto + '/' + sIsFile
                var sIsFee = Result[i].data_fee;

                var sIsdtcomp = Result[i].is_entry_comp;
                var sIsPaid = Result[i].is_paid;
                var sSubClient_name = Result[i].subclient_name;
                var sPhtname = Result[i].pht_name;
                var sFullname = Result[i].full_name;
                //if (sFullname == sSubClient_name) {
                //    sSubClient_name = 'Nil';
                //}

                var sPortalName = Result[i].portal_name;
                sOrderList[i] = {
                    order_no: shdnOrderID, order_code: sOrderCode, full_name: sFullname, order_date: sOrderDate, order_due_date: sOrderDueDate, subject_address: sOrderAddress,
                    order_type: sOrderType, order_status: sOrderStatus, is_photo_upload: sIsFilePhoto, order_status_id: sOrderStatusId,
                    fee: sIsFee, order_ddate: sOrderDD, is_dataentry: sIsdtcomp, is_paid: sIsPaid, is_photo_icon: sIsPhotoUplaod,
                    pht_name: sPhtname, sub_client: sSubClient_name, portal_name: sPortalName

                };
            }
        }


        return sOrderList;



    };
    function GetRecCount(gridSearch) {
        var SearchData = GetCondition();
        var searchId = 1
        if (SearchData.Condition != '' && SearchData.Condition != null) {

            if (gridSearch != '') {
                SearchData.Condition += ' and (' + gridSearch + ')';
                /*if ($optCondition.val() != ' ') {
                SearchData.Condition += ' and ' + $optCondition.val();
                }*/
            }
            SearchData.Condition = SearchData.Condition.replace('order by order_no desc', '');
            //order by order_no desc
        }
        var paramNames = [], paramValues = [];
        paramNames.push('SEARCHID'); paramNames.push('CONDITION');
        paramValues.push(searchId); paramValues.push(SearchData.Condition);
        var strJsonDatas = eval({ strSessionID: UserSession, ProcParameters: paramNames, ProcInputData: paramValues });
        oAPICall.ServiceName = 'CommonService.svc/rsoft/';
        var Result = oAPICall.SelectData(strJsonDatas, "GetRecordCount");
        return Result;
    }



    function CreateGrid(columnNames, columnModel) {
        var oJQGridFunctions = new JQGridFunctions();
        var grid = $("#JQGridForSearch");
        if (grid[0].grid == undefined) {
            //grid.jqGrid(options);
        } else {
            delete grid;
            $('#JQGridForSearch').GridUnload('#JQGridForSearch');
            //$('#JQGridForSearch').jqGrid(options);
        }
        oJQGridFunctions.CreateJQGridWithPagingOption(columnNames, columnModel, "#JQGridForSearch", 'Emp Grade Popup', '#JQGridForSearchFooter', 'grade_id', pagelimit, 950, IsMultiSelect);

        //oJQGridFunctions.CreateJQGridWithPagingOption(columnNames, columnModel, "#JQGridForSearch", 'Emp Grade Popup', '#JQGridForSearchFooter', 'grade_id', pagelimit, 950, true);
        var grid = $("#JQGridForSearch");

        grid[0].clearToolbar();
        $('#JQGridForSearchFooter').html('<div style="float: left; width:29%;margin:12px;"> <span id="advancedsearch" style="cursor:pointer"><i  class="fa fa-search" style="height:20px;"></i> Advance Search</span> <span style="cursor:pointer;margin-left:15px;" id="clearfilter"><i class="fa fa-filter" style="height:20px;"></i> Clear Filter </span></div><div id="pages" style="width:60%;margin:-17px;float:right;margin-right:-5px;"></div>');
        $("#JQGridForSearch").jqGrid('hideCol', 'rn');
        //oJQGridFunctions.resizeJqGridWidth('JQGridForSearch', "search", $('#search').innerWidth());
        oJQGridFunctions.resizeJqGridWidth('JQGridForSearch', "search", $('#search').innerWidth());
        $('.ui-jqgrid-titlebar').hide();

    }
    function BindSearchGrid(page, searchcondition) {
        setTimeout(function () {
           
            var Result = GetResult(pagelimit, page, searchcondition);
            $("#tblOrderListGrid").jqGrid('clearGridData');

            $("#tblOrderListGrid").jqGrid('setGridParam', { datatype: 'local', data: Result });
            $("#tblOrderListGrid").jqGrid('setGridParam',
            {
                onSortCol: function (index, columnIndex, sortOrder) {
                    var columModel = $(this).jqGrid("getGridParam", "colModel");
                    sortorder = (columModel[columnIndex].name + ' ' + sortOrder);
                    BindSearchGrid(page, searchcondition);
                },
                loadComplete: function () {
                    $(".ui-jqgrid-titlebar").hide();

                    SetBackgroundColor();
                    if (access_level == 1 || access_level == 4)
                        $('#tblOrderListGrid').showCol('full_name');
                    if (access_level == 1 || access_level == 2) {
                        $('#tblOrderListGrid').showCol('delete');
                    }
                    if (access_level == 2) {
                        $('#tblOrderListGrid').showCol('pht_name');
                        var Condition = "where delete_status=0 and client_ref_id=" + EmpId + "";
                        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: UserSession });
                        var Result = oAPICall.SelectData(strJsonDatas, "SelectBtsSubClient");
                        if (Result != "" && Result != null) {
                            if (Result.length >= 2) {
                                $('#tblOrderListGrid').showCol('sub_client');

                            }
                        }

                    }
                    if (access_level == 4) {
                        $('#tblOrderListGrid').showCol('sub_client');
                    }

                    OrderSelectionGrid();
                },
            });
            $("#tblOrderListGrid").trigger("reloadGrid");
            //resizeModelDialog($('#search').height());
            // 
            loader(0);
        }, 1);
    }


    function BindPager(searchCondition) {
        var Result = GetRecCount(searchCondition);
        var pageCount = parseInt(parseInt(Result[0].CNT) / parseInt(pagelimit));
        var remainder = (parseFloat(Result[0].CNT) % parseFloat(pagelimit));
        pageCount = pageCount + (remainder > 0 ? 1 : 0);
        $('#pages').html('');
        $('#pages').bs_pagination({
            currentPage: 1,
            totalPages: pageCount,
            totalRows: parseInt(Result[0].CNT),
            onChangePage: function (event, data) {
                if (IsMultiSelect) {
                    for (var i = 0; i < multiSelectData.length; i++) {
                        if (multiSelectData[i].PageId == prevPage) {
                            multiSelectData.splice(i, 1);
                            break;
                        }
                    }
                    var selRows = $("#tblOrderListGrid").getGridParam('selarrrow');
                    var RowIds = [];
                    var rowData = [];
                    for (var i = 0; i < selRows.length; i++) {
                        RowIds.push(selRows[i]);
                        rowData[i] = $("#tblOrderListGrid").jqGrid('getRowData', selRows[i]);
                    }
                    multiSelectData.push({ PageId: prevPage, SelRows: RowIds, RowData: rowData });
                }
                BindSearchGrid(data.currentPage, searchCondition);
                if (IsMultiSelect) {
                    for (var i = 0; i < multiSelectData.length; i++) {
                        if (multiSelectData[i].PageId == data.currentPage) {
                            for (var j = 0; j < multiSelectData[i].SelRows.length; j++) {
                                jQuery("#tblOrderListGrid").setSelection(multiSelectData[i].SelRows[j], true);
                            }
                            break;
                        }
                    }
                    prevPage = data.currentPage;
                }
            }
        });
        $('.row-space').eq(0).remove();
        $('.col-xs-6').eq(0).remove();
    }
    function GridSearch() {
        var gridSearchCondition = '';
        $('.ui-search-input input').each(function () {
            if ($(this).val() != '') {
                if (gridSearchCondition == '') {
                    gridSearchCondition = $(this).prop('name') + " like '%" + $(this).val() + "%'";
                }
                else {
                    gridSearchCondition += ' and  ' + $(this).prop('name') + " like '%" + $(this).val() + "%'";
                }
            }
        });
        return gridSearchCondition;
    }
    function resizeModelDialog(height) {
        try {
           $('.modal-dialog').css('margin-top', '-15px');
            $('#modal-dialog-frame').css('min-height', '0px');
        }
        catch (err) {

        }
    }
    //callback function to bring a hidden box back
    function callback() {
        setTimeout(function () {
            $("#effect:visible").removeAttr("style").fadeOut();
        }, 1000);
    }
    //advanced search options
    function advancedsearch() {
        var fieldnames = '', conditions = [], separators = [];
        var mymodel = $("#tblOrderListGrid").getGridParam('colModel');
        var columnNames = $("#tblOrderListGrid").jqGrid('getGridParam', 'colNames');
        fieldnames = '-1:Select a field to search;'
        $.each(mymodel, function (i) {
            var isSearchable = this.search || false;
            var isHidden = this.hidden;
            if (isSearchable == true) {
                if(isHidden!=true)
                fieldnames += (this.index + ':' + columnNames[i] + ';');
            }
        });
        fieldnames = fieldnames.substr(0, fieldnames.length - 1);
        conditions.push('Equals'); conditions.push('Contains'); conditions.push('Starts With');
        conditions.push('Ends With');
        separators.push('AND'); separators.push('OR');
        var colNames = ['Field Name', 'Condition', 'Value', '', ''];
        var colModels =
        [
          { name: 'field', index: 'field', width: 200, sorttype: "string", search: false, editable: true, cellEdit: true, edittype: 'select', formatter: 'select', editoptions: { value: fieldnames } },
          { name: 'condition', index: 'condition', width: 150, sorttype: "string", search: false, editable: true, cellEdit: true, edittype: 'select', formatter: 'select', editoptions: { value: conditions } },
          { name: 'value', index: 'value', width: 150, sorttype: "string", search: false, editable: true },
          { name: 'splitter', index: 'splitter', width: 150, sorttype: "string", search: false, editable: true, cellEdit: true, edittype: 'select', formatter: 'select', editoptions: { value: separators } },
          { name: 'delete', index: 'delete', width: 50, sorttype: "string", search: false, editable: false, formatter: deleteformatter }
        ];
        var oJQGridFunctions = new JQGridFunctions();
        oJQGridFunctions.CreateJQGridWithPagingOption(colNames, colModels, "#JQGridForAdvancedSearch", 'Emp Grade Popup', "#JQGridForAdvancedSearchFooter", 'grade_id', pagelimit, 950, false);
        var grid = $("#JQGridForAdvancedSearch");
        grid[0].clearToolbar();
        //$("#JQGridForAdvancedSearch").jqGrid('hideCol', 'rn');
        oJQGridFunctions.resizeJqGridWidth('JQGridForAdvancedSearch', "search", $('#search').innerWidth());
        $('.ui-jqgrid-titlebar').hide();
        $('#JQGridForAdvancedSearchFooter').html('<div style="float: left;margin:10px;width:50%"><i class="fa fa-plus text-md" style="cursor:pointer"></i></div><div style="float: right;margin:6px;width:13%"> <input type="button" id="btnSearchfl" value="Submit" class="btn btn-default" style="margin-right:5px;"/><input type="button" id="btnCancel" value="Cancel" class="btn btn-default" /></div>');
        $("#JQGridForAdvancedSearch").jqGrid('setGridParam',
        {
            //onSelectRow: function (rowid, e) {
            //    $('#' + rowid).parents('table').resetSelection();
            //},
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                if (iCol == 5) {
                    var ids = $("#JQGridForAdvancedSearch").jqGrid('getDataIDs');
                    if (ids.length > 1) {
                        $("#JQGridForAdvancedSearch").jqGrid('delRowData', rowid);
                        resizeModelDialog($('#advancesearch').height());
                    }
                    else {
                        msgalert('Warning', 'Minimum one condition required', 2);
                    }
                }
            }
        });

        //jQuery("#JQGridForAdvancedSearch").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });


        $("#JQGridForAdvancedSearch").jqGrid('addRow', "new");
        addStylestoSearchBoxes();
    }
    function deleteformatter(cellvalue, options, rowObject) {
        return '<div style="width:20px;margin:0 auto"><i class="fa fa-trash-o text-md" style="cursor:pointer"></i></div>';
    }
    function generateadvancedsearchquery() {
        var advancedsearchcondition = '', missingvaluecount = 0;
        var ids = $("#JQGridForAdvancedSearch").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            if ($('#' + ids[i] + '_value').val().length > 0) {
                advancedsearchcondition += $('#' + ids[i] + '_field').val() + (getoperator($('#' + ids[i] + '_condition option:selected').text())).replace('@', $('#' + ids[i] + '_value').val());
                if (i < ids.length - 1) {
                    advancedsearchcondition += ' ' + $('#' + ids[i] + '_splitter option:selected').text() + ' ';
                }
                $('#' + ids[i] + '_value').css('border', '1px solid #aaaaaa');
            }
            else {
                missingvaluecount++;
                $('#' + ids[i] + '_value').css('border', '1px solid red');
            }
            if ($('#' + ids[i] + '_field').val() == -1) {
                missingvaluecount++;
                $('#' + ids[i] + '_field').css('border', '1px solid red');
            }

        }
        if (missingvaluecount > 0) {
            msgalert('Warning', 'Some values are missing. Please fill them to continue', 3);
        }
        return advancedsearchcondition;
    }
    function getoperator(condition) {
        switch (condition) {
            case 'Equals':
                condition = "='@'";
                break;
            case 'Contains':
                condition = "  like '%@%'";
                break;
            case 'Starts With':
                condition = "  like '@%'";
                break;
            case 'Ends With':
                condition = "  like '%@'";
                break;
        }
        return condition;
    }
    function addStylestoSearchBoxes() {
        $('.jqgrid-new-row select').each(function () {
            //$(this).addClass('form-control');
            if ($(this).attr('id').indexOf('field') >= 0) {
                $(this).addClass('field');
            }
        });
        $('.jqgrid-new-row input').each(function () { $(this).addClass('form-control'); });
        $('.field').change(function () {
            var ids = $("#JQGridForAdvancedSearch").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                if ($(this).attr('id').indexOf(ids[i]) < 0) {
                    if ($('#' + ids[i] + '_field').val() == $(this).val()) {
                        $(this).val('-1');
                        msgalert('Error', 'Duplicate search condition. Please select a different one', 3);
                        return;
                    }
                }
            }
            if ($(this).val() != '-1') {
                $(this).css('border', '1px solid #aaaaaa');
            }
        });
    }
    function hideAdvanceSearch() {
        $('#advancesearch').hide();
        $("#JQGridForAdvancedSearch").jqGrid('clearGridData');
        $("#JQGridForAdvancedSearch").jqGrid('addRow', "new");
        $('#search').show('slide', { direction: "right" }, 500, callback);
        resizeModelDialog($('#search').height());
        $("[name='forhide']").removeClass("hide");
    }
}
