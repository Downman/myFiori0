sap.ui.controller("sap.ui.demo.myFiori.view.App", {

	onInit: function() {
		this.oEventBus = sap.ui.getCore().getEventBus();
		this.oEventBus.subscribe("nav", "to", this.navTo, this);
		this.oEventBus.subscribe("nav", "back", this.navBack, this);
	},

	navBack: function() {
		this.getView().app.backToPage("Master");
	},

	navTo: function(sChannelId, sEventId, oData) {
		var app = this.getView().app,
			sViewId = oData.viewId,
			oDataObject = oData.data;

		// load page on demand
		var master = (sViewId === "Master");
		if (app.getPage(sViewId, master) === null) {
			var page = sap.ui.view({
				id: sViewId,
				viewName: "sap.ui.demo.myFiori.view." + sViewId,
				type: "JS"
			});
			app.addPage(page, false);
		}
		app.toDetail(sViewId);
		if (oDataObject.bindingContext && sViewId === "Detail") {
			page = app.getPage(sViewId);
			//page.setBindingContext(oDataObject.bindingContext);
			page.bindElement(oDataObject.bindingContext.sPath);
			page.getController().switchToOverview("context");
		} else if (oDataObject.bindingContext && sViewId === "ProjectAdd") {
			page = app.getPage(sViewId);
			page.bindElement(oDataObject.bindingContext.sPath);
		}
	}

});