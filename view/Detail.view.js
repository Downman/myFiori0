sap.ui.jsview("sap.ui.demo.myFiori.view.Detail", {

	getControllerName: function() {
		return "sap.ui.demo.myFiori.view.Detail";
	},

	createContent: function(oController) {
		//Create Page
		this.page = new sap.m.Page("myPage", {
			showNavButton: "{device>/isPhone}",
			title: "{i18n>DetailTitle}",
			navButtonPress: oController.handleNavButtonPress
		});
		this.page.addStyleClass("sapUiFioriObjectPage");

		//Create Header
		this.Header = this.createHeader();

		//Create IconTabBar
		this.IconTabBar = this.createIconTabBar(oController);
		this.Table = this.createTable(oController);

		//Create SimpleForm
		this.SimpleForm = this.createSimpleForm("TabBarForm");
		this.SimpleForm.addContent(this.Table);

		//Create Toolbar
		this.DetailToolbar = this.createToolbar(oController);
		this.DetailToolbar.setVisible(false);

		//add Content to IconTabBar
		this.IconTabBar.addContent(this.DetailToolbar);
		this.IconTabBar.addContent(this.SimpleForm);

		//Overview Tab
		this.OverviewTab = this.createTab("OverviewTab", "sap-icon://document");
		this.IconTabBar.addItem(this.OverviewTab);

		//Detail Tab
		this.DetailTab = this.createTab("DetailTab", "sap-icon://inspection");
		this.IconTabBar.addItem(this.DetailTab);

		//Add Tab
		this.AddTab = this.createTab("AddTab", "sap-icon://add");
		this.AddForm = this.createAddTabFilterContent(oController);
		this.AddTab.addContent(this.AddForm);
		this.IconTabBar.addItem(this.AddTab);

		//Add Footer
		this.Footer = this.createFooter(oController);

		//Add content to Page
		this.page.addContent(this.Header);
		this.page.addContent(this.IconTabBar);
		this.page.setFooter(this.Footer);
		return this.page;
	},

	createFooter: function(oController) {
		var oBar, oButton;
		oBar = new sap.m.Bar();
		oButton = new sap.m.Button({
			icon: "sap-icon://accept",
			press: [oController.handleApprove, oController],
			text: "{i18n>ApproveButtonText}",
			type: "Accept"
		});
		oButton.setVisible(false);
		oBar.addContentRight(oButton);

		oButton = new sap.m.Button({
			icon: "sap-icon://add",
			press: [oController.handleAdd, oController],
			text: "{i18n>AddButtonText}",
			type: "Accept"
		});
		oButton.setVisible(false);
		oBar.addContentRight(oButton);

		return oBar;
	},

	createAddTabFilterContent: function() {
		var oSimpleForm, oInput, oLabel, oDatePicker, oDateTimeInput;
		oSimpleForm = new sap.ui.layout.form.SimpleForm("simpleFormAdd", {
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

		//create DateInput
		oLabel = new sap.m.Label({
			text: "{i18n>DateText}"
		});
		oSimpleForm.addContent(oLabel);

		oDatePicker = new sap.m.DatePicker("idProject1", {
			displayFormat: "long",
			value: "{path: 'Entryday', type: 'sap.ui.model.odata.type.Date'}",
			valueFormat: "dd-MM-yyyy"
		});
		oDatePicker.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDatePicker);

		//create ActivityInput
		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: "idProject2",
			text: "{i18n>ActivityText}"
		});
		oSimpleForm.addContent(oLabel);

		oInput = new sap.ui.comp.smartfield.SmartField("idProject2", {
			value: "{Activity}"
		});
		oSimpleForm.addContent(oInput);

		//create HoursInput
		oLabel = new sap.m.Label({
			text: "{i18n>HoursText}"
		});
		oSimpleForm.addContent(oLabel);

		oDateTimeInput = new sap.m.DateTimeInput("idProject3", {
			displayFormat: "HH'h' mm'm'",
			placeholder: "Enter Time ...",
			type: "Time",
			value: "{Entryhours}",
			valueFormat: "HH:mm"
		});
		oDateTimeInput.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDateTimeInput);

		//create TraveltimInput
		oLabel = new sap.m.Label({
			text: "{i18n>TravelTimeText}"
		});
		oSimpleForm.addContent(oLabel);

		oDateTimeInput = new sap.m.DateTimeInput("idProject4", {
			displayFormat: "HH'h' mm'm'",
			placeholder: "Enter Time ...",
			type: "Time",
			value: "{Traveltime}",
			valueFormat: "HH:mm"
		});
		oDateTimeInput.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDateTimeInput);

		//create AdditionalcostInput
		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: "idProject5",
			text: "{i18n>AdditionalCostText}"
		});
		oSimpleForm.addContent(oLabel);

		oInput = new sap.ui.comp.smartfield.SmartField("idProject5", {
			value: "{Additionalcost}"
		});
		oSimpleForm.addContent(oInput);

		return oSimpleForm;

	},

	createToolbar: function(oController) {
		var oToolbar, oButton;
		//create Toolbar with style
		oToolbar = new sap.m.Toolbar();
		oToolbar.addStyleClass("sapUiMediumMarginTop");
		//create Button left
		oButton = new sap.m.Button({
			icon: "sap-icon://arrow-left",
			press: [oController.prevMonth, oController],
			type: "Default"
		});
		oToolbar.addContent(oButton);
		oToolbar.addContent(new sap.m.ToolbarSpacer());

		//create MonthLabel
		this.MonthLabel = new sap.m.Label("monthLabel");
		oToolbar.addContent(this.MonthLabel);
		oToolbar.addContent(new sap.m.ToolbarSpacer());

		//create Button right
		oButton = new sap.m.Button({
			icon: "sap-icon://arrow-right",
			press: [oController.nextMonth, oController],
			type: "Default"
		});
		oToolbar.addContent(oButton);

		return oToolbar;
	},

	createSimpleForm: function(sId) {
		var oSimpleForm;
		oSimpleForm = new sap.ui.layout.form.SimpleForm(sId, {
			minWidth: 1024
		});
		return oSimpleForm;
	},

	createTab: function(sName, sIcon) {
		var oIconTabFilter;
		oIconTabFilter = new sap.m.IconTabFilter(sName, {
			key: sName,
			icon: sIcon
		});
		return oIconTabFilter;
	},

	createTable: function(oController) {
		var oTable;
		oTable = new sap.m.Table("idPrdList", {
			inset: true,
			headerText: "{i18n>OverviewText}",
			headerDesign: sap.m.ListHeaderDesign.Standard,
			mode: sap.m.ListMode.None,
			includeItemInSelection: false
		});

		var col1 = new sap.m.Column("col1", {
			header: new sap.m.Label({
				text: "{i18n>DateText}"
			})
		});
		oTable.addColumn(col1);
		col1.setVisible(false);

		var col2 = new sap.m.Column("col2", {
			header: new sap.m.Label({
				text: "{i18n>ActivityText}"
			})
		});
		oTable.addColumn(col2);
		col2.setVisible(false);

		var col3 = new sap.m.Column("col3", {
			header: new sap.m.Label({
				text: "{i18n>HoursText}"
			})
		});
		oTable.addColumn(col3);

		var col4 = new sap.m.Column("col4", {
			header: new sap.m.Label({
				text: "{i18n>TravelTimeText}"
			})
		});
		oTable.addColumn(col4);
		col4.setVisible(false);

		var col5 = new sap.m.Column("col5", {
			header: new sap.m.Label({
				text: "{i18n>AdditionalCostText}"
			})
		});
		oTable.addColumn(col5);
		col5.setVisible(false);

		var colItems = new sap.m.ColumnListItem("colItems", {
			type: "Navigation",
			press: [oController.handleLineItemPress, oController]
		});
		oTable.bindAggregation("items", "ProjectToEntries", colItems);

		var txtNAME = new sap.m.Text("txtNAME", {
			text: "{path: 'Entryday', formatter: 'sap.ui.demo.myFiori.util.Formatter.date'}"
		});
		colItems.addCell(txtNAME);

		var txtNAME2 = new sap.m.Text("txtNAME2", {
			text: "{Activity}"
		});
		colItems.addCell(txtNAME2);

		var txtNAME3 = new sap.m.Text("txtNAME3", {
			text: "{path: 'Entryhours', type: 'sap.ui.model.odata.type.Time', formatOptions: { pattern: 'HH\\'h\\':mm\\'min\\'', source: { pattern: 'HH:mm:ss' } } }"
		});
		colItems.addCell(txtNAME3);

		var txtNAME4 = new sap.m.Text("txtNAME4", {
			text: "{path: 'Traveltime', type: 'sap.ui.model.odata.type.Time', formatOptions: { pattern: 'HH\\'h\\':mm\\'min\\'', source: { pattern: 'HH:mm:ss'} } }"
		});
		colItems.addCell(txtNAME4);

		var txtNAME5 = new sap.m.Text("txtNAME5", {
			text: "{Additionalcost}"
		});
		colItems.addCell(txtNAME5);

		return oTable;
	},

	createIconTabBar: function(oController) {
		var oIconTabBar;
		oIconTabBar = new sap.m.IconTabBar("iconTabBar", {
			select: [oController.handleIconTabBarSelect, oController]
		});
		return oIconTabBar;
	},

	createHeader: function() {
		var oAttributes, oStatus, oHeader;
		//Create Header
		oHeader = new sap.m.ObjectHeader({
			number: "{Projectid}",
			title: "{Customer}"
		}); //number="{Projectid}" title="{Customer}"

		//Create header attributes and Status
		oAttributes = new sap.m.ObjectAttribute({
			text: "{Description}"
		});
		oHeader.addAttribute(oAttributes);

		oAttributes = new sap.m.ObjectAttribute({
			text: "{ path: 'Startdate', formatter: 'sap.ui.demo.myFiori.util.Formatter.date'}"
		});
		oHeader.addAttribute(oAttributes);

		oAttributes = new sap.m.ObjectAttribute({
			text: "{ path: 'Enddate', formatter: 'sap.ui.demo.myFiori.util.Formatter.date' }"
		});
		oHeader.addAttribute(oAttributes);

		oStatus = new sap.m.ObjectStatus({
			state: "{ path: 'Active', formatter: 'sap.ui.demo.myFiori.util.Formatter.statusState' }",
			text: "{ path: 'Active', formatter: 'sap.ui.demo.myFiori.util.Formatter.statusText' }"
		});
		oHeader.addStatus(oStatus);
		return oHeader;
	}
});