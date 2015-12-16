sap.ui.controller("sap.ui.demo.myFiori.view.ProjectAdd", {

	newProject: {
		ZmnProjectSet: [{
			Projectid: 0,
			Customer: "Enter customer",
			Description: "Enter project description",
			Startdate: "13-11-2015",
			Enddate: "13-12-2015"
	}]
	},

	onInit: function() {},

	onBeforeRendering: function() {
		this.initNewProject();
	},

	initNewProject: function() {
		var oInput;
		var mySimpleForm = this.getView().AddForm;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.newProject);
		oModel.setDefaultBindingMode("TwoWay");
		mySimpleForm.setModel(oModel);

		for (var i = 0; i < 4; i++) {
			oInput = mySimpleForm.getContent()[(i * 2) + 1];
			oInput.bindElement("/ZmnProjectSet/0");
		}
	},

	handleNavButtonPress: function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	handleAdd: function() {
		var oModel = this.getView().getModel();
		var oData = {};
		oData.Customer = this.newProject.ZmnProjectSet[0].Customer;
		oData.Description = this.newProject.ZmnProjectSet[0].Description;
		oData.Startdate = sap.ui.demo.myFiori.util.Formatter.oldFormat(this.newProject.ZmnProjectSet[0].Startdate);
		oData.Enddate = sap.ui.demo.myFiori.util.Formatter.oldFormat(this.newProject.ZmnProjectSet[0].Enddate);

		oModel.create("ZmnProjectSet", oData, null, function() {
			alert("Create successful");
		}, function() {
			alert("Create failed");
		});
		oModel.refresh();
	}

});