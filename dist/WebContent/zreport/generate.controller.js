jQuery.sap.declare("grcaud.ZGRCAUDExtension.zreport.generate");
sap.ui.controller("grcaud.ZGRCAUDExtension.zreport.generate", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf grcaud.report.generate
		 */
	onBeforeShow: function(oEvent) {
		var property = "required";
		this._initiatePageUI();
		this.navData = oEvent.data;
		this._setGenerateCategoryAndRating(this.navData.auditKey);
// ******** Modificaciones ARM - 06/11/2017 Begin ***********
	var oLabelNotes = this.getView().byId("oLabelNotes");
			if (this._is_mandatory() === true) {
				oLabelNotes.setProperty(property, true);
			} else {
				oLabelNotes.setProperty(property, false);
			}

	 //var oTextExecutiveSummary = this.getView().byId("text_executive_summary");
		// var oLabelNotes = this.getView().byId("oLabelNotes");
		//  var oTextExecutiveSummary = this.getView().byId("text_executive_summary");
		//  var oAuditModel = new sap.ui.model.json.JSONModel();
		//  	oAuditModel.setData(this.navData.auditKey);
		//  	var oDataModel = sap.hpa.grcaud.oODataModelPool
		//  		.get();
		//  	oDataModel
		//  		.read(
		//  			sap.hpa.grcaud.oODataLink
		//  			.get(
		//  				sap.hpa.grcaud.constant.Entry.AuditSet,
		//  				this.navData.auditKey),
		//  			undefined,
		//  			undefined,
		//  			false, 
		//  			jQuery
		//  			.proxy(
		//  				function(oData,
		//  					response) {
		//  					oAuditModel.setData(oData);
		//  				}, oAuditModel)
		//  	), oAuditModel;
		//  	if (oTextExecutiveSummary.getValue() === "" && ( oAuditModel.oData.TypeKey === 'AUDIT.OPER' 
		//  ||  oAuditModel.oData.TypeKey === 'AUDIT.SIST')) {
		//   oLabelNotes.setProperty(property,true);
		//  }
		//   else {
		//  	oLabelNotes.setProperty(property,false);
		//  }
// ******** Modificaciones ARM - 06/11/2017 Begin ***********				
	},
		_validFields:function(){
		var bIsNull = false;
		var oSelectCategory = this.getView().byId("select_category");
		var oSelectRating = this.getView().byId("select_rating");
		var oTextExecutiveSummary = this.getView().byId("text_executive_summary");
		var oInputTemplate = this.getView().byId("input_template");
		if(oSelectCategory.getSelectedItem().getKey()==""){
//			oSelectCategory.setValueState(sap.ui.core.ValueState.Error);
			bIsNull = true;
		}
		if(oSelectRating.getSelectedItem().getKey()==""){
//			oSelectRating.setValueState(sap.ui.core.ValueState.Error);
			bIsNull = true;
		}
		// ****************************************************	
		// 	var oAuditModel = new sap.ui.model.json.JSONModel();
		// 	oAuditModel.setData(this.navData.auditKey);
		// 	var oDataModel = sap.hpa.grcaud.oODataModelPool
		// 		.get();
		// 	oDataModel
		// 		.read(
		// 			sap.hpa.grcaud.oODataLink
		// 			.get(
		// 				sap.hpa.grcaud.constant.Entry.AuditSet,
		// 				this.navData.auditKey),
		// 			undefined,
		// 			undefined,
		// 			false, 
		// 			jQuery
		// 			.proxy(
		// 				function(oData,
		// 					response) {
		// 					oAuditModel.setData(oData);
		// 				}, oAuditModel)
		// 	), oAuditModel;
			
		// 	// var oAuditModel2 = new sap.ui.model.json.JSONModel();
		// 	// // var passingUrl = "/sap/opu/odata/sap/GRCAUD_SRV/AuditSet(Key=guid'064667e3-e565-4318-ab02-3cd940')";
		// 	// var passingUrl = "AuditSet(Key=guid'064667e3-e565-4318-ab02-3cd940')";
		// 	// // var passingUrl = "https://auditman.madrid.org:1443/sap/opu/odata/sap/GRCAUD_SRV/AuditSet(Key=guid'064667e3-e565-4318-ab02-3cd940')";
		// 	// var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/GRCAUD_SRV/");
		// 	// oModel.read(passingUrl, null, null, true, {

		// 	// 	success: function(oData, response) {
		// 	// 		oAuditModel2.setData(oData);
		// 	// 	}
		// 	// });
		// // *******************************************************			
		// if (oTextExecutiveSummary.getValue() === "" && ( oAuditModel.oData.TypeKey === 'AUDIT.OPER' 
		// ||  oAuditModel.oData.TypeKey === 'AUDIT.SIST')) {
		// 				oTextExecutiveSummary.setValueState(sap.ui.core.ValueState.Error);
		// 	bIsNull = true;
		// }
		if (this._is_mandatory() === true) {
				oTextExecutiveSummary.setValueState(sap.ui.core.ValueState.Error);
				bIsNull = true;
			}
		if(oInputTemplate.getValue()==""){
			oInputTemplate.setValueState(sap.ui.core.ValueState.Error);
			bIsNull = true;
		}
		
		if(oInputTemplate.getValue()==""){
			oInputTemplate.setValueState(sap.ui.core.ValueState.Error);
			bIsNull = true;
		}
		
		if(bIsNull){
    		sap.hpa.grcaud.Utility.showMsg(
					sap.hpa.grcaud.constant.MsgType.Failed,
					sap.hpa.grcaud.oBundle
							.getText("MSG_REQUIRED_FIELD"));
			return false;
    	}
		if(!this.oSelectedTemplate||(oInputTemplate.getValue()!=this.oSelectedTemplate.Title)){
			sap.hpa.grcaud.Utility.showMsg(
					sap.hpa.grcaud.constant.MsgType.Failed,
					sap.hpa.grcaud.oBundle
							.getText("WRONG_REPORT_TEMPLATE"));
			return false;
		}
		return true;
	},
		_is_mandatory: function() {
			var oTextExecutiveSummary = this.getView().byId("text_executive_summary");
			var oAuditModel = new sap.ui.model.json.JSONModel();
			oAuditModel.setData(this.navData.auditKey);
			var oDataModel = sap.hpa.grcaud.oODataModelPool
				.get();
			oDataModel
				.read(
					sap.hpa.grcaud.oODataLink
					.get(
						sap.hpa.grcaud.constant.Entry.AuditSet,
						this.navData.auditKey),
					undefined,
					undefined,
					false,
					jQuery
					.proxy(
						function(oData,
							response) {
							oAuditModel.setData(oData);
						}, oAuditModel)
			), oAuditModel;
			if (oTextExecutiveSummary.getValue() === "" && (oAuditModel.oData.TypeKey === 'AUDIT.OPER' || oAuditModel.oData.TypeKey === 'AUDIT.SIST')) {
				return true;
			} else {
				return false;
			}
		}
});