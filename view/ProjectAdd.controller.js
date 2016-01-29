jQuery.sap.require("sap.xeptum.timesheets.util.Formatter");
sap.ui.core.mvc.Controller.extend("sap.xeptum.timesheets.view.ProjectAdd", {

	newProject: {
		ZmnProjectSet: [{
			Projectid: 0,
			Customer: "Enter customer",
			Description: "Enter project description",
			Startdate: "/Date(20)/",
			Enddate: "/Date(30)/"
	}]
	},

	onInit: function() {
		var oRouter = this.getRouter();
		oRouter.getRoute("projectadd").attachMatched(this.onRouteMatched, this);
	},

	onRouteMatched: function(oEvent) {
		var oView = this.getView();
		// when detail navigation occurs, update the binding context
		if (oEvent.getParameter("name") === "projectadd") {
			this.oModeli18n = this.getView().getModel("i18n").getResourceBundle();
			var sProductPath = "/" + oEvent.getParameter("arguments").entity;
			if (sProductPath.indexOf("Projectid=0") > -1) {
				this.newEntry();
			} else {
				//oView.unbindElement();
				this.editEntry(sProductPath);
			}

			// Make sure the master is here
		}
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	getEventBus: function() {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},

	onBeforeRendering: function() {
		this.initNewProject();
	},

	initNewProject: function() {
		this.oModeli18n = this.getView().getModel("i18n").getResourceBundle();
		//this.newEntry();
	},

	newEntry: function() {
		var oModel;
		oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.newProject);
		oModel.setDefaultBindingMode("TwoWay");
		this.getView().page.setModel(oModel);
		this.getView().page.bindElement("/ZmnProjectSet/0");
		this.getView().Footer.getContentRight()[0].setVisible(true);
		this.getView().Footer.getContentRight()[1].setVisible(false);
		this.getView().page.setTitle(this.oModeli18n.getText("ProjectAddText"));
		this.getView().Header.setTitle(this.oModeli18n.getText("ProjectAddText"));
		this.getView().Header.getAttributes()[0].setText(this.oModeli18n.getText("ProjectAddDescText"));
	},

	editEntry: function(sContext) {
		var oModel, oDate;
		this.newEntry();
		this.getView().page.setModel(this.getView().getModel());
		this.getView().page.bindElement(sContext);
		this.getView().Footer.getContentRight()[0].setVisible(false);
		this.getView().Footer.getContentRight()[1].setVisible(true);
		this.getView().page.setTitle(this.oModeli18n.getText("ProjectEditText"));
		this.getView().Header.setTitle(this.oModeli18n.getText("ProjectEditText"));
		this.getView().Header.getAttributes()[0].setText(this.oModeli18n.getText("ProjectEditDescText"));
	},

	handleNavButtonPress: function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	handleAdd: function() {
		var oModel, oData;
		oModel = this.getView().getModel();
		oData = {};
		oData.Customer = this.newProject.ZmnProjectSet[0].Customer;
		oData.Description = this.newProject.ZmnProjectSet[0].Description;
		oData.Startdate = sap.xeptum.timesheets.util.Formatter.oldFormat(this.newProject.ZmnProjectSet[0].Startdate);
		oData.Enddate = sap.xeptum.timesheets.util.Formatter.oldFormat(this.newProject.ZmnProjectSet[0].Enddate);

		oModel.create("ZmnProjectSet", oData, null, function() {
			alert("Create successful");
		}, function() {
			alert("Create failed");
		});
		oModel.refresh();
	},

	handleEdit: function() {
		var sUpdate, oModel, oData, sProjectid;
		oModel = this.getView().getModel();
		oData = {};
		sProjectid = this.getView().Header.getNumber();
		oData.Customer = this.getView().AddForm.getContent()[1]._oControl.edit._lastValue;
		oData.Description = this.getView().AddForm.getContent()[3]._oControl.edit._lastValue;
		oData.Startdate = sap.xeptum.timesheets.util.Formatter.oldFormat(this.getView().AddForm.getContent()[5].mProperties.value);
		oData.Enddate = sap.xeptum.timesheets.util.Formatter.oldFormat(this.getView().AddForm.getContent()[7].mProperties.value);

		sUpdate = "ZmnProjectSet(Mandt='800',Projectid=" + sProjectid + ")";
		oModel.update(sUpdate, oData, null, function() {
			alert("Update successful");
		}, function() {
			alert("Update failed");
		});
	}

});