export type Teacher = {
    id: string
    fullname: string
    email: string
}

export type Subject = {
    id: string
    title: string
    tasks: Task[]
}

export type Task = {
    id: string
    title: string
    description: string
    file: string
    deadline: string
}

export type HomeTask = {
    id: string
    student: string
    file: string
    date: string
    status: "success"|"pending"|"fail"
}

export type Group = {
    id: string
    title: string
    students: Student[]
}

export type Student = {
    id: string
    name: string
    surname: string
    lastname: string
    currentScore: string
    firstAttestation: boolean|null
    secondAttestation: boolean|null
    result: string
}

export interface IUserData {
    token: string
    data: IUser
}

export interface IUser {
    role: string,
    fullname: string
    email: string
}

export function isUserType(o: any): o is IUser {
    return "role" in o && "fullname" in o && "email" in o;
}


export interface ITeacherData {
    fullname: string
    email: string
}

export interface IGlobalContext {
    currentUser: IUserData
    setCurrentUser: (data: IUserData) => void
    dispatchCallTeachers: ({type, payload}: IDispatchCallTeachersProps) => void;
    allTeachers: Teacher[],
    createSingleTeacher: (data: any) => void
    deleteTeachersList: (list: any) => void
    createTeachersList: (list: any) => void
    updateTeachersList: (list: any) => void
}

export interface IDispatchCallTeachersProps {
    type: string,
    payload: any
}
