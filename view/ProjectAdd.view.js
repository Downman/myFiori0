sap.ui.jsview("sap.ui.demo.myFiori.view.ProjectAdd", {

	getControllerName: function() {
		return "sap.ui.demo.myFiori.view.ProjectAdd";
	},

	createContent: function(oController) {

		//Create Page
		this.page = new sap.m.Page({
			showNavButton: "{device>/isPhone}",
			title: "{i18n>ProjectAddText}",
			navButtonPress: oController.handleNavButtonPress
		});
		this.page.addStyleClass("sapUiFioriObjectPage");

		//Create Header
		this.Header = this.createHeader();

		//Create AddForm
		this.AddForm = this.createAddContent(oController);

		//Add Footer
		this.Footer = this.createFooter(oController);

		//Add content to Page
		this.page.addContent(this.Header);
		this.page.addContent(this.AddForm);
		this.page.setFooter(this.Footer);
		return this.page;
	},

	createAddContent: function() {
		var oSimpleForm, oInput, oLabel, oDatePicker;
		oSimpleForm = new sap.ui.layout.form.SimpleForm({
			emptySpanM: 4,
			editable: true,
			columnsM: 1,
			columnsL: 1,
			emptySpanL: 4,
			labelSpanL: 3,
			labelSpanM: 3,
			layout: "ResponsiveGridLayout",
			maxContainersCols: 2,
			minWidth: 1024
		});

		oSimpleForm.addStyleClass("editableForm");

		//create CustomerInput
		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: "idProject1",
			text: "{i18n>CustomerText}"
		});
		oSimpleForm.addContent(oLabel);

		oInput = new sap.ui.comp.smartfield.SmartField({
			value: "{Customer}",
			setPlaceholder: "enter Customer"
		});
		oSimpleForm.addContent(oInput);

		//create DescriptionInput
		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: "idProject2",
			text: "{i18n>DescriptionText}"
		});
		oSimpleForm.addContent(oLabel);

		oInput = new sap.ui.comp.smartfield.SmartField({
			value: "{Description}"
		});
		oSimpleForm.addContent(oInput);

		//create StartdateInput
		oLabel = new sap.m.Label({
			text: "{i18n>StartDateText}"
		});
		oSimpleForm.addContent(oLabel);

		oDatePicker = new sap.m.DatePicker({
			displayFormat: "long",
			value: "{path: 'Startdate', formatter: 'sap.ui.demo.myFiori.util.Formatter.date'}",
		//	value: "{path: 'Startdate', type: 'sap.ui.model.odata.type.Date'}",
			valueFormat: "dd-MM-yyyy"
		});
		oDatePicker.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDatePicker);

		//create EnddateInput
		oLabel = new sap.m.Label({
			text: "{i18n>EndDateText}"
		});
		oSimpleForm.addContent(oLabel);

		oDatePicker = new sap.m.DatePicker({
			displayFormat: "long",
			value: "{path: 'Enddate', formatter: 'sap.ui.demo.myFiori.util.Formatter.date'}",
			//	value: "{path: 'Enddate', type: 'sap.ui.model.odata.type.Date'}",
			valueFormat: "dd-MM-yyyy"
		});
		oDatePicker.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDatePicker);

		return oSimpleForm;

	},

	createFooter: function(oController) {
		var oBar, oButton;
		oBar = new sap.m.Bar();

		oButton = new sap.m.Button({
			icon: "sap-icon://add",
			press: [oController.handleAdd, oController],
			text: "{i18n>AddButtonText}",
			type: "Accept"
		});
		oButton.setVisible(true);
		oBar.addContentRight(oButton);

		oButton = new sap.m.Button({
			icon: "sap-icon://save",
			press: [oController.handleEdit, oController],
			text: "{i18n>ApproveButtonText}",
			type: "Accept"
		});
		oButton.setVisible(false);
		oBar.addContentRight(oButton);

		return oBar;
	},

	createHeader: function() {
		var oAttributes, oHeader;
		//Create Header
		oHeader = new sap.m.ObjectHeader({
			title: "{i18n>ProjectAddText}",
			number: "{Projectid}"
		}); //number="{Projectid}" title="{Customer}"

		//Create header attributes and Status
		oAttributes = new sap.m.ObjectAttribute({
			text: "{i18n>ProjectAddDescText}"
		});
		oHeader.addAttribute(oAttributes);

		return oHeader;
	}

});