/* Field Level Validations Ends*/
$(document).on("keydown", ".allow-characters", function (event) {
    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything       
        return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
            event.preventDefault();
            AlertWarning('Only Characters Allowed');
        }
    }
});

$(document).on("keypress", ".allow-alphanumeric", function (event) {
    var InputValue = event.char;
    var AlphaNumericRegExp = /^[0-9A-Za-z]+$/;
    var Result = InputValue != '' ? AlphaNumericRegExp.test(InputValue) : '';
    if (Result == false) {
        event.preventDefault();
        AlertWarning('Only Numbers & Letters Allowed');
    }
});

$(document).on("keydown", ".allow-numbers", function (event) {
    // Allow: backspace, delete, tab, escape, enter and . // Allow: Ctrl+A // Allow: home, end, left, right
    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
            AlertWarning('Only Numbers Are Allowed');
        }
    }
});
$(document).on("keydown", ".allow-dec-number", function (event) {
    // Allow: backspace, delete, tab, escape, enter and . // Allow: Ctrl+A // Allow: home, end, left, right
    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode <= 46 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
            AlertWarning('Only Numbers Are Allowed');
        }
    }
});

$(document).on("keypress", "allow-phonenumber", function (event) {
    var InputValue = event.char;
    var PhoneNumberRegExp = /^\s*\d{10}\s*$/;
    var Result = InputValue != '' ? PhoneNumberRegExp.test(InputValue) : '';
    if (Result == false) {
        event.preventDefault();
        AlertWarning('Invalid Phone Number');
    }
});

//$(".allow-email").focusout(function () {
//    var InputValue = $(this).val();
//    var emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//    var Result = InputValue != '' ? emailRegExp.test(InputValue) : '';
//    if (Result == false) {
//        event.preventDefault();
//        AlertWarning('Invalid Email');
//    }
//});

/* Field Level Validations Ends*/


///////////////////////////////////////////start encode/////////////////////////////////////

var base64Chars = new Array(
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '+', '/'
    );

var reverseBase64Chars = new Array();

