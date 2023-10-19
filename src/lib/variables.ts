import {DialogOptionsType, NavigationOptionType} from "../types";

export const navigationOptions: NavigationOptionType[] = [
    /******************AdminRole******************/
    {
        title: "Список викладачів",
        role: "admin",
        href: "teacher/list",
        type: "teachers"
    },
    {
        title: "Список груп",
        role: "admin",
        href: "group/list",
        type: "group"
    },
    {
        title: "Вийти з системи",
        role: "admin",
        href: "logout",
        type: "logout"
    },
    /******************TeacherRole******************/
    {
        title: "Список предметів",
        role: "teacher",
        href: "/subject/list",
        type: "subjects"
    },
    {
        title: "Вийти з системи",
        role: "teacher",
        href: "logout",
        type: "logout"
    },
    /******************StudentRole******************/
    {
        title: "Список завдань",
        role: "student",
        href: "/hometask/list",
        type: "tasks"
    },
    {
        title: "Вийти з системи",
        role: "student",
        href: "logout",
        type: "logout"
    },
];

export const dialogOptions:DialogOptionsType = {
    newSubject: {
        header: "Додання нової дисципліни",
        button: "Додати"
    },
    newTask: {
        header: "Публікація нового завдання"
    },
    editTask: {
        header: "Додати зміни в завдання",
        button: "Зберегти"
    },
    deleteTask: {
        header: "Ви справді хочете видалити це завдання?",
        button: "Видалити"
    },
    addTeachers: {
        header: "Завантаження даних викладачів",
    },
    updateTeachers: {
        header: "Внесення змін в дані викладача",
    },
    deleteData: {
        header: "Ви справді хочете видалити ці дані?",
        button: "Видалити"
    },
    createGroup: {
        header: "Створення нової групи",
    },
    updateStudent: {
        header: "Внесення змін в дані студента",
    },
    updateHometask: {
        header: "Додати інформацію та відправити на перевірку",
    },
}

export const excelType: String[] = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
]