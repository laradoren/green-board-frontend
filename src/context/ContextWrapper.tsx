import { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import {isUserType, IUser, IUserData} from "../types";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
    CREATE_GROUP, CREATE_HOMETASK, CREATE_SUBJECT, CREATE_TASK,
    CREATE_TEACHERS_LIST,
    CREATE_USER, DELETE_STUDENTS_LIST, DELETE_TASK,
    DELETE_TEACHERS_LIST, GET_ALL_GROUPS,
    GET_ALL_STUDENTS,
    GET_ALL_TEACHERS, GET_STUDENT_SUBJECTS, GET_TEACHER_SUBJECTS, UPDATE_STUDENT,
    UPDATE_TEACHER
} from "../api";
import {
    allStudentsReducer,
    allStudentsSubjectsReducer,
    allTeachersReducer,
    allTeacherSubjectsReducer
} from "./reducers";
import {initCurrentUser} from "../lib/helper";

const ContextWrapper = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<IUserData>(initCurrentUser());

    useEffect(() => {
        if(currentUser.token) return;
        const token = localStorage.getItem("token");
        const data = localStorage.getItem("data");
        const group = localStorage.getItem("group");
        const teacher = localStorage.getItem("teacher");
        const student = localStorage.getItem("student");
        let parsedData:IUser;
        if(token && teacher && student && group && data && isUserType(JSON.parse(data))) {
            parsedData = JSON.parse(data);
            setCurrentUser({
                token, group, teacher, student,
                data: {
                    role: parsedData.role,
                    fullname: parsedData.fullname,
                    email: parsedData.email
                }
            })
        }
    }, [currentUser]);

    const {data: allTeachersData} = useQuery(GET_ALL_TEACHERS);
    const {data: allStudentsData} = useQuery(GET_ALL_STUDENTS);
    const {data: allGroupsData} = useQuery(GET_ALL_GROUPS);
    const {data: allTeacherSubjectsData} = useQuery(GET_TEACHER_SUBJECTS, {
        variables: {id: currentUser.teacher}
    });
    const {data: allStudentsSubjectsData} = useQuery(GET_STUDENT_SUBJECTS, {
        variables: {group: currentUser.group, id: currentUser.student}
    });

    const [createSingleTeacher] = useMutation(CREATE_USER);
    const [deleteTeachersList] = useMutation(DELETE_TEACHERS_LIST);
    const [createTeachersList] = useMutation(CREATE_TEACHERS_LIST);
    const [updateTeacher] = useMutation(UPDATE_TEACHER);

    const [deleteStudentsList] = useMutation(DELETE_STUDENTS_LIST);
    const [createGroup] = useMutation(CREATE_GROUP);
    const [updateStudent] = useMutation(UPDATE_STUDENT);

    const [createSubject] = useMutation(CREATE_SUBJECT);
    const [createTask] = useMutation(CREATE_TASK);
    const [deleteTask] = useMutation(DELETE_TASK);

    const [createHometask] = useMutation(CREATE_HOMETASK);

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

    const [allTeacherSubjects, dispatchCallTeacherSubjects] = useReducer(
        allTeacherSubjectsReducer,
        [],
        allTeacherSubjectsData
    );

    const [allStudentsSubjects, dispatchCallStudentSubjects] = useReducer(
        allStudentsSubjectsReducer,
        [],
        allStudentsSubjectsData
    );

    useEffect(() => {
        if(allTeachersData) {
            dispatchCallTeachers({type: "set", payload: allTeachersData.allTeachers});
        }
        if(allStudentsData) {
            dispatchCallStudents({type: "set", payload: allStudentsData.allStudents});
        }
        if(allTeacherSubjectsData) {
            dispatchCallTeacherSubjects({type: "set", payload: allTeacherSubjectsData.getTeacherSubjects});
        }
        if(allStudentsSubjectsData) {
            dispatchCallStudentSubjects({type: "set", payload: allStudentsSubjectsData.getStudentSubjects});
        }
    }, [allTeachersData, allStudentsData, allTeacherSubjectsData, allStudentsSubjectsData]);

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

    const createTeacherSubjectAction = (data: any) => createSubject({variables: {newSubject: data}})
        .then((result) => {
            dispatchCallTeacherSubjects({type: "create", payload: result.data.createSubject});
        });

    const createTaskAction = (data: any) => createTask({variables: {newTask: data}})
        .then((result) => {
            dispatchCallTeacherSubjects({type: "task", payload: result.data.createTask});
        });

    const deleteTaskAction = (data: any) => deleteTask({variables: {...data}})
        .then((result) => {
            dispatchCallTeacherSubjects({type: "delete", payload: result.data.deleteTask});
        });

    const createHomeTaskAction = (data: any) => createHometask({variables: {hometask: data}})
        .then((result) => {
            dispatchCallStudentSubjects({type: "send", payload: result.data.createHometask});
        });

  return (
    <GlobalContext.Provider
      value={{
          currentUser,
          setCurrentUser,
          allTeachers,
          allStudents,
          allGroupsData,
          allTeacherSubjects,
          allStudentsSubjects,
          createSingleTeacher: createSingleTeacherAction,
          deleteTeachersList: deleteTeachersListAction,
          createTeachersList: createTeachersListAction,
          updateTeachersList: updateTeachersListAction,
          createGroup: createGroupAction,
          deleteStudentsList: deleteStudentsListAction,
          updateStudent: updateStudentAction,
          createTeacherSubject: createTeacherSubjectAction,
          createTask: createTaskAction,
          deleteTask: deleteTaskAction,
          createHomeTask: createHomeTaskAction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
