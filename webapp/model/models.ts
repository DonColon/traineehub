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
				subtitle: "Department assignment",
				icon: "sap-icon://appointment-2",
			}, {
				id: "trainee-report",
				title: "Trainee Report",
				subtitle: "Maintain weekly report",
				icon: "sap-icon://request"
			}, {
				id: "trainee-evaluation",
				title: "Trainee Evaluation",
				subtitle: "Rate the performance",
				icon: "sap-icon://unfavorite"
			}, {
				id: "worklist",
				title: "Worklist",
				subtitle: "Maintain your tasks",
				icon: "sap-icon://task"
			},{
				id: "trainee-library",
				title: "Trainee Library",
				subtitle: "Maintain Learn Documents",
				icon: "sap-icon://education"
			}, {
				id: "trainee-dashboard",
				title: "Trainee Dashboard",
				subtitle: "Analytics and Information",
				icon: "sap-icon://bbyd-dashboard"
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