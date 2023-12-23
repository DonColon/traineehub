import BaseController from "./BaseController";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class App extends BaseController
{
	private mainService: ODataModel;
	private appData: JSONModel;


	public async onInit()
	{
		this.mainService = this.getServiceModel("TraineeHub");
		this.appData = this.getAppDataModel();

		await this.mainService.metadataLoaded();

		const urlParameters = new URLSearchParams(window.location.search);
		const userName = urlParameters.get("user");

		this.appData.setProperty("/user", userName);
		this.appData.setProperty("/busy", false);

		var view = this.getView();
		view.addStyleClass(this.getContentDensityClass());
	}
}
