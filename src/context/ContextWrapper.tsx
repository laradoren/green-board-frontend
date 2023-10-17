import { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import {isUserType, IUser, IUserData} from "../types";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_TEACHERS_LIST, CREATE_USER, DELETE_TEACHERS_LIST, GET_ALL_TEACHERS, UPDATE_TEACHER} from "../api";
import {parseBackendTeacherData} from "../lib/helper";

const allTeachersReducer = ( state: any, { type, payload }: any) => {
        const newState = [ ...state ];
        switch (type) {
            case "create":
                return [...newState, parseBackendTeacherData([payload])[0]];
            case "file":
                return [...newState, ...parseBackendTeacherData(payload)];
            case "update":
                const updatedItem = parseBackendTeacherData([payload])[0];
                return newState.map((item: any) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
            case "delete":
                const deletedIds = payload.map((item: any) => item._id);
                return newState.filter((item: any) => !deletedIds.includes(item.id));
            case "set":
                return parseBackendTeacherData(payload);
            default:
                throw new Error("Unknow type for TeacherReducer");
        }
}
const ContextWrapper = ({ children }: any) => {
    const {data: allTeachersData} = useQuery(GET_ALL_TEACHERS);
    const [createSingleTeacher] = useMutation(CREATE_USER);
    const [deleteTeachersList] = useMutation(DELETE_TEACHERS_LIST);
    const [createTeachersList] = useMutation(CREATE_TEACHERS_LIST);
    const [updateTeacher] = useMutation(UPDATE_TEACHER);

    const [allTeachers, dispatchCallTeachers] = useReducer(
        allTeachersReducer,
        [],
        allTeachersData
    );

    useEffect(() => {
        if(allTeachersData) {
            dispatchCallTeachers({type: "set", payload: allTeachersData.allTeachers});
        }
    }, [allTeachersData]);
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

  return (
    <GlobalContext.Provider
      value={{
          currentUser,
          setCurrentUser,
          allTeachers,
          dispatchCallTeachers,
          createSingleTeacher: createSingleTeacherAction,
          deleteTeachersList: deleteTeachersListAction,
          createTeachersList: createTeachersListAction,
          updateTeachersList: updateTeachersListAction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
