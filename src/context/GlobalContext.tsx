import React from 'react';
import {IGlobalContext, IUserData,} from "../types";

const GlobalContext = React.createContext<IGlobalContext>({
    currentUser: {
        data: {
            role: "",
            fullname: "",
            email: ""
        },
        token: "",
        group: "",
        teacher: "",
        student: ""
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
    allGroupsData: [],
    createTeacherSubject: (data: any) => {},
    allTeacherSubjects: [],
    createTask: (data: any) => {},
    deleteTask: (data: any) => {},
    allStudentsSubjects: [],
    createHomeTask: (data: any) => {},
    updateHomeTask: (data: any) => {},
    errors: null,
    setErrors: (data: any) => {},
});

export default GlobalContext;