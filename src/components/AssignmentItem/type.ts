import { IAssignment } from './../../common/interfaces/assignments/assignments.interface';
export type AccordionItemProps = {
  data: IAssignment;
  expanded: boolean;
  onClick: () => void;
  onEdit: () => void;
  onRemove: () => void;
};
