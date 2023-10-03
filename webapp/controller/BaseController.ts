import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import Device from "sap/ui/Device";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default abstract class BaseController extends Controller
{
	private contentDensityClass: string;


	public getContentDensityClass(): string
	{
		if (this.contentDensityClass === undefined) {
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.contentDensityClass = "";
			} 
			else if (!Device.support.touch) {
				this.contentDensityClass = "sapUiSizeCompact";
			} 
			else {
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		
		return this.contentDensityClass;
	}

	public onBackward()
	{
		const history = History.getInstance();
		const previousHash = history.getPreviousHash();

		if(previousHash === undefined) {
			this.navigateTo("main", {}, true);
		} else {
			window.history.back();
		}
	}

	public navigateTo(name: string, parameters?: object, replace?: boolean)
	{
		const router = this.getRouter();
		router.navTo(name, parameters, undefined, replace);
	}

	public getRouter(): Router
	{
		return UIComponent.getRouterFor(this);
	}


	public getResourceBundle(): ResourceBundle | Promise<ResourceBundle>
	{
		const model = this.getComponentModel("i18n") as ResourceModel;
		return model.getResourceBundle();
	}

	public getDeviceModel(): Model
	{
		return this.getComponentModel("deviceModel");
	}

	public getConfigModel(): Model
	{
		return this.getComponentModel("configModel");
	}

	public getDataModel(): Model
	{
		return this.getComponentModel("dataModel");
	}
	
	public getViewModel(name?: string): Model
	{
		return this.getView().getModel(name);
	}

	public setViewModel(model: Model, name?: string)
	{
		this.getView().setModel(model, name);
	}

	public getComponentModel(name?: string): Model
	{
		return this.getAppComponent().getModel(name);
	}

	public setComponentModel(model: Model, name?: string)
	{
		return this.getAppComponent().setModel(model, name);
	}
	
	public getAppComponent(): AppComponent
	{
		return super.getOwnerComponent() as AppComponent;
	}

	public getViewID(): string
	{
		return this.getView().getId();
	}

	public getViewName(): string
	{
		const fullName = this.getFullViewName();
		const parts = fullName.split(/\./);

		return parts[parts.length - 1];
	}

	public getFullViewName(): string
	{
		return this.getView().getViewName();
	}
}
