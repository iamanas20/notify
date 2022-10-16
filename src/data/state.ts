// this state data is static for now
export const state: StateType = {
  user: null,
  token: '',
  notes: [], 
};

export type StateType = {
  user: UserType,
  token: string,
  notes: NoteType[]
};

export type UserType = {
  id: number,
  name: string,
  email: string,
} | null;

export type NoteType = {
  id: number,
  title: string,
  text: string,
  color: string,
  created_at?: number,
};