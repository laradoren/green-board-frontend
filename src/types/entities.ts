export type Teacher = {
    id: string
    fullname: string
    email: string
}

export type StudentInfo = {
    id: string
    fullname: string
    email: string
}

export type TeacherSubject = {
    id: string
    title: string
    tasks: Task[]
}

export type Task = {
    hometasks: HomeTask[]
    id: string
    name: string
    description: string
}

export type HomeTask = {
    id: string
    student: string
    text: string
    status: "success"|"pending"|"fail"
}
export type StudentHomeTask = {
    description: string
    name: string
    taskId: string
    text: string
    title: string
    status: "success"|"pending"|"fail"
}

export type Group = {
    id: string
    code: string
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
    group?: string
    teacher?: string

    student: string
}

export interface IUser {
    role: string,
    fullname: string
    email: string
}

export function isUserType(o: any): o is IUser {
    return "role" in o && "fullname" in o && "email" in o;
}


export interface IUserExelData {
    fullname: string
    email: string
}

export interface IGroupData {
    _id: string
    code: string
}

export interface IGlobalContext {
    currentUser: IUserData
    setCurrentUser: (data: IUserData) => void
    allTeachers: Teacher[],
    createSingleTeacher: (data: any) => void
    deleteTeachersList: (list: any) => void
    createTeachersList: (list: any) => void
    updateTeachersList: (data: any) => void
    allStudents: StudentInfo[],
    createGroup: (code: string, students: any) => void
    deleteStudentsList: (list: any) => void
    updateStudent: (data: any) => void
    allGroupsData: any,
    createTeacherSubject: (data: any) => void
    allTeacherSubjects: TeacherSubject[]
    createTask: (data: any) => void
    deleteTask: (data: any) => void
    allStudentsSubjects: StudentHomeTask[];
    createHomeTask: (data: any) => void
    updateHomeTask: (data: any) => void
    errors: any
    setErrors: (data: any) => void
}

export interface IDispatchCallTeachersProps {
    type: string,
    payload: any
}
