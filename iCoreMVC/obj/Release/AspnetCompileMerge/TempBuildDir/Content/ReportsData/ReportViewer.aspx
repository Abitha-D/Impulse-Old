<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportViewer.aspx.cs" Inherits="iCoreMVC.Content.ReportsData.ReportViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body >
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
       <center> <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%"  DocumentMapWidth="100%" SizeToReportContent="True" Visible="False"  ></rsweb:ReportViewer>
    </center></div>
    </form>
</body>
</html>


<%--<script>
    $(function () {
        var newheight = $(window).height() - 55;
        $('#ReportViewer1').css({ height: newheight + 'px' });
    });

    $(window).resize(function () {
        var newheight = $(window).height() - 55;
        $('#ReportViewer1').css({ height: newheight + 'px' });
    });
</script>--%>