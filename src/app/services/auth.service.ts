import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, Observable, of, from, catchError, tap } from 'rxjs';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,sendPasswordResetEmail
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  docData
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserProfile, UserRole } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  private user$ = authState(this.auth).pipe(
    switchMap((user: User | null) => {
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return docData(userDocRef) as Observable<UserProfile | null>;
      } else {
        return of(null);
      }
    })
  );

  public currentUser = toSignal(this.user$, { initialValue: null });

  signIn(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(() => {
        console.log('Logged in successfully!');
        this.toastr.success('Logged in successfully!');
        return of(undefined);
      }),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Login Failed');
        this.toastr.error(msg, 'Login Failed');
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
        return from(setDoc(userDocRef, userProfile));
      }),
      switchMap(() => {
        console.log('Registered successfully!');
        this.toastr.success('Registered successfully!');
        return of(undefined);
      }),
      tap(() => this.router.navigate(['/login'])),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Registration Failed');
        this.toastr.error(msg, 'Registration Failed');
        throw error;
      })
    );
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      switchMap(() => {
        console.log('Logged out successfully!');
        this.toastr.success('Logged out successfully!');
        return of(undefined);
      }), tap(() => this.router.navigate(['/login']))
    );
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      switchMap(() => {
        console.log('Password reset email sent successfully!');
        this.toastr.success('Password reset email sent. Please check your inbox.!');
        return of(undefined);
      }),
      catchError((error) => {
        const msg = this.getFriendlyErrorMessage(error.code);
        console.error(msg, 'Password Reset Failed');
        this.toastr.error(msg, 'Password Reset Failed');
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
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
}