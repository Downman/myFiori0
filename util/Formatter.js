jQuery.sap.declare("sap.ui.demo.myFiori.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.demo.myFiori.util.Formatter = {

	_statusStateMap: {
		"1": "Success",
		"0": "Warning"
	},

	statusText: function(value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},

	statusState: function(value) {
		var map = sap.ui.demo.myFiori.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},

	date: function(value) {
		if (value) {
			if (typeof value === 'string') {
				value = value.replace('/Date(', '');
				value = value.replace(')/', '');
				var dat = new Date();
				dat.setTime(value);
				value = dat;
			}

			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd-MM-yyyy"
			});

			return oDateFormat.format(value);
		} else {
			return value;
		}
	},

	oldFormat: function(value) {
		if (value) {

			var sMM;
			var sdd;
			var sRet;
			var oDate;

			sdd = value.substring(0, 2);
			sMM = value.substring(3, 5);
			sRet = sMM + "-" + sdd + value.substring(5, value.length);
			oDate = new Date(sRet);
			oDate.setHours(oDate.getHours()+1);
			return oDate;
		} else {
			return value;
		}
	},

	hoursMinutesToMs: function(sHoursMins) {
		var iHours;
		var iMinutes;
		var sPTString;

		iHours = sHoursMins.substring(0, 2);
		iMinutes = sHoursMins.substring(3, 5);
		sPTString = "PT" + iHours + "H" + iMinutes + "M01S"; //PT15H01M41S
		return sPTString;
	},

	msToHoursMinutes: function(iMillis) {
		var sEntryHours;
		var sHours;
		var sMinutes;
		sHours = iMillis;
		sHours = Math.floor(sHours / 3600000);
		sMinutes = iMillis;
		sMinutes = Math.floor((sMinutes % 3600000) / 60000);
		if (sHours < 9) {
			sHours = "0" + sHours;
		}
		if (sMinutes < 9) {
			sMinutes = "0" + sMinutes;
		}
		sEntryHours = sHours + ":" + sMinutes;
		return sEntryHours;
	},

	myDateFormat: function(value) {
		if (value) {
			if (typeof value === 'string') {
				value = value.replace('/Date(', '');
				value = value.replace(')/', '');
				var dat = new Date();
				dat.setTime(value);
				value = dat;
			}

			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
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