for (var i = 0; i < base64Chars.length; i++) {
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
var END_OF_INPUT = -1;


var qRegdata ='@';

function setBase64Str(str) {
    base64Str = str;
    base64Count = 0;
}

function readBase64() {
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}

function encode64(str) {

    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT) {
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[inBuffer[0] >> 2]);
        if (inBuffer[1] != END_OF_INPUT) {
            result += (base64Chars[((inBuffer[0] << 4) & 0x30) | (inBuffer[1] >> 4)]);
            if (inBuffer[2] != END_OF_INPUT) {
                result += (base64Chars[((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6)]);
                result += (base64Chars[inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars[((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars[((inBuffer[0] << 4) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76) {
            result += ('\n');
            lineCount = 0;
        }
    }
   //
    return result;
}

function readReverseBase64() {

    if (!base64Str) return END_OF_INPUT;
    while (true) {
        if (base64Count >= base64Str.length) return END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]) {
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    }
    return END_OF_INPUT;
}

function ntos(n) {

    n = n.toString(16);
    if (n.length == 1) n = "0" + n;
    n = "%" + n;
    return unescape(n);
}

function decodeBase64(str) {

    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT) {
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff) | inBuffer[1] >> 4));
        if (inBuffer[2] != END_OF_INPUT) {
            result += ntos((((inBuffer[1] << 4) & 0xff) | inBuffer[2] >> 2));
            if (inBuffer[3] != END_OF_INPUT) {
                result += ntos((((inBuffer[2] << 6) & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}

////////////////////////////////////////////end/////////////////////////////////////////////

function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

function CheckPasswordStrength(password) {
    var password_strength = document.getElementById("password_strength");

    //TextBox left blank.
    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }

    //Regular Expressions.
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    var passed = 0;

    //Validate for each Regular Expression.
    for (var i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password)) {
            passed++;
        }
    }

    //Validate for length of Password.
    if (passed > 2 && password.length > 8) {
        passed++;
    }

    //Display status.
    var color = "";
    var strength = "";
    switch (passed) {
        case 0:
        case 1:
            strength = "Weak";
            color = "red";
            break;
        case 2:
            strength = "Good";
            color = "darkorange";
            break;
        case 3:
        case 4:
            strength = "Strong";
            color = "green";
            break;
        case 5:
            strength = "Very Strong";
            color = "darkgreen";
            break;
    }
    password_strength.innerHTML = strength;
    password_strength.style.color = color;
}


function Check_MonthClosing(Date_Field, FieldNames, ServiceName) {

    $.support.cors = true;
    var Condition = "where start_of_period <= DATEADD(MONTH, DATEDIFF(MONTH, 0, '" + Date_Field + "'), 0) and end_of_period >= DATEADD(MONTH, DATEDIFF(MONTH, 0, '" + Date_Field + "'), 0)";
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.SelectData(strJsonDatas, 'Get_FinYrData');
    return Result[0].period_status;
}

function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
function Is_valid_url(url) {
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}

function Check_Employee_User_Access(strFieldCondition, EmpId, access_level, ID, ServiceName) {
    $.support.cors = true;
    var Condition = "where emp_id =" + EmpId;
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: null });
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.SelectData(strJsonDatas, 'SelectEmpUser_Access');
    var dept_id;
    var station_id;
    var Condition = "";
    var location_id;
    var dept_list = [];
    var station_list = [];
    var location_list = [];
    if (Result == "" || Result == null) {
    }
    else {
        for (var i = 0; i < Result.length; i++) {
            dept_id = Result[i]["department_id"];
            if (dept_id == "" || dept_id == null) {
            }
            else {
                dept_list.push(dept_id);
            }
            station_id = Result[i]["station_id"];
            if (station_id == "" || station_id == null) {
            }
            else {
                station_list.push(station_id);
            }
            location_id = Result[i]["location_id"];
            if (location_id == "" || location_id == null) {

            }
            else {
                location_list.push(location_id);
            }
            employee_id = Result[i]["emp_id"];
        }


        if (strFieldCondition != null && strFieldCondition != '') {
            if (access_level == 5) {
                if ((location_list != "") && (station_list != "") && (dept_list != "")) {
                    Condition = strFieldCondition + ' and EM_DEPT_ID in (' + dept_list + ') and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1 ' + ID + '';
                }
                else if (location_list != "" && station_list != "" && dept_list == "") {
                    Condition = strFieldCondition + ' and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
                else if (location_list != "" && station_list == "" && dept_list == "") {
                    Condition = strFieldCondition + ' and LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
                else if (location_list == "" && station_list == "" && dept_list == "") {
                    Condition = strFieldCondition + ' and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
            }
            else {
                if ((location_list != "") && (station_list != "") && (dept_list != "")) {
                    Condition = strFieldCondition + ' and EM_DEPT_ID in (' + dept_list + ') and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1 ' + ID + '';
                }
                else if (location_list != "" && station_list != "" && dept_list == "") {
                    Condition = strFieldCondition + ' and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1  ' + ID + '';
                }
                else if (location_list != "" && station_list == "" && dept_list == "") {
                    Condition = strFieldCondition + ' and LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1  ' + ID + '';
                }
                else if (location_list == "" && station_list == "" && dept_list == "") {
                    Condition = strFieldCondition + ' and delete_status <> 1  ' + ID + '';
                }
            }
        }
        else {
            if (access_level == 5) {
                if ((location_list.length > 0) && (station_list.length > 0) && (dept_list.length > 0)) {
                    Condition = 'where  EM_DEPT_ID in (' + dept_list + ') and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length > 0 && station_list.length > 0 && dept_list.length < 1) {
                    Condition = 'where station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length > 0 && station_list.length < 1 && dept_list.length < 1) {
                    Condition = 'where LM_LOCATION_ID in (' + location_list + ') and em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length < 1 && station_list.length < 1 && dept_list.length < 1) {
                    Condition = 'where em_employee_id = ' + EmpId + ' and delete_status <> 1  ' + ID + '';
                }

            }
            else {

                if ((location_list.length > 0) && (station_list.length > 0) && (dept_list.length > 0)) {
                    Condition = 'where  EM_DEPT_ID in (' + dept_list + ') and station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length > 0 && station_list.length > 0 && dept_list.length < 1) {
                    Condition = 'where  station_id in (' + station_list + ') and LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length > 0 && station_list.length < 1 && dept_list.length < 1) {
                    Condition = 'where LM_LOCATION_ID in (' + location_list + ') and delete_status <> 1  ' + ID + '';
                }
                else if (location_list.length < 1 && station_list.length < 1 && dept_list.length < 1) {
                    Condition = 'where delete_status <> 1  ' + ID + '';
                }
            }
        }
    }
    return Condition;
}

function GenerateUniqNo() {

    var currentDate = new Date();
    var y = null;
    y = currentDate.getFullYear()
    var m = null;
    m = currentDate.getMonth() + 1  // added +1 because javascript counts month from 0
    var d = null;
    d = currentDate.getDate();
    var ms = null;
    ms = currentDate.getMilliseconds();
    var h = null;
    h = currentDate.getHours();
    var mn = null;
    mn = currentDate.getMinutes();
    var s = null;
    s = currentDate.getSeconds();
    var Session = null;
    Session = UserSession;
    var UniqNo = UserSession + y + m + d + h + mn + s + ms;
    return UniqNo;
}

function Calc_Implied_Decimal(Amount, Implied_decimal) {
    if (Implied_decimal == 1) {
        Amount = Amount / 10;
    }
    else if (Implied_decimal == 2) {
        Amount = Amount / 100;
    }
    else if (Implied_decimal == 3) {
        Amount = Amount / 1000;
    }
    else if (Implied_decimal == 4) {
        Amount = Amount / 10000;
    }
    else if (Implied_decimal == 5) {
        Amount = Amount / 100000;
    }
    else if (Implied_decimal == 6) {
        Amount = Amount / 1000000;
    }
    else if (Implied_decimal == 7) {
        Amount = Amount / 10000000;
    }
    return Amount;
}

function Calc_Implied_Decimal_Multiply(Amount, Implied_decimal) {
    if (Implied_decimal == 1) {
        Amount = Amount * 10;
    }
    else if (Implied_decimal == 2) {
        Amount = Amount * 100;
    }
    else if (Implied_decimal == 3) {
        Amount = Amount * 1000;
    }
    else if (Implied_decimal == 4) {
        Amount = Amount * 10000;
    }
    else if (Implied_decimal == 5) {
        Amount = Amount * 100000;
    }
    else if (Implied_decimal == 6) {
        Amount = Amount * 1000000;
    }
    else if (Implied_decimal == 7) {
        Amount = Amount * 10000000;
    }
    return Amount;
}


/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        //if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "dd/mm/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function FormatTimeAMPM(datetime) {

    var date = new Date(datetime);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = hours + ":" + minutes + " " + am_pm;
    return time;
};

function formatedatetoDB(date)//date string
{
    var d = [];
    d = date.split("/");
    var day = d[0];
    var month = d[1];
    var year = d[2];
    var sDate = year + "-" + month + "-" + day;
    //var nDate = new Date(sDate);
    return sDate;
}
function GetCurrentDateTime() {




    var now = new Date();
    var DateTimeString = now.format("ddd mmm dd yyyy HH:MM:ss");
    return DateTimeString;


    /*
    var SelDateFormat = null;
    SelDateFormat = GetSystemParamValue('DATE_FORMAT', false, ServiceName);

    */
    //  var DateString = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    /*  var DateString = jQuery.datepicker.parseDate(DateFormat, currentDate);

    h = currentDate.getHours();
    var mn = null;
    mn = currentDate.getMinutes();
    var s = null;
    s = currentDate.getSeconds();

    var Time = h + ':' + mn + ':' + s;

    var CurDateTimeString = DateString + Time;
    return CurDateTimeString;*/

}
function GetCurrentDateTimeForDB() {


    var currentDate = new Date();
    var y = null;
    y = currentDate.getFullYear()
    var m = null;
    m = currentDate.getMonth() + 1  // added +1 because javascript counts month from 0
    var d = null;
    d = currentDate.getDate();
    var ms = null;
    ms = currentDate.getMilliseconds();
    var h = null;
    h = currentDate.getHours();
    var mn = null;
    mn = currentDate.getMinutes();
    var s = null;
    s = currentDate.getSeconds();

    var DateTime = y + '/' + m + '/' + d + ' ' + h + ':' + mn + ':' + s + ':' + ms;
    return DateTime;

}
function GetCurrentDateForDB() {


    var currentDate = new Date();
    var y = null;
    y = currentDate.getFullYear()
    var m = null;
    m = currentDate.getMonth() + 1  // added +1 because javascript counts month from 0
    var d = null;
    d = currentDate.getDate();

    var DateTime = y + '/' + m + '/' + d;
    return DateTime;

}
function FormatDateForDatePicker(DateToFormat, IsReturnDateObject) {

    try {

        var ConvertedDate = null;
        if (DateToFormat == null || DateToFormat == '')
            return null;
        var parsedDate = new Date(parseInt(IsReturnDateObject.substr(6)));
        //        if (IsReturnDateObject)
        //            ConvertedDate = new Date(parsedDate); //Date object
        //        else {
        if (IsReturnDateObject) {
            var y = parsedDate.getFullYear()
            var m = parsedDate.getMonth() + 1  // added +1 because javascript counts month from 0
            var d = parsedDate.getDate()
            var ConvDate = d + '/' + m + '/' + y;
        }
        //        }
        return ConvDate;
    }
    catch (ex) {
        return null;
    }
}
function FormatDateForDatePicker1(DateToFormat, IsReturnDateObject) {

    try {

        var ConvertedDate = null;
        if (DateToFormat == null || DateToFormat == '')
            return null;
        var parsedDate = new Date(parseInt(DateToFormat.substr(6)));
        if (IsReturnDateObject)
            ConvertedDate = new Date(parsedDate); //Date object
        else {
            var y = parsedDate.getFullYear()
            var m = parsedDate.getMonth() + 1  // added +1 because javascript counts month from 0
            var d = parsedDate.getDate()
            var h = parsedDate.getHours();
            var min = parsedDate.getMinutes();
            ConvertedDate = m + '/' + d + '/' + y + ' ' + h + ':' + min;

        }
        return ConvertedDate;
    }
    catch (ex) {
        return null;
    }
}
function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function formatJSONDate(jsonDate) {
    var newDate = dateFormat(jsonDate, SelectedDateFormat);
    return newDate;
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

    if (sFormat == 'dd/mm/yy') {

        if (sIsFormat == 0) {
            sDateTimeSplit = sDateTime.split('/');
            sDate = parseInt(sDateTimeSplit[0]);
            iMonth = parseInt(sDateTimeSplit[1]);
            sYear = sDateTimeSplit[2];

            //Sample Return String: 2015,05,23
            sParameterName = sYear + ',' + iMonth + ',' + sDate;

        }
        else if (sIsFormat == 1) {
            var dt1 = new Date(sDateTime);

            //sDate = dt1.getDate();

            sDate = (dt1.getDate()).toString().length > 1 ? (dt1.getDate()).toString() : ('0' + (dt1.getDate()).toString());
            iMonth = (dt1.getMonth() + 1).toString().length > 1 ? (dt1.getMonth() + 1).toString() : ('0' + (dt1.getMonth() + 1).toString());
            sYear = dt1.getFullYear();

            //Sample Return String: 23/05/2015
            sParameterName = sDate + '/' + iMonth + '/' + sYear;
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


function inputControl1(input, format) {

    var value = input.val();
    var values = value.split("");
    var update = "";
    var transition = "";
    if (format == 'int') {
        expression = /^([1,2,3])$/;
        finalExpression = /^([1,2,3])$/;
    }
    for (id in values) {
        if (expression.test(values[id]) == true && values[id] != '') {
            transition += '' + values[id].replace(',', '.');
            if (finalExpression.test(transition) == true) {
                update += '' + values[id].replace(',', '.');
            }
        }
    }
    input.val(update);
}
function inputControl(input, format) {

    var value = input.val();
    var values = value.split("");
    var update = "";
    var transition = "";
    if (format == 'int') {
        expression = /^([0-9])$/;
        finalExpression = /^([1-9][0-9]*)$/;
    }
    else if (format == 'float') {
        var expression = /(^\d+$)|(^\d+\.\d+$)|[,\.]/;
        var finalExpression = /(^\d+$)|(^\d+\.\d+$)|[,\.]/;
        /* /^([1-9][0-9]*[,\.]?\d{0,2})$/; */
    }
    for (id in values) {
        if (expression.test(values[id]) == true && values[id] != '') {
            transition += '' + values[id].replace(',', '.');
            if (finalExpression.test(transition) == true) {
                update += '' + values[id].replace(',', '.');
            }
        }
    }
    input.val(update);
}

function ConvertToImpliedInt(InputValue, ImpliedDecimal) {

    var InputVal = "";
    InputVal = InputValue;
    var NumericValue = parseFloat(InputVal).toFixed(ImpliedDecimal);

    var stringVal = "";
    stringVal = NumericValue;

    var FindIndex = stringVal.indexOf(".");
    if (FindIndex < 0) {
        return;
    }
    var IntPart = stringVal.substring(0, FindIndex);
    var DecimalPart = stringVal.substring(FindIndex + 1, NumericValue.length);

    var ConvertedIntVal = IntPart + DecimalPart;
    return ConvertedIntVal;

}
function RoundToImpliedDecimal(InputValue, ImpliedDecimal) {

    var InputVal = "";
    InputVal = InputValue;
    var NumericValue = parseFloat(InputVal).toFixed(ImpliedDecimal);
    return NumericValue;
}
function ConvertToNumericAccToImpliedDecimal(InputVal, ImpliedDecimal) {
    var IntVal = 0;
    var FloatVal = InputVal;
    for (i = 0; i < ImpliedDecimal; i++) {

        FloatVal = FloatVal / (1 * 10)
    }
    return FloatVal;
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
function DateOnly(DateToFormat) {
    try {

        var y = DateToFormat.getFullYear()
        var m = DateToFormat.getMonth() + 1  // added +1 because javascript counts month from 0
        var d = DateToFormat.getDate()
        var ConvertedDate = m + '/' + d + '/' + y;
        var newDate = jQuery.datepicker.parseDate('m/dd/yy', ConvertedDate);
        new Date(ConvertedDate);
        return ConvertedDate;

    }
    catch (ex) {
        return null;
    }

}
function fn_IsDateEqual(DateA, DateB) {

    try {
        var a = new Date(DateA);
        var b = new Date(DateB);

        var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

        if (parseFloat(msDateA) == parseFloat(msDateB))
            return true;  // eq      
        else
            return false;
    }
    catch (ex) {
        return false;
    }

}
function fn_DateCompare(DateA, DateB) {
    try {
        var a = new Date(DateA);
        var b = new Date(DateB);

        var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

        if (parseFloat(msDateA) == parseFloat(msDateB))
            return 1;  // equal
        else if (parseFloat(msDateA) < parseFloat(msDateB))
            return 2;  // A amaller
        else if (parseFloat(msDateA) > parseFloat(msDateB))
            return 3;  //  A greater        
        else
            return -1;
    }
    catch (ex) {
        return -1;
    }

}


function fn_DateOverLapingCheck(DateA, DateB, CheckDate) {
    try {
        var a = new Date(DateA);
        var b = new Date(DateB);
        var c = new Date(CheckDate);
        var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());
        var msCheckDate = Date.UTC(c.getFullYear(), c.getMonth() + 1, c.getDate());


        /*   if (parseFloat(msDateA) == parseFloat(msDateB))
        return 1;  // equal
        else if (parseFloat(msDateA) < parseFloat(msDateB))
        return 2;  // A amaller
        else if (parseFloat(msDateA) > parseFloat(msDateB))
        return 3;  //  A greater        
        else
        return -1;*/

        if (parseFloat(msDateA) < parseFloat(msCheckDate) && parseFloat(msDateB) > parseFloat(msCheckDate))
            return false;
        else if (parseFloat(msDateA) == parseFloat(msCheckDate))
            return false;
        else if (parseFloat(msDateB) == parseFloat(msCheckDate))
            return false;
        else
            return true;
    }
    catch (ex) {
        return false;
    }

}


function FormatCurrency(CurrencyToFormat) {
    var FormatedCurrency = jQuery.format(CurrencyToFormat, "c");
    return FormatedCurrency;
}

function FormatUnit(UnitToFormat) {
    var FormatedUnit = jQuery.format(UnitToFormat, "n2");
    return FormatedUnit;
}



/*  var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
var ck_username = /^[A-Za-z0-9_]{1,20}$/;
var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;*/





//  Not tested
//select integers only
var intRegex = /[0-9 -()+]+$/;
//match any ip address
var ipRegex = '\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b';
//match number in range 0-255
var num0to255Regex = '^([01][0-9][0-9]|2[0-4][0-9]|25[0-5])$';
//match number in range 0-999 
var num0to999Regex = '^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$';
//match ints and floats/decimals
var floatRegex = '[-+]?([0-9]*\.[0-9]+|[0-9]+)';
//Match Any number from 1 to 50 inclusive
var number1to50Regex = /(^[1-9]{1}$|^[1-4]{1}[0-9]{1}$|^50$)/gm;

//match credit card numbers
var creditCardRegex = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$';
//match username
var usernameRegex = '/^[a-z0-9_-]{3,16}$/';
//match password
var passwordRegex = '/^[a-z0-9_-]{6,18}$/';
//Match 8 to 15 character string with at least one upper case letter, one lower case letter, and one digit (useful for passwords).
var passwordStrengthRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm;
//match elements that could contain a phone number
var phoneNumber = /[0-9-()+]{3,20}/;

//MatchDate (e.g. 21/3/2006)
///^\d{1,2}\/\d{1,2}\/\d{4}$/;




//match a url slug (letters/numbers/hypens)
var urlslugRegex = '/^[a-z0-9-]+$/';


/*
http://www.misfitgeek.com/2011/06/textboxfilter-maskededit/
// only numbers are allowed
$('#text_input_1').filter_input({ regex: '[0-9]' });
 
// only lowercase alphabets are allowed
$('#text_input_2').filter_input({ regex: '[a-z]' });
 
// only URL safe characters are allowed
$('#text_input_3').filter_input({ regex: '[a-zA-Z0-9_]' });
 
$('#date').mask('99/99/9999');
$('#phone').mask('(999) 999-9999');
$('#ssn').mask('999-99-9999');
$('#otherphone').mask('(999) 999-9999', { placeholder: 'x' });

*/


// tested
var NumberField = /^\s*\d{10}\s*$/;
var MobileNumberField = /^\s*\d{10}\s*$/;
//match character only
//var CharacterField = /^\s*[a-z]\s*$/i;
//match email address
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var dateRegex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
//match date in format MM/DD/YYYY
var dateMMDDYYYRegex = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/;
//match date in format DD/MM/YYYY
var dateDDMMYYYRegex = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
//match a url
var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
// character only
var CharacterField = /^[A-Za-z]{3,30}$/;
//maxlegth
var POBoxField = /^[0-9][0-9\- ]{0,10}[0-9]$/;

var maxlength = /^.{2,40}/
//number only
var NumberFieldonly = /^[0-9]+$/;
function isValidDate(DateString) {
    try {

        if (DateString == null || DateString == '')
            return false;
        var ConvertedDate = new Date(DateString);
        var m = ConvertedDate.getMonth();
        if (m > 0 && m < 13)
            return true;
        else
            return false;
    }
    catch (ex) {

        return false;
    }
}

function ValidateSetupCode(inputControl) {

    var inputvalue = inputControl.val();

    if (inputvalue.length == 0) {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;
    }

    var FindIndex = inputvalue.indexOf(" ");
    if (FindIndex < 0) {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;
    }
    else {
        errorPlacement('Space is not allowed', inputControl);
        $(inputControl).removeClass('txtClass');
        $(inputControl).addClass('txtClassErr');
        return false;
    }

}

function ValidatePOBOX(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, " POBox No", POBoxField);
}

function ValidatePhone(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, " Phone number", NumberField);
}
function ValidateNumber(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, "Number", NumberField);
}
function ValidateCharacter(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, "Character", CharacterField);
}
function ValidateMaxlength(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, "Length", maxlength);
}
function ValidateFax(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, "Fax number", NumberField);
}
function ValidateMobile(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, " Mobile number", MobileNumberField);
}
function ValidateEmail(inputControl, Mandatory) {
    return ValidateControls(inputControl, Mandatory, " E- Mail Address", emailRegex);
}
function ValidateNumberField(inputControl, IsMandatory) {
    return ValidateControls(inputControl, IsMandatory, "Number", NumberFieldonly);
}
function ValidateWebSite(inputControl, Mandatory) {
    return ValidateControls(inputControl, Mandatory, " WebSite", urlRegex);
    return true;
}
function ValidateMandatory(inputControl) {
    return ValidateMandatoryControls(inputControl);
}
function ValidateComboIndex(inputControl) {
    return ValidateMandatoryComboControls(inputControl);
}



function AddMaskToPhone(inputControl) {
    $(inputControl).mask('(999) 999-9999');
}
function AddMaskToMobile(inputControl) {
    $(inputControl).mask('+(91) 9999999999');
}
function AddMaskToFax(inputControl) {
    $(inputControl).mask('(999) 999-9999');
}
function FilterPOBox(inputControl) {
    inputvalue = inputControl.val();
    var Number = inputvalue.replace(/[^0-9]/g, '');
    inputControl.val(Number);
}

function FilterPOBoxArea(inputControl) {
    //  inputvalue = inputControl.val();
    // var Number = inputvalue.replace(/[^0-9]/g, '');
    // inputControl.val(Number);       
}

function AlertWarning(message) {
    showNotification({
        type: "warning",
        message: message,
        autoClose: true,
        duration: 5
    });
}

function Alertsuccess(message) {
    showNotification({
        type: "success",
        message: message,
        autoClose: true,
        duration: 5
    });
}
function Alerterror(message) {
    showNotification({
        type: "error",
        message: message,
        autoClose: true,
        duration: 5
    });
}
function Alertinformation(message) {
    showNotification({
        type: "information",
        message: message,
        autoClose: true,
        duration: 5
    });
}

function InitilizeValidationControls(inputControl) {
    errorPlacement('', inputControl);
    $(inputControl).removeClass('txtClassErr');
    $(inputControl).addClass('txtClass');
}



function GetSystemParamValue(ParamName, IsIntVal, ServiceName) {

    var IntVal = null;
    var CharVal = null;
    var ResultVal = null;
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE Parameter_name =\'' + ParamName + '\'';
    var FieldNames = ' Int_Value, Char_value ';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result = oAPICall.SelectData(strJsonDatas, 'SelectSysParamValue');

    if (Result != null && Result != "") {

        IntVal = Result[0].Int_Value;
        CharVal = Result[0].Char_value;

    }

    if (IsIntVal)
        ResultVal = IntVal;
    else
        ResultVal = CharVal;
    return ResultVal;
}

function FormatDatePicker(DatePickerCtrl) {


    var DateFormat = null;

    DateFormat = SelectedDateFormat;

    DatePickerCtrl.datepicker({ dateFormat: DateFormat });

    SetDateInDatePicker(new Date(), DatePickerCtrl);
}

function SetDateFormat(DateFormat, DatePickerCtrl) {

    DatePickerCtrl.datepicker({ dateFormat: DateFormat });

    SetDateInDatePicker(new Date(), DatePickerCtrl);
}

function SetDateFormatOnly(DatePickerCtrl) {
    DatePickerCtrl.datepicker({ dateFormat: SelectedDateFormat });
}
function SetDateFormatWithCurDate(DatePickerCtrl) {
    DatePickerCtrl.datepicker({ dateFormat: SelectedDateFormat });
    SetDateInDatePicker(new Date(), DatePickerCtrl);
}
function SetDateInDatePicker(InputDate, DatePickerCtrl) {

    try {



        // var ConvertedDate = GetDateFormated(InputDate, SelectedDateFormat);

        //      DatePickerCtrl.datepicker('setDate', ConvertedDate);



        var ConvertedDate = new Date();
        if (InputDate == null || InputDate == '')
            return null;
        try {
            ConvertedDate = InputDate;
            var m = ConvertedDate.getMonth();
        }
        catch (ex) {
            ConvertedDate = new Date(parseInt(InputDate.substr(6)));
        }

        var m = ConvertedDate.getMonth();
        DatePickerCtrl.datepicker('setDate', ConvertedDate);




    }
    catch (ex) {
        return null;
    }
}

function GetDateForDatePicker(InputDate) {

    try {

        var ConvertedDate = null;
        if (InputDate == null || InputDate == '')
            return null;

        try {
            ConvertedDate = InputDate;
            var m = ConvertedDate.getMonth();
        }
        catch (ex) {
            ConvertedDate = new Date(parseInt(InputDate.substr(6)));
        }

        var m = ConvertedDate.getMonth();

        return ConvertedDate;

    }
    catch (ex) {
        return null;
    }
}

function FillComboWithParam(ParamName, LanguageCode, RESTURL, ServiceName, ComboControl) {

    ComboControl.empty();
    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var strJsonDatas = eval({ strSessionID: UserSession, strLanguageCode: LanguageCode, strParamName: ParamName });
    var Result = oAPICall.SelectData(strJsonDatas, 'SelectParamValues');
    if (Result != null && Result != "") {
        for (var i = 0; i < Result.length; i++) {
            var value = Result[i].value;
            var text = Result[i].display_value;
            ComboControl.append('<option value=' + value + ' >' + text + '</option>');

        }
    }

}


function FillComboWithLanguage(RESTURL, ServiceName, ComboControl) {

    ComboControl.empty();
    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = '  ORDER BY is_default DESC';
    var FieldNames = ' language_code, display_value';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result = oAPICall.SelectData(strJsonDatas, 'SelectLanguage');
    if (Result != null && Result != "") {
        for (var i = 0; i < Result.length; i++) {
            var value = Result[i].language_code;
            var text = Result[i].display_value;
            ComboControl.append('<option value=' + value + ' >' + text + '</option>');

        }

    }

}

function FillComboWithCurrency(LanguageCode, RESTURL, ServiceName, ComboControl) {

    ComboControl.empty();
    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE LANGUAGE_CODE =' + LanguageCode + ' and delete_status <>1  ORDER BY IS_DEFAULT DESC';
    var FieldNames = ' CURRENCY_CODE, DISPLAY_VALUE ';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result = oAPICall.SelectData(strJsonDatas, 'SelectCurrency');
    if (Result != null && Result != "") {
        for (var i = 0; i < Result.length; i++) {
            var value = Result[i].CURRENCY_CODE;
            var text = Result[i].DISPLAY_VALUE;
            ComboControl.append('<option value=' + value + ' >' + text + '</option>');

        }
    }

}

function GetAccountGroupCode(ServiceName, Selectedgroup) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE account_no =' + Selectedgroup;
    var FieldNames = ' account_code';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCOAAccounts');
    if (Result == null || Result == "") {
        return null;
    }
    else
        return Result[0].account_code;
}


function UpdateCompanyCode(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CT_COMPANYTYPE_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CT_COMPANYTYPE_CODE';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCompanyTypeMaster');
    if (Result == null || Result == "") {
        CodeControl.val(null);
        NameControl.val(null);
    }
    else
        CodeControl.val(Result[0].CT_COMPANYTYPE_CODE);
}
function UpdateClientCode(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CM_CLIENT_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CM_CLIENT_CODE,CM_CLIENT_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectClientMaster');
    if (Result == null || Result == "") {
        CodeControl.val(null);
        NameControl.val(null);
    }
    else {
        CodeControl.val(Result[0].CM_CLIENT_CODE);
        var cliid = Result[0].CM_CLIENT_ID;
        $('[id$=hdnClientId]').val(cliid);
        //            var hdnClientId = GetControl('hdnClientId');
        //            hdnENQType.value = cliid;
    }
}
function UpdateClientID(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CM_CLIENT_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CM_CLIENT_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectClientMaster');
    if (Result == null || Result == "") {

    }
    else {
        var clientId = Result[0].CM_CLIENT_ID;
        $('[id$=hdnCode]').val(clientId);
    }

}


