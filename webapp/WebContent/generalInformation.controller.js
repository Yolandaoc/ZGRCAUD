jQuery.sap.declare("grcaud.ZGRCAUDExtension.generalInformation");
sap.ui.controller("grcaud.ZGRCAUDExtension.generalInformation", {
refreshAuditData : function() {
						this.getView().setBusy(true);
						var fnReadAuditSuccess = function(oData, oResponse) {
							var auditInfo = oData;
							var that = this;
							sap.hpa.grcaud.audit.Utility.setHiddenStatusBasedField(this,"displayForm",auditInfo.TypeKey,auditInfo.StatusKey);
							if(oData.AuditScores.MaxScore == "0.00" || oData.AuditScores.MaxScore == undefined){
								this.getView().oScore.setText("-");
							}else{
								this.getView().oScore.setText(sap.hpa.grcaud.oBundle.getText("LABEL_SCORE_VALUE",
										[parseInt(oData.AuditScores.TotalScore),parseInt(oData.AuditScores.MaxScore),oData.AuditScores.ActualScore]));
							}
							var launchPadAlias = sap.hpa.grcaud.history
									.parseHref().launchPadAlias;
							if (jQuery.inArray(auditInfo.StatusKey, [ "00",
									"01", "02", "04", "10", "21", "22", "23",
									"24", ]) != -1
									&& jQuery
											.inArray(
													launchPadAlias,
													[
															sap.hpa.grcaud.constant.ScenarioOfAuditList.InitiateAudit,
															sap.hpa.grcaud.constant.ScenarioOfAuditList.PrepareWorkProgram ]) != -1) {
								that.getView().oTable.getColumns()[0]
										.setVisible(true);
								this._setTableMode("DISPLAY");
							} else {
								that.getView().oTable.getColumns()[0]
										.setVisible(false);
								this._setTableMode("NONE");
							}
							if(auditInfo.StatusKey == "00" && 
									launchPadAlias == sap.hpa.grcaud.constant.ScenarioOfAuditList.InitiateAudit ){
								this._setOrgTableMode("DISPLAY");
							}
							else{
								this._setOrgTableMode("NONE");
							}
							if (auditInfo.StatusKey == "00") {
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse	
//								that.getView().oLabelActualTimePeriod
//										.setVisible(false);
//								that.getView().oHBoxActualTimePeriod
//										.setVisible(false);
//								that.getView().oLabelActualEffort
//										.setVisible(false);
//								that.getView().oHBoxActualEffort
//										.setVisible(false);
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse	
								that.getView().oLabelActualCost
										.setVisible(false);
								that.getView().oHBoxActualCost
										.setVisible(false);	
							} else {
								that.getView().oLabelActualTimePeriod
										.setVisible(true);
								that.getView().oHBoxActualTimePeriod
										.setVisible(true);
								that.getView().oLabelActualEffort
										.setVisible(true);
								that.getView().oHBoxActualEffort
										.setVisible(true);
								that.getView().oLabelActualCost
										.setVisible(true);
								that.getView().oHBoxActualCost.setVisible(true);
							}
							if (auditInfo.CaType === "IO") {
								that.getView().oLabelIntOrd.setVisible(true);
								that.getView().oTextIntOrd.setVisible(true);
							} else {
								that.getView().oLabelIntOrd.setVisible(false);
								that.getView().oTextIntOrd.setVisible(false);
							}
// Probamos a ocultar los campos independientemente del estado de la auditoria
// los queremos siempre invisibles ya que nunca se utilizan
// Nuevas modificaciones ARM - 21/08/2017 - Begin
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse	
				// that.getView().oLabelEffortEstimation
				// 		.setVisible(false);
				// that.getView().oTextEffortEstimation
				// 		.setVisible(false);
				// that.getView().oTextPDs
				// 		.setVisible(false);
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse							
				that.getView().oLabelCostEstimation
						.setVisible(false);
				that.getView().oTextCostEstimation
						.setVisible(false);
				that.getView().oLableScore
						.setVisible(false);
				that.getView().oScore
						.setVisible(false);
				that.getView().oLabelActualCost
						.setVisible(false);			
				that.getView().oTextActualCost
						.setVisible(false);		
// Pone invisible los container que hacen dejar filas en blanco visibles
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse	
				// that.getView().oHBoxActualEffort
				// 		.setVisible(false);			
				// that.getView().oHBoxEffortEstimation
				// 		.setVisible(false);
// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse							
				that.getView().oHBoxActualCost
						.setVisible(false);		
// Ocultamos la tabla de dimensiones que aparece en la auditoria						
				that.getView().oDimensionTable		
						.setVisible(false);			
// Nuevas modificaciones ARM - 21/08/2017 - End	
							// CDF
							var FormGeneralInfo = this.getView().oFormGeneralInfo;
							var aFormContent = FormGeneralInfo.getContent();
							var iformLength = this.getView().oFormGeneralInfo
									.getContent().length;
							for (var j = that.defaultFormLength; j <= iformLength; j++) {
								that.getView().oFormGeneralInfo
										.removeContent(aFormContent[that.defaultFormLength]);
							}
							var cdf = that.getView().cdfForm;
							cdf.setComplexType(auditInfo.TypeKey,
									auditInfo.StatusKey);
							var mode = sap.hpa.grcaud.CustomerDefineField.Mode.Display;
							cdf.setDependentViewController(this);
							cdf.refresh(auditInfo, mode);
							var FormGeneralInfo = that.getView().oFormGeneralInfo;
							var LengthOfCdf = cdf.getFields();
							for (var i = 1; i < LengthOfCdf.length; i++) {
								FormGeneralInfo.addContent(LengthOfCdf[i]);
							}
							this.getView().setBusy(false);
						};
						var fnReadAuditFail = function(oError) {
							sap.hpa.grcaud.Utility.showODataErrorMsg(oError);
							this.getView().setBusy(false);
						};

						var sPath = sap.hpa.grcaud.oODataLink.StringFormat(
								this.sAuditPath, this.auditKey);
						sPath = sPath + "?$expand=AuditScores";
						this.oDataModel.read(sPath, {
							success : jQuery.proxy(fnReadAuditSuccess, this),
							error : jQuery.proxy(fnReadAuditFail, this)
						});
					}
});