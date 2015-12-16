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
			icon: "sap-icon://save",
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

		oButton = new sap.m.Button({
			icon: "sap-icon://delete",
			press: [oController.handleDelete, oController],
			text: "{i18n>DeleteButtonText}",
			type: "Reject"
		});
		oButton.setVisible(false);
		oBar.addContentRight(oButton);

		return oBar;
	},

	createAddTabFilterContent: function() {
		var oSimpleForm, oInput, oLabel, oDatePicker, oDateTimeInput;
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

		//create DateInput
		oLabel = new sap.m.Label({
			text: "{i18n>DateText}"
		});
		oSimpleForm.addContent(oLabel);

		oDatePicker = new sap.m.DatePicker({
			displayFormat: "long",
			value: "{path: 'Entryday', type: 'sap.ui.model.odata.type.Date'}",
			valueFormat: "dd-MM-yyyy"
		});
		oDatePicker.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDatePicker);

		//create ActivityInput
		oInput = new sap.ui.comp.smartfield.SmartField({
			value: "{Activity}"
		});

		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: oInput,
			text: "{i18n>ActivityText}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		//create HoursInput
		oLabel = new sap.m.Label({
			text: "{i18n>HoursText}"
		});
		oSimpleForm.addContent(oLabel);

		oDateTimeInput = new sap.m.DateTimeInput({
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

		oDateTimeInput = new sap.m.DateTimeInput({
			displayFormat: "HH'h' mm'm'",
			placeholder: "Enter Time ...",
			type: "Time",
			value: "{Traveltime}",
			valueFormat: "HH:mm"
		});
		oDateTimeInput.addStyleClass("sapUiSmallMarginBottom");
		oSimpleForm.addContent(oDateTimeInput);

		//create AdditionalcostInput
		oInput = new sap.ui.comp.smartfield.SmartField({
			value: "{Additionalcost}"
		});

		oLabel = new sap.ui.comp.smartfield.SmartLabel({
			labelFor: oInput,
			text: "{i18n>AdditionalCostText}"
		});
		oSimpleForm.addContent(oLabel);
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
		oIconTabFilter = new sap.m.IconTabFilter({
			key: sName,
			icon: sIcon
		});
		return oIconTabFilter;
	},

	createTable: function(oController) {
		var oTable, oCol, oColItems, oText;
		oTable = new sap.m.Table({
			inset: true,
			headerText: "{i18n>OverviewText}",
			headerDesign: sap.m.ListHeaderDesign.Standard,
			mode: sap.m.ListMode.None,
			includeItemInSelection: false
		});

		oCol = new sap.m.Column({
			header: new sap.m.Label({
				text: "{i18n>DateText}"
			})
		});
		oTable.addColumn(oCol);
		oCol.setVisible(false);

		oCol = new sap.m.Column({
			header: new sap.m.Label({
				text: "{i18n>ActivityText}"
			})
		});
		oTable.addColumn(oCol);
		oCol.setVisible(false);

		oCol = new sap.m.Column({
			header: new sap.m.Label({
				text: "{i18n>HoursText}"
			})
		});
		oTable.addColumn(oCol);

		oCol = new sap.m.Column({
			header: new sap.m.Label({
				text: "{i18n>TravelTimeText}"
			})
		});
		oTable.addColumn(oCol);
		oCol.setVisible(false);

		oCol = new sap.m.Column({
			header: new sap.m.Label({
				text: "{i18n>AdditionalCostText}"
			})
		});
		oTable.addColumn(oCol);
		oCol.setVisible(false);

		oColItems = new sap.m.ColumnListItem({
			type: "Navigation",
			press: [oController.handleLineItemPress, oController]
		});
		oTable.bindAggregation("items", "ProjectToEntries", oColItems);

		oText = new sap.m.Text({
			text: "{path: 'Entryday', formatter: 'sap.ui.demo.myFiori.util.Formatter.date'}"
		});
		oColItems.addCell(oText);

		oText = new sap.m.Text({
			text: "{Activity}"
		});
		oColItems.addCell(oText);

		oText = new sap.m.Text({
			text: "{path: 'Entryhours', type: 'sap.ui.model.odata.type.Time', formatOptions: { pattern: 'HH\\'h\\':mm\\'min\\'', source: { pattern: 'HH:mm:ss' } } }"
		});
		oColItems.addCell(oText);

		oText = new sap.m.Text({
			text: "{path: 'Traveltime', type: 'sap.ui.model.odata.type.Time', formatOptions: { pattern: 'HH\\'h\\':mm\\'min\\'', source: { pattern: 'HH:mm:ss'} } }"
		});
		oColItems.addCell(oText);

		oText = new sap.m.Text({
			text: "{Additionalcost}"
		});
		oColItems.addCell(oText);

		return oTable;
	},

	createIconTabBar: function(oController) {
		var oIconTabBar;
		oIconTabBar = new sap.m.IconTabBar({
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