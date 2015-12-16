jQuery.sap.declare("sap.ui.demo.myFiori.util.Filter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.demo.myFiori.util.Filter = {

	filterDate: new Date("December 13, 2014 11:13:00"),

	filterDay: function(oDay) {
		var oDate;
		if (typeof oDay === "string") {
			oDay = oDay.replace("/DATE(", "");
			oDay = oDay.replace(")/", "");
			oDate = new Date();
			oDate.setTime(oDay);
			oDay = oDate;

		}

		oDay.setTime(oDay);
		if (sap.ui.demo.myFiori.util.Filter.filterDate.getMonth() === oDay.getMonth() && sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear() ===
			oDay.getFullYear()) {
			return true;
		} else {
			return false;
		}
	},

	setDate: function(oDay) {
		var oDate;
		if (typeof oDay === "string") {
			oDay = oDay.replace("/Date(", "");
			oDay = oDay.replace(")/", "");
			oDate = new Date();
			oDate.setTime(oDay);
			oDay = oDate;
		}
		sap.ui.demo.myFiori.util.Filter.filterDate = oDay;
	},

	nextMonth: function() {
		var iMonth, iYear;
		iMonth = sap.ui.demo.myFiori.util.Filter.filterDate.getMonth();
		iYear = sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear();
		if (iMonth < 11) {
			iMonth++;
		} else {
			iMonth = 0;
			iYear++;
			sap.ui.demo.myFiori.util.Filter.filterDate.setFullYear(iYear);
		}
		sap.ui.demo.myFiori.util.Filter.filterDate.setMonth(iMonth);
	},

	prevMonth: function() {
		var iMonth, iYear;
		iMonth = sap.ui.demo.myFiori.util.Filter.filterDate.getMonth();
		iYear = sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear();
		if (iMonth > 0) {
			iMonth--;
		} else {
			iMonth = 11;
			iYear--;
			sap.ui.demo.myFiori.util.Filter.filterDate.setFullYear(iYear);
		}
		sap.ui.demo.myFiori.util.Filter.filterDate.setMonth(iMonth);
	}

};