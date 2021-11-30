export type GradeCellPropsType = {
  mark?: number;
  total: number;
  onMarkChange: (value: number) => void;
  onCancel: () => void;
  enableEdit?: boolean;
};
