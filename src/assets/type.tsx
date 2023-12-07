export interface FormFieldType {
  type: string;
  column_name: string;
  mandatory: number;
  visible: number;
  readonly: number;
  label: string;
}
export interface FormValues {
  [key: string]: string | number | undefined | boolean;
}

export type RenderFormDataAttr = {
  formData: FormValues
}

export interface FormFieldProps {
  field: FormFieldType;
  formValues: FormValues;
  handleFieldChange: (
    fieldName: string,
    value: string | number | undefined,
    readonly: boolean,
  ) => void;
}
export interface ListItem {
  label: string;
  value: string;
}
