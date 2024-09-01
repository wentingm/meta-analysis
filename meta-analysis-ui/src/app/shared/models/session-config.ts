export enum UserType {
    admin,
    standard
}

export class SessionConfig {
    isUserAuthenticated: boolean;
    isSearchResultAvailable: boolean;
    userType: UserType;

    constructor() {
        this.isUserAuthenticated = false;
        this.isSearchResultAvailable = false;
        this.userType = UserType.standard;
    }
}