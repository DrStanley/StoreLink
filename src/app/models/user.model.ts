import { Injectable } from "@angular/core";

export type UserRole = 'admin' | 'vendor';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}
