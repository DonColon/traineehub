import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import Device from "sap/ui/Device";
import UIComponent from "sap/ui/core/UIComponent";

import { formatter } from "./formatter";


export namespace models
{
	export function createConfigModel()
	{
		const configModel = new JSONModel({
			serviceTiles: [{
				id: "trainee-plan",
				title: "Trainee Plan",
				subtitle: "Overview department assignment",
				icon: "sap-icon://appointment-2",
			}]
		});

		configModel.setDefaultBindingMode(BindingMode.OneWay);
		return configModel;
	}

	export function createDataModel()
	{
		const dataModel = new JSONModel({

		});

		dataModel.setDefaultBindingMode(BindingMode.TwoWay);
		return dataModel;
	}

	export function createDeviceModel()
	{
		const deviceModel = new JSONModel(Device);
		deviceModel.setDefaultBindingMode(BindingMode.OneWay);
		return deviceModel;
	}

	export function createManifest(component: UIComponent)
	{
		const manifest = new JSONModel(component.getManifest());
		manifest.setDefaultBindingMode(BindingMode.OneWay);
		return manifest;
	}
}