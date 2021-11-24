import { IAssignment } from './../../common/interfaces/assignments/assignments.interface';
export type AccordionItemProps = {
  data: IAssignment;
  expanded: boolean;
  isStudent: boolean;
  onClick: () => void;
  onEdit: () => void;
  onView: () => void;
  onRemove: () => void;
};
