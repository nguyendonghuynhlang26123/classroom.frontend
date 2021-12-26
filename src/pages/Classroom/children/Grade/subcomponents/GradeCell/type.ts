export type GradeCellPropsType = {
  mark?: number;
  total: number;
  finalized?: boolean;
  onSave: (value: number) => void;
};
