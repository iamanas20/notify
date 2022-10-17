import { ChangeEventHandler } from "react";

export type InputProps<T> = {
  value: string;
  onChange: ChangeEventHandler<T>;
  placeholder?: string;
  type?: string;
}