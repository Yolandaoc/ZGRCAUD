jQuery.sap.declare("grcaud.ZGRCAUDExtension.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "grcaud.common",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/GRCAUD/grcaud/common"
	// we use a URL relative to our own component
	// extension application is deployed with customer namespace
});

this.grcaud.common.Component.extend("grcaud.ZGRCAUDExtension.Component", {
	metadata: {
		version: "1.0",
		config: {},
		customizing: {
			"sap.ui.controllerExtensions": {
				"grcaud.audit.generalInformation": {
					"controllerName": "grcaud.ZGRCAUDExtension.generalInformation"
				},
				"grcaud.report.generate": {
					"controllerName": "grcaud.ZGRCAUDExtension.zreport.generate"
				},
				// 30/11/2017 - Extensión del controlador para sacar el mensaje de error OData
				// devuelto en el punto de ampliación de SAP cuando asignamos una observación a un procedimiento
				"grcaud.task.findingToBeAssignedToProcedure": {
					"controllerName": "grcaud.ZGRCAUDExtension.ztask.findingToBeAssignedToProcedure"
				}
			},
			"sap.ui.viewReplacements": {
				"grcaud.audit.edit.generalInformation": {
					viewName: "grcaud.ZGRCAUDExtension.zedit.generalInformation",
					type: "JS"
				},

				"grcaud.report.generate": {
					viewName: "grcaud.ZGRCAUDExtension.zreport.generate",
					type: "JS"
				}
			},
			"sap.ui.viewModifications": {
				"grcaud.audit.new.generalInfomation": {
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// "ActualEffort": {
					// 	"visible": false
					// },
					// "input_effort_estimation": {
					// 	"visible": false
					// },
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// Nuevos campos a ocultar ARM - 09/08/2017 - Begin
					"ActualCost": {
						"visible": false
					},
					"input_cost_estimation": {
						"visible": false
					},
					// Nuevos campos a ocultar ARM - 09/08/2017 - End
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse						
					// "__text6": {
					// 	"visible": false
					// }
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse						
					"__text653": {
						"visible": false
					}
				},
				"grcaud.audit.generalInformation": {
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// "ACTUAL_EFFORT_STD": {
					// 	"visible": false
					// },
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// Nuevos campos a ocultar ARM - 09/08/2017 - Begin					
					"ACTUAL_COST": {
						"visible": false
					}
					// Nuevos campos a ocultar ARM - 09/08/2017 - End					
				},
				"grcaud.ZGRCAUDExtension.zedit.generalInformation": {
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// "LAB_ACTUAL_EFFORT_STD": {
					// 	"visible": false
					// },
					// "ACTUAL_EFFORT_STD": {
					// 	"visible": false
					// },
					// "textActualPDs": {
					// 	"visible": false
					// },
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// Nuevas modificaciones ARM - 21/08/2017 - Begin					
					"input_Estimated_Cost": {
						"visible": false
					},
					"input_Actual_Cost": {
						"visible": false
					}
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// "input_Estimated_Effort":{
					// 	"visible": false
					// },
					// "LAB_ESTIMATED_EFFORT":{
					// 	"visible": false
					// },
					// "LAB_TXT_PDS":{
					// 	"visible": false
					// }
					// ARM - 03/10/2017 - Campos necesarios que no deben ocultarse					
					// Nuevas modificaciones ARM - 21/08/2017 - End						
					// }
				},
				"grcaud.aud_item.aud_item_detail": {
					"dim": {
						"visible": false
					},
					"dim_filter": {
						"visible": false
					}
				},
				"grcaud.audit.edit.teamMember": {
					"__title3": {
						"visible": false
					}
				},
				"grcaud.common.teamMember": {
					"btn_editOtherMember": {
						"visible": false
					},
					"other": {
						"visible": false
					},
					"other_count": {
						"visible": false
					},
					"oOtherColumnPho": {
						"visible": false
					},
					"oOtherColumnName": {
						"visible": false
					},
					"oOtherColumnTitle": {
						"visible": false
					}
					// "grcaud.aud_item.aud_item_edit": {
					// "skill1Input":{
					// 	"visible": false
					// }
					// }
				},
				"grcaud.finding.displayFinding": {
					"executiveResponsible": {
						"visible": false
					},
					"selectExecutiveResponsible": {
						"visible": false
					},
					"description": {
						"visible": false
					}
				},
				"grcaud.finding.editFinding": {
					"executiveResponsible": {
						"visible": false
					},
					"selectExecutiveResponsible": {
						"visible": false
					},
					"description": {
						"visible": false
					}
				},
				"grcaud.report.generate": {
					"text_executive_summary": {
						// "visible": false
						"enabled": false,
						"required": false
					}
				}
			}
		}
	}
});