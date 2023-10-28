sap.ui.define([
	"sap/ui/core/util/MockServer",

], (MockServer) => {
	"use strict";

	return {
		initialize: () => {
            const mockServer = new MockServer({
                rootUri: "/mockserver/",
            });

            const rootUrl = sap.ui.require.toUrl("com/dardan/rrafshi/traineehub/mockserver");
            const metadataUrl = rootUrl.concat("/metadata.xml");
            const mockdataUrl = rootUrl.concat("/mockdata");
        
            mockServer.simulate(metadataUrl, {
                sMockdataBaseUrl: mockdataUrl,
                bGenerateMissingMockData: true,
            });
        
            mockServer.start();
		}
	};
});