this.UpdateToCOA = function (AccountCode, previousAccountCode, ServiceName, AccountNoGroup, AccountCodeGroup, ShortDisplay, DisplayValue, Language, ServiceName2, service3) {
    $.support.cors = true;
    var IsSuccess = false;
    var CreatedDate = new Date();
    var strJsonDatas = eval({
        account_code: AccountCode, account_no_group: AccountNoGroup, account_code_group: AccountCodeGroup
    });

    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var condition = "where account_code='" + previousAccountCode + "'";
    var Result = oAPICall.UpdateData(strJsonDatas, 'UpdateCOAMaster', condition);

    oAPICall.ServiceName = service3;
    var Condition = null;
    var FieldNames = ' language_code';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });
    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectLanguage');
    var LanguageArray = new Array();
    if (Result != null && Result != "") {
        for (i = 0; i < Result.length; i++) {
            LanguageArray[i] = Result[i].language_code;
        }
    }

    oAPICall.ServiceName = ServiceName2;
    var Condition = "where account_code='" + AccountCode + "' and language_code=" + Language + "";
    var FieldNames = 'account_no';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });
    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCOAAccounts');
    var account_no = Result[0].account_no;

    for (i = 0; i < LanguageArray.length; i++) {

        strJsonDatas = eval({ short_display: ShortDisplay, display_value: DisplayValue });
        oAPICall = new APICall();
        oAPICall.ServiceName = ServiceName;
        var CONDITION = "where account_no=" + account_no + " and language_code=" + LanguageArray[i] + "";
        var Result = oAPICall.UpdateData(strJsonDatas, 'UpdateCOAMaster_Values', CONDITION);

    }
    return Result;
}

