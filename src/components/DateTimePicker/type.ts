export type MyTimePickerProps = {
  value: number;
  label: string;
  handleChange: (dt: any) => void;
  [x: string]: any; // Other props
};
