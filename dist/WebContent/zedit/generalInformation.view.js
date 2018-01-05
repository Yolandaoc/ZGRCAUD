sap.hpa.grcaud.Utility.require("grcaud.cdf.customDefineField");
sap.hpa.grcaud.Utility.require("resources.js.DateRange");
sap.hpa.grcaud.Utility.require("resources.js.TagMultiInput");
sap.hpa.grcaud.Utility.require("grcaud.audit.Utility");
sap.ui
	.jsview(
		"grcaud.ZGRCAUDExtension.zedit.generalInformation", {

			/**
			 * Specifies the Controller belonging to this View. In the
			 * case that it is not implemented, or that "null" is
			 * returned, this View does not have a Controller.
			 *
			 * @memberOf grcaud.audit.edit.generalInformation
			 */
			getControllerName: function() {
				return "grcaud.audit.edit.generalInformation";
			},
			onBeforeShow: function(oEvent) {
				this.getController().onBeforeShow(oEvent);
			},
			onAfterHide: function() {
				this.getController().onAfterHide();
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is
			 * constructed. Since the Controller is given to this
			 * method, its event handlers can be attached right away.
			 *
			 * @memberOf grcaud.audit.edit.generalInformation
			 */
			createContent: function(oController) {
				var oPageEdit = new sap.m.Page({
					id: this.createId("page_edit_audit"),
					showNavButton: true,
					title: sap.hpa.grcaud.oBundle
						.getText("LABEL_EDIT_AUDIT"),
					footer: new sap.m.Bar({
						contentRight: [
							new sap.m.Button({
								id: this.createId("btn_ok"),
								text: sap.hpa.grcaud.oBundle
									.getText("BTN_SAVE"),
								press: [oController,
									oController.pressOK,
									oController
								]
							}),
							new sap.m.Button({
								id: this.createId("btn_cancel"),
								text: sap.hpa.grcaud.oBundle
									.getText("BTN_CANCEL"),
								press: [oController.pressCancel,
									oController
								]
							})
						]
					}),
					navButtonPress: [oController.pressCancel,
						oController
					]
				});
				var oSaveBusyDialog = new sap.m.BusyDialog({
					id: this.createId("busyDialog_save")
				});

				// Title
				var oLabelTitle = new sap.m.Label({
					id: this.createId("LAB_TITLE_STD"),
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_TITLE"),
				});
				var oTextTitle = new sap.m.Input({
					id: this.createId("TITLE_STD"),
					layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({
						weight: 7,
					}),
				});
				oLabelTitle.setLabelFor(oTextTitle);

				// create fixed fields
				// audit scope
				var oLabelAuditScope = new sap.m.Label({
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_AUDIT_SCOPE"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oTextAreaAuditScope = new sap.m.TextArea({
					id: this.createId("textArea_AuditScope"),
					rows: 4,
					cols: 200,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					}),
					enabled: false
				});
				oLabelAuditScope.setLabelFor(oTextAreaAuditScope);
				// time period
				var oLabelTimePeriod = new sap.m.Label(this
					.createId("LAB_STARTDATE_PLANNED_STD"), {
						text: sap.hpa.grcaud.oBundle
							.getText("LABEL_TIME_PERIOD"),
						textAlign: sap.ui.core.TextAlign.Left
					});

				var oTimePeriod = new sap.hpa.grcaud.DateRange(
					this.createId("STARTDATE_PLANNED_STD"), {
						layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
							weight: 7
						}),
						// enabled: false
					});
				oLabelTimePeriod.setLabelFor(oTimePeriod);
				// Type
				var oLabelType = new sap.m.Label({
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_TYPE"),
					// tooltip:sap.hpa.grcaud.oBundle.getText("LABEL_TYPE"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputType = new sap.m.Input(
					this.createId("input_Type"), {
						enabled: false,
						layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
							weight: 7
						}),
						change: [oController.onTypeChnage,
							oController
						]
					});
				oLabelType.setLabelFor(oInputType);
				// group
				var oLabelGroup = new sap.m.Label({
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_GROUP"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputGroup = new sap.m.Input({
					id: this.createId("input_Group"),
					enabled: false,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});
				oLabelGroup.setLabelFor(oInputGroup);
				// category
				var oLabelCategory = new sap.m.Label({
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_CATEGORY"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputCategory = new sap.m.Input({
					id: this.createId("input_Category"),
					enabled: false,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});
				oLabelCategory.setLabelFor(oInputCategory);
				// country
				var oLabelCountry = new sap.m.Label({
					id: this.createId("LAB_COUNTRY_STD"),
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_COUNTRY"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputCountry = new sap.m.Input({
					id: this.createId("COUNTRY_STD"),
					width: "50%",
					enabled: false,
					showValueHelp: true,
					showSuggestion: true,
					valueHelpRequest: [
						sap.hpa.grcaud.audit.Utility.fnCountryValueHelp,
						sap.hpa.grcaud.audit.Utility
					],
					suggest: [
						sap.hpa.grcaud.audit.Utility.fnCountrySuggest,
						sap.hpa.grcaud.audit.Utility
					],
					suggestionItemSelected: [
						sap.hpa.grcaud.audit.Utility.fnCountrySuggestionItemSelected,
						sap.hpa.grcaud.audit.Utility
					],
					change: [
						sap.hpa.grcaud.audit.Utility.fnCountryChange,
						sap.hpa.grcaud.audit.Utility
					],
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});
				oLabelCountry.setLabelFor(oInputCountry);
				// company code
				var oLabelCompanyCode = new sap.m.Label({
					id: this.createId("LAB_COMPANY_STD"),
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_COMPANY_CODE"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputCompanyCode = new sap.m.Input({
					id: this.createId("COMPANY_STD"),
					width: "50%",
					fieldWidth: "30%",
					description: " ",
					enabled: false,
					showValueHelp: true,
					showSuggestion: true,
					maxLength: 4,
					valueHelpRequest: [
						sap.hpa.grcaud.audit.Utility.fnCompanyValueHelp,
						sap.hpa.grcaud.audit.Utility
					],
					suggest: [
						sap.hpa.grcaud.audit.Utility.fnCompanySuggest,
						sap.hpa.grcaud.audit.Utility
					],
					suggestionItemSelected: [
						sap.hpa.grcaud.audit.Utility.fnCompanySuggestionItemSelected,
						sap.hpa.grcaud.audit.Utility
					],
					change: [
						sap.hpa.grcaud.audit.Utility.fnCompanyChange,
						sap.hpa.grcaud.audit.Utility
					],
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});
				oLabelCompanyCode.setLabelFor(oInputCompanyCode);

				// estimated effort
				var oLabelEstimatedEffort = new sap.m.Label(
					// Nuevas modificaciones ARM - 21/08/2017 - Begin
					this.createId("LAB_ESTIMATED_EFFORT"), {
						// Nuevas modificaciones ARM - 21/08/2017 - End	
						text: sap.hpa.grcaud.oBundle
							.getText("LABEL_EFFORT_ESTIMATION"),
						textAlign: sap.ui.core.TextAlign.Left
					});
				var oInputEstimatedEffort = new sap.m.Input({
					id: this.createId("input_Estimated_Effort"),
					enabled: false
				});
				// Nuevas modificaciones ARM - 21/08/2017 - Begin				
				oLabelEstimatedEffort.setLabelFor(oInputEstimatedEffort);
				// Nuevas modificaciones ARM - 21/08/2017 - End
				var oTextPDs = new sap.m.Text(
					// Nuevas modificaciones ARM - 22/08/2017 - Begin									
					this.createId("LAB_TXT_PDS"), {
						// Nuevas modificaciones ARM - 22/08/2017 - End	
						text: sap.hpa.grcaud.oBundle.getText("LABEL_PDS"),
						wrapping: false,
						// Nuevas modificaciones ARM - 14/08/2017 - Begin
						enable: false,
						visible: false
						// Nuevas modificaciones ARM - 14/08/2017 - End	
					}).addStyleClass("text_PDs");
				var oHBoxEstimatedEffort = new sap.m.HBox({
					width: "50%",
					alignItems: sap.m.FlexAlignItems.Center,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					}),
					items: [oInputEstimatedEffort, oTextPDs]
				});
				oLabelEstimatedEffort.setLabelFor(oHBoxEstimatedEffort);
				// estimated cost
				var oLabelEstimatedCost = new sap.m.Label({
					required: false,
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_COST_ESTIMATION"),
					textAlign: sap.ui.core.TextAlign.Left
				});

				var oInputEstimatedCost = new sap.m.Input({
					id: this.createId("input_Estimated_Cost"),
					description: "{CurrencyKey}",
					width: "50%",
					value: {
						parts: [{
							path: "{ActualCost}"
						}, {
							path: "{CurrencyKey}"
						}],
						type: new sap.ui.model.type.Currency({
							showMeasure: false
						}, {
							maximum: 1000 * 1000
						})
					}
				});
				oLabelEstimatedCost.setLabelFor(oInputEstimatedCost);
				// Añadimos esta linea que esta en el generalInformationController - 17/08/2017
				// Modificaciones ARM - Parche 7 - 15/11/2017 - Begin
				// oInputEstimatedCost.getAmountInput().setEnabled(false);
				oInputEstimatedCost.setEnabled(false);
				// Modificaciones ARM - Parche 7 - 15/11/2017 - Begin
				// actual time period
				var oLabelActualTimePeriod = new sap.m.Label(this
					.createId("LAB_STARTDATE_ACTUAL_STD"), {
						text: sap.hpa.grcaud.oBundle
							.getText("LABEL_ACTUAL_TIME_PERIOD"),
						textAlign: sap.ui.core.TextAlign.Left
					});

				var oActualDateRangeSelection = new sap.hpa.grcaud.DateRange(
					this.createId("STARTDATE_ACTUAL_STD"), {
						width: "50%",
						layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
							weight: 7
						}),
						change: [
							oController.actualDateTimeChange,
							oController
						]
					});
				oLabelActualTimePeriod
					.setLabelFor(oActualDateRangeSelection);
				// actual effort
				var oLabelActualEffort = new sap.m.Label(this
					.createId("LAB_ACTUAL_EFFORT_STD"), {
						text: sap.hpa.grcaud.oBundle
							.getText("LABEL_ACTUAL_EFFORT"),
						textAlign: sap.ui.core.TextAlign.Left
					});
				var oInputActualEffort = new sap.m.Input({
					id: this.createId("ACTUAL_EFFORT_STD"),
					type: sap.m.InputType.Text,
					width: "100%",
					change: [oController.actualEffortInputChange,
						oController
					]
				});
				var oTextActualPDs = new sap.m.Text({
					text: sap.hpa.grcaud.oBundle.getText("LABEL_PDS"),
					wrapping: false,
					// Nuevas modificaciones ARM - 14/08/2017 - Begin
					visible: false
					// Nuevas modificaciones ARM - 14/08/2017 - End	
				}).addStyleClass("text_PDs");
				var oHBoxActualEffort = new sap.m.HBox({
					width: "50%",
					alignItems: sap.m.FlexAlignItems.Center,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					}),
					items: [oInputActualEffort,
						oTextActualPDs
					]
				});
				oLabelActualEffort.setLabelFor(oHBoxActualEffort);
				// actual cost
				var oLabelActualCost = new sap.m.Label(
					this.createId("LAB_ACTUAL_COST_STD"), {
						text: sap.hpa.grcaud.oBundle
							.getText("LABEL_ACTUAL_COST"),
						textAlign: sap.ui.core.TextAlign.Left
					});
				var oInputActualCost = new sap.m.Input({
					id: this.createId("ACTUAL_COST_STD"),
					description: "{CurrencyKey}",
					width: "50%",
					value: {
						parts: [{
							path: "{ActualCost}"
						}, {
							path: "{CurrencyKey}"
						}],
						type: new sap.ui.model.type.Currency({
							showMeasure: false
						}, {
							maximum: 1000 * 1000
						})
					}
				});
				oLabelActualCost.setLabelFor(oInputActualCost);

				oInputActualCost.attachChange(
					undefined, oController.actualCostInputChange,
					oController);

				// Internal Order
				var oLabelIntOrd = new sap.m.Label({
					visible: false,
					id: this.createId("label_IntOrd"),
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_INTER_ORD"),
					textAlign: sap.ui.core.TextAlign.Left
				});
				var oInputIntOrd = new sap.m.Input({
					visible: false,
					id: this.createId("input_IntOrd"),
					type: sap.m.InputType.Text,
					width: "25%",
					maxLength: 12,
					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});

				// Tag
				var oLableTag = new sap.m.Label({
					text: sap.hpa.grcaud.oBundle
						.getText("LABEL_TAGS"),
					tooltip: sap.hpa.grcaud.oBundle
						.getText("LABEL_TAGS")
				});
				var oInputTags = new sap.hpa.grcaud.TagMultiInput({
					id: this.createId("input_tag"),
					tooltip: sap.hpa.grcaud.oBundle
						.getText("LABEL_TAGS"),
					layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({
						weight: 7
					})
				});
				oLableTag.setLabelFor(oInputTags);

				this.cdfForm = sap.hpa.grcaud.CustomerDefineField
					.createNew(sap.hpa.grcaud.constant.ObjectType.Audit);
				this.cdfForm.setLayoutDataWeight(7);

				var oFormEdit = new sap.ui.layout.form.SimpleForm({
					id: this.createId("general_info_form"),
					// maxContainerCols: 2,
					editable: true,
					layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
					labelSpanL: 3,
					labelSpanM: 3,
					emptySpanL: 4,
					emptySpanM: 4,
					columnsL: 1,
					columnsM: 1,
					content: [oLabelTitle, oTextTitle,
						oLabelAuditScope, oTextAreaAuditScope,
						oLabelTimePeriod, oTimePeriod, oLabelType,
						oInputType, oLabelGroup, oInputGroup,
						oLabelCategory, oInputCategory,
						oLabelCountry, oInputCountry,
						oLabelCompanyCode, oInputCompanyCode,
						oLabelEstimatedEffort,
						oHBoxEstimatedEffort, oLabelEstimatedCost,
						oInputEstimatedCost, // oHBoxEstimatedCost,
						oLabelActualTimePeriod,
						oActualDateRangeSelection,
						oLabelActualEffort, oHBoxActualEffort,
						oLabelActualCost, oInputActualCost, // oHBoxActualCost,
						oLabelIntOrd, oInputIntOrd, oLableTag,
						oInputTags
					]
				});
				// finish create general information section

				// create auditable items table
				var oTableAuditableItems = new sap.ui.view({
					id: this.createId("auditable_items_table"),
					viewName: "grcaud.audit.edit.auditableItemsList",
					type: sap.ui.core.mvc.ViewType.JS,
					viewData: {}
				});
				// oTableAuditableItems.getController().setAddButtonVisibility(false);
				oTableAuditableItems.getController().setTableMode(
					sap.m.ListMode.None);

				oTableAuditableItems.setBusy(true);
				oPageEdit.setBusy(true);
				return oPageEdit;
			}

		});