this.InsertToCOA = function (AccountCode, AccountNoGroup, AccountCodeGroup, AccountTypeCode, ShortDisplay, DisplayValue, Language, ServiceName) {
    $.support.cors = true;
    var IsSuccess = false;
    var CreatedDate = new Date();
    var strJsonDatas = eval({
        account_code: AccountCode, account_no_group: AccountNoGroup, account_code_group: AccountCodeGroup,
        account_type_code: AccountTypeCode, account_status: 0, ledger_type: 2,
        created_by: CurrentUser, created_date: CreatedDate, delete_status: 0
    });

    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.InsertData(strJsonDatas, 'InsertToCOAMaster');
    var COAMasterID = 0;
    if (Result != null && Result != "") {

        COAMasterID = Result[0].IDENTITY;
        var oAPICall = new APICall();

        oAPICall.ServiceName = ServiceName;
        var Condition = null;
        var FieldNames = ' language_code';
        var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

        var Result;
        Result = oAPICall.SelectData(strJsonDatas, 'SelectLanguage');
        var LanguageArray = new Array();
        if (Result != null && Result != "") {
            for (i = 0; i < Result.length; i++) {
                LanguageArray[i] = Result[i].language_code;
            }

        }


        for (i = 0; i < LanguageArray.length; i++) {

            strJsonDatas = eval({
                account_no: COAMasterID,
                short_display: ShortDisplay, display_value: DisplayValue, language_code: LanguageArray[i]
            });

            oAPICall = new APICall();
            oAPICall.ServiceName = ServiceName;
            var Result = oAPICall.InsertData(strJsonDatas, 'InsertToCOAMasterValues');
            if (Result != null && Result != "") {
                IsSuccess = true;
            };
        }

    }
    return COAMasterID;

}

