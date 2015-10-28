jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");
jQuery.sap.require("sap.ui.demo.myFiori.util.Filter");

sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	newEntry: {
		TimeEntries: [{
			TimeEntryid: "TimeEntryID 1",
			Entryday: "/Date(1)/",
			Activity: "Activity 1",
			Entryhours: "1:40 PM",
			Traveltime: "18:53:26",
			Additionalcost: "Enter amount",
			Currency: "Enter Currency",
			Entryuser: "Enter Username",
			Test: "123"
	}]
	},

	handleNavButtonPress: function(evt) {
		this.nav.back("Master");
	},

	//initialize the Filter and update the Databinding before Rendering
	onBeforeRendering: function() {
		this.initOverview();
		this.updateFilterBinding();
		this.initNewEntry();
	},

	initNewEntry: function() {
		var mySmartField;
		var mySimpleForm = this.getView().byId("mySimpleForm5");
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.newEntry);
		oModel.setDefaultBindingMode("TwoWay");
		mySimpleForm.setModel(oModel);

		for (var i = 1; i < 6; i++) {
			mySmartField = this.getView().byId("idProject" + i);
			mySmartField.bindElement("/ProjectToEntries/0");
		}

	},

	onChangedField: function(evt) {
		var test = this.getView().byId("idProject");
	},

	//initialize the Overview content with groups
	initOverview: function() {
		// compute sorters
		var sorters = [];

		sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
		var grouper = sap.ui.demo.myFiori.util.Grouper.Day;
		sorters.push(new sap.ui.model.Sorter("Entryday", true, grouper));

		// update binding
		var list = this.getView().byId("simpleTable");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	},

	handleApprove: function(evt) {
		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
				}
			},
			bundle.getText("ApproveDialogTitle")
		);
	},

	/*	handleLineItemPress: function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	},*/
	//switch to the Detail tab with the pressed context
	handleLineItemPress: function(evt) {
	    var checkThis = this.getView().byId("idProject3");
	    //checkThis.__proto__._rgxMinute =  /m(?=([^']*'[^']*')*[^']*$)/gi;
		var context = evt.getSource().getBindingContext();
		var test = context.oModel.getProperty(context.sPath, context);
		sap.ui.demo.myFiori.util.Filter.setDate(test.Entryday);

		//	var oBinding =  this.getView().byId("simpleTable2").getBinding("items").get
		this.updateFilterBinding();
		this.getView().byId("iconTabBar").setSelectedKey("Detail");
	},

	handleLineItemPressDetail: function(evt) {
		var context = evt.getSource().getBindingContext();
		var test = context.oModel.getProperty(context.sPath, context);
		var myDate = sap.ui.demo.myFiori.util.Formatter.myDateFormat(test.Entryday);
		this.newEntry.TimeEntries[0].Entryday = myDate;
		this.newEntry.TimeEntries[0].Activity = test.Activity;
		this.newEntry.TimeEntries[0].Entryday = myDate.toString();
	//	this.newEntry.TimeEntries[0].Hours = test.Hours;
		this.newEntry.TimeEntries[0].TravelTime = test.TravelTime;
		this.newEntry.TimeEntries[0].AdditionalCost = test.AdditionalCost;
		this.getView().byId("idProject1").getModel().refresh();


		//	var oBinding =  this.getView().byId("simpleTable2").getBinding("items").get
		this.updateFilterBinding();
		this.getView().byId("iconTabBar").setSelectedKey("Add");
	},

	//switch the Icontab and update the binding if necessary
	handleIconTabBarSelect: function(evt) {
		var oBinding = this.getView().byId("simpleTable2").getBinding("items"),
			sKey = evt.getParameter("selectedKey"),
			oFilter;
		if (sKey === "Detail") {
			var fnFilter = sap.ui.demo.myFiori.util.Filter.filterDay;
			oFilter = new sap.ui.model.Filter("Entryday", fnFilter);
			oBinding.filter([oFilter]);
		} else if (sKey === "Add") {
			var tab = this.getView().byId("mySimpleForm5");
			var tabItems = tab.getContent();
			// oBinding.filter([]);
		} else {
			oBinding.filter([]);
		}
	},

	// update the filter binding of the Detail Tab
	updateFilterBinding: function() {
		var oBinding = this.getView().byId("simpleTable2").getBinding("items"),
			oFilter;
		oBinding.filter([]);
		var fnFilter = sap.ui.demo.myFiori.util.Filter.filterDay;
		oFilter = new sap.ui.model.Filter("Entryday",fnFilter);
		oBinding.filter([oFilter]);
		var myLabel = this.getView().byId("monthLabel");
		var sMillis = sap.ui.demo.myFiori.util.Filter.filterDate.getTime();
		var sMonth = sap.ui.demo.myFiori.util.Grouper.getMonth(sMillis);
		myLabel.setText(sMonth + " " + sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear());
	},

	//set next month and update Filterbinding
	nextMonth: function(evt) {
		sap.ui.demo.myFiori.util.Filter.nextMonth();
		this.updateFilterBinding();
	},

	//set previous month and update Filterbinding
	prevMonth: function(evt) {
		sap.ui.demo.myFiori.util.Filter.prevMonth();
		this.updateFilterBinding();
	},

	//remove!
	handleGroup: function(evt) {

		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("Entryday" === key) {
			sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.demo.myFiori.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, true, grouper));
			//sorters.push(new sap.ui.model.Sorter("Day", false, true));
		}

		// update binding
		var list = this.getView().byId("simpleTable");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);

	}
});