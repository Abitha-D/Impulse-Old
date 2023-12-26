/// <reference path="../../TFS/globalvar.js" />
var SelectedDateFormat = 'mm/dd/yy';
//var access_level = GetQueryStringParams('AccessLevel')
//var sEmpDesgId = desig;


var inprogress = [];
var sQaInprogress = [];
retdata = parent.$('#hdnUserDetails').val();
var userConfig = new UserConfig();
userConfig.InitilizeUserConfig(retdata);
var sRoleId = access_level;

var sHdnOrderId;
function ColumnNames() {


    var columNames = ['Order ID', 'Order Date', 'Due Date', 'Completed Date', 'Order Type', 'Client Name', 'Sub Client', 'Subject Address', 'Portal', 'emp_ref_no',
        'master_account_no', 'Assignee', 'Status', 'Current Status', 'delete_status', 'Priority Parameter',
        'order_rev_no', 'Priority', 'C-Status', '', 'Get Order', 'c_Status_id', 'Is Transfer', 'ord_revision_flag', '', '', '', 'is_qa_submit',
        '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ];

    switch (sRoleId) {

        case "5":
            var columNames = ['Order ID', 'Order Date', 'Due Date', 'Completed Date', 'Order Type', 'Client Name', 'Sub Client', 'Subject Address', 'Portal', 'emp_ref_no',
         'master_account_no', 'Assignee', 'Status', 'Current Status', 'delete_status', 'C-Status', '', 'Pic. Status', 'c_Status_id', '', '', '', '', '', '', '',
         '', '', '', '', '', '', '', '', '', '', '', ''
            ];
            break;


        case "6"://clear
            var columNames = ['Order ID', 'Order Date', 'Due Date', 'Completed Date', 'Order Type', 'Client Name', 'Sub Client', 'Subject Address', 'Portal', 'emp_ref_no',
        'master_account_no', 'Assignee', 'Status', 'Current Status', 'delete_status',
        'C-Status', '', '', 'Pic.Status', 'Get Order', '', '', '', '', '', '', '', '', '', '', '', '',
         '', '', '', '', '', ''
            ];


            break;
        case "7":
        case "8":
            var columNames = ['Order ID', 'Order Date', 'Due Date', 'Completed Date', 'Order Type', 'Client Code', 'Client Name', 'Sub Client', 'Subject Address', 'emp_ref_no',
       'master_account_no', 'Portal', 'Assignee', 'Status', 'Current Status', 'delete_status',
       'C-Status', '', '', 'Pic.Status', 'Get Order', '', '', '', '', '',
       '', '', '', '', '', '', '', '', '', '', '', '', ''
            ];
            break;

        case "12":
        case "13":
            var columNames = ['', 'Client Name', 'Sub Client', 'Due Date', 'Completed Date', 'Order Type', 'Order Date', 'Subject Address', 'Portal', 'Assignee', 'Status',
                   'Current Status', 'C-Status', '', 'Get Order', 'Client Code', 'emp_ref_no',
           'master_account_no', 'delete_status', '', 'Pic.Status', '', '',
           '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
            ];

            break;
        case "4":
        case "3":
        case "2":
        case "1":


            var columNames = ['', 'Order ID', 'Order Date', 'Due Date', 'Completed Date', 'Order Type', 'Client Name', 'Sub Client', 'Subject Address', 'Portal', 'emp_ref_no',
            'master_account_no', 'Assignee', 'Status', 'Current Status', 'delete_status', 'C-Status', '', 'Pic Status', 'Get Order', '', 'c_Status_id', 'ord_revision_flag',
             '', '', '', '', '', '', '', '', '', '', '', 'remarks'];
            break;

    }

    return columNames;
}

function ColumnModel() {

    var columModel = [
   { name: 'order_id', index: 'order_id', width: 20, sorttype: "string", search: true, align: "Center" },

   { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", search: false, formatter: DateFormat },
   { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },
   { name: 'ordertypename', index: 'ordertypename', width: 25, align: "left", sorttype: "string", search: true },

   { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 40, sorttype: "string", search: true },
   { name: 'subclient', index: 'subclient', width: 40, sorttype: "string", search: true },
   { name: 'subject_address', index: 'subject_address', width: 70, sorttype: "string", search: true },
   { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", hidden: true, search: false },
   { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
   { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },


   { name: 'emp_first_name', index: 'emp_first_name', width: 40, sorttype: "string", search: true },
   { name: 'status_desc', index: 'status_desc', width: 40, sorttype: "string", search: true },
   { name: 'status_reason_desc', index: 'status_reason_desc', width: 45, sorttype: "string", search: true },
   { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },



   { name: 'c_status_desc', index: 'c_status_desc', width: 30, align: "left", sorttype: "string", search: true },
       { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
   { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },
   { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },

   { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true },
   { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'hierarchy_id', index: 'hierarchy_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_urgency', index: 'order_urgency', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_priority', index: 'order_priority', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_ngl_client', index: 'is_ngl_client', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'emp_comp_id', index: 'emp_comp_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true, search: false }
    ];



    switch (sRoleId) {

        case "5":
            var columModel = [{ name: 'order_id', index: 'order_id', width: 20, sorttype: "string", hidden: true, align: "Center" },
  { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", hidden: false, formatter: DateFormat, search: true },//, formatter: DateFormat
  { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", search: true },
    { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },

 { name: 'ordertypename', index: 'ordertypename', width: 23, align: "left", sorttype: "string", search: true },

  { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 40, sorttype: "string", search: true },
   { name: 'subclient', index: 'subclient', width: 40, sorttype: "string", search: true },
 { name: 'subject_address', index: 'subject_address', width: 75, sorttype: "string", search: true },
   { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", search: true },
  { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
  { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },


  { name: 'emp_first_name', index: 'emp_first_name', width: 35, sorttype: "string", search: true },
  { name: 'status_desc', index: 'status_desc', width: 35, sorttype: "string", search: true },
  { name: 'status_reason_desc', index: 'status_reason_desc', width: 40, sorttype: "string", search: true },
  //{ name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },
  { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },



   { name: 'c_status_desc', index: 'c_status_desc', width: 30, align: "left", sorttype: "string", search: true },
     { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
    { name: 'photo_req_status_desc', index: 'photo_req_status_desc', width: 30, align: "center", sorttype: "string", search: true },
   { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },

    { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'hierarchy_id', index: 'hierarchy_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_urgency', index: 'order_urgency', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_priority', index: 'order_priority', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'is_ngl_client', index: 'is_ngl_client', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'emp_comp_id', index: 'emp_comp_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
     { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
         { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink }
            ];
            break;
        case "6":
            var columModel = [{ name: 'order_id', index: 'order_id', width: 20, sorttype: "string", hidden: true, align: "Center", search: false },
   { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", hidden: false, formatter: DateFormat, search: true },
    { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", search: true },
       { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },
   { name: 'ordertypename', index: 'ordertypename', width: 25, align: "left", sorttype: "string", hidden: true, search: false },

   { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 40, sorttype: "string", search: true },
    { name: 'subclient', index: 'subclient', width: 40, sorttype: "string", search: true },
 { name: 'subject_address', index: 'subject_address', width: 70, sorttype: "string", search: true },
    { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", hidden: false, search: false },
  { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
   { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },


   { name: 'emp_first_name', index: 'emp_first_name', width: 40, sorttype: "string", search: true },
   { name: 'status_desc', index: 'status_desc', width: 40, sorttype: "string", search: true },
   { name: 'status_reason_desc', index: 'status_reason_desc', width: 45, sorttype: "string", search: true },
   { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },



   { name: 'c_status_desc', index: 'c_status_desc', width: 30, align: "left", sorttype: "string", search: true, search: false },
     { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
   { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'photo_req_status_desc', index: 'photo_req_status_desc', width: 30, align: "center", sorttype: "string", search: true },
   { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },
   { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
     { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'hierarchy_id', index: 'hierarchy_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_urgency', index: 'order_urgency', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_priority', index: 'order_priority', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'is_ngl_client', index: 'is_ngl_client', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'emp_comp_id', index: 'emp_comp_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
     { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true, search: false }


            ];

            break;
        case "7":
        case "8":
            var columModel = [{ name: 'order_id', index: 'order_id', width: 20, sorttype: "string", hidden: true, align: "Center" },
   { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", hidden: false, formatter: DateFormat, search: true },
    { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", search: true },
      { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },

  { name: 'ordertypename', index: 'ordertypename', width: 25, align: "left", sorttype: "string", search: true },
   { name: 'CM_CUSTOMER_CODE', index: 'CM_CUSTOMER_CODE', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 40, sorttype: "string", search: true },
    { name: 'subclient', index: 'subclient', width: 32, sorttype: "string", search: true },
  { name: 'subject_address', index: 'subject_address', width: 85, sorttype: "string", search: true },
   { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
   { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },
    { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", search: true },


   { name: 'emp_first_name', index: 'emp_first_name', width: 40, sorttype: "string", hidden: true, search: false },
   { name: 'status_desc', index: 'status_desc', width: 40, sorttype: "string", search: true },
   { name: 'status_reason_desc', index: 'status_reason_desc', width: 35, sorttype: "string", search: true },
   { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },



   { name: 'c_status_desc', index: 'c_status_desc', width: 30, align: "left", sorttype: "string", search: true, search: false },
     { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
   { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'photo_req_status_desc', index: 'photo_req_status_desc', width: 30, align: "center", sorttype: "string", search: true },
   { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },
   { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
     { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'hierarchy_id', index: 'hierarchy_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_urgency', index: 'order_urgency', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'order_priority', index: 'order_priority', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
  { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'is_ngl_client', index: 'is_ngl_client', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
   { name: 'emp_comp_id', index: 'emp_comp_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
     { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true, search: false }

            ];

            break;

        case "12":
        case "13":
            var columModel = [
                  { name: 'order_id', index: 'order_id', width: 15, sorttype: "string", hidden: true, align: "Center" },

             { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 30, sorttype: "string", search: true },
              { name: 'subclient', index: 'subclient', width: 40, sorttype: "string", search: true },
           { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", search: true },
             { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },

           { name: 'ordertypename', index: 'ordertypename', width: 20, align: "left", sorttype: "string", search: true },
             { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", hidden: false, formatter: DateFormat, search: true },
             { name: 'subject_address', index: 'subject_address', width: 102, sorttype: "string", search: true },
                { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", hidden: false },
           { name: 'emp_first_name', index: 'emp_first_name', width: 40, sorttype: "string", search: true },
             { name: 'status_desc', index: 'status_desc', width: 40, sorttype: "string", search: true },
            { name: 'status_reason_desc', index: 'status_reason_desc', width: 45, sorttype: "string", search: true },
            { name: 'c_status_desc', index: 'c_status_desc', width: 30, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
            { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },
            { name: 'CM_CUSTOMER_CODE', index: 'CM_CUSTOMER_CODE', width: 40, align: "left", sorttype: "string", search: true, hidden: true, search: false },
            { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
            { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },
            { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },
            { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
            { name: 'photo_req_status_desc', index: 'photo_req_status_desc', width: 30, align: "center", sorttype: "string", hidden: false },
            { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
            { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },

    { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'hierarchy_id', index: 'hierarchy_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'order_urgency', index: 'order_urgency', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'order_priority', index: 'order_priority', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'is_ngl_client', index: 'is_ngl_client', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'emp_comp_id', index: 'emp_comp_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
    { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true },
     { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true }
            ];
            break;
        case "4":
        case "3":
        case "2":
        case "1":

            var columModel = [
             { name: 'more_info', index: 'more_info', width: 8, sorttype: "string", hidden: false, align: "Center", search: false, formatter: MoreInfoOrder },
             { name: 'order_id', index: 'order_id', width: 20, sorttype: "string", hidden: true, align: "Center", search: false },
             { name: 'order_date', index: 'order_date', width: 30, align: "left", sorttype: "string", hidden: false, formatter: DateFormat, search: true },//, formatter: DateFormat
             { name: 'due_date', index: 'due_date', width: 30, align: "left", sorttype: "string", search: true },
              { name: 'start_datetime', index: 'start_datetime', width: 33, align: "left", sorttype: "string", hidden: true, formatter: DateFormat },
             { name: 'ordertypename', index: 'ordertypename', width: 27, align: "left", sorttype: "string", search: true },
             { name: 'CM_CUSTOMER_NAME', index: 'CM_CUSTOMER_NAME', width: 40, sorttype: "string", search: true },
             { name: 'subclient', index: 'subclient', width: 35, sorttype: "string", search: true },
             { name: 'subject_address', index: 'subject_address', width: 70, sorttype: "string", search: true },
             { name: 'portal_name', index: 'portal_name', width: 35, sorttype: "string", search: true },
             { name: 'emp_ref_no', index: 'emp_ref_no', width: 40, sorttype: "string", hidden: true, search: false },
              { name: 'master_account_no', index: 'master_account_no', width: 40, sorttype: "string", hidden: true, search: false },
              { name: 'emp_first_name', index: 'emp_first_name', width: 40, sorttype: "string", search: true },
              { name: 'status_desc', index: 'status_desc', width: 38, sorttype: "string", search: true },
              { name: 'status_reason_desc', index: 'status_reason_desc', width: 45, sorttype: "string", search: true },
              { name: 'delete_status', index: 'delete_status', width: 40, sorttype: "string", hidden: true, search: false },
               { name: 'c_status_desc', index: 'c_status_desc', width: 25, align: "left", sorttype: "string", search: false },
    { name: 'is_comment', index: 'is_comment', width: 13, align: "center", sorttype: "string", search: true, search: false, formatter: CommentsStatus },
             { name: 'photo_req_status_desc', index: 'photo_req_status_desc', width: 30, align: "center", sorttype: "string", search: true },
             { name: 'orderlist', index: '', width: 25, sorttype: "string", search: false, formatter: editLink },

             { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
             { name: 'clarification_status', index: 'clarification_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
             { name: 'ord_revision_flag', index: 'ord_revision_flag', width: 40, align: "left", sorttype: "string", hidden: true, search: false },

             { name: 'photo_req_status', index: 'photo_req_status', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
             { name: 'status_id', index: 'status_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
             { name: 'status_reason_id', index: 'status_reason_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
             { name: 'bts_order_id', index: 'bts_order_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'site_ref_no', index: 'site_ref_no', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'order_type', index: 'order_type', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'state_id', index: 'state_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'DM_DISTRICT_NAME', index: 'DM_DISTRICT_NAME', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'is_qa_submit', index: 'is_qa_submit', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
              { name: 'parent_ord_id', index: 'parent_ord_id', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
               { name: 'Is_Client_Submission', index: 'Is_Client_Submission', width: 40, align: "left", sorttype: "string", hidden: true, search: false },
               { name: 'remarks', index: 'remarks', width: 40, align: "left", sorttype: "string", hidden: true, search: false }
            ];
            break;
    }
    //var columNames = ['', 'Order ID', 'Order Date',  'Order Type', 'Client Name', 'Sub Client', 'Subject Address', 'Portal', 'emp_ref_no',
    //   'master_account_no', 'Assignee', 'Status', 'Current Status', 'delete_status', 'C-Status', 'Pic Status', 'Get Order', 'c_Status_id', 'ord_revision_flag',
    //    '', '', '', '', '', '', '', '', '', '', '', 'remarks'
    //];
    return columModel;
}

function editLink(cellValue, options, rowdata, action) {;
    var orderid = null;
    var name = null;
    //name = rowId['order_id'];
    orderid = rowdata.order_id;
    var cstatusid = rowdata.clarification_status;

    return "<a href='#'  id=" + options.rowId + " onClick='ChkIsAlreadyProgress(" + orderid + "," + cstatusid + "," + options.rowId + ");'><font color='Blue'><u>Get Order</u></font></a>";

}
var ResultStReason;
var EditRowID = 0
function ChkIsAlreadyProgress(orderid, cstatusid, sRowId) {

    EditRowID = sRowId;

    sHdnOrderId = orderid;
    if (sRoleId == 12) {
        if (sQaInprogress.length >= 3) {
            if (cstatusid == 0) {
                if (sQaInprogress[0] != orderid && sQaInprogress[1] != orderid && sQaInprogress[2] != orderid) {
                    msgalert('Error', 'Your orders of ' + sQaInprogress[0] + ' , ' + sQaInprogress[1] + ' and ' + sQaInprogress[2] + ' already in progress', 1);//sucess-1, warning-2, error-3
                    return;
                }
            }
        }
    }

    if (sRoleId == 6 || sRoleId == 5) {

        if (inprogress.length >= 2) {
            if (cstatusid == 0 || cstatusid == 3) {
                if (inprogress[0] != orderid && inprogress[1] != orderid) {
                    msgalert('Error', 'Your orders of ' + inprogress[0] + ' and ' + inprogress[1] + '  already in progress', 1);//sucess-1, warning-2, error-3
                    return;
                }
            }
        }
        var oAPICall = new APICall();
        var Condition = "WHERE order_id = " + orderid + " order by 1 desc";
        var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });

        var Result6 = oAPICall.SelectData(strJsonDatas, "Selecttotaolorder");
        if (Result6 != "" && Result6 != null) {
            var ExsStatusId = Result6[0].status_id;
            var ExsStatusResId = Result6[0].status_reason_id;
            var sExEmpId = Result6[0].emp_ref_no;
            if ((ExsStatusId == 5 && ExsStatusResId == 19 && sExEmpId != EmpId) || (ExsStatusId == 5 && ExsStatusResId == 20 && sExEmpId != EmpId) || (ExsStatusId == 10 && sExEmpId != EmpId)) {

                msgalert('Error', 'This order already taken....', 3);//sucess-1, warning-2, error-3
                return;
            }
            else {
                $('#OrderEdit').removeClass("hidden");
                $('#OrderList').addClass("hidden");
                BindOrder(orderid, cstatusid, sRowId)
            }
        }
        else {
            msgalert('Error', 'Order not found...', 3);//sucess-1, warning-2, error-3
            return;
        }
    }
    else {
        $('#OrderEdit').removeClass("hidden");
        $('#OrderList').addClass("hidden");
        BindOrder(orderid, cstatusid, sRowId);
    }

}

var sRoleId = access_level;
var EmpId = "";
var tabid = "";
var sLastStatusId = "";
var sLastPhotoStatus = "";
var sLastClarStatus = "";
var sQaIsSubmit = "";
var sRoleId = 0;
var sLocEmpId = null;
var sIsNgl = null;
var sIsTransfer = 0;
var sCommentId = '';
var sParentOrdId = '';
function ControlDisable() {
    $("#FomOrderList :input").prop("disabled", true);
    $('#ddlAssignee').attr('disabled', true);
    $('#ddlPictureStatus').attr('disabled', true);
    $('#ddlCurrentStatus').attr('disabled', false);
    $('#ddlClarificationStatus').attr('disabled', false);
    $('#ddlUserFilter').attr('disabled', false);
    $('#chkRecheck').attr('disabled', false);
    $('#txtfromdt').attr('disabled', false);
    $('#txttodt').attr('disabled', false);
    $('#ddlSelectFilter').attr('disabled', false);



}
var sStatusReasonId
function BindOrder(orderid, cstatusid, sRowId) {
    var oAPICall = new APICall();
    sCurDate = oAPICall.GetServerDateOm();

    var rowIds = $('#tblOrderListGrid').jqGrid('getDataIDs');
    var rowid = sRowId - 1;
    var sRmks = $('#tblOrderListGrid').getCell(rowIds[rowid], 'remarks');
    var sEmpCompId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'emp_comp_id');
    var sIsNglClient = $('#tblOrderListGrid').getCell(rowIds[rowid], 'is_ngl_client');
    var sParentOrdId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'parent_ord_id');
    var sIsQA = $('#tblOrderListGrid').getCell(rowIds[rowid], 'is_qa_submit');
    var sStateName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'DM_DISTRICT_NAME');

    var sStateId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'state_id');
    var sOrdPrty = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_priority');
    var sOrdUrg = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_urgency');

    var sOrdType = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_type');
    var sSiteRefno = $('#tblOrderListGrid').getCell(rowIds[rowid], 'site_ref_no');
    var sHierarchId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'hierarchy_id');
    var sBtsOrdId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'bts_order_id');
    $('#hdnBTSOrderid').val(sBtsOrdId)
    var sStatusResId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'status_reason_id');
    var sStatusId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'status_id');
    var sPhotoReqId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'photo_req_status');
    var sOrdRevFlag = $('#tblOrderListGrid').getCell(rowIds[rowid], 'ord_revision_flag');
    var sPhotoDesc = $('#tblOrderListGrid').getCell(rowIds[rowid], 'photo_req_status_desc');
    var sCStatus = $('#tblOrderListGrid').getCell(rowIds[rowid], 'c_status_desc');
    var sEmpPriroty = $('#tblOrderListGrid').getCell(rowIds[rowid], 'emp_priority');
    var sOrderRev = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_rev_no');

    var sStatusReasDesc = $('#tblOrderListGrid').getCell(rowIds[rowid], 'status_reason_desc');
    var sStatusDesc = $('#tblOrderListGrid').getCell(rowIds[rowid], 'status_desc');
    var sEmpName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'emp_first_name');
    var sPriortiy = $('#tblOrderListGrid').getCell(rowIds[rowid], 'Priority');
    //var sUrgency = $('#tblOrderListGrid').getCell(rowIds[rowid], 'Urgency');
    var sMasterAccntNo = $('#tblOrderListGrid').getCell(rowIds[rowid], 'master_account_no');
    var sEmpRefNo = $('#tblOrderListGrid').getCell(rowIds[rowid], 'emp_ref_no');
    var sPortalName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'portal_name');
    var sSubAdd = $('#tblOrderListGrid').getCell(rowIds[rowid], 'subject_address');
    var sClientName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'CM_CUSTOMER_NAME');
    var sClientCode = $('#tblOrderListGrid').getCell(rowIds[rowid], 'CM_CUSTOMER_CODE');
    var sOrdTypeName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'ordertypename');
    var sDueDt = $('#tblOrderListGrid').getCell(rowIds[rowid], 'due_date');
    var sOrdDate = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_date');
    var sOrdId = $('#tblOrderListGrid').getCell(rowIds[rowid], 'order_id');
    var sIsClientSubmit = $('#tblOrderListGrid').getCell(rowIds[rowid], 'Is_Client_Submission');
    var sClarifyStatus = $('#tblOrderListGrid').getCell(rowIds[rowid], 'clarification_status');
    var sSubclientName = $('#tblOrderListGrid').getCell(rowIds[rowid], 'subclient');
    var sReviewChecked = $('#tblOrderListGrid').getCell(rowIds[rowid], 'is_review_checked');

    var dt = new Date(sOrdDate);
    var sOrdDt = dt.format('mm/dd/yyyy');
    $('#txtOrderDate').val(sOrdDt);

    $("#txtOrderID").val(sOrdId);

    var dt = new Date(sDueDt);
    var sOrdDueDt = dt.format('mm/dd/yyyy');
    $("#txtOrderDueDate").val(sOrdDueDt);

    $("#txtOrderType").val(sOrdTypeName);
    $("#txtSubjectAddress").val(sSubAdd);
    $("#txtClient").val(sClientName);
    $("#txtParentClient").val(sOrdId);
    $("#txtParentClient").val(sSubclientName);

    $("#txtPortal").val(sPortalName);
    $("#txtUrgency").val("RUSH");
    $("#txtPriority").val("HIGH");
    $("#chkRecheck").prop("checked", sReviewChecked);

    var LengthddlAssignee = $('#ddlAssignee').children('option').length;
    var LengthPictureStatus = $('#ddlPictureStatus').children('option').length;
    var LengthStatus = $('#ddlStatus').children('option').length;
    var LenghthStatusReason = $('#ddlCurrentStatus').children('option').length;
    var LenghthStatusClari = $('#ddlClarificationStatus').children('option').length;

    $('#ddlAssignee').val(sEmpRefNo).change();
    $('#ddlPictureStatus').val(sPhotoReqId).change();
    $('#ddlStatus').val(sStatusId).change();
    if (sClarifyStatus != 3)
        $('#ddlClarificationStatus').val(sClarifyStatus).change();




    var sPhtReqStatus = sPhotoReqId;
    var sIsClientSubmit = '';
    sIsClientSubmit = sIsClientSubmit;


    sQaIsSubmit = sIsQA;
    sParentOrdId = sParentOrdId;
    sLastPhotoStatus = sPhtReqStatus;
    sLastClarStatus = sClarifyStatus;
    var StatusID = sStatusId;
    sStatusReasonId = sStatusResId;
    sLastStatusId = sStatusReasonId;
    sIsNgl = sIsNglClient;
    sLocEmpId = sEmpCompId;
    var sStatusChange = false;
    var Condition2 = "WHERE order_id = " + sOrdId + "";
    var strJsonDatas = eval({ OrderID: sOrdId });
    $.ajax({
        url: "SelectOrderDetails",
        type: "POST",
        data: JSON.stringify(strJsonDatas),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (msg) {

            if (LengthddlAssignee == 0) {
                $('#ddlAssignee').empty().append();
                var ResultAssignee = jQuery.parseJSON(msg.EmployeeDet)
                if (ResultAssignee != "" && ResultAssignee != null) {
                    for (var i = 0; i < ResultAssignee.length; i++) {
                        $('#ddlAssignee').append('<option value="' + ResultAssignee[i]["emp_ref_no"] + '">' + ResultAssignee[i]["employee_name"] + '</option>');
                        if (i == (ResultAssignee.length) - 1) {
                            $('#ddlAssignee').val(sEmpRefNo).change();
                        }
                    }
                }
            }
            if (LengthPictureStatus == 0) {
                $('#ddlPictureStatus').empty().append();
                var ResultPictureStatus = jQuery.parseJSON(msg.PictureStatus)
                if (ResultPictureStatus != "" && ResultPictureStatus != null) {
                    for (var i = 0; i < ResultPictureStatus.length; i++) {
                        $('#ddlPictureStatus').append('<option value="' + ResultPictureStatus[i]["value"] + '">' + ResultPictureStatus[i]["display_value"] + '</option>');
                        if (i == (ResultPictureStatus.length) - 1) {
                            $('#ddlPictureStatus').val(sPhotoReqId).change();
                        }
                    }
                }
            }
            if (LengthStatus == 0) {
                $('#ddlStatus').empty().append();
                var ResultStatus = jQuery.parseJSON(msg.Status)
                if (ResultStatus != "" && ResultStatus != null) {
                    for (var i = 0; i < ResultStatus.length; i++) {
                        $('#ddlStatus').append('<option value="' + ResultStatus[i]["status_id"] + '">' + ResultStatus[i]["status_desc"] + '</option>');
                        if (i == (ResultStatus.length) - 1) {
                            $('#ddlStatus').val(sStatusId).change();
                        }
                    }
                }
            }

            //if (LenghthStatusReason == 0) {
            $('#ddlCurrentStatus').empty().append();
            ResultStReason = jQuery.parseJSON(msg.StatusReason)
            if (ResultStReason != "" && ResultStReason != null) {
                for (var i = 0; i < ResultStReason.length; i++) {
                    if (ResultStReason[i]["status_id"] == sStatusId)
                        $('#ddlCurrentStatus').append('<option value="' + ResultStReason[i]["status_reason_id"] + '">' + ResultStReason[i]["status_reason_desc"] + '</option>');
                    if (i == (ResultStReason.length) - 1) {
                        $('#ddlCurrentStatus').val(sStatusResId).change();
                    }
                }
            }
            //}
            if (LenghthStatusClari == 0) {
                $('#ddlClarificationStatus').empty().append('<option value="0">--Select Clarification --- </option>');
                var ResultStClari = jQuery.parseJSON(msg.StatusClari)
                var len = ResultStClari.length;
                if (sRoleId == 5 || sRoleId == 6 || sRoleId == 11) {
                    len = len - 1;
                }
                if (ResultStClari != "" && ResultStClari != null) {
                    // for (var i = 0; i < ResultStClari.length; i++) {
                    for (var i = 0; i < len; i++) {
                        $('#ddlClarificationStatus').append('<option value="' + ResultStClari[i]["value"] + '">' + ResultStClari[i]["display_value"] + '</option>');
                        if (i == (ResultStClari.length) - 1) {
                            $('#ddlClarificationStatus').val(sClarifyStatus).change();
                        }
                    }
                }
            }
            var ResultStateName = jQuery.parseJSON(msg.DistricName)
            //  $("#txtState").val(ResultStateName[0].DM_DISTRICT_NAME);
            if (sEmpRefNo == '' || sEmpRefNo == null || sEmpRefNo == '-1') {

                $('#ddlAssignee').val(EmpId).change();
            }
            //Research
            if (sRoleId == 5 || sRoleId == 4 || sRoleId == 6) {
                if (StatusID == 2 && sStatusReasonId == 12) {
                    StatusID = 3;
                    $('#ddlStatus').val(StatusID).change();

                    sStatusReasonId = 13;
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                    // window.open('http://192.168.2.95/ar_db/order.php', "_newtab");
                    //document.getElementsByName("SubAdd")[0].value = sSubAdd;
                    // window.open = "";
                }

                else if (StatusID == 10 && sStatusReasonId == 31) {
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();

                    sStatusReasonId = 19;
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                    // window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");
                }
                if (sStatusChange == true) {
                    var StrJsonDatas = eval({
                        status_id: StatusID,
                        status_reason_id: sStatusReasonId,
                        update_date: sCurDate
                    });

                    var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition2);
                }
            }


            //Production Team
            if (sRoleId == 7) {
                var sPicStatus = $('#ddlPictureStatus').val();
                if (sLastPhotoStatus > 1 && StatusID == 5) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                }
                else if (sLastPhotoStatus > 1 && StatusID == 6 && sStatusReasonId == 22) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                }
                else if (sLastPhotoStatus > 1 && StatusID == 7 && sStatusReasonId == 22) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                }
                else if (sLastPhotoStatus > 1 && StatusID == 6 && sStatusReasonId == 36) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    sStatusChange = true;
                }
            }
            //Entry Team
            if (sRoleId == 6 && sStatusChange == false) {

                if (StatusID == 3 && sStatusReasonId == 14 && sPhtReqStatus != 3) {
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    // window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");
                }

                else if (StatusID == 4 && sPhtReqStatus != 3) {
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    //  window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");

                }
                else if (StatusID == 10 && sStatusReasonId == 31 && sPhtReqStatus != 3) {
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    sStatusReasonId = 19;
                    sStatusChange = true;
                    // window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");
                }
                    // sIsClientSubmit == 0 for Not Allowed to submit, sIsClientSubmit == 1 is allowed to submit
                else if (StatusID == 3 && sStatusReasonId == 14 && sPhtReqStatus == 3 && sIsClientSubmit == 0 && sQaIsSubmit != 1) {
                    msgalert('Warning', 'You are not supposed to submit this order..', 2);
                    //  alertmsg("warning", "You are not supposed to submit this order..", "TFS");
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    //  window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");

                }

                else if (StatusID == 4 && sStatusReasonId == 18 && sPhtReqStatus == 3 && sIsClientSubmit == 0 && sQaIsSubmit != 1) {
                    msgalert('Warning', 'You are not supposed to submit this order..', 2);
                    //alertmsg("warning", "You are not supposed to submit this order..", "TFS");
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    // window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");
                }
                else if (StatusID == 3 && sStatusReasonId == 14 && sPhtReqStatus == 3 && sIsClientSubmit != 0 && sQaIsSubmit != 1) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);

                }
                else if (StatusID == 10 && sStatusReasonId == 31 && sPhtReqStatus == 3 && sIsClientSubmit != 0 && sQaIsSubmit != 1) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);

                }
                else if (StatusID == 10 && sStatusReasonId == 31 && sPhtReqStatus == 3 && sIsClientSubmit == 0) {
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    //  window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");

                }
                else if (StatusID == 4 && sStatusReasonId == 18 && sPhtReqStatus == 3 && sIsClientSubmit != 0 && sQaIsSubmit != 1) {
                    sStatusReasonId = 35;
                    StatusID = 9;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);

                }
                else if (sPhtReqStatus == 3 && sQaIsSubmit == 1) {
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    //  window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");

                }
                //var StrJsonDatas = eval({
                //    status_id: StatusID,
                //    status_reason_id: sStatusReasonId,
                //    update_date: sCurDate
                //});

                //var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition2);
            }


            if (sRoleId == 2 || sRoleId == 3) {
                if (StatusID == 2 && sEmpRefNo == EmpId) { //&& Result[0]["emp_ref_no"] == EmpId
                    sStatusReasonId = 13;
                    StatusID = 3;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    $('#ddlAssignee').val(EmpId);
                    sStatusChange = true;
                    //  window.open('http://192.168.2.95/ar_db/order.php', "_newtab");
                }
                else if (StatusID == 10 && sEmpRefNo == EmpId) { //&& Result[0]["emp_ref_no"] == EmpId
                    sStatusReasonId = 19;
                    StatusID = 5;
                    $('#ddlStatus').val(StatusID).change();
                    BindStatusReason(StatusID);
                    $('#ddlAssignee').val(EmpId);
                    sStatusChange = true;
                    //  window.open('http://192.168.2.95/AR_DB/preview.php', "_newtab");
                }
            }
            if (sRoleId == 12) {//QA Team
                if (sPhtReqStatus != 3) {

                    if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid != 5)) {// Peeru on 11-10-2016
                        StatusID = 4;
                        sStatusReasonId = 17;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 2 && sStatusReasonId == 12) {
                        StatusID = 3;
                        sStatusReasonId = 13;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                    else if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid == 5)) {
                        StatusID = 5;
                        sStatusReasonId = 19;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                    else if ((StatusID == 4 && sStatusReasonId == 18) && (sSubmenuid == 5)) {
                        StatusID = 5;
                        sStatusReasonId = 19;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                    else if (StatusID == 5 && sStatusReasonId == 20) {// Peeru on 11-10-2016 sStatusReasonId != 22
                        StatusID = 6;
                        sStatusReasonId = 21;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 7 && sStatusReasonId != 22) {// Peeru on 11-10-2016
                        StatusID = 6;
                        sStatusReasonId = 21;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 4 && sStatusReasonId != 18) {
                        StatusID = 4;
                        sStatusReasonId = 17;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 6 && sStatusReasonId != 22) {
                        StatusID = 6;
                        sStatusReasonId = 21;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 10 && sStatusReasonId == 31) {
                        StatusID = 5;
                        sStatusReasonId = 19;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                }
                else if (sPhtReqStatus == 3) {
                    if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid == 11)) { //if (StatusID == 3 && sStatusReasonId == 14) {
                        StatusID = 4;
                        sStatusReasonId = 17;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid == 5)) {
                        StatusID = 5;
                        sStatusReasonId = 19;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                    else if ((StatusID == 4 && sStatusReasonId == 18) && (sSubmenuid == 5)) {
                        StatusID = 5;
                        sStatusReasonId = 19;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }
                    else if (StatusID == 5 && sStatusReasonId == 20) {
                        StatusID = 9;
                        sStatusReasonId = 35;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 7 && sStatusReasonId != 22) {// Peeru on 11-10-2016
                        StatusID = 6;
                        sStatusReasonId = 21
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 6 && sStatusReasonId != 22) {
                        StatusID = 6;
                        sStatusReasonId = 21;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                    }
                    else if (StatusID == 2 && sStatusReasonId == 12) {
                        StatusID = 3;
                        sStatusReasonId = 13;
                        $('#ddlStatus').val(StatusID).change();
                        BindStatusReason(StatusID);

                        sStatusChange = true;
                    }

                }

                if (sRoleId == 59) {//POC Team by Peeru on 1-jun-2017
                    if (sPhtReqStatus != 3) {

                        if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid != 5)) {// Peeru on 11-10-2016
                            StatusID = 4;
                            $('#ddlStatus').val(StatusID).change();
                            BindStatusReason(StatusID);
                            sStatusReasonId = 17;
                        }
                        else if (StatusID == 2 && sStatusReasonId == 12) {
                            StatusID = 3;
                            $('#ddlStatus').val(StatusID).change();
                            BindStatusReason(StatusID);
                            sStatusReasonId = 13;
                            sStatusChange = true;
                        }
                        else if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid == 5)) {
                            StatusID = 5;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 19;
                            sStatusChange = true;
                        }
                        else if ((StatusID == 4 && sStatusReasonId == 18) && (sSubmenuid == 5)) {
                            StatusID = 5;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 19;
                            sStatusChange = true;
                        }
                        else if (StatusID == 5 && sStatusReasonId != 22) {// Peeru on 11-10-2016
                            StatusID = 6;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 21
                        }
                        else if (StatusID == 7 && sStatusReasonId != 22) {// Peeru on 11-10-2016
                            StatusID = 6;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 21
                        }
                        else if (StatusID == 4 && sStatusReasonId != 18) {
                            StatusID = 4;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 17;
                        }
                        else if (StatusID == 6 && sStatusReasonId != 22) {
                            StatusID = 6;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 21;
                        }
                        if (sStatusChange == true) {
                            var StrJsonDatas = eval({
                                status_id: StatusID,
                                status_reason_id: sStatusReasonId,
                                update_date: sCurDate
                            });

                            var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition2);
                        }
                    }
                    else if (sPhtReqStatus == 3) {
                        if (StatusID == 3 && sStatusReasonId == 14) {
                            StatusID = 4;
                            $('#ddlStatus').val(StatusID).change();
                            BindStatusReason(StatusID);
                            sStatusReasonId = 17;
                        }
                        else if (StatusID == 2 && sStatusReasonId == 12) {
                            StatusID = 3;
                            $('#ddlStatus').val(StatusID).change();
                            BindStatusReason(StatusID);
                            sStatusReasonId = 13;
                            sStatusChange = true;
                        }
                        else if ((StatusID == 3 && sStatusReasonId == 14) && (sSubmenuid == 5)) {
                            StatusID = 5;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 19;
                            sStatusChange = true;
                        }
                        else if ((StatusID == 4 && sStatusReasonId == 18) && (sSubmenuid == 5)) {
                            StatusID = 5;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 19;
                            sStatusChange = true;
                        }
                        else if (StatusID == 5 && sStatusReasonId == 20) {
                            StatusID = 9;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 35;
                        }
                        else if (StatusID == 7 && sStatusReasonId != 22) {
                            StatusID = 6;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 21
                        }
                        else if (StatusID == 6 && sStatusReasonId != 22) {
                            StatusID = 6;
                            BindStatusReason(StatusID);
                            sStatusReasonId = 21;
                        }
                        if (sStatusChange == true) {
                            var StrJsonDatas = eval({
                                status_id: StatusID,
                                status_reason_id: sStatusReasonId,
                                update_date: sCurDate
                            });

                            var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition2);
                        }

                    }


                }
            }
            // if (sRoleId == 5 || sRoleId == 6 || sRoleId == 7 || sRoleId == 12 || sRoleId == 8)
            //     $('#ddlAssignee').prop("disabled", true);
            // else
            //     $('#ddlAssignee').prop("disabled", false);

            if (sStatusReasonId != sLastStatusId) {
                CreateOrderStatus(sOrdId);
            }
        }
    })
}
function CreateOrderStatus(OrderID) {

    var oAPICall = new APICall();
    //  var sCurDate = new Date();
    //sCurDate = dateFormat(sCurDate, "isoDateTime");


    var sViewStatus = 1;
    var sLastViewId = null;
    var Condition = "WHERE order_id = " + OrderID + "";


    var StrJsonDatas = eval({   //$('#ddlAssignee').val() instead of EmpId
        order_id: OrderID, status_id: $('#ddlStatus').val(), emp_ref_no: $('#ddlAssignee').val(), start_datetime: sCurDate,
        end_datetime: sCurDate, status_reason_id: $('#ddlCurrentStatus').val(), view_status: sViewStatus
    });
    var Result4 = oAPICall.InsertData(StrJsonDatas, 'CreateOrderStatus');

    var StrJsonDatas = eval({ view_id: sLastViewId });
    if ((sRoleId == 6 && $('#ddlCurrentStatus').val() != 20) && (sRoleId == 6 && $('#ddlCurrentStatus').val() != 14)) {
        var StrJsonDatas = eval({
            view_id: sLastViewId, status_id: $('#ddlStatus').val(), emp_ref_no: $('#ddlAssignee').val(),
            status_reason_id: $('#ddlCurrentStatus').val(), update_date: sCurDate
        });
    }
    else if (sRoleId == 12 && ($('#ddlCurrentStatus').val() != 18 && $('#ddlCurrentStatus').val() != 36)) {
        var StrJsonDatas = eval({
            view_id: sLastViewId, status_id: $('#ddlStatus').val(), emp_ref_no: EmpId,
            status_reason_id: $('#ddlCurrentStatus').val(), update_date: sCurDate, is_qa_submit: 0
        });

    }
    else if ((sRoleId == 12 && sQaIsSubmit == 1 && $('#ddlCurrentStatus').val() == 36) || (sRoleId == 12 && sQaIsSubmit == 1 && $('#ddlCurrentStatus').val() == 22)) {
        var StrJsonDatas = eval({ view_id: sLastViewId, emp_ref_no: '', is_qa_submit: 0 });
    }
    else if (sRoleId == 5 && $('#ddlCurrentStatus').val() != 14) {
        var StrJsonDatas = eval({ view_id: sLastViewId });
    }
    else if ((sRoleId == 3 || sRoleId == 4 || sRoleId == 2) && $('#ddlCurrentStatus').val() == 13) { //sRoleId == 2 added by peeru on march 7 2017

        var StrJsonDatas = eval({
            view_id: sLastViewId, status_id: $('#ddlStatus').val(), emp_ref_no: $('#ddlAssignee').val(),
            status_reason_id: $('#ddlCurrentStatus').val(), update_date: sCurDate
        });

    }
    else if ((sRoleId == 7 || sRoleId == 8) && $('#ddlCurrentStatus').val() == 35) {

        var StrJsonDatas = eval({
            view_id: sLastViewId, status_id: $('#ddlStatus').val(), emp_ref_no: $('#ddlAssignee').val(),
            status_reason_id: $('#ddlCurrentStatus').val(), update_date: sCurDate
        });

    }

    var Result5 = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition);
}

function BindStatusReason(StatusID) {
    $('#ddlCurrentStatus').empty().append();
    var cnt = 0;
    if (ResultStReason != "" && ResultStReason != null) {
        var sIsDefault = 0;
        for (var i = 0; i < ResultStReason.length; i++) {
            if (ResultStReason[i]["status_id"] == StatusID) {

                $('#ddlCurrentStatus').append('<option value="' + ResultStReason[i]["status_reason_id"] + '">' + ResultStReason[i]["status_reason_desc"] + '</option>');


            }
        }
        $('#ddlCurrentStatus').val(sStatusReasonId).change();
    }
}




function saveorupdate() {
    // var orId = GetQueryStringParams('orderid');
    // first change the cell in the visible part of grid

    if ($('#ddlPictureStatus').val() == 3) {
        parent.swal({
            //title: "Are you sure to Mark Pic Status to " + sPhtStatus + "?",
            title: "Are you sure to Mark Pic Status to " + $("option:selected", $('#ddlPictureStatus')).text() + "?",
            //text: "" + text + "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true,
            //showLoaderOnConfirm: true,

        },
       function (isConfirm) {

           if (isConfirm) {

               orId = $('#txtOrderID').val();

               if (orId != 'null' && orId != '') {
                   var SubjectAddress = $('#txtSubject').val();
                   if (SubjectAddress == '') {
                       //alertmsg
                       msgalert('Error', 'Please enter the subject address...', 3);//sucess-1, warning-2, error-3

                       return;
                   }


                   UpdateData_OrderRecording();

               }
               else {
                   InsertData_OrderRecording();


               }
               return
           }
           else {
               return
           }
       });
    }

    else {
        orId = $('#txtOrderID').val();

        if (orId != 'null' && orId != '') {
            var SubjectAddress = $('#txtSubject').val();
            if (SubjectAddress == '') {
                //alertmsg
                msgalert('Error', 'Please enter the subject address...', 3);//sucess-1, warning-2, error-3

                return;
            }


            UpdateData_OrderRecording();

        }
        else {
            InsertData_OrderRecording();


        }
        return

    }




}
function CheckOrderStatusCompleted(sStatusId, sStatusReasonId) {

    try {
        var sIsCompleted = false;

        //var oAPICall = new APICall();
        //var Condition = "WHERE status_id = " + sStatusId + " AND status_reason_id = " + sStatusReasonId + " AND is_status_reason_completed = 1";
        //var strJsonDatas = eval({ strCondition: Condition, strFieldNames: null, strSessionID: null });
        //var Result = oAPICall.SelectData(strJsonDatas, "SelectOrderStatusCheck");


        if (sStatusId == 3 && sStatusReasonId == 14) {//Research
            sIsCompleted = true;
        }
        else if (sStatusId == 4 && sStatusReasonId == 18) {//QA Research
            sIsCompleted = true;
        }
        else if (sStatusId == 5 && sStatusReasonId == 20) { //Data Entry
            sIsCompleted = true;
        }
        else if (sStatusId == 6 && sStatusReasonId == 22) { //QA Data Entry
            sIsCompleted = true;
        }
        else if (sStatusId == 7 && sStatusReasonId == 28) {// QA Full
            sIsCompleted = true;
        }
        else if (sStatusId == 9 && sStatusReasonId == 30) { //Submitted
            sIsCompleted = true;
        }

        return sIsCompleted;

    }
    catch (exception) {
    }
}
var sCurDate
function UpdateData_OrderRecording() {



    var oAPICall = new APICall();
    sCurDate = oAPICall.GetServerDateOm();

    var result = confirm("Are you sure to update the changes?");
    if (result == true) {

        var Orderid = $('#txtOrderID').val();

        if (Orderid == 'null' || Orderid <= 0) {

            msgalert('Error', 'Cannot Proceed Without Order Id', 3);//sucess-1, warning-2, error-3
            return;
        }

        if ($("#ddlCurrentStatus").val() == 34 && $("#ddlClarificationStatus").val() == 0) {
            msgalert('Error', 'Please select Clarification Status', 3);//sucess-1, warning-2, error-3

            return;
        }
        if ($("#ddlClarificationStatus").val() == 3 && $("#ddlCurrentStatus").val() == 34) {
            msgalert('Error', 'Please change the current status', 3);//sucess-1, warning-2, error-3

            return;
        }
        if ($("#ddlCurrentStatus").val() != 34 && ($("#ddlClarificationStatus").val() == 1 || $("#ddlClarificationStatus").val() == 2)) {
            msgalert('Error', 'Please change the current status to "Need Clarification"', 3);//sucess-1, warning-2, error-3

            return;
        }
        if ($("#ddlStatus").val() == 9) {
            if ($("#ddlCurrentStatus").val() == 30) {
                if ($("#ddlClarificationStatus").val() == 1 || $("#ddlClarificationStatus").val() == 2) {

                    msgalert('Error', 'Clarification Pending', 3);//sucess-1, warning-2, error-3
                    return;
                }
            }


            if ($("#ddlPhotoreq").val() <= 1) {
                msgalert('Error', 'Photograph cannot received on this order', 3);//sucess-1, warning-2, error-3

                return;
            }

        }
        if ($("#ddlCurrentStatus").val() == 30 && $("#ddlPhotoreq").val() == 2) {

            msgalert('Error', 'Please change the picture status and continue..', 3);//sucess-1, warning-2, error-3
            return;
        }
        if ($("#ddlPhotoreq").val() == 3 && $("#ddlCurrentStatus").val() == 35) {

            msgalert('Error', 'Please change the current status and continue..', 3);//sucess-1, warning-2, error-3
            return;
        }
        var rowIds = parent.$('#tblCommentHistoryistGrid').jqGrid('getDataIDs');
        if ($("#ddlCurrentStatus").val() == 34 && $("#ddlClarificationStatus").val() > 0 && rowIds.length == 0) {
            msgalert('Error', 'Please add comments and continue.', 3);//sucess-1, warning-2, error-3

            return;
        }
        if ($("#ddlCurrentStatus").val() == 36 && rowIds.length == 0) {
            msgalert('Error', 'Please add comments and continue.', 3);//sucess-1, warning-2, error-3

            return;
        }


        //var oAPICall = new APICall();
        var sStatusId = $('#ddlStatus').val();
        var sStatusReasonId = $('#ddlCurrentStatus').val();
        var sEmpRefNo = $('#ddlAssignee').val();

        var sEmpOrdPriority = ""; //GetEmpOrderPriority(Orderid);

        var sStatusCompleted = CheckOrderStatusCompleted(sStatusId, sStatusReasonId);

        if (sStatusCompleted == true && sStatusId > 2) {

            sEmpRefNo = null;
            sEmpOrdPriority = "";
        }

        //var sMasterAccountNo = $('#txtParentclient').val();
        //var sHierarchyId = $('#txtChildclient').val();
        //var sStateId = $('#ddlState').val();
        //var sOrderType = $('#ddlOrdertype').val();
        //var sOrderUrgency = $('#ddlUrgency').val();
        //var sOrderPriority = $('#ddlPriority').val();
        var sClarifyStatus = $('#ddlClarificationStatus').val();
        var sPicStatus = $('#ddlPictureStatus').val();
        //var sStatusId = $('#ddlStatus').val();
        //var sStatusReasonId = $('#ddlCurrentStatus').val();
        //var sRemarks = $('#txtRemarks').val();
        //var sSiteRefNo = $('#txtZip').val();
        //var sMlsSiteRefNo = $('#ddlMls').val();

        var sPriorityParamId = 0;

        var sPriorityParamId = 11;

        if (sRoleId != 7 && sRoleId != 8) {
            if (sStatusId == 1 && sEmpRefNo > 0) {
                sEmpRefNo = null;
            }
        }


        var IsRevChked = 0;
        if ($('#chkIsReview').is(':checked') == true)
            IsRevChked = 1;

        var StrJsonDatas = eval({

            //subject_address: SubjectAddress,
            //state_id: sStateId,
            //order_type: sOrderType,
            //order_urgency: sOrderUrgency,
            //order_priority: sOrderPriority,
            //remarks: sRemarks,
            //mls_site_ref_no: sMlsSiteRefNo,
            //is_review_checked: IsRevChked,            
            //priority_param_id: sPriorityParamId,
            //is_transfer: sIsTransfer

            clarification_status: sClarifyStatus,
            photo_req_status: sPicStatus,
            status_id: sStatusId,
            status_reason_id: sStatusReasonId,
            emp_ref_no: sEmpRefNo,
            update_date: sCurDate,

        });

        var Condition = "WHERE order_id = " + Orderid;
        var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition);

        if (Result == "Success") {
            parent.RefreshSummary();
            var e = jQuery.Event("keyup", { keyCode: 13 });
            $('#subject_address').trigger(e);
        }

        changebtsstatus(sStatusId);


        //UpdateEmpOrdRePriority();

        if (sStatusReasonId != sLastStatusId) {
            CreateOrderStatus(Orderid);
        }
        else if (sLastPhotoStatus != sPicStatus) { // && sRoleId ==  2

            var sViewStatus = 1;
            var sStrJsonDt = eval({   //$('#ddlAssignee').val() instead of EmpId  13: Pict Status 37 :updated
                order_id: Orderid, status_id: 13, emp_ref_no: EmpId, start_datetime: sCurDate,
                end_datetime: sCurDate, status_reason_id: 37, view_status: sViewStatus,
                is_photo_upload: sPicStatus
            });
            var ResultPic = oAPICall.InsertData(sStrJsonDt, 'CreateOrderStatus');
        }
        if (sLastClarStatus != $('#ddlClarificationStatus').val() && $('#ddlClarificationStatus').val() == 3) {
            var sViewStatus = 1;
            var sStrJsonDt = eval({   // Status 14 :Clarified
                order_id: Orderid, status_id: 14, emp_ref_no: EmpId, start_datetime: sCurDate,
                end_datetime: sCurDate, status_reason_id: 38, view_status: sViewStatus,
                is_photo_upload: sPicStatus
            });
            var ResultClari = oAPICall.InsertData(sStrJsonDt, 'CreateOrderStatus');
            //start for re-assign clarification 25 9 2017
            var StrClaDatas = "";
            if ($('#ddlAssignee').val() != null && $('#ddlStatus').val() == 1)
                StrClaDatas = eval({ emp_ref_no: $('#ddlAssignee').val(), status_id: 2, status_reason_id: 12 });

            else if ($('#ddlAssignee').val() != null && $('#ddlStatus').val() == 3 && $('#ddlCurrentStatus').val() == 14)
                StrClaDatas = eval({ emp_ref_no: $('#ddlAssignee').val(), status_id: 10, status_reason_id: 31 });

            else if ($('#ddlAssignee').val() != null && $('#ddlStatus').val() == 5 && $('#ddlCurrentStatus').val() == 20)
                StrClaDatas = eval({ emp_ref_no: $('#ddlAssignee').val(), status_id: 5, status_reason_id: 20 });
            if (StrClaDatas != "") {
                var ResultReAssign = oAPICall.UpdateData(StrClaDatas, 'UpdateClientOrder', Condition);
            }

            //end for re-assign clarification
        }
        if (sRoleId == 7 || sRoleId == 8) {

            var sPicStatus = $('#ddlPictureStatus').val();
            if (sLastPhotoStatus != sPicStatus && sStatusReasonId != 30) {


                var sViewStatus = 1;
                var sStrJsonDt = eval({   //$('#ddlAssignee').val() instead of EmpId  13: Pict Status 37 :updated
                    order_id: Orderid, status_id: 13, emp_ref_no: EmpId, start_datetime: sCurDate,
                    end_datetime: sCurDate, status_reason_id: 37, view_status: sViewStatus,
                    is_photo_upload: sPicStatus
                });
                var Result5 = oAPICall.InsertData(sStrJsonDt, 'CreateOrderStatus');
                if ($('#ddlStatus').val() == 1) {
                    var StrJsonDatas = eval({ emp_ref_no: '' }); //eval({ emp_ref_no: '' });

                    var Result6 = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition);
                }

            }
        }
        if (sRoleId == 12 && $('#ddlCurrentStatus').val() != 34) {
            var StrJsonDatas = eval({ emp_ref_no: '' });

            var Result7 = oAPICall.UpdateData(StrJsonDatas, 'UpdateClientOrder', Condition);
        }






        msgalert('Sucess', 'Order Updated Sucessfully..', 1);//sucess-1, warning-2, error-3

        OrderList();
        // parent.NotificationContainer();
        // parent.RevisionNotificationContainer();

    }
}
//});
function changebtsstatus(tfsstatusid) {
    var oAPICall = new APICall();
    var btsorderid = $('#hdnBTSOrderid').val();
    var StrJsonDatas;

    if (tfsstatusid == 5 && $('#ddlCurrentStatus').val() == 20) {
        StrJsonDatas = eval({
            order_status: 2,
            is_entry_comp: 1
        });
        var Condition = "WHERE order_no = " + btsorderid;
        var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateBtsClientOrder', Condition);
    }
    else if (tfsstatusid == 9 && $('#ddlCurrentStatus').val() == 30) {
        StrJsonDatas = eval({
            order_status: 7, is_photo_upload: 1  //is_photo_upload: 1 is photo uploaded
        });
        var Condition = "WHERE order_no = " + btsorderid;
        var Result = oAPICall.UpdateData(StrJsonDatas, 'UpdateBtsClientOrder', Condition);
    }
    var sPicStatus = $('#ddlPictureStatus').val();
    if (sLastPhotoStatus != sPicStatus) {
        var StrJnDatas = eval({
            is_photo_upload: 1  //is_photo_upload: 1 is photo uploaded
        });
        if (sPicStatus == 1) {
            var StrJnDatas = eval({
                is_photo_upload: 0  //is_photo_upload: 0 is not photo uploaded
            });
        }
        var ConditionBts = "WHERE order_no = " + btsorderid;
        var ResultBts = oAPICall.UpdateData(StrJnDatas, 'UpdateBtsClientOrder', ConditionBts);
    }


}
function GetMoreInfo(orderid, cstatusid, sRowId) {
    parent.$("#myModalOrderHistory").modal({                    // wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": true                     // ensure the modal is shown immediately

    });
    parent.OrderHistoryList(orderid);
}
function GetMoreInfoEdit() {
    parent.$("#myModalOrderHistory").modal({                    // wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": true                     // ensure the modal is shown immediately

    });
    parent.OrderHistoryList(sHdnOrderId);
}
function GetCommentInfo(orderid) {

    parent.$("#myModalCommentHistory").modal({   // wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": true                     // ensure the modal is shown immediately

    });
    if (orderid != '' && orderid != undefined)
        sHdnOrderId = orderid;

    parent.CommentHistoryList(sHdnOrderId);
}



function GetCondition() {

    var custid = 0;
    var empid = 0;
    var menuid = 0;
    var submenuid = 0;
    var sCustName = "Client";

    bgdate = localStorage.getItem("bgidate");
    eddate = localStorage.getItem("edidate");

    //bgdate = new Date(bgdate);
    //eddate = new Date(eddate);
    var sAccessLevel = GetQueryStringParams('AccessLevel');
    var sEmpRefNo = GetQueryStringParams('EmpId');
    var sUserId = GetQueryStringParams('UserId');
    var sEmpOrdStatusId = GetQueryStringParams('StatusId');

    if (GetQueryStringParams('MenuId') != undefined) {
        menuid = GetQueryStringParams('MenuId');
    }
    if (GetQueryStringParams('SubMenuId') != undefined) {
        submenuid = GetQueryStringParams('SubMenuId');
        localStorage.setItem('submenuid', submenuid);
    }
    if (GetQueryStringParams('custid') != undefined) {
        custid = GetQueryStringParams('custid');
        sCustName = GetQueryStringParams('CustName');
        sCustName = sCustName.replace(/%20/g, " ");
        parent.parent.FrameTitleChange(sCustName);

    }
    if (GetQueryStringParams('empid') != undefined) {
        empid = GetQueryStringParams('empid');
    }

    if (empid != 0 && menuid == 0) {
        //var Condition = ' WHERE delete_status=0 and emp_ref_no=' + empid + ' and order_date between ' + bgdate + ' and ' + eddate;
        var Condition = " WHERE delete_status=0 and emp_ref_no=" + empid + "and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '";

    }
    else if (custid != 0 && menuid == 0) {
        var Condition = " WHERE delete_status=0 and master_account_no=" + custid + " and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '";
    }
        //else {
        //    if (menuid == 4) {
        //        var Condition = " WHERE delete_status=0 and status_id=1 "; // and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        //    }
        //    else if (menuid == 5) {
        //        Condition = " WHERE delete_status=0 and (status_id=2 or status_id =10) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        //    }
        //    else if (menuid == 6) {
        //        Condition = " WHERE delete_status=0 and order_rev_no!='NULL'  and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '";
        //    }
    else if (menuid == 3) {

        //if ((sAccessLevel == 4 && sEmpOrdStatusId == 4) || (sAccessLevel == 4 && sEmpOrdStatusId == 2) || (sAccessLevel == 4 && sEmpOrdStatusId == 0))
        //    var Condition = ' WHERE delete_status=0 and emp_ref_no = ' + sEmpRefNo + ' and user_id = ' + sUserId + 'and status_id = ' + sEmpOrdStatusId + ' and order_date between ' + bgdate + ' and ' + eddate;
        ////else if ((sAccessLevel == 4 && menuid == 3))
        //    var Condition = ' WHERE delete_status=0 and emp_ref_no = ' + sEmpRefNo + ' and order_date between ' + bgdate + ' and ' + eddate;
        //else

        if (submenuid == 1) {//Total
            var Condition = " WHERE ((delete_status=0 AND status_id BETWEEN 1 AND 13)  and (ord_revision_flag != 0 or ord_revision_flag is null)) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        }
        else if (submenuid == 2) {//Fresh
            var Condition = " WHERE delete_status=0 AND status_id = 1 and (ord_revision_flag != 0 or ord_revision_flag is null) and order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '";
        }
        else if (submenuid == 3) {//Assigned

            switch (sRoleId) {

                case "5":
                case "6":
                case "12":
                case "59":
                    var Condition = 'WHERE (delete_status=0 AND (status_id = 2 AND emp_ref_no = ' + EmpId + ') or ( delete_status=0 and status_id = 3 and status_reason_id=13 and clarification_status not IN (1,2) AND emp_ref_no = ' + EmpId + ') or (ord_revision_flag = 1 and status_id = 2 and emp_ref_no = ' + EmpId + ') or (ord_revision_flag = 1 and status_id = 1 and emp_ref_no ="") )';
                    break;

                case "8":
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE ( delete_status=0 and  clarification_status not IN (1,2) and ((status_id = 2) or (status_id = 3 and status_reason_id=13)  and (ord_revision_flag != 0 or ord_revision_flag is null) )) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;


            }
        }
        else if (submenuid == 4) {//Research Complted
            switch (sRoleId) {

                case "5":
                case "6":
                case "12":
                case "59":
                    var Condition = ' WHERE (delete_status=0 AND (status_id = 3 and status_reason_id = 14) AND emp_ref_no = ' + EmpId + ')';
                    break;
                case "4":
                    var Condition = ' WHERE (delete_status=0 AND (status_id = 3 and status_reason_id = 14) AND emp_ref_no = ' + EmpId + ')';
                    break;
                case "8":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE delete_status=0 AND  (status_id = 3 and status_reason_id = 14) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        else if (submenuid == 5) {//Data Ready Order
            switch (sRoleId) {

                case "6":
                case "12":
                case "59":
                case "13":
                    var Condition = ' WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null)  and (status_id = 3 and status_reason_id=14 ) or (status_id = 10 and emp_ref_no = ' + EmpId + ') or (status_id in(5,9) and status_reason_id in (19,35) and emp_ref_no = ' + EmpId + ') or (status_id = 4 and status_reason_id in(18,36)) AND (emp_ref_no = ' + EmpId + ' or emp_ref_no is null))';
                    break;
                case "8":
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null) and (status_id = 3 and status_reason_id=14 )  or (status_id = 5 and status_reason_id=19 ) or (status_id = 10) or (status_id = 4 and status_reason_id in(18,36)))";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;
                case "5":

                    var Condition = ' WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null) and (status_id = 10 and emp_ref_no = ' + EmpId + ') or (status_id in(5,9) and status_reason_id in (19,35) and emp_ref_no = ' + EmpId + ') or (status_id = 4 and status_reason_id in(18,36)) AND (emp_ref_no = ' + EmpId + ' or emp_ref_no is null))';
                    break;

            }


        }
        else if (submenuid == 6) {//Completed Order
            switch (sRoleId) {

                case "6":
                case "12":
                    var Condition = ' WHERE (delete_status=0 AND (status_id = 5 and status_reason_id=20 AND emp_ref_no = ' + EmpId + ') or (status_id = 9 and status_reason_id=30 AND emp_ref_no = ' + EmpId + '))';
                    break;
                case "59":
                case "4":
                case "3":
                case "2":
                case "1":
                case "5":
                    var Condition = " WHERE (delete_status=0 AND  (status_id =8 and status_id !=9) or (status_id = 5 and status_reason_id =20 and status_id !=9) )";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '

                    //   var Condition = " WHERE (delete_status=0 AND  (status_id =8) or (status_id = 5 and status_reason_id =20 ))";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;
                case "7":
                case "8":
                    var Condition = " WHERE (delete_status=0 AND  (status_id =8) or (status_id = 5 and status_reason_id =20 ))";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;
                    //var Condition = " WHERE (delete_status=0 AND  (is_qa_submit !=1 or is_qa_submit is null) and  (status_id in(1,2,3,4,5) and status_reason_id in(12,14,18,20,22,26,28)))";// or (status_id >= 5 and status_reason_id >=20 ) and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    //break;

            }

        }
        else if (submenuid == 16) {//All Completed Order For Production Team and Communication
            switch (sRoleId) {

                case "6":
                case "12":
                    var Condition = ' WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null) and (status_id = 5 and status_reason_id=20 AND emp_ref_no = ' + EmpId + ') or (status_id = 9 and status_reason_id=30 AND emp_ref_no = ' + EmpId + '))';
                    break;

                case "4":
                case "3":
                case "2":
                case "1":
                case "59":
                case "5":
                    var Condition = " WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null)  and (status_id =8) or (status_id = 5 and status_reason_id =20 ))";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;
                case "7":
                case "8":
                    // var Condition = "  WHERE ((delete_status=0 AND (is_qa_submit !=1 or is_qa_submit is null) and  (status_id in(5,6,7) and status_reason_id in(20,22,26,28))) or (delete_status=0 AND (is_qa_submit !=1 or is_qa_submit is null) and  status_id =9 and status_reason_id=35 AND emp_ref_no =" + EmpId + "))"
                    // var Condition = " WHERE (delete_status=0 AND (is_qa_submit !=1 or is_qa_submit is null) and  (status_id in(5,6,7) and status_reason_id in(20,22,26,28)))";// or (status_id >= 5 and status_reason_id >=20 ) and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    // break;
                    var Condition = " WHERE (delete_status=0 AND (ord_revision_flag != 0 or ord_revision_flag is null)  and (is_qa_submit !=1 or is_qa_submit is null) and  (status_id in(1,2,3,4,5,6,7,8) and status_reason_id in(11,12,14,18,20,22,16,24,35,36)) or (delete_status=0 AND (is_qa_submit !=1 or is_qa_submit is null) and  status_id =9 and status_reason_id=35 and emp_ref_no = " + EmpId + "))";// or (status_id >= 5 and status_reason_id >=20 ) and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        else if (submenuid == 7) {//submitted order
            switch (sRoleId) {
                case "8":
                case "7":
                case "12":
                    var Condition = ' WHERE (delete_status=0 AND status_id = 9 and status_reason_id = 30)'; // AND (emp_ref_no = ' + EmpId + ')
                    break;
                case "4":
                case "3":
                case "2":
                case "1":
                case "59":
                case "5":
                    var Condition = " WHERE (delete_status=0 AND  status_id = 9 and status_reason_id = 30)";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '  //and status_reason_id != 35 old bf 23 9 2017
                    break;


            }
            // and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        }
        else if (submenuid == 8) {//Review Order
            switch (sRoleId) {

                case "12":
                    var Condition = '  WHERE (delete_status=0 AND status_id IN (3,4,5,6,7,8) and is_review_checked=1 AND (emp_ref_no = ' + EmpId + ' or emp_ref_no is null))';
                    break;
                case "8":
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE delete_status=0 AND status_id IN (3,4,5,6,7,8) and is_review_checked=1";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }
            //var Condition = ' WHERE delete_status=0 AND status_id IN (3,4,5,6,7) and is_review_checked=1';
        }
        else if (submenuid == 9) {//Pending Order
            var Condition = ' WHERE ((delete_status=0 AND  status_id=11 ) or (clarification_status IN (1,2) and status_id != 12 and delete_status=0 )) ';
        }
        else if (submenuid == 10) {//Revsion Order
            var Condition = ' WHERE (delete_status=0 AND  status_id IN (1,2,3,4,5,6) and  ord_revision_flag = 1)';
        }
        else if (submenuid == 11) {//QA Reasearch
            switch (sRoleId) {
                case "59":
                case "12":
                    var Condition = ' WHERE (delete_status=0  and status_id in (3,4) and status_reason_id in (14,16,17) and clarification_status not IN (1,2) AND emp_ref_no = ' + EmpId + ') or (delete_status=0 AND status_id in (3,4) and status_reason_id in (14,16,17) and clarification_status not IN (1,2) and emp_ref_no is null)';
                    break;
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE (delete_status=0  AND  clarification_status not IN (1,2)  and status_id in(3,4) and status_reason_id in (14,16,17))";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        else if (submenuid == 12) {//QA Data Entry
            switch (sRoleId) {
                case "59":
                case "12":
                    var Condition = ' WHERE (delete_status=0 AND  clarification_status not IN (1,2) and (status_id = 8 ) or (status_id in(6,7, 5) and delete_status=0 AND status_reason_id in(20,21,24) )  AND (emp_ref_no = ' + EmpId + ' or emp_ref_no is null))';
                    break;
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE (delete_status=0 AND  clarification_status not IN (1,2)  AND ((status_id = 8) or (status_id in(6,7, 5) and status_reason_id in(20,21,24)))) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }
        }
        else if (submenuid == 13) {//QA Completed
            switch (sRoleId) {
                // and is_review_checked=1 
                case "12":
                    var Condition = ' WHERE delete_status=0  and status_reason_id in(18,22)  AND (emp_ref_no = ' + EmpId + ' )';
                    break;
                case "4":
                case "3":
                case "2":
                case "1":
                case "59":
                    var Condition = " WHERE delete_status=0  and (status_reason_id in (18,22)) ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        else if (submenuid == 14) {//Transfer to Ngl
            switch (sRoleId) {
                // and is_review_checked=1 

                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE delete_status=0  and is_transfer=1 ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        else if (submenuid == 15) {//Transfer from Ngl
            switch (sRoleId) {
                // and is_review_checked=1 

                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE delete_status=0 and is_transfer=2 ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }

        else if (submenuid == 17) {//Cancelled List
            switch (sRoleId) {
                case "59":
                case "8":
                case "4":
                case "3":
                case "2":
                case "1":
                    var Condition = " WHERE delete_status=0 and status_id=12 ";//and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
                    break;

            }

        }
        //if (submenuid == 1) {
        //    var Condition = ' WHERE delete_status=0 AND (status_id BETWEEN 1 AND 7 or status_id =10)  AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 2) {
        //    var Condition = ' WHERE delete_status=0 AND status_id = 1 AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 3) {
        //    var Condition = ' WHERE delete_status=0 AND (status_id = 2 or status_id=10) AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 4) {
        //    var Condition = ' WHERE delete_status=0 AND status_id = 3 AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 5) {
        //    var Condition = ' WHERE delete_status=0 AND status_id = 5 AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 6) {
        //    var Condition = " WHERE delete_status=0 AND status_id = 8 ";// and order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        //}
        //else if (submenuid == 7) {
        //    var Condition = " WHERE delete_status=0 AND status_id = 9  AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + ";//'and  order_date>= '" + bgdate + "' and order_date<='" + eddate + "  23:59:59.599 '
        //}
        //else if (submenuid == 8) {
        //    var Condition = ' WHERE delete_status=0 AND status_id IN (4,6,7) AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 9) {
        //    var Condition = ' WHERE delete_status=0 AND (status_id=11  or clarification_status IN (1,2))  AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 10) {
        //    var Condition = ' WHERE delete_status=0 AND ord_revision_flag = 1 AND  status_id BETWEEN 1 AND 6  AND emp_ref_no = ' + sEmpRefNo + ' AND user_id = ' + sUserId + '';
        //}
        //else if (submenuid == 11) {
        //    var Condition = ' WHERE delete_status=0 AND status_id = 3 and status_reason_id=14 ';
        //}
        //else if (submenuid == 12) {
        //    var Condition = ' WHERE delete_status=0 AND status_id = 5 and status_reason_id=20 ';
        //}
        //else if (submenuid == 13) {
        //    var Condition = ' WHERE delete_status=0 and is_review_checked=1 and status_reason_id in(18,22) ';
        //}
    }
    //}
    //}

    var Fields = 'order_id,order_date,due_date,ordertypename,CM_CUSTOMER_CODE,CM_CUSTOMER_NAME,emp_ref_no,master_account_no,Urgency,Priority,emp_first_name,status_desc,status_reason_desc,delete_status,priority_param_desc,emp_priority,order_rev_no,subject_address,order_urgency, order_priority,c_status_desc, clarification_status,is_transfer,ord_revision_flag,status_id,status_reason_id,photo_req_status_desc,is_qa_sumit,site_ref_no,portal_name';
    return { Condition: Condition, Fields: Fields };
}

function MoreInfoOrder(cellValue, options, rowdata, action) {

    var orderid = null;
    var name = null;
    orderid = rowdata.order_id;
    var cstatusid = rowdata.clarification_status;

    return "<a href='#'  id=" + options.rowId + " onClick='GetMoreInfo(" + orderid + "," + cstatusid + "," + options.rowId + ");' action='moreinfo'><i class='fa fa-history' title='Order History' style='color:blue; font-weight: bold;'></i></a>";

}

function TransferOrder(cellvalue, options, rowObject) {
    if (cellvalue == 1) {
        return '<a href="#" id="' + options.rowId + '" action="edit"><i class="fa fa-exchange text-md" title="Transfer to NGL" style="color:red;"></i> </a>';
    }
    else if (cellvalue == 2) {
        return '<a href="#" id="' + options.rowId + '" action="edit"><i class="fa fa-exchange text-md" title="Transfer From NGL" style="color:blue;"></i> </a>';

    }
    else {
        return '<a href="#" id="' + options.rowId + '" action="edit"><i class="fa fa-transfer text-md" title="Transfer to NGL"></i> </a>';

    }

}

function CommentsStatus(cellvalue, options, rowdata, action) {

    if (cellvalue == 1) {
        var orderid = null;
        var name = null;
        orderid = rowdata.order_id;

        return "<a href='#'  id=" + options.rowId + " onClick='GetCommentInfo(" + orderid + ");' action='CommentInfo'><i class='fa fa-envelope' title='Comments Received' style='font-size: 16px;color:red; align:center;' ></i></a>"; //style='color:blue; font-weight: bold font-size: 16px'

    }
    else {
        var orderid = null;
        var name = null;
        orderid = rowdata.order_id;
        return "<a href='#'  id=" + options.rowId + " onClick='GetCommentInfo(" + orderid + ");' action='CommentInfo'><i class='fa fa-envelope' title='No Comments' style='font-size: 16px;color:blue; align:center;' ></i></a>"; //style='color:blue; font-weight: bold font-size: 16px'

    }
}

function FormatDate(DateToFormat, IsReturnDateObject) {
    try {
        var ConvertedDate = null;
        if (DateToFormat == null || DateToFormat == '')
            return null;
        try {
            var m = DateToFormat.getMonth() + 1;
        }
        catch (ex) {
            DateToFormat = new Date(parseInt(DateToFormat.substr(6)));
        }
        if (IsReturnDateObject)
            return DateToFormat;
        else {
            DateToFormatString = GetDateFormated(DateToFormat, SelectedDateFormat);
            return DateToFormatString;
        }
    }
    catch (ex) {
        return null;
    }
}

function SplitDateTimeString(sFormat, sDateTime, sIsFormat) {

    var sDay = '';
    var sDate = '';
    var iMonth = '';
    var sMonth = '';
    var sYear = '';
    var shours = '';
    var sMinutes = '';
    var sSeconds = '';
    var sMilliseconds = '';
    var sParameterName = '';

    if (sFormat == 'mm/dd/yy') {

        if (sIsFormat == 0) {
            sDateTimeSplit = sDateTime.split('/');
            sDate = sDateTimeSplit[0];
            iMonth = sDateTimeSplit[1];
            sYear = sDateTimeSplit[2];
            sParameterName = sYear + ',' + iMonth + ',' + sDate;
        }
        else if (sIsFormat == 1) {
            var dt1 = new Date(sDateTime);

            sDate = dt1.getDate();
            //iMonth = dt1.getMonth() + 1;
            iMonth = (dt1.getMonth() + 1).toString().length > 1 ? (dt1.getMonth() + 1).toString() : ('0' + (dt1.getMonth() + 1).toString());
            sYear = dt1.getFullYear();
            //Sample Return String: 23/05/2015
            sParameterName = iMonth + '/' + sDate + '/' + sYear;
        }
        else if (sIsFormat == 2) {

            var dt1 = new Date(sDateTime);

            sDate = dt1.getDate();
            iMonth = dt1.getMonth();

            //iMonth = (dt1.getMonth() + 1).toString().length > 1 ? (dt1.getMonth() + 1).toString() : ('0' + (dt1.getMonth() + 1).toString());

            sYear = dt1.getFullYear();
            sDay = dt1.getDay();

            //            shours = dt1.getHours();
            //            sMinutes = dt1.getMinutes();
            //            sSeconds = dt1.getSeconds();
            //            sMilliseconds = dt1.getMilliseconds();

            shours = 2;
            sMinutes = 3;
            sSeconds = 5;
            sMilliseconds = 551;

            //Sample Return String: 1 Jan 2011, 02:03:04.567
            sParameterName = sYear + ',' + iMonth + ',' + sDay + ',' + shours + ',' + sMinutes + ',' + sSeconds + ',' + sMilliseconds;
        }

    }

    return sParameterName;

}

function GetDateFormated(sDateTime, dtFormat) {

    try {


        sDateTime = SplitDateTimeString(dtFormat, sDateTime, 1);
        return sDateTime;
    }
    catch (ex) {
        alert(ex.message);
    }
}

function DateFormat(cellvalue, options, rowObject) {
    if (cellvalue != '') {
        //cellvalue = FormatDate(cellvalue, 1);
        return GetDateFormated(cellvalue, 'mm/dd/yy');
    }
}

function FormateGrid() {

    $("#tblOrderListGrid").jqGrid('setGridParam',
   {
       loadComplete: function () {
           var rowIds = $('#tblOrderListGrid').jqGrid('getDataIDs');
           var flage = 0;
           var sQaFlag = 0;
           inprogress = [];
           sQaInprogress = [];
           var Emp = EmpId;
           sRoleId = access_level;
           for (i = 0; i < rowIds.length; i++) {//iterate over each row
               rowData = $('#tblOrderListGrid').jqGrid('getRowData', rowIds[i]);
               //set background style if ColValue === true\

               if (rowData['photo_req_status_desc'] == 'Received') {

                   $('#tblOrderListGrid').setCell(rowIds[i], 'photo_req_status_desc', '', { background: 'red', color: 'white' });

               }
               if (rowData['photo_req_status_desc'] == 'Uploaded') {

                   $('#tblOrderListGrid').setCell(rowIds[i], 'photo_req_status_desc', '', { background: 'yellow', color: 'red' });

               }
               if ((rowData['status_id'] == 5 && rowData['status_reason_id'] == 19 && rowData['emp_ref_no'] == Emp) && (rowData['clarification_status'] == 0 || rowData['clarification_status'] == 3)) {

                   inprogress[flage] = rowData['order_id'];
                   flage++;

               }

               var sOrderDueDt = rowData['due_date'];

               var cd = new Date();
               var sOrdDueDt = new Date(sOrderDueDt);
               // cd = dateFormat(cd, "isoDateTime");

               if (rowData['status_id'] != "9" && cd > sOrdDueDt) {//Order Due

                   $('#tblOrderListGrid').jqGrid('setRowData', rowIds[i], false, { color: 'black', weightfont: 'bold', background: '#f78181' });//light red
               }
               if (rowData['ord_revision_flag'] == 2) { //Redo
                   $('#tblOrderListGrid').jqGrid('setRowData', rowIds[i], false, { color: 'black', weightfont: 'bold', background: '#f3f19c' });//yellow #7ac0ef
               }
               if (rowData['clarification_status'] == "1" || rowData['clarification_status'] == "2") {//Pending or Clarification

                   $('#tblOrderListGrid').jqGrid('setRowData', rowIds[i], false, { color: 'black', weightfont: 'bold', background: '#7ac0ef' });//blue
               }
               if (rowData['ord_revision_flag'] == 1) { //Revision
                   $('#tblOrderListGrid').jqGrid('setRowData', rowIds[i], false, { color: 'black', weightfont: 'bold', background: '#d47d00' });//brown
               }


               if (sRoleId == 12) {
                   if ((rowData['status_reason_id'] == 17 || rowData['status_reason_id'] == 21) && rowData['emp_ref_no'] == Emp) {

                       sQaInprogress[sQaFlag] = rowData['order_id'];
                       sQaFlag++;

                   }
               }
           }

       },

       onSortCol: function (index, columnIndex, sortOrder) {
           var columModel = $(this).jqGrid("getGridParam", "colModel");
           sortorder = (columModel[columnIndex].name + ' ' + sortOrder);
           ListGrid(page, searchcondition);
       }

   }).trigger('reloadGrid');
}

var flag = true;
$(function () {
    $('#ddlClarificationStatus').change(function (e) {

        if (!flag) {
            if ($('#ddlClarificationStatus').val() == 1 || $('#ddlClarificationStatus').val() == 2) {
                $('#ddlCurrentStatus').val(34).change();

                msgalert('Warning', 'please add comments and continue.', 2);
                GetCommentInfo();
            }
        }
        else {
            e.preventDefault();
            flag = false;
            return
        }



        var sStatus = $('#ddlStatus').val();
        var sStatusReasId = $('#ddlCurrentStatus').val();

        if ($('#ddlClarificationStatus').val() == 3) {
            if (sStatus == 3) {
                // BindStatus();
                $('#ddlStatus').val(1).change();
                BindStatusReason(1);
                $('#ddlCurrentStatus').val(11).change();
                $('#ddlAssignee').val(-1).change();
            }
            else if (sStatus == 5) {
                // BindStatus();
                $('#ddlStatus').val(3).change();
                BindStatusReason(3);
                $('#ddlCurrentStatus').val(14).change();
                $('#ddlAssignee').val(-1).change();
            }
            else if (sStatus == 9) {
                //  BindStatus();
                $('#ddlStatus').val(5).change();
                BindStatusReason(5);
                $('#ddlCurrentStatus').val(20).change();
                $('#ddlAssignee').val(-1).change();
            }
        }
        else {

        }
    });

    $('#ddlCurrentStatus').change(function () {
        if ($('#ddlCurrentStatus').val() == 36) {
            msgalert('Warning', 'please add comments and continue.', 2);
        }
    });



    $('#ddlPictureStatus').change(function () {

        $('#ddlPictureStatus').attr('disabled', false);

        var sPhtStatus = $('#ddlPictureStatus').val();
        var sStatus = $('#ddlStatus').val();
        var sCurrent_status = $('#ddlCurrentStatus').val();

        if (sPhtStatus == 3 && $('#ddlStatus').val() == 5 && $('#ddlCurrentStatus').val() == 20) {
            $('#ddlStatus').val('9').change();
            BindStatusReason(9);
            $('#ddlCurrentStatus').val('35').change();
            $('#ddlPictureStatus').attr('disabled', true);
        }
        if (sPhtStatus == 3 && $('#ddlStatus').val() == 6 && $('#ddlCurrentStatus').val() == 22) {
            $('#ddlStatus').val('9').change();
            BindStatusReason(9);
            $('#ddlCurrentStatus').val('35').change();
            $('#ddlPictureStatus').attr('disabled', true);
        }
        if (sRoleId == 8 || sRoleId == 3) {
            document.getElementById("btnSave").style.display = "block";
        }



    });


});




