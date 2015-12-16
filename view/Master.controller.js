jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress: function(evt) {
		var oContext;
		oContext = evt.getSource().getBindingContext();
		this.Context = oContext;
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "Detail",
			data: {
				bindingContext: oContext
			}
		});
	},

	handleAddProject: function(evt) {
		var oContext;
		oContext = evt.getSource().getBindingContext();
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "ProjectAdd",
			data: {
				bindingContext: oContext
			}
		});
	},

	handleEditProject: function() {
		var oContext = this.Context;
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "ProjectAdd",
			data: {
				bindingContext: oContext
			}
		});
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
		var oContext;
		oContext = evt.getParameter("listItem").getBindingContext();
		this.Context = oContext;
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId: "Detail",
			data: {
				bindingContext: oContext
			}
		});
	},

	handleGroup: function(evt) {

		// compute sorters
		var oSorters, oItem, sKey, oList, oBinding, oGrouper;
		oSorters = [];
		oItem = evt.getParameter("selectedItem");
		sKey = (oItem) ? oItem.getKey() : null;
		if (sKey === "Active") {
			sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			oGrouper = sap.ui.demo.myFiori.util.Grouper[sKey];
			oSorters.push(new sap.ui.model.Sorter(sKey, true, oGrouper));
		}

		// update binding
		oList = this.getView().byId("list");
		oBinding = oList.getBinding("items");
		oBinding.sort(oSorters);
	}
});