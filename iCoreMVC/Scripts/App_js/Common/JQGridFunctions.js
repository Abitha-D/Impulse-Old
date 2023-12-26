


function JQGridFunctions() {

    var CreateJQGridWithPagingOptionSelRow = null;
    this.resizeJqGridWidth = function (grid_id, div_id, width) {
        $(window).bind('resize', function () {
            $('#' + grid_id).setGridWidth(width, true); //Back to original width
            $('#' + grid_id).setGridWidth($('#' + div_id).width(), true); //Resized to new width as per window
        }).trigger('resize');

    };



    this.CustomJqGrid = function (columNames, columModel, gridid, pager, caption, height, rowNo, hidegrid, mydata, IsSelectCheckBox) {

        if (pager == null)
            pager = gridid + 'Footer';
        jQuery(gridid).jqGrid
             (
                {
                    //url: '<%= Url.Action("SearchData") %>',
                    data: mydata,
                    colNames: columNames,
                    colModel: columModel,
                    caption: caption,
                    pager: pager,
                    //page: 1,
                    //loadonce: true,
                    viewrecords: true,
                    datatype: "local",
                    height: height,
                    autowidth: true,
                    shrinkToFit: true,
                    multiselect: IsSelectCheckBox,
                    //rownumbers: true,
                    //rowTotal: 10,
                    rowNum: rowNo,
                    rowList: [10, 30, 50, 150],
                    hidegrid: hidegrid,
                    ignoreCase: true,
                    editable: true,
                    cellEdit: true,
                    editurl: 'clientArray',
                    onSelectRow: function (rowid) {

                        try {


                            FireRowSelect(GridID, rowid);
                        }
                        catch (ex) {
                        }

                    },


                    ondblClickRow: function (rowid) {

                        try {


                            DBClickJQGrid(GridID, rowid);
                        }
                        catch (ex) {
                        }
                    }


                }

            );

        jQuery(gridid).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn", autosearch: true });
        $(gridid).jqGrid('navGrid', pager,
                   { edit: false, add: false, del: false, search: true },
                   { height: 200, reloadAfterSubmit: true }
           );
        $(gridid).jqGrid('setGridParam', { datatype: 'local' }).trigger('reloadGrid');
    }
    this.CreateJQGridWithPagingDynamicFilter = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, IsSelectCheckBox) {

        if (PagerID == null)

            PagerID = GridID + 'Footer';

        jQuery(GridID).jqGrid
             (
                {
                    url: '<%= Url.Action("SearchData") %>',
                    rownumbers: true,
                    height: 'auto',
                    rowNum: InitialRowCount,
                    rowTotal: 10,
                    //rowList: [5, 10, 20, 25, 30, 50, 100],
                    loadonce: true,
                    mtype: "GET",
                    gridview: true,
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    rowNum: 10,
                    width: 700,

                    rowList: [10, 20, 30],
                    sortname: 'LM_LOCATION_NAME',
                    viewrecords: true,
                    sortorder: "desc",
                    jsonReader: {
                        repeatitems: false
                    },
                    caption: "Complex search",
                    height: '100%'

                    /*                    ignoreCase: true,
                    sortorder: "desc",
                    multiselect: IsSelectCheckBox,
                    loadtext: 'Loading...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,
                    hiddengrid: 0,
                    hidegrid: true,
                    //data: dataArray.result,
                    onSelectRow: function (rowid) {
                    try {

                    FireRowSelect(GridID, rowid);

                    }
                    catch (ex) {
                    }
                    },
                    ondblClickRow: function (rowid) {

                    try {

                    DBClickJQGrid(GridID, rowid);

                    }
                    catch (ex) {
                    }
                    }

                    */
                }
            );

        var grid = $(GridID);

        jQuery(GridID).jqGrid('filterToolbar', { stringResult: true, enableClear: false, searchOnEnter: true });

        grid.jqGrid('navGrid', PagerID,
            { edit: true, add: true, del: true },
            {},
            {},
            {},
            { multipleSearch: true, multipleGroup: true }
            );

        /*var prmSearch = { multipleSearch: true, overlay: false };

        grid.jqGrid('navGrid', PagerID,
        {
        add: false,
        edit: false,
        del: false,
        search: true,
        searchtext: "Search",
        refresh: true
        },
        {},
        {},
        { closeOnEscape: true }, prmSearch);
        */
    }

    this.CreateJQGridWithPagingOption = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, IsSelectCheckBox, Is_Hidden) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        jQuery(GridID).jqGrid
             (
                {

                    rownumbers: true,
                    height: 'auto',
                    rowNum: InitialRowCount,
                    rowTotal: 10,
                    rowList: [5, 10, 20, 25, 30, 50, 100],
                    loadonce: true,
                    mtype: "GET",
                    gridview: true,
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    ignoreCase: true,
                    sortorder: "desc",
                    multiselect: IsSelectCheckBox,
                    loadtext: 'Loading ...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,
                    hiddengrid: Is_Hidden,
                    hidegrid: true,


                    onSelectRow: function (rowid) {

                        try {


                            FireRowSelect(GridID, rowid);
                        }
                        catch (ex) {
                        }

                    },


                    ondblClickRow: function (rowid) {

                        try {


                            DBClickJQGrid(GridID, rowid);
                        }
                        catch (ex) {
                        }
                    }
                }

            );

        var grid = $(GridID);
        jQuery(GridID).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
        var prmSearch = { multipleSearch: true, overlay: false };
        grid.jqGrid('navGrid', PagerID, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);
    }

    this.CreateJQGridTimeSheet = function (columNames, columModel, ContainerTableID, GridCaption, PagerID, GridHeight, GridWidth, varFooter) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        var grid = $(ContainerTableID);
        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            autoencode: true,
            ignoreCase: true,
            autowidth: false,
            sortname: 'ID',
            viewrecords: false,
            sortorder: 'desc',
            loadtext: 'Loading ...',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            width: 1200,
            shrinkToFit: false,
            editurl: '',
            cellsubmit: 'clientArray',
            multiselect: false,
            cellEdit: true,
            footerrow: true,
            userDataOnFooter: true,
            loadComplete: function () {
                var $this = $(this),

              $footerRow = $(this.grid.sDiv).find("tr.footrow"),
              localData = $this.jqGrid("getGridParam", "data"),
              totalRows = localData.length,
              columnNames = $("#TimesheetDet")[0].p.colNames,
              columlength = columNames.length,

              totalSum = 0,

              $newFooterRow,
              $newFooterRow1,
              i;
                $newFooterRow = $(this.grid.sDiv).find("tr.myfootrow");
                if ($newFooterRow.length === 0) {
                    // add second row of the footer if it's not exist
                    $newFooterRow = $footerRow.clone();
                    $newFooterRow1 = $footerRow.clone();
                    $newFooterRow.removeClass("footrow")
                .addClass("myfootrow ui-widget-content");
                    $newFooterRow1.removeClass("footrow")
                .addClass("myfootrow ui-widget-content");
                    $newFooterRow.children("td").each(function () {
                        this.style.width = ""; // remove width from inline CSS
                    });
                    $newFooterRow1.children("td").each(function () {
                        this.style.width = ""; // remove width from inline CSS
                    });
                    $newFooterRow.insertAfter($footerRow);
                    $newFooterRow1.insertAfter($newFooterRow);

                }
                //  $this.jqGrid("footerData", "set", { Assignments: "Total Hours:" });
                $footerRow.find(">td[aria-describedby=" + this.id + "_Assignments]")
        .text("Total Hours:");
                //  $('.ui-jqgrid-ftable tr').eq(0).find('Assignments').eq(i).text("Total Hours:");
                for (i = 3; i < columlength; i++) {
                    var ClmModel = $("#TimesheetDet").jqGrid('getGridParam', 'colModel');
                    ClmModel = ClmModel[i].name;
                    var colN = columnNames[i].split(' ')[0];
                    if (colN == 'Sun' || colN == 'Sat') {

                    }
                    else {
                        totalSum = 8;

                        $newFooterRow.find(">td[aria-describedby=" + this.id + "_" + ClmModel + "]")
        .text(totalSum);
                    }
                }

                $newFooterRow.find(">td[aria-describedby=" + this.id + "_Assignments]")
        .text("Work Schedule:");

                $newFooterRow1.find(">td[aria-describedby=" + this.id + "_Assignments]")
        .text("Daily Overtime:");
            },

            afterEditCell: function (rowid, cellname, value, iRow, iCol) {
                $('[id$=hdnRow_ID]').val(rowid);
                $('[id$=hdnColumn_ID]').val(iCol);
                var totalSum = 0;
                if (iCol == 1) {

                }
                else {
                    var ch_assgnmnt = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, 'Assignments'));
                    if (isNaN(ch_assgnmnt)) {
                        alert("Please select an Assignment");
                        //                        jQuery("#TimesheetDet").jqGrid('setCell', rowid, iCol, 0);
                        return;
                    }
                }
                var value1 = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, iCol));
                if (isNaN(value)) {
                    alert("Please enter a valid number");
                }
                var sum = jQuery("#TimesheetDet").jqGrid("getCol", "iCol", false, "sum");
                jQuery("#TimesheetDet").jqGrid("footerData", "set", { cellname: sum, '': '' });

                //               var cell_val = $('#TimesheetDet').eq(iRow).find('td[class= "edit-cell"]').eq(iCol).val();

            },

            //            beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {
            //                var chk_notNaN = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, iCol));
            //                if (isNaN(chk_notNaN)) {
            //                    jQuery("#TimesheetDet").jqGrid('setCell', rowid, iCol, 0);
            //                    return 0;
            //                }
            //            },

            afterSaveCell: function (rowid, cellname, value, iRow, iCol) {
                var totalSum = 0;
                if (iRow == rowid) {
                }
                else {
                    total2 = 0;
                }
                var row_id = iRow;
                var clmName = "''" + cellname + "''";
                var $this = $(this);
                var value2 = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, iCol));
                if (isNaN(value2)) {
                    jQuery("#TimesheetDet").jqGrid('setCell', rowid, iCol, 0);
                }
                var rounded = Math.round(value2 * 10) / 10;
                $("#TimesheetDet").jqGrid('setCell', rowid, iCol, rounded);
                var sum = $this.jqGrid("getCol", cellname, false, "sum");

                var obj = '[{"' + cellname + '": "' + parseFloat(sum) + '"}]';

                var colFoot = JSON.parse(obj);
                $this.jqGrid("footerData", "set", colFoot[0]);
                var test_NaN_val = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, iCol));
                if (isNaN(test_NaN_val)) {
                    $("#TimesheetDet").jqGrid('setCell', rowid, iCol, 0);
                }

                //                value2 = 0;
                //                if (iCol == 1) {
                //                    value2 = 0;
                //                }
                //                else {
                //                    value2 = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, iCol));
                //                    var total_frmgid = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, 'Total'));
                //                    if (isNaN(total_frmgid)) {
                //                        total_frmgid = 0;
                //                    }

                //                    var tot = value2 + total_frmgid;
                //                }

                //                $("#TimesheetDet").jqGrid('setCell', rowid, 'Total', tot);
                var columnNames = $("#TimesheetDet")[0].p.colNames;
                var columlength = columNames.length;
                var tot = 0;
                for (var i = 3; i < columlength; i++) {
                    value = parseFloat(jQuery("#TimesheetDet").jqGrid('getCell', rowid, i));
                    if (isNaN(value)) {
                        value = 0;
                    }
                    tot = tot + value;
                }
                $("#TimesheetDet").jqGrid('setCell', rowid, 'Total', tot);
            }


        }).jqGrid('navGrid', varFooter,
					{ add: false, edit: false, del: false, search: false, refresh: false });
        grid.setGridWidth(GridWidth + 'px');

    }


    this.CreateJQGridPayroll = function (columNames, columModel, ContainerTableID, GridCaption, PagerID, GridHeight, GridWidth, IsSelectCheckBox, varFooter) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        var grid = $(ContainerTableID);
        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            autoencode: true,
            ignoreCase: true,
            autowidth: false,
            sortname: 'ID',
            viewrecords: false,
            sortorder: 'desc',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            width: GridWidth,
            shrinkToFit: false,
            editurl: '',
            cellsubmit: 'clientArray',
            multiselect: IsSelectCheckBox,
            cellEdit: true,
            footerrow: true,
            userDataOnFooter: true,
            loadComplete: function () {
                var $this = $(this),

              $footerRow = $(this.grid.sDiv).find("tr.footrow"),
              localData = $this.jqGrid("getGridParam", "data"),
              totalRows = localData.length,
              columnNames = $("#tblPayrollDet")[0].p.colNames,
              columlength = columNames.length,

              totalSum = 0,

              $newFooterRow,

              i;
                $newFooterRow = $(this.grid.sDiv).find("tr.myfootrow");

                //  $this.jqGrid("footerData", "set", { Assignments: "Total Hours:" });
                $footerRow.find(">td[aria-describedby=" + this.id + "_emp_name]")
        .text("Total No Of Employees:");
                //  $('.ui-jqgrid-ftable tr').eq(0).find('Assignments').eq(i).text("Total Hours:");


            }

        }).jqGrid('navGrid', varFooter,
					{ add: false, edit: false, del: false, search: false, refresh: false });
        grid.setGridWidth(GridWidth + 'px');

    }


    this.CreateJQGridHRInvoice = function (columNames, columModel, ContainerTableID, GridCaption, PagerID, GridHeight, GridWidth, varFooter) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        var grid = $(ContainerTableID);
        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            autoencode: true,
            ignoreCase: true,
            autowidth: false,
            sortname: 'ID',
            viewrecords: false,
            sortorder: 'desc',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            width: GridWidth,
            shrinkToFit: false,
            editurl: '',
            cellsubmit: 'clientArray',
            multiselect: false,
            cellEdit: true,
            footerrow: true,
            userDataOnFooter: true,
            loadComplete: function () {
                var $this = $(this),

              $footerRow = $(this.grid.sDiv).find("tr.footrow"),
              localData = $this.jqGrid("getGridParam", "data"),
              totalRows = localData.length,
              columnNames = $("#tblInvoiceDet")[0].p.colNames,
              columlength = columNames.length,

              totalSum = 0,

              $newFooterRow,

              i;
                $newFooterRow = $(this.grid.sDiv).find("tr.myfootrow");

                //  $this.jqGrid("footerData", "set", { Assignments: "Total Hours:" });
                $footerRow.find(">td[aria-describedby=" + this.id + "_emp_name_inv]")
        .text("Total No Of Employees:");
                //  $('.ui-jqgrid-ftable tr').eq(0).find('Assignments').eq(i).text("Total Hours:");


            }

        }).jqGrid('navGrid', varFooter,
					{ add: false, edit: false, del: false, search: false, refresh: false });
        grid.setGridWidth(GridWidth + 'px');

    }


    this.CreateJQGridWithPagingOptionAndFixedHeightCustomCellCSS = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, Height, IsSelectCheckBox) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';



        jQuery(GridID).jqGrid
             (
                {
                    rownumbers: true,
                    height: Height,
                    rowNum: InitialRowCount,
                    gridview: true,
                    rowattr: function (rd) {
                        if (rd.Is_Enabled !== rd.Is_Enabled_Act) {
                            return { "class": "changedRowClass" };
                        }
                    },
                    pgbuttons: false,
                    pgtext: '',
                    loadonce: true,
                    rowList: false,
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    ignoreCase: true,
                    sortorder: "desc",
                    multiselect: IsSelectCheckBox,
                    multiboxonly: true,
                    loadtext: 'Loading ...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,


                    onSelectRow: function (rowid) {

                        try {


                            FireRowSelect(GridID, rowid);
                        }
                        catch (ex) {
                        }

                    },


                    ondblClickRow: function (rowid) {

                        try {


                            DBClickJQGrid(GridID, rowid);
                        }
                        catch (ex) {
                        }
                    }
                }

            );

        var grid = $(GridID);
        jQuery(GridID).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
        var prmSearch = { multipleSearch: true, overlay: false };
        grid.jqGrid('navGrid', PagerID, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);
    }


    this.CreateJQGridWithPagingOptionAndFixedHeight = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, Height, IsSelectCheckBox, Is_Hidden) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        jQuery(GridID).jqGrid
             (
                {

                    rownumbers: true,
                    height: Height,
                    rowNum: InitialRowCount,
                    rowTotal: 10,
                    rowList: [10, 20, 30, 40, 50, 100],
                    loadonce: true,
                    mtype: "GET",
                    gridview: true,
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    ignoreCase: true,
                    sortorder: "desc",
                    multiselect: IsSelectCheckBox,
                    loadtext: 'Loading ...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,
                    hiddengrid: Is_Hidden,
                    hidegrid: true,


                    onSelectRow: function (rowid) {

                        try {


                            FireRowSelect(GridID, rowid);
                        }
                        catch (ex) {
                        }

                    },


                    ondblClickRow: function (rowid) {

                        try {


                            DBClickJQGrid(GridID, rowid);
                        }
                        catch (ex) {
                        }
                    }
                }

            );

        var grid = $(GridID);
        jQuery(GridID).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
        var prmSearch = { multipleSearch: true, overlay: false };
        grid.jqGrid('navGrid', PagerID, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);
    }



    this.CreateDataEntryJQGrid = function (columNames, columModel, ContainerTableID, GridCaption, JQGridBlankdata, GridHeight, varFooter) {

        if (varFooter == null)
            varFooter = ContainerTableID + 'Footer';
        var lastSel,
       InputFocusCtrl = null,
                grid = $(ContainerTableID),
                onclickSubmitLocal = function (options, postdata) {
                    var grid_p = grid[0].p,
                        idname = grid_p.prmNames.id,
                        grid_id = grid[0].id,
                        id_in_postdata = grid_id + "_id",
                        rowid = postdata[id_in_postdata],
                        addMode = rowid === "_empty",
                        oldValueOfSortColumn;

                    // postdata has row id property with another name. we fix it:
                    if (addMode) {
                        // generate new id
                        var new_id = grid_p.records + 1;
                        while ($("#" + new_id).length !== 0) {
                            new_id++;
                        }
                        postdata[idname] = String(new_id);
                    } else if (typeof (postdata[idname]) === "undefined") {
                        // set id property only if the property not exist
                        postdata[idname] = rowid;
                    }
                    delete postdata[id_in_postdata];

                    // prepare postdata for tree grid
                    if (grid_p.treeGrid === true) {
                        if (addMode) {
                            var tr_par_id = grid_p.treeGridModel === 'adjacency' ? grid_p.treeReader.parent_id_field : 'parent_id';
                            postdata[tr_par_id] = grid_p.selrow;
                        }

                        $.each(grid_p.treeReader, function (i) {
                            if (postdata.hasOwnProperty(this)) {
                                delete postdata[this];
                            }
                        });
                    }

                    // decode data if there encoded with autoencode
                    if (grid_p.autoencode) {
                        $.each(postdata, function (n, v) {
                            postdata[n] = $.jgrid.htmlDecode(v); // TODO: some columns could be skipped
                        });
                    }

                    // save old value from the sorted column
                    oldValueOfSortColumn = grid_p.sortname === "" ? undefined : grid.jqGrid('getCell', rowid, grid_p.sortname);

                    // save the data in the grid
                    if (grid_p.treeGrid === true) {
                        if (addMode) {
                            grid.jqGrid("addChildNode", rowid, grid_p.selrow, postdata);
                        } else {
                            grid.jqGrid("setTreeRow", rowid, postdata);
                        }
                    } else {
                        if (addMode) {
                            //  grid.jqGrid("addRowData", rowid, postdata, options.addedrow);
                            // jQuery(ContainerTableID).saveRow(rowid, true, 'clientArray');

                            var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                            grid.jqGrid('addRowData', lastRowInd + 1, postdata, options.addedrow);


                            var grid_id = $.jgrid.jqID(grid[0].id),
                            grid_p = grid[0].p,
                            newPage = grid[0].p.page;
                            if (grid_p.lastpage > 1) {// on the multipage grid reload the grid
                                if (grid_p.reccount === 0 && newPage === grid_p.lastpage) {
                                    // if after deliting there are no rows on the current page
                                    // which is the last page of the grid
                                    newPage--; // go to the previous page
                                }
                                // reload grid to make the row from the next page visable.
                                grid.trigger("reloadGrid", [{ page: newPage }]);

                            }



                        } else {
                            grid.jqGrid("setRowData", rowid, postdata);
                        }
                    }

                    if ((addMode && options.closeAfterAdd) || (!addMode && options.closeAfterEdit)) {
                        // close the edit/add dialog
                        $.jgrid.hideModal("#editmod" + grid_id,
                                          { gb: "#gbox_" + grid_id, jqm: options.jqModal, onClose: options.onClose });
                    }

                    if (postdata[grid_p.sortname] !== oldValueOfSortColumn) {
                        // if the data are changed in the column by which are currently sorted
                        // we need resort the grid
                        /*    setTimeout(function() {
                        grid.trigger("reloadGrid", [{current:true}]);
                        },100);*/
                    }

                    // !!! the most important step: skip ajax request to the server
                    this.processing = true;
                    return {};
                },
                editSettings = {
                    //recreateForm:true,
                    jqModal: false,
                    reloadAfterSubmit: false,
                    closeOnEscape: true,
                    savekey: [true, 13],
                    closeAfterEdit: true,
                    onclickSubmit: onclickSubmitLocal
                },
                addSettings = {
                    //recreateForm:true,
                    jqModal: false,
                    reloadAfterSubmit: false,
                    savekey: [true, 13],
                    closeOnEscape: true,
                    closeAfterAdd: true,
                    addedrow: 'last',
                    onclickSubmit: onclickSubmitLocal
                },
                delSettings = {
                    // because I use "local" data I don't want to send the changes to the server
                    // so I use "processing:true" setting and delete the row manually in onclickSubmit
                    onclickSubmit: function (options, rowid) {
                        var grid_id = $.jgrid.jqID(grid[0].id),
                            grid_p = grid[0].p,
                            newPage = grid[0].p.page;
                        try {
                            DeleteJqGridRow(rowid);
                        }
                        catch (ex) {

                        }
                        // delete the row
                        grid.delRowData(rowid);
                        $.jgrid.hideModal("#delmod" + grid_id,
                                          { gb: "#gbox_" + grid_id, jqm: options.jqModal, onClose: options.onClose });

                        if (grid_p.lastpage > 1) {// on the multipage grid reload the grid
                            if (grid_p.reccount === 0 && newPage === grid_p.lastpage) {
                                // if after deliting there are no rows on the current page
                                // which is the last page of the grid
                                newPage--; // go to the previous page
                            }
                            // reload grid to make the row from the next page visable.
                            grid.trigger("reloadGrid", [{ page: newPage }]);

                        }



                        var lastRowInd = grid.jqGrid("getGridParam", "reccount");
                        if (lastRowInd == 0)
                            grid.jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);


                        return true;
                    },
                    processing: true
                };

        /*,
        initDateEdit = function(elem) {
        setTimeout(function() {
        $(elem).datepicker({
        dateFormat: 'dd-M-yy',
        autoSize: true,
        showOn: 'button', // it dosn't work in searching dialog
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        showWeek: true
        });
        //$(elem).focus();
        },100);
        },
        initDateSearch = function(elem) {
        setTimeout(function() {
        $(elem).datepicker({
        dateFormat: 'dd-M-yy',
        autoSize: true,
        //showOn: 'button', // it dosn't work in searching dialog
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        showWeek: true
        });
        //$(elem).focus();
        },100);
        };*/

        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            autoencode: true,
            ignoreCase: true,
            autowidth: true,
            sortname: 'ID',
            viewrecords: true,
            sortorder: 'desc',
            loadtext: 'Loading ...',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            editurl: 'clientArray',
            multiselect: true,
            cellEdit: true,
            cellsubmit: 'clientArray',


            onCellSelect: function (rowid, iCol/*,cellcontent,e*/) {



                try {
                    ShowPopup(rowid, iCol, ContainerTableID);
                    var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                    if (rowid == lastRowInd) {
                        $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);


                    }


                }
                catch (ex) {

                }

            },



            afterEditCell: function (rowid, cellname, value, iRow, iCol) {


                var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                if (rowid == lastRowInd) {
                    $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

                }
                var inputControl = jQuery('#' + (iRow) + '_' + cellname);

                // Listen for enter (and shift-enter)
                inputControl.bind("keydown", function (e) {


                    switch (e.keyCode) {
                        // up arrow                                 
                        case 40:

                            break;

                            // down arrow                                 
                        case 38:

                            break;
                        case 13:
                            var increment = e.shiftKey ? -1 : 1;

                            if (increment == -1)
                                return;

                            // Do not go out of bounds
                            var lastRowInd = $(ContainerTableID).jqGrid("getGridParam", "reccount");
                            if (iRow + 1 < 1 || iRow + 1 < lastRowInd + 1) {
                                return;   // we could re-edit current cell or wrap
                            }
                            else {
                                if (iRow == lastRowInd)
                                    $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

                            }
                            //jQuery("#grid").jqGrid("editCell",iRow+increment,iCol,true);
                            break;
                        case 9: //tab


                            /*    if (lastSel++ == grid.getDataIDs().length) {
                            grid.addRowData(lastSel, {});
                            }
                            grid.jqGrid('editCell', lastSel, 1, true);
                            grid.jqGrid('editRow', lastSel, false, 'clientArray');*/
                            break;
                        case 112:
                            try {
                                //  ShowPopup(rowid, cellname, value, iRow, iCol);
                            }
                            catch (ex) {

                            }
                            break;
                    }





                })
                .bind('focusout', function (e) {


                    var className = inputControl.attr('class');

                    if (className != "hasDatepicker") {
                        var e = $.Event("keydown");
                        e.which = 13;
                        e.keyCode = 13;
                        inputControl.trigger(e);
                        inputControl.focus();
                    }
                })

                try {
                    afterEditCell(rowid, cellname, value, iRow, iCol, ContainerTableID);
                }
                catch (ex) {

                }

            },

            ondblClickRow: function (rowid, ri, ci) {
                var p = grid[0].p;
                if (p.selrow !== rowid) {
                    // prevent the row from be unselected on double-click
                    // the implementation is for "multiselect:false" which we use,
                    // but one can easy modify the code for "multiselect:true"
                    grid.jqGrid('setSelection', rowid);
                }
                if (ci == 0)
                    grid.jqGrid('editGridRow', rowid, editSettings);
            },


            onSelectRow: function (id) {
                if (id && id !== lastSel) {
                    // cancel editing of the previous selected row if it was in editing state.
                    // jqGrid hold intern savedRow array inside of jqGrid object,
                    // so it is safe to call restoreRow method with any id parameter
                    // if jqGrid not in editing state
                    if (typeof lastSel !== "undefined") {
                        grid.jqGrid('restoreRow', lastSel);
                    }
                    lastSel = id;
                }
            }
        }).jqGrid('navGrid', varFooter,
					{ add: false, edit: false, del: false, search: false, refresh: false });

        var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
        if (lastRowInd == 0) {
            $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

        }

        /*  grid.bind('focusout', function (e) {

      
        var RowData = $(ContainerTableID).getRowData(rowid);
        var rowdataString = JSON.stringify(RowData);
        var FindIndex = rowdataString.indexOf("<input");
        if (FindIndex >= 0) {
        alert('Please press enterkey to save the seleted row in the list');
        }

        });*/
    }


    this.CreateDataHistoryJQGrid = function (columNames, columModel, ContainerTableID, GridCaption, JQGridBlankdata, GridHeight, varFooter) {

        if (varFooter == null)
            varFooter = ContainerTableID + 'Footer';
        var lastSel,
       InputFocusCtrl = null,
                grid = $(ContainerTableID),
                onclickSubmitLocal = function (options, postdata) {
                    var grid_p = grid[0].p,
                        idname = grid_p.prmNames.id,
                        grid_id = grid[0].id,
                        id_in_postdata = grid_id + "_id",
                        rowid = postdata[id_in_postdata],
                        addMode = rowid === "_empty",
                        oldValueOfSortColumn;

                    // postdata has row id property with another name. we fix it:
                    if (addMode) {
                        // generate new id
                        var new_id = grid_p.records + 1;
                        while ($("#" + new_id).length !== 0) {
                            new_id++;
                        }
                        postdata[idname] = String(new_id);
                    } else if (typeof (postdata[idname]) === "undefined") {
                        // set id property only if the property not exist
                        postdata[idname] = rowid;
                    }
                    delete postdata[id_in_postdata];

                    // prepare postdata for tree grid
                    if (grid_p.treeGrid === true) {
                        if (addMode) {
                            var tr_par_id = grid_p.treeGridModel === 'adjacency' ? grid_p.treeReader.parent_id_field : 'parent_id';
                            postdata[tr_par_id] = grid_p.selrow;
                        }

                        $.each(grid_p.treeReader, function (i) {
                            if (postdata.hasOwnProperty(this)) {
                                delete postdata[this];
                            }
                        });
                    }

                    // decode data if there encoded with autoencode
                    if (grid_p.autoencode) {
                        $.each(postdata, function (n, v) {
                            postdata[n] = $.jgrid.htmlDecode(v); // TODO: some columns could be skipped
                        });
                    }

                    // save old value from the sorted column
                    oldValueOfSortColumn = grid_p.sortname === "" ? undefined : grid.jqGrid('getCell', rowid, grid_p.sortname);

                    // save the data in the grid
                    if (grid_p.treeGrid === true) {
                        if (addMode) {
                            grid.jqGrid("addChildNode", rowid, grid_p.selrow, postdata);
                        } else {
                            grid.jqGrid("setTreeRow", rowid, postdata);
                        }
                    } else {
                        if (addMode) {
                            //  grid.jqGrid("addRowData", rowid, postdata, options.addedrow);
                            // jQuery(ContainerTableID).saveRow(rowid, true, 'clientArray');

                            var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                            grid.jqGrid('addRowData', lastRowInd + 1, postdata, options.addedrow);


                            var grid_id = $.jgrid.jqID(grid[0].id),
                            grid_p = grid[0].p,
                            newPage = grid[0].p.page;
                            if (grid_p.lastpage > 1) {// on the multipage grid reload the grid
                                if (grid_p.reccount === 0 && newPage === grid_p.lastpage) {
                                    // if after deliting there are no rows on the current page
                                    // which is the last page of the grid
                                    newPage--; // go to the previous page
                                }
                                // reload grid to make the row from the next page visable.
                                grid.trigger("reloadGrid", [{ page: newPage }]);

                            }



                        } else {
                            grid.jqGrid("setRowData", rowid, postdata);
                        }
                    }

                    if ((addMode && options.closeAfterAdd) || (!addMode && options.closeAfterEdit)) {
                        // close the edit/add dialog
                        $.jgrid.hideModal("#editmod" + grid_id,
                                          { gb: "#gbox_" + grid_id, jqm: options.jqModal, onClose: options.onClose });
                    }

                    if (postdata[grid_p.sortname] !== oldValueOfSortColumn) {
                        // if the data are changed in the column by which are currently sorted
                        // we need resort the grid
                        /*    setTimeout(function() {
                        grid.trigger("reloadGrid", [{current:true}]);
                        },100);*/
                    }

                    // !!! the most important step: skip ajax request to the server
                    this.processing = true;
                    return {};
                },
                editSettings = {
                    //recreateForm:true,
                    jqModal: false,
                    reloadAfterSubmit: false,
                    closeOnEscape: true,
                    savekey: [true, 13],
                    closeAfterEdit: true,
                    onclickSubmit: onclickSubmitLocal
                },
                addSettings = {
                    //recreateForm:true,
                    jqModal: false,
                    reloadAfterSubmit: false,
                    savekey: [true, 13],
                    closeOnEscape: true,
                    closeAfterAdd: true,
                    addedrow: 'last',
                    onclickSubmit: onclickSubmitLocal
                },
                delSettings = {
                    // because I use "local" data I don't want to send the changes to the server
                    // so I use "processing:true" setting and delete the row manually in onclickSubmit
                    onclickSubmit: function (options, rowid) {
                        var grid_id = $.jgrid.jqID(grid[0].id),
                            grid_p = grid[0].p,
                            newPage = grid[0].p.page;
                        try {
                            DeleteJqGridRow(rowid);
                        }
                        catch (ex) {

                        }
                        // delete the row
                        grid.delRowData(rowid);
                        $.jgrid.hideModal("#delmod" + grid_id,
                                          { gb: "#gbox_" + grid_id, jqm: options.jqModal, onClose: options.onClose });

                        if (grid_p.lastpage > 1) {// on the multipage grid reload the grid
                            if (grid_p.reccount === 0 && newPage === grid_p.lastpage) {
                                // if after deliting there are no rows on the current page
                                // which is the last page of the grid
                                newPage--; // go to the previous page
                            }
                            // reload grid to make the row from the next page visable.
                            grid.trigger("reloadGrid", [{ page: newPage }]);

                        }



                        var lastRowInd = grid.jqGrid("getGridParam", "reccount");
                        if (lastRowInd == 0)
                            grid.jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);


                        return true;
                    },
                    processing: true
                };

        /*,
        initDateEdit = function(elem) {
        setTimeout(function() {
        $(elem).datepicker({
        dateFormat: 'dd-M-yy',
        autoSize: true,
        showOn: 'button', // it dosn't work in searching dialog
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        showWeek: true
        });
        //$(elem).focus();
        },100);
        },
        initDateSearch = function(elem) {
        setTimeout(function() {
        $(elem).datepicker({
        dateFormat: 'dd-M-yy',
        autoSize: true,
        //showOn: 'button', // it dosn't work in searching dialog
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        showWeek: true
        });
        //$(elem).focus();
        },100);
        };*/

        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            autoencode: true,
            ignoreCase: true,
            autowidth: true,
            sortname: 'ID',
            viewrecords: true,
            sortorder: 'desc',
            loadtext: 'Loading ...',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            editurl: 'clientArray',
            multiselect: false,
            cellEdit: true,
            cellsubmit: 'clientArray',


            onCellSelect: function (rowid, iCol/*,cellcontent,e*/) {



                try {
                    ShowPopup(rowid, iCol, ContainerTableID);
                    var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                    if (rowid == lastRowInd) {
                        $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);


                    }


                }
                catch (ex) {

                }

            },



            afterEditCell: function (rowid, cellname, value, iRow, iCol) {


                var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                if (rowid == lastRowInd) {
                    $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

                }
                var inputControl = jQuery('#' + (iRow) + '_' + cellname);

                // Listen for enter (and shift-enter)
                inputControl.bind("keydown", function (e) {


                    switch (e.keyCode) {
                        // up arrow                                 
                        case 40:

                            break;

                            // down arrow                                 
                        case 38:

                            break;
                        case 13:
                            var increment = e.shiftKey ? -1 : 1;

                            if (increment == -1)
                                return;

                            // Do not go out of bounds
                            var lastRowInd = $(ContainerTableID).jqGrid("getGridParam", "reccount");
                            if (iRow + 1 < 1 || iRow + 1 < lastRowInd + 1) {
                                return;   // we could re-edit current cell or wrap
                            }
                            else {
                                if (iRow == lastRowInd)
                                    $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

                            }
                            //jQuery("#grid").jqGrid("editCell",iRow+increment,iCol,true);
                            break;
                        case 9: //tab


                            /*    if (lastSel++ == grid.getDataIDs().length) {
                            grid.addRowData(lastSel, {});
                            }
                            grid.jqGrid('editCell', lastSel, 1, true);
                            grid.jqGrid('editRow', lastSel, false, 'clientArray');*/
                            break;
                        case 112:
                            try {
                                //  ShowPopup(rowid, cellname, value, iRow, iCol);
                            }
                            catch (ex) {

                            }
                            break;
                    }





                })
                .bind('focusout', function (e) {


                    var className = inputControl.attr('class');

                    if (className != "hasDatepicker") {
                        var e = $.Event("keydown");
                        e.which = 13;
                        e.keyCode = 13;
                        inputControl.trigger(e);
                        inputControl.focus();
                    }
                })

                try {
                    afterEditCell(rowid, cellname, value, iRow, iCol, ContainerTableID);
                }
                catch (ex) {

                }

            },

            ondblClickRow: function (rowid, ri, ci) {
                var p = grid[0].p;
                if (p.selrow !== rowid) {
                    // prevent the row from be unselected on double-click
                    // the implementation is for "multiselect:false" which we use,
                    // but one can easy modify the code for "multiselect:true"
                    grid.jqGrid('setSelection', rowid);
                }
                if (ci == 0)
                    grid.jqGrid('editGridRow', rowid, editSettings);
            },


            onSelectRow: function (id) {
                if (id && id !== lastSel) {
                    // cancel editing of the previous selected row if it was in editing state.
                    // jqGrid hold intern savedRow array inside of jqGrid object,
                    // so it is safe to call restoreRow method with any id parameter
                    // if jqGrid not in editing state
                    if (typeof lastSel !== "undefined") {
                        grid.jqGrid('restoreRow', lastSel);
                    }
                    lastSel = id;
                }
            }
        }).jqGrid('navGrid', varFooter,
					{ add: false, edit: false, del: false, search: false, refresh: false });

        var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
        if (lastRowInd == 0) {
            $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);

        }

        /*  grid.bind('focusout', function (e) {

      
        var RowData = $(ContainerTableID).getRowData(rowid);
        var rowdataString = JSON.stringify(RowData);
        var FindIndex = rowdataString.indexOf("<input");
        if (FindIndex >= 0) {
        alert('Please press enterkey to save the seleted row in the list');
        }

        });*/
    }





    this.CreateEditableJQGridWithPaging = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, ColHDOperation, ColHDUnIQID) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        jQuery(GridID).jqGrid
             (
                {

                    rownumbers: true,
                    height: 'auto',
                    rowNum: InitialRowCount,
                    rowList: [10, 20, 25, 30, 50, 100],
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    ignoreCase: true,
                    sortorder: "desc",
                    loadtext: 'Loading ...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,
                    cellEdit: true,
                    cellsubmit: 'clientArray',

                    afterEditCell: function (rowid, cellname, value, iRow, iCol) {


                        if (ColHDOperation != null && ColHDUnIQID != null) {
                            var UniqID = $(GridID).getCell(iRow, ColHDUnIQID);
                            if (UniqID != null && UniqID != "") {
                                $(GridID).setCell(iRow, ColHDOperation, 2); //edit or del
                            }
                            else {
                                $(GridID).setCell(iRow, ColHDOperation, 1); //Add
                            }
                            //  $(GridID).setCell(iRow, iCol, value, { background: '#ff0000' }); //edit or del
                        }



                    }
                }

            );

        var grid = $(GridID);

        var prmSearch = { multipleSearch: true, overlay: false };
        grid.jqGrid('navGrid', PagerID, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);



    }



    this.CreateEditableJQGridWithPagingAndFixedHeight = function (columNames, columModel, GridID, GridCaption, PagerID, SortBy, InitialRowCount, Width, Height, ColHDOperation, ColHDUnIQID) {

        if (PagerID == null)
            PagerID = GridID + 'Footer';
        jQuery(GridID).jqGrid
             (
                {

                    rownumbers: true,
                    height: Height,
                    rowNum: InitialRowCount,
                    rowList: [10, 20, 25, 30, 50, 100],
                    viewrecords: true,
                    sortname: SortBy,
                    datatype: 'local',
                    colNames: columNames,
                    colModel: columModel,
                    width: Width,
                    pager: jQuery(PagerID),
                    ignoreCase: true,
                    sortorder: "desc",
                    loadtext: 'Loading ...',
                    emptyrecords: 'No ' + GridCaption + ' Found',
                    caption: GridCaption,
                    cellEdit: true,
                    cellsubmit: 'clientArray',

                    afterEditCell: function (rowid, cellname, value, iRow, iCol) {


                        if (ColHDOperation != null && ColHDUnIQID != null) {
                            var UniqID = $(GridID).getCell(iRow, ColHDUnIQID);
                            if (UniqID != null && UniqID != "") {
                                $(GridID).setCell(iRow, ColHDOperation, 2); //edit or del
                            }
                            else {
                                $(GridID).setCell(iRow, ColHDOperation, 1); //Add
                            }
                            //  $(GridID).setCell(iRow, iCol, value, { background: '#ff0000' }); //edit or del
                        }



                    }
                }

            );

        var grid = $(GridID);

        var prmSearch = { multipleSearch: true, overlay: false };
        grid.jqGrid('navGrid', PagerID, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);



    }



    this.AddDataEntryJQGrid = function (columNames, columModel, ContainerTableID, GridCaption, JQGridBlankdata, GridHeight) {


        var editSettings = {
            //recreateForm:true,
            jqModal: false,
            reloadAfterSubmit: false,
            closeOnEscape: true,
            savekey: [true, 13],
            closeAfterEdit: true
        };

        varFooter = ContainerTableID + 'Footer';
        var lastSel,
        grid = $(ContainerTableID);

        grid.jqGrid({
            datatype: 'local',
            colNames: columNames,
            colModel: columModel,
            rowNum: 10,
            rowList: [5, 10, 20],
            pager: varFooter,
            gridview: true,
            rownumbers: true,
            ignoreCase: true,
            autowidth: true,
            sortname: 'ID',
            viewrecords: true,
            sortorder: 'desc',
            loadtext: 'Loading ...',
            emptyrecords: 'No ' + GridCaption + ' Found',
            caption: GridCaption,
            height: GridHeight,
            multiselect: false,
            cellEdit: true,
            cellsubmit: 'clientArray',


            onCellSelect: function (rowid, iCol/*,cellcontent,e*/) {




                var $this = $(this);
                grid.jqGrid('editGridRow', rowid, editSettings);

                try {
                    ShowPopup(rowid, iCol, ContainerTableID);
                }
                catch (ex) {

                }





            },


            afterEditCell: function (rowid, cellName, cellValue, iRow, iCol) {


                var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
                if (rowid == lastRowInd) {
                    $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);
                    grid.jqGrid('saveRow', lastRowInd + 1, false, 'clientArray');


                }


                var cellDOM = this.rows[iRow].cells[iCol], oldKeydown,
                        $cellInput = $('input, select, textarea', cellDOM),
                        events = $cellInput.data('events'),
                        $this = $(this);
                if (events && events.keydown && events.keydown.length) {
                    oldKeydown = events.keydown[0].handler;
                    $cellInput.unbind('keydown', oldKeydown);
                    $cellInput.bind('keydown', function (e) {
                        $this.jqGrid('setGridParam', { cellEdit: true });
                        oldKeydown.call(this, e);
                        $this.jqGrid('setGridParam', { cellEdit: false });
                    }).bind('focusout', function (e) {
                        //jQuery(ContainerTableID).jqGrid('saveRow', rowid, false, 'clientArray');
                        // jQuery(ContainerTableID).jqGrid('restoreRow ', rowid, false, 'clientArray');

                        //  jQuery(ContainerTableID).jqGrid('editCell', rowid, iCol, false);        
                        //  $this.jqGrid('setGridParam', { cellEdit: false });
                        //  $(cellDOM).removeClass("ui-state-highlight");
                        // jQuery(ContainerTableID).jqGrid('setSelection', null);

                        jQuery(ContainerTableID).jqGrid('saveRow', rowid, false, 'clientArray');


                        $this.jqGrid('setGridParam', { cellEdit: true });
                        //  $this.jqGrid('restoreCell', iRow, iCol, true);
                        $this.jqGrid('setGridParam', { cellEdit: false });
                        $(cellDOM).removeClass("ui-state-highlight");



                    });
                }


            }
        })

        var prmSearch = { multipleSearch: true, overlay: false };

        grid.jqGrid('navGrid', varFooter, { add: false, edit: false, del: false, search: true, refresh: true },
                        {}, {}, {}, prmSearch);

        var lastRowInd = jQuery(ContainerTableID).jqGrid("getGridParam", "reccount");
        if (lastRowInd == 0)
            $(ContainerTableID).jqGrid('addRowData', lastRowInd + 1, JQGridBlankdata);


    }



}


