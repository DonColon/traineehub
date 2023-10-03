import BaseController from "./BaseController";


/**
 * @namespace com.dardan.rrafshi.adventurogram.controller
 */
export default class App extends BaseController
{
	public onInit()
	{
		var view = this.getView();
		view.addStyleClass(this.getContentDensityClass());
	}
}
