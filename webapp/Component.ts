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

		this.setModel(models.createManifest(this), "manifest");
		this.setModel(models.createDeviceModel(), "deviceModel");
		this.setModel(models.createConfigModel(), "configModel");
		this.setModel(models.createDataModel(), "dataModel");

		const router = this.getRouter()
		router.initialize();
	}
}