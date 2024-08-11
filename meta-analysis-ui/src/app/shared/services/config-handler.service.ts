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

    updateUserValidationStatus() {
        this.configStorage.isUserAuthenticated = !this.configStorage.isUserAuthenticated;
        this.configSubject.next(this.configStorage);
    }

    updateSearchResultAvailabilityStatus() {
        this.configStorage.isSearchResultAvailable = !this.configStorage.isSearchResultAvailable;
        this.configSubject.next(this.configStorage);
    }
}
