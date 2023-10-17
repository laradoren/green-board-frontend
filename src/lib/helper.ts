import {excelType} from "./variables";
import * as XLSX from "xlsx";
import {ITeacherData} from "../types";

export const handleExcelFile = (file: File, setParsedData: (result:ITeacherData[]) => void) => {
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
                setParsedData(parseDataToTeacherType(parsedData));
            }
        };
    }
}

const parseDataToTeacherType = (data:any) => {
    const parsedData:ITeacherData[] = data.map((d: any) => ({email: d.email, fullname: d.fullname}));
    return parsedData;
}

export const makeArrayWithIds = (data: any) => {
    return data.map(((item:any) => (item.original.id)));
}