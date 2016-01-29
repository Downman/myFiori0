jQuery.sap.declare("sap.xeptum.timesheets.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.xeptum.timesheets.util.Formatter = {

	_statusStateMap: {
		"1": "Success",
		"0": "Warning"
	},

	statusText: function(value) {
		var oBundle;
		oBundle = this.getModel("i18n").getResourceBundle();
		return oBundle.getText("StatusText" + value, "?");
	},

	statusState: function(value) {
		var oMap;
		oMap = sap.xeptum.timesheets.util.Formatter._statusStateMap;
		return (value && oMap[value]) ? oMap[value] : "None";
	},

	hours: function(value) {
		var sHour, sMin, sRet;
		if (typeof value === "number") {
			sHour = Math.floor(value / 3600);
		} else {
			sHour = Math.floor(value.replace('.', '') / 3600);
		}
		if (sHour < 10) {
			sHour = "0" + sHour;
		}
		sMin = Math.floor((value % 3600) / 60);
		if (sMin < 10) {
			sMin = "0" + sMin;
		}
		sRet = sHour + "h:" + sMin + "min";
		return sRet;
	},

	date: function(value) {
		var oDat, oDateFormat;
		if (value) {
			if (typeof value === "string") {
				value = value.replace("/Date(", "");
				value = value.replace(")/", "");
				oDat = new Date();
				oDat.setTime(value);
				value = oDat;
			}

			oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd-MM-yyyy"
			});

			return oDateFormat.format(value);
		} else {
			return value;
		}
	},

	oldFormat: function(value) {
		var sMM, sdd, sRet, oDate, sYYYY;
		if (value) {

			sdd = value.substring(0, 2);
			sMM = value.substring(3, 5);
			sYYYY = value.substring(6, 10);
			sRet = sMM + "-" + sdd + value.substring(5, value.length);
			//oDate = new Date(sRet);
			//oDate.setHours(oDate.getHours() + 1);
			oDate = new Date();
			oDate.setFullYear(sYYYY);
			oDate.setMonth(sMM - 1);
			oDate.setDate(sdd);
			return oDate;
		} else {
			return value;
		}
	},

	hoursMinutesToS: function(sHoursMins) {
		var iHours, iMinutes, iRet;
		iHours = sHoursMins.substring(0, 2);
		iMinutes = sHoursMins.substring(3, 5);
		iRet = (iHours * 3600) + (iMinutes * 60);
		return iRet;
	},

	msToHoursMinutes: function(iSeconds) {
		var sEntryHours, sHours, sMinutes;
		sHours = iSeconds;
		sHours = Math.floor(sHours / 3600);
		sMinutes = iSeconds;
		sMinutes = Math.floor((sMinutes % 3600) / 60);
		if (sHours < 10) {
			sHours = "0" + sHours;
		}
		if (sMinutes < 10) {
			sMinutes = "0" + sMinutes;
		}
		sEntryHours = sHours + ":" + sMinutes;
		return sEntryHours;
	},

	myDateFormat: function(value) {
		var oDat, oDateFormat;
		if (value) {
			if (typeof value === "string") {
				value = value.replace("/Date(", "");
				value = value.replace(")/", "");
				oDat = new Date();
				oDat.setTime(value);
				value = oDat;
			}

			oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd/MM/yy"
			});

			return oDateFormat.format(value);
		} else {
			return value;
		}
	},

	quantity: function(value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};