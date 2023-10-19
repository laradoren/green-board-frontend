import {gql} from "@apollo/client";

export const CREATE_TEACHERS_LIST = gql`
    mutation CreateTeachersList($list: [TeacherItem!]) {
        createTeachersList(list: $list) {
            _id
            user {
                fullname email
            }
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($newUser: UserInput) {
        createUser(newUser: $newUser) {
            _id 
            user {
                fullname email
            }       
        }
    }
`

export const UPDATE_TEACHER = gql`
    mutation UpdateTeacher($id: ID!, $fullname: String!, $email: String!) {
        updateTeacher(id: $id, fullname: $fullname, email: $email) {
            _id
            user {
                fullname email
            }
        }
    }
`

export const DELETE_TEACHERS_LIST = gql`
    mutation DeleteTeachersList($list: [ID!]) {
        deleteTeachersList(list: $list) {
            _id
        }
    }
`

export const CREATE_GROUP = gql`
    mutation CreateGroup($newGroup: GroupInput) {
        createGroup(newGroup: $newGroup) {
            _id
            group
            user {
                fullname email
            }
        }
    }
`

export const UPDATE_STUDENT = gql`
    mutation UpdateStudent($id: ID!, $fullname: String!, $email: String!) {
        updateStudent(id: $id, fullname: $fullname, email: $email) {
            _id
            group
            user {
                fullname email
            }
        }
    }
`

export const DELETE_STUDENTS_LIST = gql`
    mutation DeleteStudentsList($list: [ID!]) {
        deleteStudentsList(list: $list) {
            _id
        }
    }
`

export const REGISTER_USER = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            token group teacher student user {
                role fullname email
            }
        }
    }
`

export const CREATE_SUBJECT = gql`
    mutation CreateSubject($newSubject: SubjectInput) {
        createSubject(newSubject: $newSubject) {
            _id title tasks{
                _id name description
            }
        }
    }
`

export const CREATE_TASK = gql`
    mutation CreateTask($newTask: TaskInput!) {
        createTask(newTask: $newTask) {
            _id title tasks {
                _id name description
                hometasks {
                    _id
                    text
                    status
                }
            }
        }
    }
`

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            _id title tasks {
                _id name description                 
                hometasks {
                    _id
                    text
                    status
                }
            }
        }
    }
`

export const CREATE_HOMETASK = gql`
    mutation CreateHometask($hometask: HometaskInput!) {
        createHometask(hometask: $hometask) {
            _id
            title
            tasks {
                _id
                name
                description
                hometasks {
                    _id
                    text
                    status
                }
            }
        }
    }
`

export const UPDATE_HOMETASK = gql`
    mutation UpdateHometask($id: ID!, $status: String!) {
        updateHometask(id: $id, status: $status) {
            _id
            status
            text
        }
    }
`