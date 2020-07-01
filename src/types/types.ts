export type TimeStamps = firebase.firestore.Timestamp;

export interface CollectionItem {
  id: string;
  title: string;
  userId: string;
  createdAt: TimeStamps;
  isDone: boolean;
}

export interface Form {
  setHaveAccount: React.Dispatch<React.SetStateAction<boolean>>;
}
export type FirebaseUser = firebase.User | null;
export type FirebaseError = firebase.auth.Error | boolean;