function InsertToCOA_Main(AccountCode, AccountNoGroup, AccountCodeGroup, AccountTypeCode, ShortDisplay, DisplayValue, Language, ServiceName) {

    var IsSuccess = false;

    var CreatedDate = new Date();
    var strJsonDatas = eval({
        account_code: AccountCode, account_no_group: AccountNoGroup, account_code_group: AccountCodeGroup,
        account_type_code: AccountTypeCode, account_status: 0, ledger_type: 1,
        created_by: CurrentUser, created_date: CreatedDate, delete_status: 0
    });

    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.InsertData(strJsonDatas, 'InsertToCOAMaster');
    if (Result != null && Result != "") {

        var COAMasterID = Result[0].IDENTITY;

        var oAPICall = new APICall();

        oAPICall.ServiceName = ServiceName;
        var Condition = null;
        var FieldNames = ' language_code';
        var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

        var Result;
        Result = oAPICall.SelectData(strJsonDatas, 'SelectLanguage');
        var LanguageArray = new Array();
        if (Result != null && Result != "") {
            for (i = 0; i < Result.length; i++) {
                LanguageArray[i] = Result[i].language_code;
            }

        }


        for (i = 0; i < LanguageArray.length; i++) {

            strJsonDatas = eval({
                account_no: COAMasterID,
                short_display: ShortDisplay, display_value: DisplayValue, language_code: LanguageArray[i]
            });

            oAPICall = new APICall();
            oAPICall.ServiceName = ServiceName;
            var Result = oAPICall.InsertData(strJsonDatas, 'InsertToCOAMasterValues');
            if (Result != null && Result != "") {
                IsSuccess = true;
            };
        }

    }
    return COAMasterID;

}

this.InsertToGLTrans = function (strJsonData, ServiceName) {
    $.support.cors = true;
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.InsertData(strJsonData, 'InsertToGlTrans');
    if (Result != null && Result != "") {
        return true;
    }
    return false;
}
this.SelectCOADetails = function (Condition, FieldNames, ServiceName) {
    $.support.cors = true;
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.SelectData(strJsonDatas, 'SelectCOAValues');
    return Result;
}
this.GetAbbreviatedTransDescription = function (Condition, FieldNames, ServiceName, ReplaceWith) {
    $.support.cors = true;
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.SelectData(strJsonDatas, 'SelectGLTransDescAbbr');
    if (Result != null && Result != "") {
        var res = Result[0];
        var abbrev_display = res[FieldNames.split(',')[0]];
        abbrev_display = abbrev_display == null || abbrev_display == typeof ('undefined') ? '' : abbrev_display;
        for (var j = 0; j < ReplaceWith.length; j++) {
            abbrev_display = abbrev_display.replace('%', ReplaceWith[j]);
        }
        return abbrev_display;
    }
    return "";
}
this.GetFinancialYear = function (fin_year_id, ServiceName) {
    var Condition = ' where FIN_YEARID=' + fin_year_id;
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: 'FIN_FINYEAR' });
    $.support.cors = true;
    var oAPICall = new APICall();
    oAPICall.ServiceName = ServiceName;
    var Result = oAPICall.SelectData(strJsonDatas, 'SelectFinancialYearById');
    if (Result != null && Result != "") {
        return Result[0].FIN_FINYEAR;
    }
    return new Date().getFullYear();
}
function GenerateUniqID(Item, RESTURL, ServiceName) {

    var UniqId = null;
    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = Item;
    var FieldNames = null;
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'GenerateUNIQID');
    if (Result == null || Result == "") {

    }
    else {
        UniqId = Result[0].UNIQID;

    }
    return UniqId;
}

function UpdateConsulID(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CM_CONSULTANT_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CM_CONSULTANT_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCunsultantMaster');
    if (Result == null || Result == "") {

    }
    else {
        var conID = Result[0].CM_CONSULTANT_ID;
        $('[id$=hdnCode]').val(conID);
    }

}

