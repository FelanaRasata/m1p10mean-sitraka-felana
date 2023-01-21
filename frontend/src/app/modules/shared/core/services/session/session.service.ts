import constants from "../../config/constants.config.json";
import { Injectable } from '@angular/core';
import {decrypt, isEmpty} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken(): string | null {

    return localStorage.getItem(constants.token_key);

  }

  getUrlPart(): string {

    try {

      const value: string | null = localStorage.getItem(constants.url_part_key);

      return isEmpty(value) ? '' : decrypt(value!);

    } catch (e) {

      return '';

    }

  }


}
