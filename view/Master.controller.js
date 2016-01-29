jQuery.sap.require("sap.xeptum.timesheets.util.Formatter");
jQuery.sap.require("sap.xeptum.timesheets.util.Grouper");

sap.ui.core.mvc.Controller.extend("sap.xeptum.timesheets.view.Master", {

	onInit: function() {
		this.oUpdateFinishedDeferred = jQuery.Deferred();

		this.getView().byId("list").attachEventOnce("updateFinished", function() {
			this.oUpdateFinishedDeferred.resolve();
		}, this);
		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
	},

	onRouteMatched: function(oEvent) {
		var oList = this.getView().byId("list");
		var sName = oEvent.getParameter("name");
		var oArguments = oEvent.getParameter("arguments");
		// Wait for the list to be loaded once
		jQuery.when(this.oUpdateFinishedDeferred).then(jQuery.proxy(function() {
			var aItems;

			// On the empty hash select the first item
			if (sName === "main") {
				this.selectDetail();
			}

			// Try to select the item in the list
			if (sName === "project") {
				aItems = oList.getItems();
				for (var i = 0; i < aItems.length; i++) {
					if (aItems[i].getBindingContext().getPath() === "/" + oArguments.product) {
						oList.setSelectedItem(aItems[i], true);
						break;
					}
				}
			}

		}, this));
	},

	selectDetail: function() {
		if (!sap.ui.Device.system.phone) {
			var oList = this.getView().byId("list");
			var aItems = oList.getItems();
			if (aItems.length && !oList.getSelectedItem()) {
				oList.setSelectedItem(aItems[0], true);
				this.showDetail(aItems[0]);
				//this.showProjectAdd(aItems[0]);
			}
		}
	},

	showDetail: function(oItem) {
		// If we're on a phone, include nav in history; if not, don't.
		var bReplace = jQuery.device.is.phone ? false : true;
		//	sap.ui.core.UIComponent.getRouterFor(this).navTo("projectadd");
		sap.ui.core.UIComponent.getRouterFor(this).navTo("project", {
			from: "master",
			entity: oItem.getBindingContext().getPath().substr(1),
			tab: this.sTab
		}, bReplace);
	},

	showProjectAdd: function(oItem) {
		// If we're on a phone, include nav in history; if not, don't.
		var bReplace = jQuery.device.is.phone ? false : true;
		sap.ui.core.UIComponent.getRouterFor(this).navTo("projectadd", {
			pattern: "productadd",
			entity: oItem
		}, bReplace);
		/*	sap.ui.core.UIComponent.getRouterFor(this).navTo("projectadd", {
			from: "master",
			entity: oItem
		}, bReplace);*/
	},

	getEventBus: function() {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleListItemPress: function(evt) {

		var oContext;
		oContext = evt.getSource().getBindingContext();
		this.Context = oContext;
		// Get the list item, either from the listItem parameter or from the event's
		// source itself (will depend on the device-dependent mode).
		this.showDetail(evt.getParameter("listItem") || evt.getSource());

		this.getView().byId("editButton").setVisible(true);

		/*
		this.getView().byId("editButton").setVisible(true);
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "Detail",
			data: {
				bindingContext: oContext
			}
		});*/
	},

	handleAddProject: function(evt) {

		//	this.showProjectAdd(evt.getSource().getBindingContext() || evt.getSource());
		this.showProjectAdd("ProjectSet(Mandt='800',Projectid=0)");
		/*var oContext;
		oContext = evt.getSource().getBindingContext();
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "ProjectAdd",
			data: {
				bindingContext: oContext
			}
		});*/
	},

	handleEditProject: function() {
		var oView, oSelectedItem;
		oView = this.getView().byId("list");
		oSelectedItem = oView.getSelectedItem();
		this.showProjectAdd(oSelectedItem.getBindingContext().getPath().substring(1));
		/*	var oContext = this.Context;
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "ProjectAdd",
			data: {
				bindingContext: oContext
			}
		});*/
	},

	handleSearch: function(evt) {
		// create model filter
		var aFilters, sQuery, oFilter, oList, oBinding;
		aFilters = [];
		sQuery = evt.getParameter("query");
		if (sQuery && sQuery.length > 0) {

			oFilter = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, sQuery.toUpperCase());
			aFilters.push(oFilter);
		}

		// update list binding
		oList = this.getView().byId("list");
		oBinding = oList.getBinding("items");
		oBinding.filter(aFilters);
	},

	handleListSelect: function(evt) {
		// Get the list item, either from the listItem parameter or from the event's
		// source itself (will depend on the device-dependent mode).
		this.showDetail(evt.getParameter("listItem") || evt.getSource());
		this.getView().byId("editButton").setVisible(true);
		/*
		var oContext;
		oContext = evt.getParameter("listItem").getBindingContext();
		this.Context = oContext;
		this.getView().byId("editButton").setVisible(true);
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "Detail",
			data: {
				bindingContext: oContext
			}
		});*/
	},

	handleGroup: function(evt) {

		// compute sorters
		var oSorters, oItem, sKey, oList, oBinding, oGrouper;
		oSorters = [];
		oItem = evt.getParameter("selectedItem");
		sKey = (oItem) ? oItem.getKey() : null;
		if (sKey === "Active") {
			sap.xeptum.timesheets.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			oGrouper = sap.xeptum.timesheets.util.Grouper[sKey];
			oSorters.push(new sap.ui.model.Sorter(sKey, true, oGrouper));
		}

		// update binding
		oList = this.getView().byId("list");
		oBinding = oList.getBinding("items");
		oBinding.sort(oSorters);
	}
});