function UpdateConstomerId(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CM_CUSTOMER_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CM_CUSTOMER_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCustomerMaster');
    if (Result == null || Result == "") {

    }
    else {
        var conID = Result[0].CM_CUSTOMER_ID;
        $('[id$=hdnCode]').val(conID);
    }

}
function UpdateCompetId(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE SALES_COMP_COMPETITOR_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' SALES_COMP_COMPETITOR_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCompetitorMaster');
    if (Result == null || Result == "") {

    }
    else {
        var conID = Result[0].SALES_COMP_COMPETITOR_ID;
        $('[id$=hdnCode]').val(conID);
    }

}
function UpdateConSultCode(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CM_CONSULTANT_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CM_CONSULTANT_CODE, CM_CONSULTANT_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCunsultantMaster');
    if (Result == null || Result == "") {
        CodeControl.val(null);
        NameControl.val(null);
    }
    else {
        CodeControl.val(Result[0].CM_CONSULTANT_CODE);
        var conID = Result[0].CM_CONSULTANT_ID;
        $('[id$=hdnConsulId]').val(conID);
    }
}
function UpdateCmpRepCode(NameControl, CodeControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;
    var Condition = ' WHERE CRM_COMP_REP_NAME =\'' + NameControl.val() + '\'';
    var FieldNames = ' CRM_COMP_REP_CODE, CRM_SALESMAN_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectComanyRepMaster');
    if (Result == null || Result == "") {
        CodeControl.val(null);
        NameControl.val(null);
    }
    else {
        CodeControl.val(Result[0].CRM_COMP_REP_CODE);
        var repId = Result[0].CRM_SALESMAN_ID;
        $('[id$=hdnSalesManId]').val(repId);
    }
}
function AddCompanyTypeTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' CT_COMPANYTYPE_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCompanyTypeMaster');


    var AvilabileList = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList[i] = Result[i].CT_COMPANYTYPE_NAME;

    inputControl.autocomplete({
        source: AvilabileList
    });

}
function AddClientTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' CM_CLIENT_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectClientMaster');


    var AvilabileList1 = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList1[i] = Result[i].CM_CLIENT_NAME;

    inputControl.autocomplete({
        source: AvilabileList1
    });

}

function AddConsultTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' CM_CONSULTANT_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCunsultantMaster');


    var AvilabileList2 = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList2[i] = Result[i].CM_CONSULTANT_NAME;

    inputControl.autocomplete({
        source: AvilabileList2
    });

}

function AddCustomerTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' CM_CUSTOMER_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCustomerMaster');


    var AvilabileList2 = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList2[i] = Result[i].CM_CUSTOMER_NAME;

    inputControl.autocomplete({
        source: AvilabileList2
    });

}
function AddCompetitTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' SALES_COMP_COMPETITOR_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectCompetitorMaster');


    var AvilabileList2 = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList2[i] = Result[i].SALES_COMP_COMPETITOR_NAME;

    inputControl.autocomplete({
        source: AvilabileList2
    });

}
function AddCmpRepTags(inputControl, RESTURL, ServiceName) {

    var oAPICall = new APICall();

    oAPICall.ServiceName = ServiceName;

    var Condition = null;
    var FieldNames = ' CRM_COMP_REP_NAME';

    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });

    var Result;
    Result = oAPICall.SelectData(strJsonDatas, 'SelectComanyRepMaster');


    var AvilabileList3 = [];
    for (var i = 0; i < Result.length; i++)
        AvilabileList3[i] = Result[i].CRM_COMP_REP_NAME;

    inputControl.autocomplete({
        source: AvilabileList3
    });

}


function GenerateUniqCode(TableName, FieldName, CodeLength, ServiceName, PrefixType, Prefix) {



    var strJsonDatas = eval({ strSessionID: UserSession, strTableName: TableName, strFieldName: FieldName, nCodeLength: CodeLength, nPrefixType: PrefixType, strPrefix: Prefix });

    $.support.cors = true;
    var Result = '';

    var _url = RestServiceURL + ServiceName + 'GenerateUniqueCode';

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
                WriteLog('No Records Found');
            }
            else if (data == null) {
                WriteLog('Unable to connect to server');
            }
            else {
                try {
                    Result = jQuery.parseJSON(data);
                    Result = Result[0].UnqCode;

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



function SelectCompanyType(CompanyTypeCode, RESTURL, ServiceName) {
    if (CompanyTypeCode == null)
        return null;
    var Condition = ' WHERE  CT_COMPANYTYPE_CODE =\'' + CompanyTypeCode + '\'';
    var FieldNames = '  CT_COMPANYTYPE_NAME';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });


    $.support.cors = true;
    var Result = '';

    var _url = RESTURL + ServiceName + 'SelectCompanyTypeMaster';

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
                WriteLog('No Records Found');
            }
            else if (data == null) {
                WriteLog('Unable to connect to server');
            }
            else {
                try {
                    Result = jQuery.parseJSON(data);
                    Result = Result[0].CT_COMPANYTYPE_NAME;




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



function SelectCompanyTypeName(CompanyTypeID, RESTURL, ServiceName) {
    if (CompanyTypeID == null)
        return null;
    var Condition = ' WHERE  CT_COM_TYPE_ID =' + CompanyTypeID;
    var FieldNames = '  CT_COMPANYTYPE_NAME';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });


    $.support.cors = true;
    var Result = '';

    var _url = RESTURL + ServiceName + 'SelectCompanyTypeMaster';

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
                WriteLog('No Records Found');
            }
            else if (data == null) {
                WriteLog('Unable to connect to server');
            }
            else {
                try {
                    Result = jQuery.parseJSON(data);
                    Result = Result[0].CT_COMPANYTYPE_NAME;




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

function SelectCompanyTypeID(CompanyTypeCode, RESTURL, ServiceName) {
    if (CompanyTypeCode == null)
        return null;
    var Condition = ' WHERE  CT_COMPANYTYPE_CODE =\'' + CompanyTypeCode + '\'';

    var FieldNames = '  CT_COM_TYPE_ID';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });


    $.support.cors = true;
    var Result = '';

    var _url = RESTURL + ServiceName + 'SelectCompanyTypeMaster';

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
                WriteLog('No Records Found');
            }
            else if (data == null) {
                WriteLog('Unable to connect to server');
            }
            else {
                try {
                    Result = jQuery.parseJSON(data);
                    Result = Result[0].CT_COM_TYPE_ID;

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

function GetDBFormatDate(DateToFormat, IsReturnDateObject) {

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

            //DateToFormatString = GetDateFormated(DateToFormat, SelectedDateFormat);
            DateToFormat = SplitDateTimeString(SelectedDateFormat, DateToFormat, 2);
            DateToFormatString = new Date(2015, 4, 2, 2, 3, 5, 551);
            return DateToFormatString;

        }

    }
    catch (ex) {
        return null;
    }
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

function GetDateUnformated(sDateTime, dtFormat) {

    try {

        sDateTime = SplitDateTimeString(dtFormat, sDateTime, 0);
        sParameterName = new Date(sDateTime);

        return sParameterName;
    }
    catch (ex) {
        alert(ex.message);
    }
}

function FormatCurrentDate(DF, date) {

    var now = new Date(date);
    var DateTimeString = now.format(DF);
    return DateTimeString;
}


function GetCurrentDateForPump(DF) {

    var now = new Date();
    var DateTimeString = now.format(DF);
    return DateTimeString;


    /*
    var SelDateFormat = null;
    SelDateFormat = GetSystemParamValue('DATE_FORMAT', false, ServiceName);

    */
    //  var DateString = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    /*  var DateString = jQuery.datepicker.parseDate(DateFormat, currentDate);

    h = currentDate.getHours();
    var mn = null;
    mn = currentDate.getMinutes();
    var s = null;
    s = currentDate.getSeconds();

    var Time = h + ':' + mn + ':' + s;

    var CurDateTimeString = DateString + Time;
    return CurDateTimeString;*/

}
function SelectCompanyTypeCode(CompanyTypeID, RESTURL, ServiceName) {
    if (CompanyTypeID == null)
        return null;
    var Condition = ' WHERE  CT_COM_TYPE_ID =' + CompanyTypeID;
    var FieldNames = '  CT_COMPANYTYPE_CODE';
    var strJsonDatas = eval({ strSessionID: UserSession, strCondition: Condition, strFieldNames: FieldNames });


    $.support.cors = true;
    var Result = '';

    var _url = RESTURL + ServiceName + 'SelectCompanyTypeMaster';

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
                WriteLog('No Records Found');
            }
            else if (data == null) {
                WriteLog('Unable to connect to server');
            }
            else {
                try {
                    Result = jQuery.parseJSON(data);
                    Result = Result[0].CT_COMPANYTYPE_CODE;




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

function FillComboWithSelectValues(Result, Control) {

    try {
        Control.empty();

        if (Result != null && Result != "") {

            var default_value = "0";
            var default_text = "--Select--";
            Control.append('<option value=' + default_value + ' >' + default_text + '</option>');

            for (var i = 0; i < Result.length; i++) {
                var value = Result[i].value;
                var text = Result[i].DispalyText;
                Control.append('<option value=' + value + ' >' + text + '</option>')
            }
        }
    }
    catch (ex) {
        alert(ex.message);
    }
}

function ValidateForDuplicationValue(inputControl, inputValue, APIFunction, RESTURL, Module) {

    try {

        var inputvalue = inputValue;
        var inputcontrol = inputControl

        if (inputvalue.length == 0) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }

        var strJsonDatas = eval({ strSessionID: UserSession, strInputValue: inputvalue, strUniqueValue: inputcontrol });

        $.support.cors = true;
        var Result = '';
        var _url = APIFunction;
       // var _url = RESTURL + Module + APIFunction;

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
        if (Result == null) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }
        else if (Result.length > 0) {
            errorPlacement('Code Duplication', inputControl);

            $(inputControl).removeClass('txtClass');
            $(inputControl).addClass('txtClassErr');
            return false;
        }
        else {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }


    }
    catch (ex) {
        return false;
    }

}

function ValidateForDuplication(inputControl, APIFunction, RESTURL, Module) {

    try {

        var inputvalue = inputControl;

        if (inputvalue.length == 0) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }

        var strJsonDatas = eval({ strSessionID: UserSession, strInputValue: inputvalue });


        $.support.cors = true;
        var Result = '';

       // var _url = RESTURL + Module + APIFunction;

        var _url =  APIFunction;

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
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {
                        Result = data;//jQuery.parseJSON(data);
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
        if (Result == null) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }
        else if (Result.length > 0) {
            errorPlacement('Code Duplication', inputControl);

            $(inputControl).removeClass('txtClass');
            $(inputControl).addClass('txtClassErr');
            return false;
        }
        else {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }


    }
    catch (ex) {
        return false;
    }

}


