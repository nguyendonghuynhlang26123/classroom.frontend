import { IAssignment } from './../../common/interfaces/assignments/assignments.interface';
export type AccordionItemProps = {
  data: IAssignment;
  expanded: boolean;
  onClick: () => void;
  actionBtns: JSX.Element[];
  colorMode: string;
  mark?: number;
};
