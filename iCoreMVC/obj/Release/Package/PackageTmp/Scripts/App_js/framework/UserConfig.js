var UserSession, CompanyLanguage, UserThemePref, CurrentDate;
var FinancialYearID, CurrentUser, CurrentUserName, SelectedDateFormat, SelectedDateFormatForGrid, CompanyID, CompanyName, dateString, FinancialYear;
var EmpId, access_level;

function UserConfig() {
    this.InitilizeUserConfig = function (retData) {
        var userData = eval(retData);
        FinancialYear = userData.FinYear;
        CompanyID = userData.OwningCostID;
        UserSession = userData.SessionID;
        CompanyLanguage = userData.CompanyLanguage;
        FinancialYearID = userData.FinYearID;
        CurrentUser = userData.UserID;
        CurrentUserName = userData.UserName;
        SelectedDateFormat = userData.DateFormat;
        SelectedDateFormatForGrid = userData.DateFormatForGrid;
        CompanyName = userData.CompanyName;
        EmpId = userData.EmployeeId;
        RoleId = userData.RoleId;
        access_level = userData.AccessLevel;
        UserThemePref = userData.UserThemePref;
        CurrentDate = new Date();
    };
}