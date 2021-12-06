import { IClassroom } from 'common/interfaces';

export type NavbarProps = {
  children: React.ReactElement | React.ReactElement[];
  classrooms: IClassroom[];
  toolbarComponents?: React.ReactElement | React.ReactElement[];
};
