import { Avatar$PressEvent } from "sap/m/Avatar";
import BaseController from "./BaseController";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class TraineeDashboard extends BaseController
{
	public onProfileClicked(event: Avatar$PressEvent)
	{
		this.navigateTo("profile");
	}
}
