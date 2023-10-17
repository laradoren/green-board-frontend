import { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import {isUserType, IUser, IUserData} from "../types";
import {useMutation, useQuery} from "@apollo/client";
import {
    CREATE_GROUP,
    CREATE_TEACHERS_LIST,
    CREATE_USER, DELETE_STUDENTS_LIST,
    DELETE_TEACHERS_LIST,
    GET_ALL_STUDENTS,
    GET_ALL_TEACHERS, UPDATE_STUDENT,
    UPDATE_TEACHER
} from "../api";
import {allStudentsReducer, allTeachersReducer} from "./reducers";

const ContextWrapper = ({ children }: any) => {
    const {data: allTeachersData} = useQuery(GET_ALL_TEACHERS);
    const {data: allStudentsData} = useQuery(GET_ALL_STUDENTS);

    const [createSingleTeacher] = useMutation(CREATE_USER);
    const [deleteTeachersList] = useMutation(DELETE_TEACHERS_LIST);
    const [createTeachersList] = useMutation(CREATE_TEACHERS_LIST);
    const [updateTeacher] = useMutation(UPDATE_TEACHER);

    const [deleteStudentsList] = useMutation(DELETE_STUDENTS_LIST);
    const [createGroup] = useMutation(CREATE_GROUP);
    const [updateStudent] = useMutation(UPDATE_STUDENT);

    const [allTeachers, dispatchCallTeachers] = useReducer(
        allTeachersReducer,
        [],
        allTeachersData
    );

    const [allStudents, dispatchCallStudents] = useReducer(
        allStudentsReducer,
        [],
        allStudentsData
    );

    useEffect(() => {
        if(allTeachersData) {
            dispatchCallTeachers({type: "set", payload: allTeachersData.allTeachers});
        }
        if(allStudentsData) {
            dispatchCallStudents({type: "set", payload: allStudentsData.allStudents});
        }
    }, [allTeachersData, allStudentsData]);
    const [currentUser, setCurrentUser] = useState<IUserData>({
        data: {
            role: "",
            fullname: "",
            email: ""
        },
        token: ""
    });

    useEffect(() => {
        if(currentUser.token && Object.keys(currentUser.data)) return;
        const token = localStorage.getItem("token");
        const data = localStorage.getItem("data");
        let parsedData:IUser;
        if(token && data && isUserType(JSON.parse(data))) {
            parsedData = JSON.parse(data);
            setCurrentUser({
                token, data: {
                    role: parsedData.role,
                    fullname: parsedData.fullname,
                    email: parsedData.email
                }
            })
        }
    }, [currentUser]);

    const createSingleTeacherAction = (data: any) => createSingleTeacher({variables: {newUser: data}})
        .then((result) => {
            dispatchCallTeachers({type: "create", payload: result.data.createUser});
        });
    const createTeachersListAction = (list: any) => createTeachersList({variables: {list}})
        .then((result) => {
            dispatchCallTeachers({type: "file", payload: result.data.createTeachersList});
        });
    const deleteTeachersListAction = (list: any) => deleteTeachersList({variables: {list}})
        .then((result) => {
            dispatchCallTeachers({type: "delete", payload: result.data.deleteTeachersList});
        });
    const updateTeachersListAction = (data: any) => updateTeacher({variables: {...data}})
        .then((result) => {
            dispatchCallTeachers({type: "update", payload: result.data.updateTeacher});
        });

    const createGroupAction = (code: string, students: any) => createGroup({variables: {newGroup:{code, students}}})
        .then((result) => {
            dispatchCallStudents({type: "file", payload: result.data.createGroup});
        });

    const deleteStudentsListAction = (list: any) => deleteStudentsList({variables: {list}})
        .then((result) => {
            dispatchCallStudents({type: "delete", payload: result.data.deleteStudentsList});
        });

    const updateStudentAction = (data: any) => updateStudent({variables: {...data}})
        .then((result) => {
            dispatchCallStudents({type: "update", payload: result.data.updateStudent});
        });

  return (
    <GlobalContext.Provider
      value={{
          currentUser,
          setCurrentUser,
          allTeachers,
          allStudents,
          createSingleTeacher: createSingleTeacherAction,
          deleteTeachersList: deleteTeachersListAction,
          createTeachersList: createTeachersListAction,
          updateTeachersList: updateTeachersListAction,
          createGroup: createGroupAction,
          deleteStudentsList: deleteStudentsListAction,
          updateStudent: updateStudentAction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
