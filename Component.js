jQuery.sap.declare("sap.xeptum.timesheets.Component");
jQuery.sap.require("sap.xeptum.timesheets.MyRouter");

sap.ui.core.UIComponent.extend("sap.xeptum.timesheets.Component", {

	metadata: {
		name: "XEPTUM Timesheets",
		version: "1.0",
		includes: [],
		dependencies: {
			libs: ["sap.ui.commons", "sap.m", "sap.me", "sap.ui.layout", "sap.ui.comp"],
			components: []
		},
		rootView: "sap.xeptum.timesheets.view.App",

		config: {
			resourceBundle: "i18n/messageBundle.properties",
			serviceConfig: {
				name: "ZMNService",
				serviceUrl: "http://w2k12sap7.xeptum.local/sap/opu/odata/sap/ZMN_PROJECT_SRV/"
			}
		},

		routing: {
			config: {
				routerClass: sap.xeptum.timesheets.MyRouter,
				viewType: "XML",
				viewPath: "sap.xeptum.timesheets.view",
				controlAggregation: "detailPages",
				clearTarget: false,
				greedy: true,
				transition: "flip",
				"bypassed": {
					"target": "notFound"
				}
			},
			routes: [
				{
					pattern: "",
					name: "main",
					target: "home"
				},
				{
					pattern: "productAdd/{entity}",
					name: "projectadd",
					target: "detail2"
				},

				{
					pattern: "{entity}/:tab:",
					name: "project",
					target: "detail1"
				}

				],

			targets: {
				home: {
					viewName: "Master",
					viewLevel: 1,
					controlAggregation: "masterPages",
					controlId: "idAppControl"
				},

				detail1: {
					viewName: "Detail",
					viewLevel: 2,
					viewType: "JS",
					controlId: "idAppControl"
				},

				detail2: {
					viewName: "ProjectAdd",
					viewLevel: 3,
					viewType: "JS",
					controlId: "idAppControl"
				},

				notFound: {
					viewName: "NotFound",
					transition: "show"
				}
			}

		}
	},

	init: function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("sap.xeptum.timesheets");

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// Create and set domain model to the component
		var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {
			json: true,
			withCredentials: true,
			loadMetadataAsync: true,
			user: "xeptum01",
			password: "xeptum01"
		});
		this.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phone,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();

	}
});