import { UserType } from './../models/session-config';
import { Injectable } from '@angular/core';
import { SessionConfig } from '../models/session-config';
import { BehaviorSubject, config, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigHandlerService {

    private configStorage = new SessionConfig();
    private configSubject = new BehaviorSubject<SessionConfig>(this.configStorage);

    public config$ = this.configSubject.asObservable();

    constructor() {}

    updateUserType(userType: UserType) {
        this.configStorage.userType = userType;
        this.configSubject.next(this.configStorage);
    }

    updateUserValidationStatus(userAuthStatus: boolean) {
        this.configStorage.isUserAuthenticated = userAuthStatus;
        this.configSubject.next(this.configStorage);
    }

    updateSearchResultAvailabilityStatus(resultAvailiabilityStatus: boolean) {
        this.configStorage.isSearchResultAvailable = resultAvailiabilityStatus;
        this.configSubject.next(this.configStorage);
    }
}
