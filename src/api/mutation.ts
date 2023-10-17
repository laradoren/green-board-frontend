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