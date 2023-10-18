import {excelType} from "./variables";
import * as XLSX from "xlsx";
import {IUserExelData} from "../types";

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
    data.map(((item:any) => ({id: item._id, tasks: item.tasks || [], title: item.title})));