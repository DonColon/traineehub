import BaseController from "./BaseController";
import Context from "sap/ui/model/Context";
import Image, { Image$PressEvent } from "sap/m/Image";
import { Button$PressEvent } from "sap/m/Button";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class Profile extends BaseController
{
    public onInit()
    {
        this.switchViewMode("profile", "sections", "Display");
    }


    public createSocialMedia(id: string, context: Context)
    {
        const type = context.getProperty("type");
        const url = context.getProperty("url");

        const image = new Image(id, {
            src: `resources/images/${type}.png`,
            width: "23px",
            height: "23px",
            press: (event: Image$PressEvent) => {
                window.open(url, "_blank");
            }
        });
        
        image.addStyleClass("sapUiTinyMarginBegin");
        return image;
    }

    public async onEdit(event: Button$PressEvent)
    {
        this.switchViewMode("profile", "sections", "Edit");

        const profile = this.byId("profile") as ObjectPageLayout;
        profile.setShowFooter(true);
    }

    public onSave(event: Button$PressEvent)
    {
        this.switchViewMode("profile", "sections", "Display");

        const profile = this.byId("profile") as ObjectPageLayout;
        profile.setShowFooter(false);
    }

    public onCancel(event: Button$PressEvent)
    {
        this.switchViewMode("profile", "sections", "Display");

        const profile = this.byId("profile") as ObjectPageLayout;
        profile.setShowFooter(false);
    }
}
