jQuery.sap.declare("sap.ui.demo.myFiori.util.Grouper");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");

sap.ui.demo.myFiori.util.Grouper = {

	bundle: null, // somebody has to set this

	Active: function(oContext) {
		var sStatus, sText;
		sStatus = oContext.getProperty("Active");
		sText = sap.ui.demo.myFiori.util.Grouper.bundle.getText("StatusText" + sStatus, "?");
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
		sMonth = sap.ui.demo.myFiori.util.Grouper.bundle.getText("StringMonth" + oMonth, "?");
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
			oDate = sap.ui.demo.myFiori.util.Grouper.getMillis(oDate);
		}
		sStatus = null;
		sText = null;
		sMonth = sap.ui.demo.myFiori.util.Grouper.getMonth(oDate);

		sStatus = sap.ui.demo.myFiori.util.Grouper.getYear(oDate) + sMonth;
		sText = sMonth + " " + sap.ui.demo.myFiori.util.Grouper.getYear(oDate);
		return {
			key: sStatus,
			text: sText
		};
	}
};