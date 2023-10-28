sap.ui.define([
	"./mockserver"

], (mockserver) => {
	"use strict";

	// initialize the mock server
	mockserver.initialize();

	// initialize the embedded component on the HTML page
	sap.ui.require(["sap/ui/core/ComponentSupport"]);
});