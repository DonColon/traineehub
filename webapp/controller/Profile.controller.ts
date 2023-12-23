import BaseController from "./BaseController";
import Context from "sap/ui/model/Context";
import Image, { Image$PressEvent } from "sap/m/Image";
import { Button$PressEvent } from "sap/m/Button";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";


/**
 * @namespace com.dardan.rrafshi.traineehub.controller
 */
export default class Profile extends BaseController
{
    private mainService: ODataModel;
    private appData: JSONModel;


    public onInit()
    {
        this.mainService = this.getServiceModel("TraineeHub");
        this.appData = this.getAppDataModel();

        const userName = this.appData.getProperty("/user");
        const entityName = `/Users('${userName}')`

        this.mainService.read(entityName, {
			success: (data: any) => {
                const view = this.getView();
                
                view.bindObject({
                    path: entityName,
                    model: "TraineeHub"
                });
            }
		});

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
