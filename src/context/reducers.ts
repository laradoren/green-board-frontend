import {parseBackendStudentData, parseBackendTeacherData, parseBackendTeacherSubjectsData} from "../lib/helper";
export const allTeachersReducer = ( state: any, { type, payload }: any) => {
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

export const allStudentsReducer = ( state: any, { type, payload }: any) => {
    const newState = [ ...state ];
    switch (type) {
        case "create":
            return [...newState, parseBackendStudentData([payload])[0]];
        case "file":
            return [...newState, ...parseBackendStudentData(payload)];
        case "update":
            const updatedItem = parseBackendStudentData([payload])[0];
            return newState.map((item: any) =>
                item.id === updatedItem.id ? updatedItem : item
            );
        case "delete":
            const deletedIds = payload.map((item: any) => item._id);
            return newState.filter((item: any) => !deletedIds.includes(item.id));
        case "set":
            return parseBackendStudentData(payload);
        default:
            throw new Error("Unknow type for StudentReducer");
    }
}

export const allTeacherSubjectsReducer = ( state: any, { type, payload }: any) => {
    const newState = [ ...state ];
    switch (type) {
        case "create":
            console.log(payload);
            return [...newState, parseBackendTeacherSubjectsData([payload])[0]];
        case "set":
            return parseBackendTeacherSubjectsData(payload);
        default:
            throw new Error("Unknow type for TeacherSubjectsReducer");
    }
}