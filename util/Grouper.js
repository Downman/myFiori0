jQuery.sap.declare("sap.ui.demo.myFiori.util.Grouper");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");

sap.ui.demo.myFiori.util.Grouper = {

	bundle: null, // somebody has to set this

	Active: function(oContext) {
		var status = oContext.getProperty("Active");
		var text = sap.ui.demo.myFiori.util.Grouper.bundle.getText("StatusText" + status, "?");
		return {
			key: status,
			text: text
		};
	},

	GrossAmount: function(oContext) {
		var price = oContext.getProperty("GrossAmount");
		var currency = oContext.getProperty("CurrencyCode");
		var key = null,
			text = null;
		if (price <= 5000) {
			key = "LE10";
			text = "< 5000 " + currency;
		} else if (price > 5000 && price <= 10000) {
			key = "LE100";
			text = "< 10.000  " + currency;
		} else if (price > 10000) {
			key = "GT100";
			text = "> 10.000 " + currency;
		}
		return {
			key: key,
			text: text
		};
	},

	getMonth: function(oDateInMillis) {
		var myDate = new Date();
		myDate.setTime(oDateInMillis);
		var month = myDate.getMonth();
		var sMonth = sap.ui.demo.myFiori.util.Grouper.bundle.getText("StringMonth" + month, "?");
		return sMonth;

	},

	getMillis: function(oDate) {
		oDate = oDate.replace('/Date(', '');
		oDate = oDate.replace(')/', '');

		return oDate;
	},

	getYear: function(oDateInMillis) {
		var myDate = new Date();
		myDate.setTime(oDateInMillis);
		return myDate.getFullYear();
	},

	Day: function(oContext) {

		//var date = sap.ui.demo.myFiori.util.Grouper.getMillis(oContext.getProperty("Entryday"));
		var date = oContext.getProperty("Entryday");
		if (typeof date === 'string') {
			date = sap.ui.demo.myFiori.util.Grouper.getMillis(date);
		}

		var key = null,
			text = null;
		var sMonth = sap.ui.demo.myFiori.util.Grouper.getMonth(date);

		key = sap.ui.demo.myFiori.util.Grouper.getYear(date);
		text = sMonth + " " + sap.ui.demo.myFiori.util.Grouper.getYear(date);
		return {
			key: key,
			text: text
		};
	}
};