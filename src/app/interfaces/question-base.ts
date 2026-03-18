export interface QuestionBase<T> {
  value?: T[keyof T] | string | number | boolean;
  key: keyof T;
  label: string;
  required?: boolean;
  order: number;
  controlType: controlType;
  type?: string;
  errors?: Record<string, string>
}

export enum controlType {
  textbox = 'textbox',
  dropdown = 'dropdown',
  checkbox = 'checkbox'
}
