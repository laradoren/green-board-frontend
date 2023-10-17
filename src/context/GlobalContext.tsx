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
    dispatchCallTeachers: ({type, payload}: IDispatchCallTeachersProps) => {},
    allTeachers: [],
    createSingleTeacher: (data: any) => {},
    deleteTeachersList: (list: any) => {},
    createTeachersList: (list: any) => {},
    updateTeachersList: (data: any) => {},
});

export default GlobalContext;