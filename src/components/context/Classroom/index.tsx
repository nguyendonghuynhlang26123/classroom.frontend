import React from 'react';
import { ClassroomContextProps } from './type';
import { UserRole } from 'common/interfaces';

const defaultValue: ClassroomContextProps = {
  classData: null,
  role: UserRole.STUDENT,
};

const ClassroomContext = React.createContext<ClassroomContextProps>(defaultValue);

export const ClassroomContextProvider = ({ classData, role, children }: ClassroomContextProps & { children: any }) => {
  return <ClassroomContext.Provider value={{ classData, role }}>{children}</ClassroomContext.Provider>;
};

export const useClassroomCtx = () => React.useContext(ClassroomContext);
