export type MyTimePickerProps = {
  value: number;
  label: string;
  handleChange: (dt: number) => void;
  [x: string]: any; // Other props
};
