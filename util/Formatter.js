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
			//value = value.replace('/Date(', '');
			//value = value.replace(')/', '');
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd-MM-yyyy"
			});
			//var dat = new Date();
			//dat.setTime(value);
			return oDateFormat.format(value);
		} else {
			return value;
		}
	},
	
	myDateFormat: function(value) {
	    		if (value) {
			//value = value.replace('/Date(', '');
			//value = value.replace(')/', '');
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd/MM/yy"
			});
			//var dat = new Date();
			//dat.setTime(value);
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