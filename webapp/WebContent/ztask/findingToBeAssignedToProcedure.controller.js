jQuery.sap.declare("grcaud.ZGRCAUDExtension.ztask.findingToBeAssignedToProcedure");
sap.hpa.grcaud.Utility.require("grcaud.common.list.FindingList");
sap.ui.controller("grcaud.ZGRCAUDExtension.ztask.findingToBeAssignedToProcedure", {

	handleOk: function() {
		var oController = this;
		var aSelectedItems = oController.oFindingList
			.getSelectedItems();
		if (aSelectedItems.length <= 0) {
			sap.hpa.grcaud.Utility.showMsg(
				sap.hpa.grcaud.constant.MsgType.Failed,
				sap.hpa.grcaud.oBundle.getText("MSG_NO_FINDING_SELECTED"));
		} else {
			if (!oController.oDataModel) {
				oController.oDataModel = sap.hpa.grcaud.oODataModelPool.get(sap.hpa.grcaud.constant.Entry.GrcaudSrv);
			}
			var aBatchOperations = oController._getBatchOperations(aSelectedItems);

			oController.oDataModel.addBatchChangeOperations(aBatchOperations);
			oController.oDataModel.submitBatch(
				function(oData, oResponse, aErrorResponse) {
					if (aErrorResponse.length > 0) {
// ******** Modificaciones ARM - 30/11/2017 Begin ***********										
// MOdificaciones para sacar el mensaje que viene de OData y no el que esta creado en la etiqueta
						/*sap.hpa.grcaud.Utility.showMsg(
											sap.hpa.grcaud.constant.MsgType.Failed,
											sap.hpa.grcaud.oBundle.getText("MSG_ASSIGN_FINDING_TO_PROCEDURE_FAIL"));*/
						var failTextKey = "MSG_ASSIGN_FINDING_TO_PROCEDURE_FAIL"; 
						sap.hpa.grcaud.Utility
							.showODataErrorMsg(
								aErrorResponse[0],
								sap.hpa.grcaud.oBundle.getText(failTextKey));
// ******** Modificaciones ARM - 30/11/2017 Begin ***********											
					} else {
						oController.oNav.pre();
						sap.ui.getCore().getEventBus().publish(
							"sap.hpa.grcaud.EventBus",
							"updateFindingTableInProcedure", {
								refreshFindingList: true
							});
						sap.hpa.grcaud.Utility.showMsg(
							sap.hpa.grcaud.constant.MsgType.Successful,
							sap.hpa.grcaud.oBundle.getText("MSG_ASSIGN_FINDING_TO_PROCEDURE_SUCCESS"));
					}
				},
				function(oError) {
					sap.hpa.grcaud.Utility.showODataErrorMsg(
						oError,
						sap.hpa.grcaud.oBundle.getText("MSG_ASSIGN_FINDING_TO_PROCEDURE_FAIL"));
				}, true);
		}
	}
});