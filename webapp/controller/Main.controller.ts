import BaseController from "./BaseController";
import Context from "sap/ui/model/Context";
import TileContent from "sap/m/TileContent";
import ImageContent from "sap/m/ImageContent";
import GenericTile, { GenericTile$PressEvent } from "sap/m/GenericTile";
import { Avatar$PressEvent } from "sap/m/Avatar";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class Main extends BaseController
{
	public createServiceTiles(id: string, context: Context)
	{
		const serviceID = context.getProperty("id");
		const title = context.getProperty("title");
		const subtitle = context.getProperty("subtitle");
		const icon = context.getProperty("icon");
	
		const imageContent = new ImageContent({
			src: icon
		});
	
		const tileContent = new TileContent();
		tileContent.setContent(imageContent);
		
		const tile = new GenericTile(serviceID, {
			header: title,
			subheader: subtitle
		});
		tile.addTileContent(tileContent);
		tile.attachPress(this.onServiceSelect, this);
		
		return tile;
	}

	public onServiceSelect(event: GenericTile$PressEvent)
	{
		const serviceID = event.getParameter("id");
		this.navigateTo(serviceID);
	}

	public onProfileClicked(event: Avatar$PressEvent)
	{
		this.navigateTo("profile");
	}
}
