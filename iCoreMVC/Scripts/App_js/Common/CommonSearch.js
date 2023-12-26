function CommonSearch(){


    var cmbFieldName;
    var cmbFieldCondition;
    var txtValue;
    var DateValue1;
    var DateValue2;
    var SelectValue1;
    var SelectURL = "";
   
    this.AddValuesToSearchCondition = function (value, text) {
        cmbFieldCondition.append('<option value=' + value + ' >' + text + '</option>');
    }
    
    this.OnSelectionChangeSearchField = function () {

        var SelectedItem = cmbFieldName.val();
        var FindIndex = SelectedItem.indexOf(",");
        if (FindIndex < 0) {
            return;
        }
        var FieldName = SelectedItem.substring(0, FindIndex);
        var FieldType = SelectedItem.substring(FindIndex + 1, SelectedItem.length);

        cmbFieldCondition.empty();

        
        if (FieldType == "string") {

            this.AddValuesToSearchCondition('1', 'Starts With');
            this.AddValuesToSearchCondition('2', 'Equals to');
            this.AddValuesToSearchCondition('3', 'Ends With');
            this.AddValuesToSearchCondition('4', 'Contains');

        }
        else if (FieldType == "number") {

            this.AddValuesToSearchCondition('5', 'Less Than');
            this.AddValuesToSearchCondition('6', 'Greater Than');
            this.AddValuesToSearchCondition('7', 'Equals to');
            this.AddValuesToSearchCondition('8', 'Not Equal to');

        }
        else if (FieldType == "date") {

            this.AddValuesToSearchCondition('9', 'Less Than');
            this.AddValuesToSearchCondition('10', 'Greater Than');
            this.AddValuesToSearchCondition('11', 'Equals to');
            this.AddValuesToSearchCondition('12', 'Between');
        }
        else if (FieldType == 'select') {
            this.AddValuesToSearchCondition('13', 'Equals to');

        }

        this.OnSelectionChangeCondition();
    }

    this.OnSelectionChangeCondition = function () {
        try {
            var SelectedItem = cmbFieldName.val();
            var FindIndex = SelectedItem.indexOf(",");
            if (FindIndex < 0) {
                return;
            }
            var FieldName = SelectedItem.substring(0, FindIndex);
            var FieldType = SelectedItem.substring(FindIndex + 1, SelectedItem.length);
            if (FieldType == "select") {

                txtValue.hide();
                DateValue2.hide();
                DateValue1.hide();
                SelectValue1.show();

                var SelectedCondition = cmbFieldCondition.val();
                if (SelectedCondition == '13') {

                    try {

                        FillSelectValues(FieldName, SelectValue1);
                    }
                    catch (ex) {
                    }

                }
            }

            else if (FieldType == "date") {

                txtValue.hide();
                SelectValue1.hide();

                var SelectedCondition = cmbFieldCondition.val();
                if (SelectedCondition == '12') {

                    DateValue2.show();
                    DateValue1.show();

                }
                else {
                    DateValue1.show();
                    DateValue2.hide();
                }




                if (SelectedDateFormat != null) {

                    DateValue1.datepicker({
                      //  dateFormat: SelectedDateFormat,
                        changeMonth: true,
                        changeYear: true
                    });


                    DateValue2.datepicker({
                       // dateFormat: SelectedDateFormat,
                        changeMonth: true,
                        changeYear: true
                    });
                }
                else {


                    DateValue1.datepicker({
                        changeMonth: true,
                        changeYear: true
                    });


                    DateValue2.datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                }

                SetDateInDatePicker(new Date(), DateValue1);
                SetDateInDatePicker(new Date(), DateValue2);

            }
            else {

                txtValue.show();
                SelectValue1.hide();
                DateValue1.hide();
                DateValue2.hide();

            }
        }


        catch (exception) {


        }

    }

    this.ClearSearchCondition = function ()
    {
        cmbFieldName.attr('selectedIndex', 0);
       this.OnSelectionChangeSearchField();      

            txtValue.val(null);
        
    }

    this.InitSearch = function (cmbFieldNametmp, cmbFieldConditiontmp, txtValuetmp, DateValue1tmp, DateValue2tmp, SelectValue1tmp, columNames, colModel) {
        try {

            cmbFieldName = cmbFieldNametmp;
            cmbFieldCondition = cmbFieldConditiontmp;
            txtValue = txtValuetmp;
            DateValue1 = DateValue1tmp;
            DateValue2 = DateValue2tmp;
            SelectValue1 = SelectValue1tmp;


            var optionsList = '';
            for (i = 0; i < colModel.length; i++) {
                cmi = colModel[i];
                cmn = columNames[i];


                if (cmn == null || cmn == '')
                    continue;

                if (cmi.hidden == true && cmi.edittype != 'select')
                    continue;
                if (cmi.search != true)
                    continue;
                var FieldType = null;
                var value = null;
                if (cmi.edittype == 'select') {
                    FieldType = cmi.edittype;
                }
                else if (cmi.search == true) {
                    FieldType = cmi.sorttype;
                }

                if (FieldType == "int")
                    FieldType = "number";
                if (FieldType == '' || FieldType == null)
                    FieldType = "string";

                value = cmi.name + ',' + FieldType;
                cmbFieldName.append('<option value=' + value + ' >' + cmn + '</option>');
            }

            if (SelectedDateFormat != null) {

                DateValue1.datepicker({
                    dateFormat: SelectedDateFormat,
                    changeMonth: true,
                    changeYear: true
                });


                DateValue2.datepicker({
                    dateFormat: SelectedDateFormat,
                    changeMonth: true,
                    changeYear: true
                });
            }
            else {
               

            DateValue1.datepicker({
                changeMonth: true,
                changeYear: true
            });


                DateValue2.datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            }
            DateValue1.hide();
            DateValue2.hide();
            this.OnSelectionChangeSearchField();
        }


        catch (exception) {


        }

    }

    this.InitReport = function (cmbFieldNametmp, cmbFieldConditiontmp, txtValuetmp, DateValue1tmp, DateValue2tmp, SelectValue1tmp) {
        
        cmbFieldName = cmbFieldNametmp;
        cmbFieldCondition = cmbFieldConditiontmp;
        txtValue = txtValuetmp;
        DateValue1 = DateValue1tmp;
        DateValue2 = DateValue2tmp;
        SelectValue1 = SelectValue1tmp;


        if (SelectedDateFormat != null) {

            DateValue1.datepicker({
                dateFormat: SelectedDateFormat,
                changeMonth: true,
                changeYear: true
            });


            DateValue2.datepicker({
                dateFormat: SelectedDateFormat,
                changeMonth: true,
                changeYear: true
            });
        }
        else {


            DateValue1.datepicker({
                changeMonth: true,
                changeYear: true
            });


            DateValue2.datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
        DateValue1.hide();
        DateValue2.hide();
        this.OnSelectionChangeSearchField();

    }

    this.GetSearchCondition = function () {
       
        var strFieldCondition = null;
        var SelectedItem = cmbFieldName.val();
        var FindIndex = SelectedItem.indexOf(",");
        if (FindIndex < 0)
            return strFieldCondition;
        var strFieldName = SelectedItem.substring(0, FindIndex);

        var SearchValue = txtValue.val();
        var txtDateValue1 = DateValue1.val();
        var txtDateValue2 = DateValue2.val();
        var txtSelectValue1 = SelectValue1.val();



        if (strFieldName != null) {
            switch (cmbFieldCondition.val()) {
                //String      
                case '2': //Equals to:
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' = \'' + SearchValue + '\'';
                    break;
                case '1': //Starts With
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' LIKE \'' + SearchValue + '%\'';
                    break;
                case '3': //Ends With
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' LIKE \'%' + SearchValue + '\'';
                    break;
                case '4': //Contains
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' LIKE \'%' + SearchValue + '%\'';
                    break;
                //Date                  
                case '9': //Less Than
                    if (txtDateValue1 != null && txtDateValue1 != '')
                        strFieldCondition = ' cast(((CONVERT(varchar(50),' + strFieldName + ', 101)) ) as datetime)  < cast(((CONVERT(varchar(50),\'' + txtDateValue1 + '\', 101)) ) as datetime)';
                    break;
                case '10': //Greater Than
                    if (txtDateValue1 != null && txtDateValue1 != '')
                        strFieldCondition = ' cast(((CONVERT(varchar(50),' + strFieldName + ', 101)) ) as datetime)  > cast(((CONVERT(varchar(50),\'' + txtDateValue1 + '\', 101)) ) as datetime)';
                    break;
                case '11': //Equals to
                    if (txtDateValue1 != null && txtDateValue1 != '')
                        strFieldCondition = ' cast(((CONVERT(varchar(50),' + strFieldName + ', 101)) ) as datetime) = cast(((CONVERT(varchar(50),\'' + txtDateValue1 + '\', 101)) ) as datetime)';
                    break;
                case '12': //Between
                    if (txtDateValue1 != null && txtDateValue1 != '' && txtDateValue2 != null && txtDateValue2 != '')
                        strFieldCondition = 'DATEDIFF(day,CONVERT(nvarchar(30),' + strFieldName + ', 101),CONVERT(nvarchar(30), \'' + txtDateValue1 + '\', 101) ) < 0 AND ' +
                    ' DATEDIFF(day,CONVERT(nvarchar(30),' + strFieldName + ', 101),CONVERT(nvarchar(30), \'' + txtDateValue2 + '\', 101) ) > 0 ';
                    break;
                //Number        
                case '5': //Less Than
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' < ' + SearchValue;
                    break;
                case '6': //Greater Than
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' > ' + SearchValue;
                    break;
                case '7': //Equals to
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' = ' + SearchValue;
                    break;
                case '8': //Equals to
                    if (SearchValue != null && SearchValue != '')
                        strFieldCondition = strFieldName + ' <> ' + SearchValue;
                    break;
                case '13': //Equals to 
                    if (txtSelectValue1 != null && txtSelectValue1 != '')
                        strFieldCondition = strFieldName + ' = ' + txtSelectValue1;
                    break;
            }
        }
        return strFieldCondition;
    }


    this.SetDefaultSearch = function (DefFieldValue, DefCondition, ValueIn, DefValue) {

        
        
        cmbFieldName.val(DefFieldValue);
        this.OnSelectionChangeSearchField();
        cmbFieldCondition.val(DefCondition);
        if (ValueIn == 0) {

            txtValue.val(DefValue);

        }
        else if (ValueIn == 1) {

            DateValue1.datepicker('setDate', DefValue);

        }
        if (ValueIn == 2) {

            txtSelectValue1.val(DefValue);

        }
    }


    
    
}