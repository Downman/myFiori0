jQuery.sap.declare("sap.ui.demo.myFiori.util.Filter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.demo.myFiori.util.Filter = {

	filterDate: new Date(),

	filterDay: function(oDay) {
		//oDay = oDay.replace('/DATE(', '');
		//oDay = oDay.replace(')/', '');
		//var myDate = new Date();
		oDay.setTime(oDay);
		if (sap.ui.demo.myFiori.util.Filter.filterDate.getMonth() === oDay.getMonth() && sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear() ===
			oDay.getFullYear()) {
			return true;
		} else {
			return false;
		}
	},

	setDate: function(oDay) {
		//oDay = oDay.replace('/Date(', '');
		//oDay = oDay.replace(')/', '');
		//var myDate = new Date();
		//myDate.setTime(oDay);
		sap.ui.demo.myFiori.util.Filter.filterDate = oDay;
	},

	nextMonth: function() {
		var iMonth = sap.ui.demo.myFiori.util.Filter.filterDate.getMonth();
		var iYear = sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear();
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
		var iMonth = sap.ui.demo.myFiori.util.Filter.filterDate.getMonth();
		var iYear = sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear();
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