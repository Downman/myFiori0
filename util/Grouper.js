jQuery.sap.declare("sap.xeptum.timesheets.util.Grouper");
jQuery.sap.require("sap.xeptum.timesheets.util.Formatter");

sap.xeptum.timesheets.util.Grouper = {

	bundle: null, // somebody has to set this

	Active: function(oContext) {
		var sStatus, sText;
		sStatus = oContext.getProperty("Active");
		sText = sap.xeptum.timesheets.util.Grouper.bundle.getText("StatusText" + sStatus, "?");
		return {
			key: sStatus,
			text: sText
		};
	},

	getMonth: function(oDateInMillis) {
		var oDate, oMonth, sMonth;
		oDate = new Date();
		oDate.setTime(oDateInMillis);
		oMonth = oDate.getMonth();
		sMonth = sap.xeptum.timesheets.util.Grouper.bundle.getText("StringMonth" + oMonth, "?");
		return sMonth;
	},

	getMillis: function(oDate) {
		oDate = oDate.replace("/Date(", "");
		oDate = oDate.replace(")/", "");
		return oDate;
	},

	getYear: function(oDateInMillis) {
		var oDate;
		oDate = new Date();
		oDate.setTime(oDateInMillis);
		return oDate.getFullYear();
	},

	Day: function(oContext) {
		var oDate, sStatus, sMonth, sText;
		oDate = oContext.getProperty("Entryday");
		if (typeof oDate === "string") {
			oDate = sap.xeptum.timesheets.util.Grouper.getMillis(oDate);
		}
		sStatus = null;
		sText = null;
		sMonth = sap.xeptum.timesheets.util.Grouper.getMonth(oDate);

		sStatus = sap.xeptum.timesheets.util.Grouper.getYear(oDate) + sMonth;
		sText = sMonth + " " + sap.xeptum.timesheets.util.Grouper.getYear(oDate);
		return {
			key: sStatus,
			text: sText
		};
	}
};