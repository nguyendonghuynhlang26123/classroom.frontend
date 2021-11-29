import React from 'react';
import { ClassroomContextProps } from './type';
import { UserRole } from 'common/interfaces';
import { number } from 'yup';

const defaultValue: ClassroomContextProps = {
  classData: null,
  role: UserRole.STUDENT,
  studentId: null,
};

const ClassroomContext = React.createContext<ClassroomContextProps>(defaultValue);

export const ClassroomContextProvider = ({ classData, studentId, role, children }: ClassroomContextProps & { children: any }) => {
  return <ClassroomContext.Provider value={{ classData, role, studentId }}>{children}</ClassroomContext.Provider>;
};

export const useClassroomCtx = () => React.useContext(ClassroomContext);
