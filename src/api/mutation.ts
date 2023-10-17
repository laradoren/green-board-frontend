import {gql} from "@apollo/client";

export const CREATE_TEACHERS_LIST = gql`
    mutation CreateTeachersList($list: [TeacherItem!]) {
        createTeachersList(list: $list) {
            _id
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($newUser: UserInput) {
        createUser(newUser: $newUser) {
            _id
        }
    }
`

export const UPDATE_TEACHER = gql`
    mutation UpdateTeacher($id: ID!, $fullname: String!, $email: String!) {
        updateTeacher(id: $id, fullname: $fullname, email: $email) {
            _id
            user {
                fullname
            }
        }
    }
`

export const DELETE_TEACHER = gql`
    mutation DeleteTeacher($id: ID!) {
        deleteTeacher(id: $id) {
            _id 
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