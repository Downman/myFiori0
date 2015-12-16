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
			Entryday: "01-01-1970",
			Activity: "Enter Activity",
			Entryhours: "00:00",
			Traveltime: "00:00",
			Additionalcost: "0",
			Currency: "Enter Currency",
			Entryuser: "Enter Username"
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

	//Bind temporary JSON to AddTab
	initNewEntry: function() {
		var mySimpleForm, oModel;
		mySimpleForm = this.getView().AddForm;
		oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.newEntry);
		oModel.setDefaultBindingMode("TwoWay");
		mySimpleForm.setModel(oModel);
		mySimpleForm.bindElement("/ProjectToEntries/0");
	},

	//initialize the Overview content with groups
	initOverview: function() {
		var sorters, grouper, oTable, oItem, oItemTemplate;
		sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();

		sorters = [];
		grouper = sap.ui.demo.myFiori.util.Grouper.Day;
		sorters.push(new sap.ui.model.Sorter("Entryday", true, grouper));

		oTable = this.getView().Table;
		oItem = oTable.mBindingInfos.items.template;
		oItemTemplate = oItem.clone();
		oTable.unbindAggregation("items");
		oTable.bindAggregation("items", {
			path: "ProjectToEntries",
			template: oItemTemplate,
			sorter: sorters,
			filters: []
		});
	},

	//Handle Lineitem pressed event of list
	handleLineItemPress: function(evt) {
		var sTabKey;
		sTabKey = this.getView().IconTabBar.getSelectedKey();
		if (sTabKey === "OverviewTab") {
			this.switchToDetail(evt);
		} else if (sTabKey === "DetailTab") {
			this.switchToAdd(evt);
		}
	},

	//Switch to AddTab
	switchToAdd: function(evt) {
		var sTimeentryid;
		sTimeentryid = this.newEntry.ProjectToEntries[0].Timeentryid;
		this.setVisibility("Add");
		if (!(this.getView().IconTabBar.getSelectedKey() === "AddTab")) {
			this.getView().IconTabBar.setSelectedKey("AddTab");
		}
		if (evt != null) {
			this.handleLineItemPressDetail(evt);
			this.getView().Footer.getContentRight()[0].setVisible(true);
			this.getView().Footer.getContentRight()[1].setVisible(true);
			this.getView().Footer.getContentRight()[2].setVisible(true);
		} else if (sTimeentryid !== 0) {
			this.getView().Footer.getContentRight()[0].setVisible(true);
			this.getView().Footer.getContentRight()[1].setVisible(true);
			this.getView().Footer.getContentRight()[2].setVisible(true);

		} else {
			this.getView().Footer.getContentRight()[0].setVisible(false);
			this.getView().Footer.getContentRight()[1].setVisible(true);
			this.getView().Footer.getContentRight()[2].setVisible(false);
		}

	},

	setVisibility: function(sState) {
		var aCols, bVisible;
		switch (sState) {
			case "Overview":
				bVisible = false;
				break;
			case "Detail":
				bVisible = true;
				break;
		}
		//header
		this.getView().Table.setHeaderText(this.getView().getModel("i18n").getResourceBundle().getText(sState + "Text"));
		aCols = this.getView().Table.getColumns();
		//content
		this.getView().DetailToolbar.setVisible(bVisible);
		aCols[0].setVisible(bVisible);
		aCols[1].setVisible(bVisible);
		aCols[3].setVisible(bVisible);
		aCols[4].setVisible(bVisible);
		//footer
		this.getView().Footer.getContentRight()[0].setVisible(false);
		this.getView().Footer.getContentRight()[1].setVisible(false);
		this.getView().Footer.getContentRight()[2].setVisible(false);
	},

	//Switch to DetailTab
	switchToDetail: function(evt) {
		var oDate;
		this.setVisibility("Detail");
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

	//Switch to OverviewTab
	switchToOverview: function(sContext) {
		var sorters, grouper, oTable, oItem, oItemTemplate;
		this.setVisibility("Overview");

		//reset entry not very nice to do
		if (sContext === "context") {
			this.newEntry.ProjectToEntries[0].Timeentryid = 0;
			this.newEntry.ProjectToEntries[0].Entryday = "01-01-1970";
			this.newEntry.ProjectToEntries[0].Activity = "Enter Activity";
			this.newEntry.ProjectToEntries[0].Entryhours = "00:00";
			this.newEntry.ProjectToEntries[0].Traveltime = "00:00";
			this.newEntry.ProjectToEntries[0].Additionalcost = "0";
			this.newEntry.ProjectToEntries[0].Currency = "Enter Currency";
			this.newEntry.ProjectToEntries[0].Entryuser = "Enter Username";
			this.getView().AddForm.getContent()[1].setValue("01-01-1970");
		}

		sorters = [];
		grouper = sap.ui.demo.myFiori.util.Grouper.Day;
		sorters.push(new sap.ui.model.Sorter("Entryday", true, grouper));

		oTable = this.getView().Table;
		oItem = oTable.mBindingInfos.items.template;
		oItemTemplate = oItem.clone();
		oTable.unbindAggregation("items");
		oTable.bindAggregation("items", {
			path: "ProjectToEntries",
			template: oItemTemplate,
			sorter: sorters,
			filters: []
		});

		if (!(this.getView().IconTabBar.getSelectedKey() === "OverviewTab")) {
			this.getView().IconTabBar.setSelectedKey("OverviewTab");
		}
	},

	//handle Approve Update button
	handleApprove: function() {
		//testing update
		var oData, oModel, sUpdate, sTimeentryid, that, oBundle, sSuccessMsg;
		oData = {};
		oModel = this.getView().getModel();
		sTimeentryid = this.newEntry.ProjectToEntries[0].Timeentryid;
		that = this;

		// show confirmation dialog
		oBundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			oBundle.getText("ApproveDialogMsg"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					sSuccessMsg = oBundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(sSuccessMsg);
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
			oBundle.getText("ApproveDialogTitle")
		);
	},

	handleAdd: function() {
		var oModel, oData;
		oModel = this.getView().getModel();
		oData = {};
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

	handleDelete: function() {
		//testing update
		var oModel, sUpdate, sTimeentryid, oBundle;
		oModel = this.getView().getModel();
		sTimeentryid = this.newEntry.ProjectToEntries[0].Timeentryid;

		// show confirmation dialog
		oBundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			oBundle.getText("ApproveDialogMsg"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = oBundle.getText("DeleteeDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
					if (sTimeentryid > 0) {

						sUpdate = "ZmnTimeEntrySet(Mandt='800',Timeentryid=" + sTimeentryid + ")";
						oModel.remove(sUpdate, null, function() {
							alert("Removal successful");
						}, function() {
							alert("Removal failed");
						});
					}

				}
			},
			oBundle.getText("ApproveDialogTitle")
		);
	},

	//navigate to add tab and fill the newEntry with context data.
	handleLineItemPressDetail: function(evt) {
		var oContext, oEntry, sEntryHours, sTraveltime, sEntryday;
		oContext = evt.getSource().getBindingContext();
		oEntry = oContext.oModel.getProperty(oContext.sPath, oContext);
		sEntryHours = sap.ui.demo.myFiori.util.Formatter.msToHoursMinutes(oEntry.Entryhours.ms);
		sTraveltime = sap.ui.demo.myFiori.util.Formatter.msToHoursMinutes(oEntry.Traveltime.ms);
		sEntryday = sap.ui.demo.myFiori.util.Formatter.date(oEntry.Entryday);

		this.newEntry.ProjectToEntries[0].Timeentryid = oEntry.Timeentryid;
		this.newEntry.ProjectToEntries[0].Entryday = sEntryday;
		this.newEntry.ProjectToEntries[0].Activity = oEntry.Activity;

		this.newEntry.ProjectToEntries[0].Entryhours = sEntryHours;
		this.newEntry.ProjectToEntries[0].Traveltime = sTraveltime;
		this.newEntry.ProjectToEntries[0].Additionalcost = oEntry.Additionalcost;
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
		var oFilter, oLabel, sMillis, sMonth, oTable, oItem, oItemTemplate;
		oLabel = this.getView().MonthLabel;
		sMillis = sap.ui.demo.myFiori.util.Filter.filterDate.getTime();
		sMonth = sap.ui.demo.myFiori.util.Grouper.getMonth(sMillis);
		oLabel.setText(sMonth + " " + sap.ui.demo.myFiori.util.Filter.filterDate.getFullYear());

		oFilter = new sap.ui.model.Filter("Entryday", sap.ui.model.FilterOperator.EQ, sap.ui.demo.myFiori.util.Filter.filterDate.getTime());

		oTable = this.getView().Table;
		oItem = oTable.mBindingInfos.items.template;
		oItemTemplate = oItem.clone();
		oTable.unbindAggregation("items");
		oTable.bindAggregation("items", {
			path: "ProjectToEntries",
			template: oItemTemplate,
			sorter: [],
			filters: [oFilter]
		});
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