var UserSession, ImpliedDecimal_Number, ImpliedDecimal_Amount, ImpliedDecimal_Distnace, ImpliedDecimal_Qty, ImpliedDecimal_PJM, CompanyLanguage;
var FinancialYearID, CurrentUser, CurrentUserName, SelectedDateFormat, SelectedDateFormatForGrid, CompanyID, CompanyName, dateString, FinancialYear;
var EmpId, access_level;

function UserConfig() {
    this.InitilizeUserConfig = function (retData) {
        var userData = eval(retData);
        FinancialYear = userData.FinYear;
        CompanyID = userData.OwningCostID;
        UserSession = userData.SessionID;
        CurrentImpliedDecimal = userData.Implied_Number;
        CurrentImpliedDecimalAmt = userData.Implied_Amount;
        ImpliedDecimal_Distnace = userData.Implied_Distance;
        ImpliedDecimal_Qty = userData.Implied_Quantity;
        ImpliedDecimal_PJM = userData.Implied_Quantity_PJM;
        CompanyLanguage = userData.CompanyLanguage;
        FinancialYearID = userData.FinYearID;
        CurrentUser = userData.UserID;
        CurrentUserName = userData.UserName;
        SelectedDateFormat = userData.DateFormat;
        SelectedDateFormatForGrid = userData.DateFormatForGrid;
        CompanyName = userData.CompanyName;
        EmpId = userData.EmployeeId;
        access_level = userData.AccessLevel;
        UserThemePref = userData.UserThemePref;
        CurrentDate = new Date();
    };
}