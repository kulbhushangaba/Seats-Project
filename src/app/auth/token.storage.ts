import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUser';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    if (!token) return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
  }
 
  public saveUser(user: string) {
    if (!user) return;
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY,  user);
  }
  public getUser(): string {
    return localStorage.getItem(USER_KEY);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}