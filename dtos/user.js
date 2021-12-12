export default class UserDto{
    email;
    id;
    isActivated;
    name;
    projects;
    colorTheme;
    locale;
    
    constructor(model){
        this.email = model.email
        this.id = model._id
        this.isActive = model.isActivated
        this.name = model.name
        this.projects = model.projects
        this.colorTheme = model.colorTheme
        this.locale = model.locale
    }
}