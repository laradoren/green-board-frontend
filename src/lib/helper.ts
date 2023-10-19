import {excelType} from "./variables";
import * as XLSX from "xlsx";
import {isUserType, IUser, IUserExelData, StudentHomeTask} from "../types";

export const handleExcelFile = (file: File, setParsedData: (result:IUserExelData[]) => void) => {
    if(file && excelType.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
            let data = e?.target?.result;
            if(data) {
                const workbook = XLSX.read(data, {type: "binary"});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                setParsedData(parseDataToUserInfoType(parsedData));
            }
        };
    }
}

export const initCurrentUser = () => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("data");
    const group = localStorage.getItem("group");
    const teacher = localStorage.getItem("teacher");
    const student = localStorage.getItem("student");

    let parsedData:IUser;
    if(token && teacher && student && group && data && isUserType(JSON.parse(data))) {
        parsedData = JSON.parse(data);
        return {
            token, group, teacher, student,
            data: {
                role: parsedData.role,
                fullname: parsedData.fullname,
                email: parsedData.email
            }
        }
    }
    return {
        data: {
            role: "",
            fullname: "",
            email: ""
        },
        token: "",
        teacher: "",
        group: "",
        student: ""
    }
}

const parseDataToUserInfoType = (data:any) => {
    const parsedData:IUserExelData[] = data.map((d: any) => ({email: d.email, fullname: d.fullname}));
    return parsedData;
}

export const makeArrayWithIds = (data: any) => {
    return data.map(((item:any) => (item.original.id)));
}

export const parseBackendTeacherData = (data: any) =>
    data.map(((item:any) => ({id: item._id, fullname: item.user.fullname, email: item.user.email})));
export const parseBackendStudentData = (data: any) =>
    data.map(((item:any) => ({id: item._id, fullname: item.user.fullname, email: item.user.email, group: item.group})));

export const parseBackendTeacherSubjectsData = (data: any) =>
    data.map(((item:any) => ({id: item._id, tasks: parseBackendTeacherTasksData(item.tasks), title: item.title})));

export const parseBackendTeacherTasksData = (data: any) =>
    data.map(((item:any) => ({id: item._id, name: item.name, description: item.description, hometasks: parseBackendTeacherHomeTasksData((item.hometasks))})));

export const parseBackendTeacherHomeTasksData = (data: any) =>
    data.map(((item:any) => ({id: item._id, text: item.text, status: item.status, student: item.student.user.fullname})));

export const parseBackendStudentsSubjectsData = (data: any) => {
    let parsedData: StudentHomeTask[] = [];
    data.map((subject:any) => {
        subject.tasks.map((task: any) => {
            parsedData.push({
                title: subject.title,
                taskId: task._id,
                name: task.name,
                description: task.description,
                status: task.hometasks.length ? task.hometasks[0].status : "",
                text: task.hometasks.length ? task.hometasks[0].text : "",
            })
        })
    })
    return parsedData;
}

