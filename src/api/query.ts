import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token user {
                role fullname email
            }
        }
    }
`

export const GET_ALL_TEACHERS = gql`
    query GetAllTeachers {
        allTeachers {
            _id
            user {
                fullname
                email
            }
        }
    }
`

export const GET_ALL_STUDENTS = gql`
    query GetAllStudents {
        allStudents {
            _id 
            group
            user {
                fullname
                email
            }
        }
    }
`
export const FIND_USER = gql`
    query FindUser($email: String!) {
        findUser(email: $email) {
            fullname
        }
    }
`
export const REGISTER_USER = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            token user {
                role fullname email
            }
        }
    }
`

