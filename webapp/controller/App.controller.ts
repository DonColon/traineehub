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


	public onInit()
	{
		this.mainService = this.getServiceModel("TraineeHub");
		this.appData = this.getAppDataModel();

		const urlParameters = new URLSearchParams(window.location.search);
		const userName = urlParameters.get("user");

		this.mainService.read(`/Users('${userName}')`, {
			success: this.onServiceSuccess.bind(this),
			error: this.onServiceError.bind(this)
		});

		var view = this.getView();
		view.addStyleClass(this.getContentDensityClass());
	}


	private onServiceSuccess(data: any)
	{
		data["birthday"] = new Date(data["birthday"]);

		this.appData.setProperty("/userInfo", data);
		this.appData.setProperty("/busy", false);
	}

	private onServiceError()
	{
		this.appData.setProperty("/busy", false);
	}
}
