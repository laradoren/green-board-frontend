import React from 'react';
import {IDispatchCallTeachersProps, IGlobalContext, IUserData} from "../types";

const GlobalContext = React.createContext<IGlobalContext>({
    currentUser: {
        data: {
            role: "",
            fullname: "",
            email: ""
        },
        token: ""
    },
    setCurrentUser: (value: IUserData) => {},
    allTeachers: [],
    allStudents: [],
    createSingleTeacher: (data: any) => {},
    deleteTeachersList: (list: any) => {},
    createTeachersList: (list: any) => {},
    updateTeachersList: (data: any) => {},
    createGroup: (code: string, students: any) => {},
    deleteStudentsList: (list: any) => {},
    updateStudent: (data: any) => {},
});

export default GlobalContext;