import UIComponent from "sap/ui/core/UIComponent";
import { models } from "./model/models";


/**
 * @namespace com.dardan.rrafshi.traineehub
 */
export default class AppComponent extends UIComponent
{
	public static metadata = {
		manifest: "json"
	};

	public async init()
	{
		super.init();

		this.setModel(models.createManifestModel(this), "manifest");
		this.setModel(models.createDeviceModel(), "device");
		this.setModel(models.createAppConfigModel(), "appConfig");
		this.setModel(models.createAppDataModel(), "appData");

		const router = this.getRouter()
		router.initialize();
	}
}