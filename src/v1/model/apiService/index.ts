import "./firebase";
import {
  getAuth,
  onAuthStateChanged as fbGetAuthStateChange,
  NextOrObserver,
  User,
  ErrorFn,
  CompleteFn,
  Unsubscribe,
} from "firebase/auth";

export const onAuthStateChanged = (
  n: NextOrObserver<User>,
  errorFunction: ErrorFn | undefined,
  completed?: CompleteFn | undefined
): Unsubscribe => fbGetAuthStateChange(getAuth(), n, errorFunction, completed);

// export const apiService = {};
// NextOrObserver<User>, error?: ErrorFn | undefined, completed?: CompleteFn | undefined
