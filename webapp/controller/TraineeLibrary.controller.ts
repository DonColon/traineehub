import BaseController from "./BaseController";
import { Avatar$PressEvent } from "sap/m/Avatar";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class TraineeLibrary extends BaseController
{
	public onProfileClicked(event: Avatar$PressEvent)
	{
		this.navigateTo("profile");
	}
}
