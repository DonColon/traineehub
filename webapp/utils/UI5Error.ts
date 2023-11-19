export class UI5Error extends Error
{
    constructor(message: string)
    {
        super(message);
        Object.setPrototypeOf(this, UI5Error.prototype);
    }
}