jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");
jQuery.sap.require("sap.ui.demo.myFiori.util.Filter");

sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	oTable: null,

	newEntry: {
		ProjectToEntries: [{
			Timeentryid: 0,
			Entryday: "13-11-2015",
			Activity: "Activity 1",
			Entryhours: "01:00",
			Traveltime: "00:00",
			Additionalcost: "0",
			Currency: "Enter Currency",
			Entryuser: "Enter Username",
			Test: "123"
	}]
	},

	//nav Button on Mobile devices
	handleNavButtonPress: function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	//initialize the Filter and update the Databinding before Rendering
	onBeforeRendering: function() {
		this.initOverview();
		this.initNewEntry();
	},

	resetIconTab: function() {
		this.getView().byId("iconTabBar").setSelectedKey("OverviewTab");
	},

	initNewEntry: function() {
		var oInput;
		var mySimpleForm = this.getView().AddForm;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.newEntry);
		oModel.setDefaultBindingMode("TwoWay");
		mySimpleForm.setModel(oModel);

		for (var i = 0; i < 5; i++) {
			oInput = mySimpleForm.getContent()[(i * 2) + 1];
			oInput.bindElement("/ProjectToEntries/0");
		}
	},

	//initialize the Overview content with groups
	initOverview: function() {
		var oBinding, sorters, grouper;
		sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();

		oBinding = this.getView().Table.getBinding("items");
		sorters = [];
		grouper = sap.ui.demo.myFiori.util.Grouper.Day;
		sorters.push(new sap.ui.model.Sorter("Entryday", true, grouper));
		oBinding.sort(sorters);
	},

	handleLineItemPress: function(evt) {
		var sTabKey;
		sTabKey = this.getView().IconTabBar.getSelectedKey();
		if (sTabKey === "OverviewTab") {
			this.switchToDetail(evt);
			//	this.updateFilterBinding();
		} else if (sTabKey === "DetailTab") {
			this.switchToAdd(evt);
		}
	},

	switchToAdd: function(evt) {
		var sTimeentryid = this.newEntry.ProjectToEntries[0].Timeentryid;
		if (!(this.getView().IconTabBar.getSelectedKey() === "AddTab")) {
			this.getView().IconTabBar.setSelectedKey("AddTab");
		}
		if (evt != null) {
			this.handleLineItemPressDetail(evt);
			this.getView().Footer.getContentRight()[0].setVisible(true);
			this.getView().Footer.getContentRight()[1].setVisible(true);
		} else if (sTimeentryid !== 0) {
			this.getView().Footer.getContentRight()[0].setVisible(true);
			this.getView().Footer.getContentRight()[1].setVisible(true);

		} else {
			this.getView().Footer.getContentRight()[0].setVisible(false);
			this.getView().Footer.getContentRight()[1].setVisible(true);
		}

	},

	switchToDetail: function(evt) {
		var aCols, oDate;
		this.getView().Footer.getContentRight()[0].setVisible(false);
		this.getView().Footer.getContentRight()[1].setVisible(false);

		aCols = this.getView().Table.getColumns();
		this.getView().Table.setHeaderText(this.getView().getModel("i18n").getResourceBundle().getText("DetailText"));
		this.getView().DetailToolbar.setVisible(true);
		aCols[0].setVisible(true);
		aCols[1].setVisible(true);
		aCols[3].setVisible(true);
		aCols[4].setVisible(true);

		if (evt != null) {
			oDate = evt.getSource().mAggregations.cells[0].mProperties.text;
			oDate = sap.ui.demo.myFiori.util.Formatter.oldFormat(oDate);
			sap.ui.demo.myFiori.util.Filter.setDate(oDate);

		}
		this.updateMonthFilter();

		if (!(this.getView().IconTabBar.getSelectedKey() === "DetailTab")) {
			this.getView().IconTabBar.setSelectedKey("DetailTab");
		}

	},

	switchToOverview: function() {
		var aCols, oBinding, sorters, grouper;

		this.getView().Footer.getContentRight()[0].setVisible(false);
		this.getView().Footer.getContentRight()[1].setVisible(false);
		aCols = this.getView().Table.getColumns();
		this.getView().DetailToolbar.setVisible(false);
		this.getView().Table.setHeaderText(this.getView().getModel("i18n").getResourceBundle().getText("OverviewText"));
		aCols[0].setVisible(false);
		aCols[1].setVisible(false);
		aCols[3].setVisible(false);
		aCols[4].setVisible(false);

		oBinding = this.getView().Table.getBinding("items");
		sorters = [];
		grouper = sap.ui.demo.myFiori.util.Grouper.Day;
		sorters.push(new sap.ui.model.Sorter("Entryday", true, grouper));
		oBinding.filter([]);
		oBinding.sort(sorters);

		if (!(this.getView().IconTabBar.getSelectedKey() === "OverviewTab")) {
			this.getView().IconTabBar.setSelectedKey("OverviewTab");
		}
	},

	handleApprove: function() {

		//testing update
		var oData = {};
		var oModel = this.getView().getModel();
		var sUpdate;
		var sTimeentryid = this.newEntry.ProjectToEntries[0].Timeentryid;
		var that = this;

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
					if (sTimeentryid > 0) {

						oData.Activity = that.newEntry.ProjectToEntries[0].Activity;
						oData.Additionalcost = Number(that.newEntry.ProjectToEntries[0].Additionalcost);

						oData.Entryday = sap.ui.demo.myFiori.util.Formatter.oldFormat(that.newEntry.ProjectToEntries[0].Entryday);
						oData.Entryhours = sap.ui.demo.myFiori.util.Formatter.hoursMinutesToMs(that.newEntry.ProjectToEntries[0].Entryhours);
						oData.Traveltime = sap.ui.demo.myFiori.util.Formatter.hoursMinutesToMs(that.newEntry.ProjectToEntries[0].Traveltime);

						sUpdate = "ZmnTimeEntrySet(Mandt='800',Timeentryid=" + sTimeentryid + ")";
						oModel.update(sUpdate, oData, null, function() {
							alert("Update successful");
						}, function() {
							alert("Update failed");
						});
					}

				}
			},
			bundle.getText("ApproveDialogTitle")
		);
	},

	handleAdd: function() {
		var oModel = this.getView().getModel();
		var oData = {};
		oData.Activity = this.newEntry.ProjectToEntries[0].Activity;
		oData.Additionalcost = Number(this.newEntry.ProjectToEntries[0].Additionalcost);

		oData.Entryday = sap.ui.demo.myFiori.util.Formatter.oldFormat(this.newEntry.ProjectToEntries[0].Entryday);
		oData.Entryhours = sap.ui.demo.myFiori.util.Formatter.hoursMinutesToMs(this.newEntry.ProjectToEntries[0].Entryhours);
		oData.Traveltime = sap.ui.demo.myFiori.util.Formatter.hoursMinutesToMs(this.newEntry.ProjectToEntries[0].Traveltime);
		oData.Projectid = parseInt(this.getView().Header.getNumber());

		oModel.create("ZmnTimeEntrySet", oData, null, function() {
			alert("Create successful");
		}, function() {
			alert("Create failed");
		});
	},

	//navigate to add tab and fill the newEntry with context data.
	handleLineItemPressDetail: function(evt) {
		var context = evt.getSource().getBindingContext();
		var test = context.oModel.getProperty(context.sPath, context);
		var sEntryHours = sap.ui.demo.myFiori.util.Formatter.msToHoursMinutes(test.Entryhours.ms);
		var sTraveltime = sap.ui.demo.myFiori.util.Formatter.msToHoursMinutes(test.Traveltime.ms);
		var sEntryday = sap.ui.demo.myFiori.util.Formatter.date(test.Entryday);

		//var myDate = sap.ui.demo.myFiori.util.Formatter.myDateFormat(test.Entryday);
		this.newEntry.ProjectToEntries[0].Timeentryid = test.Timeentryid;
		this.newEntry.ProjectToEntries[0].Entryday = sEntryday;
		this.newEntry.ProjectToEntries[0].Activity = test.Activity;

		this.newEntry.ProjectToEntries[0].Entryhours = sEntryHours;
		this.newEntry.ProjectToEntries[0].Traveltime = sTraveltime;
		this.newEntry.ProjectToEntries[0].Additionalcost = test.Additionalcost;
		this.getView().AddForm.getModel().refresh();
	},

	//switch the Icontab and update the binding if necessary
	handleIconTabBarSelect: function(evt) {
		var sKey;
		sKey = evt.getParameter("selectedKey");

		if (sKey === "DetailTab") {
			this.switchToDetail();
		} else if (sKey === "AddTab") {
			this.switchToAdd();
		} else if (sKey === "OverviewTab") {
			this.switchToOverview();
		}
	},

	// update the filter binding of the Detail Tab
	updateMonthFilter: function() {
		var oBinding, oFilter, oLabel, sMillis, sMonth;
		oBinding = this.getView().Table.getBinding("items");
		oLabel = this.getView().MonthLabel;
		sMillis = sap.ui.demo.myFiori.util.Filter.filterDate.getTime();
		sMonth = sap.ui.demo.myFiori.util.Grouper.getMonth(sMillis);
		oLabel.setText(sMonth + " " + sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear());

		//	oBinding.sort([]);
		//var oFilter = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, query.toUpperCase());
		oFilter = new sap.ui.model.Filter("Entryday", sap.ui.model.FilterOperator.EQ, sap.ui.demo.myFiori.util.Filter.filterDate.getTime());
		oBinding.sort([]);
		oBinding.filter([oFilter]);
	},

	//set next month and update Filterbinding
	nextMonth: function() {
		sap.ui.demo.myFiori.util.Filter.nextMonth();
		this.updateMonthFilter();
	},

	//set previous month and update Filterbinding
	prevMonth: function() {
		sap.ui.demo.myFiori.util.Filter.prevMonth();
		this.updateMonthFilter();
	}
});