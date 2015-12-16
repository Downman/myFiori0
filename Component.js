jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	createContent: function() {

		// create root view
		var oView = sap.ui.view({
			id: "app",
			viewName: "sap.ui.demo.myFiori.view.App",
			type: "JS",
			viewData: {
				component: this
			}
		});

		//i18n MOdel
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// Create and set domain model to the component
		var url = "http://w2k12sap7.xeptum.local/sap/opu/odata/sap/ZMN_PROJECT_SRV/";
		var oModel = new sap.ui.model.odata.ODataModel(url, {
			json: true,
			withCredentials: true,
			loadMetadataAsync: true,
			user: "xeptum01",
			password: "xeptum01"
		});
	//	oModel.setDefaultBindingMode("TwoWay");
		oView.setModel(oModel);
		sap.ui.getCore().setModel(oModel);


		//set the device Model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone: jQuery.device.is.phone,
			isNoPhone: !jQuery.device.is.phone,
			listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});