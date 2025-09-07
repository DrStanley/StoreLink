import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, Observable, of, from, catchError, tap, map } from 'rxjs';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User, sendPasswordResetEmail
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  docData,
  getDoc
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserProfile, UserRole } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './loading.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth, private toastrService: ToastrService, private router: Router, private firestore: Firestore,private loadingService: LoadingService) {
  }
  private user$ = authState(this.auth).pipe(
    switchMap((user: User | null) => {
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return from(getDoc(userDocRef)).pipe(
          map(docSnap => {
            if (docSnap.exists()) {
              return docSnap.data() as UserProfile;
            } else {
              return null;
            }
          })
        );
      } else {
        return of(null);
      }
    })
  );

  public currentUser = toSignal(this.user$, { initialValue: null });

  signIn(email: string, password: string): Observable<void> {
    this.loadingService.show();
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(() => {
        console.log('Logged in successfully!');
        this.toastrService.success('Logged in successfully!');
        this.loadingService.hide();
        return of(undefined);
      }),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Login Failed');
        this.toastrService.error(msg, 'Login Failed');
        this.loadingService.hide();
        throw error;
      })
    );
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole = 'vendor'
  ): Observable<void> {
    this.loadingService.show();
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential) => {
        const user = userCredential.user;
        const userProfile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          name: name,
          role,
        };
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        let res = from(setDoc(userDocRef, userProfile));
          this.loadingService.hide();
        return res;
      }),
      switchMap(() => {
        console.log('Registered successfully!');
        this.toastrService.success('Registered successfully!');
        this.loadingService.hide();
        return of(undefined);
      }),
      tap(() => this.router.navigate(['/login'])),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Registration Failed');
        this.toastrService.error(msg, 'Registration Failed');
        this.loadingService.hide();
        throw error;
      })
    );
  }

  signOut(): Observable<void> {
    this.loadingService.show();
    return from(signOut(this.auth)).pipe(
      switchMap(() => {
        console.log('Logged out successfully!');
        this.toastrService.success('Logged out successfully!');
        this.loadingService.hide();
        return of(undefined);
      }), tap(() => this.router.navigate(['/login']))
    );
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    this.loadingService.show();
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      switchMap(() => {
        console.log('Password reset email sent successfully!');
        this.toastrService.success('Password reset email sent. Please check your inbox.!');
        this.loadingService.hide();
        return of(undefined);
      }),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Password Reset Failed');
        this.toastrService.error(msg, 'Password Reset Failed');
        this.loadingService.hide();
        throw error;
      })
    );
  }

  private getFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email address is already in use by another account.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak. Please choose a stronger password.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please try again later.';
      case 'auth/user-disabled':
        return 'This user account has been disabled. Please contact support for assistance.';
      case 'auth/operation-not-allowed':
        return 'This operation is not allowed. Please contact support for assistance.';
      case 'auth/expired-action-code':
        return 'The action code has expired. Please request a new one.';
      case 'auth/invalid-action-code':
        return 'The action code is invalid. Please request a new one.';
      case 'auth/missing-email':
        return 'Please provide an email address.';
      case 'auth/missing-password':
        return 'Please provide a password.';
      case 'auth/invalid-password':
        return 'The password is invalid. Please try again.';
      case 'auth/invalid-credential':
        return 'The credential is invalid. Please try again.';
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different user account.';
      case 'auth/operation-not-supported-in-this-environment':
        return 'This operation is not supported in the current environment.';
      case 'auth/requires-recent-login':
        return 'This operation requires recent authentication. Please log in again and try again.';
      case 'auth/popup-closed-by-user':
        return 'The authentication popup was closed before completing the sign-in. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Only one popup request is allowed at one time. Please try again.';
      case 'auth/popup-blocked':
        return 'The popup was blocked by the browser. Please allow popups and try again.';
      case 'auth/unauthorized-domain':
        return 'The domain is not authorized for OAuth operations. Please contact support for assistance.';
      case 'auth/invalid-verification-code':
        return 'The verification code is invalid. Please try again.';
      case 'auth/missing-verification-code':
        return 'Please provide the verification code.';
      case 'auth/quota-exceeded':
        return 'The quota for this operation has been exceeded. Please try again later.';
      case 'auth/invalid-phone-number':
        return 'The phone number is invalid. Please enter a valid phone number.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
}