import {UserRoleModel} from "./userRole.model";

export class UserModel {
    public username: string;
    public password: string;
    public type: number;
    public token: string;
    public userRole:UserRoleModel[];
}