import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";
import ManagedObject from "sap/ui/base/ManagedObject";
import { UI5Error } from "../utils/UI5Error";
import Metadata from "sap/ui/base/Metadata";
import UI5Element from "sap/ui/core/Element";


interface ViewModes {
	[view: string]: {
		[mode: string]: Control | Control[];
	}
}


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default abstract class BaseController extends Controller
{
	private contentDensityClass: string;
	private viewModes: ViewModes;


	public async switchViewMode(containerName: string, aggregationName: string, mode: string)
	{
		const control = await this.getViewMode(mode) as ManagedObject;
		const container = this.byId(containerName);

		const controlMetadata = control.getMetadata();
		const containerMetadata = container.getMetadata();
		const aggregation = containerMetadata.getAggregation(aggregationName);

		let parent: Metadata = controlMetadata;
		let isAllowedType = false;

		while(parent) {
			const type = parent.getName();

			if(aggregation.type === type) {
				isAllowedType = true;
				break;
			}

			parent = parent.getParent()
		}

		if(!isAllowedType) {
			throw new UI5Error(`Switching to view mode ${mode} failed: type ${controlMetadata.getName()} not allowed in aggregation ${aggregationName}`);
		}

		if(aggregation.multiple) {
			container.removeAllAggregation(aggregationName);
			container.addAggregation(aggregationName, control);
		} else {
			container.setAggregation(aggregationName, control);
		}
	}

	public async getViewMode(mode: string): Promise<Control | Control[]>
	{
        const viewNamespace = this.getViewNamespace();
        const viewName = this.getViewName();

		if(!this.viewModes) {
			this.viewModes = {};
		}

		if(!this.viewModes[viewName]) {
			this.viewModes[viewName] = {};
		}

		if(!this.viewModes[viewName][mode]) {
            const control = await Fragment.load({
                name: `${viewNamespace}.fragments.${viewName}${mode}`,
                controller: this
            });

			const view = this.getView();
			view.addDependent(control as UI5Element);

            this.viewModes[viewName][mode] = control;
        }

		return this.viewModes[viewName][mode];
	}


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

	public getAppConfigModel(): JSONModel
	{
		return this.getComponentModel("appConfig") as JSONModel;
	}

	public getAppDataModel(): JSONModel
	{
		return this.getComponentModel("appData") as JSONModel;
	}

	public getDeviceModel(): JSONModel
	{
		return this.getComponentModel("device") as JSONModel;
	}

	public getManifestModel(): Model
	{
		return this.getComponentModel("manifest") as JSONModel;
	}

	public getServiceModel(name?: string): ODataModel
	{
		const service = this.getComponentModel(name);

		if(!(service instanceof ODataModel)) {
			throw Error(`Model ${name} is not of type ODataModel`);
		}

		return service;
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

	public getViewNamespace(): string
	{
		const fullName = this.getFullViewName();
		const index = fullName.lastIndexOf(".");

		return fullName.substring(0, index);
	}

	public getFullViewName(): string
	{
		return this.getView().getViewName();
	}
}
