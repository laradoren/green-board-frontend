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