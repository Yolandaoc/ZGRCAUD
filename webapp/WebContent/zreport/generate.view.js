sap.ui.jsview("grcaud.ZGRCAUDExtension.zreport.generate", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf grcaud.report.generate
	*/ 
	getControllerName : function() {
		return "grcaud.report.generate";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf grcaud.report.generate
	*/ 
	createContent : function(oController) {
		//Category
		var oLabelCategory = new sap.m.Label({
			text : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_CATEGORY"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_CATEGORY"),
			required:true
		});
		var oSelectCategory = new sap.m.Select({
			id:this.createId("select_category"),
			forceSelection:false,
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_CATEGORY"),
			width:"50%"
		});
		oController._bindCategory();
		//Rating
		var oLabelRating = new sap.m.Label({
			text : sap.hpa.grcaud.oBundle.getText("LABEL_RATING"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_RATING"),
			required:true
		});
		var oSelectRating = new sap.m.Select({
			id:this.createId("select_rating"),
			forceSelection:false,
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_RATING"),
			width:"50%"
		});
		oController._bindRating();
		//Notes
		var oLabelNotes = new sap.m.Label({
			// Modificación YOC 08/11/2017
			id: this.createId("oLabelNotes"),
			// Modificación YOC 08/11/2017
			text : sap.hpa.grcaud.oBundle.getText("LABEL_EXECUTIVE_SUMMARY"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_EXECUTIVE_SUMMARY"),
			required:true
		});
			
		var oTextAreaNotes = new sap.m.TextArea({
			id:this.createId("text_executive_summary"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_EXECUTIVE_SUMMARY"),
			change:function(oEvent){
				if(oEvent.getParameter("value")!=""){
					this.setValueState(sap.ui.core.ValueState.None);
				}
			},
			rows : 4,
			cols : 55,
			enabled : true
		});
		//Template
		var oLabelTemplate = new sap.m.Label({
			text : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_TEMPLATE"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_TEMPLATE"),
			required:true
		});
		var oInputTemplate = new sap.m.Input({
			id:this.createId("input_template"),
			tooltip : sap.hpa.grcaud.oBundle.getText("LABEL_REPORT_TEMPLATE"),
			width:"50%",
			showValueHelp:true,
			valueHelpRequest:[oController.showReportTemplate,oController]
		});
		//Simple form
		this.oSimpleForm = new sap.ui.commons.form.SimpleForm({
	      	  id:this.createId("generateReportForm"),
	      	  editable:true,
	    	  maxContainerCols: 1,
	    	  content : [
					new sap.ui.commons.Title(
					{
						text : "",
						level : sap.ui.commons.TitleLevel.H4,
					}),
					//Category
					oLabelCategory,
					oSelectCategory,
					//Rating
					oLabelRating,
					oSelectRating,
					//Notes
					oLabelNotes,
					oTextAreaNotes,
					//Template
					oLabelTemplate,
					oInputTemplate
						
				]
		});
		this.oPage = new sap.m.Page({
			id: this.createId("page_generate_report"),
			title: sap.hpa.grcaud.oBundle.getText("TITLE_GENERATE_REPORT"),
			showNavButton: true,
			navButtonPress:[oController.cancel,oController],
			content: [this.oSimpleForm
			],
			footer : new sap.m.Bar(
					{
						contentRight : [
								new sap.m.Button(
										{
											id:this.createId("okButton"),
											text : sap.hpa.grcaud.oBundle.getText("BTN_OK"),
											press:[oController.generate,oController]
										}),
								new sap.m.Button(
										{
											id:this.createId("cancelButton"),
											text : sap.hpa.grcaud.oBundle.getText("BTN_CANCEL"),
											press:[oController.cancel,oController]
										})]
					}),
		});
//		this.oPage.setBusy(true);
		this.oBusyDialog = new sap.m.BusyDialog({
			
		});
 		return this.oPage;
	},
	onBeforeShow: function(oEvent) {
		this.getController().onBeforeShow(oEvent);
	}

});