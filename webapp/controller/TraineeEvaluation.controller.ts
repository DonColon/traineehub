import BaseController from "./BaseController";
import { Avatar$PressEvent } from "sap/m/Avatar";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class TraineeEvaluation extends BaseController
{
	public onProfileClicked(event: Avatar$PressEvent)
	{
		this.navigateTo("profile");
	}
}
