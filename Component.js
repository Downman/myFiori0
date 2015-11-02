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

		//		// Using OData model to connect against a real service
		//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
		//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
		//		oView.setModel(oModel);

		//set i18model
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
			user: 'xeptum01',
			password: 'xeptum01'
		});
		oModel.setDefaultBindingMode("TwoWay");
		oView.setModel(oModel);
		

		//	var oModel = new sap.ui.model.odata.ODataModel("http://w2k12sap7.xeptum.local/sap/opu/odata/sap/ZMN_PROJECT_SRV/", {json: true,loadMetadataAsync: true});
		//	oModel.attachMetadataFailed(function(){
		//      this.getEventBus().publish("Component", "MetadataFailed");
		//	},this);

		// Using a local model for offline development
/*
		var oModel = new sap.ui.model.json.JSONModel("model/ZmnProjectSet.json");
		oModel.setDefaultBindingMode("TwoWay");
		oView.setModel(oModel);
*/
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
	},

	_startMockServer: function(sServiceUrl) {
		jQuery.sap.require("sap.ui.core.util.MockServer");
		var oMockServer = new sap.ui.core.util.MockServer({
			rootUri: sServiceUrl
		});

		var iDelay = +(jQuery.sap.getUriParameters().get("responderDelay") || 0);
		sap.ui.core.util.MockServer.config({
			autoRespondAfter: iDelay
		});

		oMockServer.simulate("model/metadata.xml", "model/");
		oMockServer.start();

		sap.m.MessageToast.show("Running in demo mode with mock data.", {
			duration: 4000
		});
	}
});