import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import Device from "sap/ui/Device";
import UIComponent from "sap/ui/core/UIComponent";

import { formatter } from "./formatter";


export namespace models
{
	export function createAppConfigModel()
	{
		const appConfig = new JSONModel({
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

		appConfig.setDefaultBindingMode(BindingMode.OneWay);
		return appConfig;
	}

	export function createAppDataModel()
	{
		const appData = new JSONModel({
			busy: true
		});

		appData.setDefaultBindingMode(BindingMode.TwoWay);
		return appData;
	}

	export function createDeviceModel()
	{
		const device = new JSONModel(Device);
		device.setDefaultBindingMode(BindingMode.OneWay);
		return device;
	}

	export function createManifestModel(component: UIComponent)
	{
		const manifest = new JSONModel(component.getManifest());
		manifest.setDefaultBindingMode(BindingMode.OneWay);
		return manifest;
	}
}