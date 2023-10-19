import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token group teacher student user {
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

export const GET_ALL_GROUPS = gql`
    query AllGroups {
        allGroups {
            _id code 
            students {
                _id
            }
        }
    }
`

export const GET_TEACHER_SUBJECTS = gql`
    query GetTeacherSubjects($id: ID!) {
        getTeacherSubjects(id: $id) {
            _id title groups 
            tasks {
                _id name description
                hometasks {
                    _id
                    text
                    status
                    student {
                        user {
                            fullname
                        }
                    }
                }
            }
        }
    }
`
export const GET_STUDENT_SUBJECTS = gql`
    query GetStudentsSubjects($group: String!, $id: ID!) {
        getStudentSubjects(group: $group, id: $id) {
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