function ValidateForDuplicationwithcondition(Inputvalue, APIFunction, condition) {

    try {

        //var inputvalue = inputControl;

        //if (inputvalue.length == 0) {
        //    errorPlacement('', inputControl);
        //    $(inputControl).removeClass('txtClassErr');
        //    $(inputControl).addClass('txtClass');
        //    return true;
        //}

        var strJsonDatas = eval({ strSessionID: UserSession, strInputValue: Inputvalue, strCondition: condition });


        $.support.cors = true;
        var Result = '';

        // var _url = RESTURL + Module + APIFunction;

        var _url = APIFunction;

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
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {
                        Result = data;//jQuery.parseJSON(data);
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
        if (Result == null) {
            //errorPlacement('', inputControl);
            //$(inputControl).removeClass('txtClassErr');
            //$(inputControl).addClass('txtClass');
            return true;
        }
        else if (Result.length > 0) {
            //errorPlacement('Code Duplication', inputControl);

            //$(inputControl).removeClass('txtClass');
            //$(inputControl).addClass('txtClassErr');
            return false;
        }
        else {
            //errorPlacement('', inputControl);
            //$(inputControl).removeClass('txtClassErr');
            //$(inputControl).addClass('txtClass');
            return true;
        }


    }
    catch (ex) {
        return false;
    }

}


function ValidateForDuplicationMail(inputControl, inputControl1, APIFunction, RESTURL, Module) {

    try {

        var inputvalue = inputControl;
        var inputvalue1 = inputControl1;

        if (inputvalue.length == 0) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }

        var strJsonDatas = eval({ strSessionID: UserSession, strInputValue: inputvalue, strInputValue1: inputvalue1 });


        $.support.cors = true;
        var Result = '';

        // var _url = RESTURL + Module + APIFunction;

        var _url = APIFunction;

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
                    WriteLog('No Records Found');
                }
                else if (data == null) {
                    WriteLog('Unable to connect to server');
                }
                else {
                    try {
                        Result = data;//jQuery.parseJSON(data);
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
        if (Result == null) {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }
        else if (Result.length > 0) {
            errorPlacement('Code Duplication', inputControl);

            $(inputControl).removeClass('txtClass');
            $(inputControl).addClass('txtClassErr');
            return false;
        }
        else {
            errorPlacement('', inputControl);
            $(inputControl).removeClass('txtClassErr');
            $(inputControl).addClass('txtClass');
            return true;
        }


    }
    catch (ex) {
        return false;
    }

}



function WriteLog() {
}

function ValidateControls(inputControl, Mandatory, ItemName, RegExpression) {
    var inputvalue = inputControl.val();
    if (Mandatory && inputvalue.length == 0) {
        /*  showNotification({
        type: "warning",
        message: 'Please enter ' + ItemName,
        autoClose: true,
        duration: 3
        });*/

        errorPlacement('Please enter ' + ItemName, inputControl);

        $(inputControl).removeClass('txtClass');
        $(inputControl).addClass('txtClassErr');
        return false;
    }
    else if (inputvalue.length == 0) {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;
    }
    else if (!(RegExpression.test(inputvalue))) {
        /* showNotification({
        type: "warning",
        message: 'Invalid ' + ItemName,
        autoClose: true,
        duration: 3
        });*/
        errorPlacement('Invalid ' + ItemName, inputControl);
        $(inputControl).removeClass('txtClass');
        $(inputControl).addClass('txtClassErr');
        return false;
    }
    else {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;


    }
}


function ValidateMandatoryComboControls(inputControl) {

    inputvalue = inputControl.val();
    if (inputvalue == null)
        inputvalue = '';
    var IndexValue = inputControl.selectedIndex;
    if (inputvalue == '-1' || IndexValue == -1) {
        errorPlacement('Mandatory Field', inputControl);
        $(inputControl).removeClass('txtClass');
        $(inputControl).addClass('txtClassErr');
        return false;
    }

    else {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;


    }
}
function ValidateMandatoryControls(inputControl) {

    inputvalue = inputControl.val();
    if (inputvalue == null)
        inputvalue = '';

    if (inputvalue.length == 0) {
        errorPlacement('Mandatory Field', inputControl);
        $(inputControl).removeClass('txtClass');
        $(inputControl).addClass('txtClassErr');
        return false;
    }

    else {
        errorPlacement('', inputControl);
        $(inputControl).removeClass('txtClassErr');
        $(inputControl).addClass('txtClass');
        return true;


    }
}

function errorPlacement(error, element) {
    // Set positioning based on the elements position in the form
    /*  var elem = $(element),
    corners = ['left center', 'right center'],
    flipIt = elem.parents('span.right').length > 0;

    // Check we have a valid error message
    if (!error.is(':empty')) {
    // Apply the tooltip only if it isn't valid
    elem.filter(':not(.valid)').qtip({
    overwrite: false,
    content: error,
    position: {
    my: corners[flipIt ? 0 : 1],
    at: corners[flipIt ? 1 : 0],
    viewport: $(window)
    },
    show: {
    event: false,
    ready: true
    },
    hide: false,
    style: {
    classes: 'ui-tooltip-red' // Make it red... the classic error colour!
    }
    })

    // If we have a tooltip on this element already, just update its content
    .qtip('option', 'content.text', error);
    }

    // If the error is empty, remove the qTip
    else { elem.qtip('destroy'); }*/

    if (error == '') {
        try {
            $(element).qtip('destroy');
        }
        catch (ex) {
        }
    }
    else {
        try {
            $(element).qtip({
                overwrite: false,
                content: error,
                position: {
                    corner: {
                        target: 'rightMiddle',
                        tooltip: 'leftMiddle'
                    }
                },
                style: {
                    tip: 'leftMiddle',
                    border: {
                        width: 1,
                        radius: 2,
                        color: '#924949'
                    },
                    background: '#F3E6E6',
                    color: '#333'
                }
            });
        }
        catch (exception) {
        }
    }

}

function PrintThis(HandlerUrl) {
    var myWindow = window.showModalDialog('../Print.aspx?url=' + HandlerUrl, window, 'dialogHeight:600px; dialogWidth:1000px; resizable:1');
    /*if (!myWindow || myWindow.closed || typeof myWindow == 'undefined' || typeof myWindow.closed == 'undefined')
    AlertWarning("Popup is blocked in your browser\nEnable popup to view content");
    else*/
    myWindow.focus();

}
function GenerateScreenreport(ReportID, iFrameID, SearchCondition, root, containerDivId) {
    try { $('#' + iFrameID).remove(); } catch (err) { }
    var SerachConditionObj = [];
    SerachConditionObj.push({ ConditionString: SearchCondition });
    var framesrc = root + "Reporting/ReportViewer.aspx?reportid=" + ReportID.toString() + '&' + $.param({ "SearchCondition": JSON.stringify(SerachConditionObj) });
    $('<iframe src="' + framesrc + '" frameborder="0" scrolling="no" id="' + iFrameID + '" style="display:none;"></iframe>').appendTo('#' + containerDivId);
    setTimeout(function () {
        handlerurl = "Reporting/Handler/PrintHandler.ashx?extension=pdf-reportid=" + ReportID.toString();
        var myWindow = window.showModalDialog('../../Print.aspx?url=' + handlerurl, window, 'dialogHeight:600px; dialogWidth:1000px; resizable:1');
        /*if (!myWindow || myWindow.closed || typeof myWindow == 'undefined' || typeof myWindow.closed == 'undefined')
        AlertWarning("Popup is blocked in your browser\nEnable popup to view content");
        else*/
        myWindow.focus();

    }, 500);

}

function Get_DataExistDeleteCheck(Tablename, Fieldname, Fieldvalue, DeleteStatusField) {

    var Result = [];
    var deleteCheck = false;
    var Condition3 = "delete_status";
    if (Tablename != "" && Fieldname != "" && Fieldvalue != "") {
        if (Tablename.length > 0) {
            for (i = 0; i < Tablename.length; i++) {
                var Table = Tablename[i];
                var Condition1 = Fieldname[i] + " = " + Fieldvalue;
                var Condition2 = Fieldname[i] + "";
                if (DeleteStatusField[i] == "")
                    Condition3 = "";
                if (DeleteStatusField[i] != "delete_status" || DeleteStatusField != "")
                    Condition3 = DeleteStatusField[i] + "";
                var strJsonDatas = eval({ strSessionID: UserSession, strTableName: Table, strCondition1: Condition1, strCondition2: Condition2, strCondition3: Condition3 });
                var oAPICall = new APICall();
                oAPICall.ServiceName = "CommonService.svc/rsoft/";
                Result[i] = oAPICall.SelectData(strJsonDatas, 'CheckDataExistdelete');
            }
            for (var j = 0; j < Result.length; j++) {
                if (Result[j] != "")
                    deleteCheck = true;
            }
            return deleteCheck;
        }
    }
}

function Get_DataExistDeleteCheck_Accounts(Tablename, Fieldname, Fieldvalue, TypeFieldname, TypeFieldvalue, DeleteStatusField) {

    var Result = [];
    var deleteCheck = false;
    var Condition3 = "delete_status";
    if (Tablename != "" && Fieldname != "" && Fieldvalue != "" && TypeFieldname != "" && TypeFieldvalue != "") {
        if (Tablename.length > 0) {
            for (i = 0; i < Tablename.length; i++) {
                var Table = Tablename[i];
                var Condition1 = Fieldname[i] + " = " + Fieldvalue + " AND " + TypeFieldname[i] + " = " + TypeFieldvalue;
                var Condition2 = Fieldname[i] + "";
                if (DeleteStatusField[i] == "")
                    Condition3 = "";
                if (DeleteStatusField[i] != "delete_status" || DeleteStatusField != "")
                    Condition3 = DeleteStatusField[i] + "";
                var strJsonDatas = eval({ strSessionID: UserSession, strTableName: Table, strCondition1: Condition1, strCondition2: Condition2, strCondition3: Condition3 });
                var oAPICall = new APICall();
                oAPICall.ServiceName = "CommonService.svc/rsoft/";
                Result[i] = oAPICall.SelectData(strJsonDatas, 'CheckDataExistdelete');
            }
            for (var j = 0; j < Result.length; j++) {
                if (Result[j] != "")
                    deleteCheck = true;
            }
            return deleteCheck;
        }
    }
}

function ResizeJQGridByWidth(GridId, width) {
    $('#tabHeader').css('width', width + 'px');
    $('#gbox_' + GridId).css('width', width + 'px');
    $('#gview_' + GridId).css('width', width + 'px');
    $('.ui-jqgrid .ui-jqgrid-hdiv').css('width', width + 'px');
    $('.ui-jqgrid-bdiv').css('width', width + 'px');
    $('.ui-jqgrid .ui-jqgrid-pager').css('width', width + 'px');
    $('#tabData').css('padding-left', '0px');
}
function AlignBtnPanel(CtrlID, MarginRight) {
    $('#' + CtrlID).css('width', '50%');
    $('#' + CtrlID).css('float', 'right');
    $('#' + CtrlID).css('margin-right', MarginRight);
}

function EnableAllPageFieldsByContainer(Selector) {
    $('#' + Selector + ' :input').attr("disabled", false);
}
function RemoveAllValidations(Selector) {
    var div = document.getElementById(Selector);
    $(div).find('input:text, input:password, input:file, select, textarea')
        .each(function () {
            $(this).removeClass('txtClassErr');
            $(this).addClass('txtClass');
            InitilizeValidationControls($(this));
        });

}


this.IsVoucherPosted = function (TransTypeId, Voucher_Id, ServiceName, Selector) {
    try {
        var condition = ' where cast(trans_type as int)=' + TransTypeId.toString() + ' and document_id=' + Voucher_Id.toString();
        var strJsondata2 = eval({ strCondition: condition, strFieldNames: 'document_id', strSessionID: UserSession });
        var oAPICall = new APICall();
        oAPICall.ServiceName = ServiceName;
        var Result = oAPICall.SelectData(strJsondata2, 'IsVoucherPosted');
        if (Result != null) {
            if (parseInt(Result[0].document_id) == Voucher_Id) {
                $('#' + Selector + ' :input').attr("disabled", true);

                $('*[id*=Back]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=Reset]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=back]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=reset]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=Print]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=print]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=New]:visible').each(function () {
                    $(this).prop('disabled', false);
                });
                $('*[id*=new]:visible').each(function () {
                    $(this).prop('disabled', false);
                });


                return true;
            }
        }
    } catch (err) { }
    return false;

}

function getFrameElement() {
    var iframes = parent.document.getElementsByTagName('iframe');
    for (var i = iframes.length; i-- > 0; ) {
        var iframe = iframes[i];
        try {
            var idoc = 'contentDocument' in iframe ? iframe.contentDocument : iframe.contentWindow.document;
        } catch (e) {
            continue;
        }
        if (idoc === document)
            return iframe;
    }
    return null;
}

function FormattedDate(myDate) {
    try {

        var date = (myDate.getMonth() + 1).toString().length > 1 ? (myDate.getMonth() + 1).toString() : ('0' + (myDate.getMonth() + 1).toString()) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
        return date;
    }
    catch (ex) {
        myDate = new Date(parseInt(myDate.replace('/Date(', '').replace(')/', '')));
        var date = (myDate.getMonth() + 1).toString().length > 1 ? (myDate.getMonth() + 1).toString() : ('0' + (myDate.getMonth() + 1).toString()) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
        return date;
    }
    return '';
}

function GridBindDefault(rowId, tableID) {

    for (var i = 0; i < rowId; i++) {
        $(tableID).addRowData(i + 1, {});
    }
}