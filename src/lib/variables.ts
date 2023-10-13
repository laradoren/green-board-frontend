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
    /******************TeacherRole******************/
    {
        title: "Список предметів",
        role: "teacher",
        href: "/subject/list",
        type: "subjects"
    },
    {
        title: "Перевірка завдань",
        role: "teacher",
        href: "/hometask/list",
        type: "tasks"
    },
    {
        title: "Електронний журнал",
        role: "teacher",
        href: "/study/list",
        type: "study"
    },
    {
        title: "Календар",
        role: "teacher",
        href: "/calendar",
        type: "calendar"
    }
    /******************StudentRole******************/
];

export const dialogOptions:DialogOptionsType = {
    newSubject: {
        header: "Додання нової дисципліни",
        button: "Додати"
    },
    newTask: {
        header: "Публікація нового завдання",
        button: "Створити"
    },
    editTask: {
        header: "Додати зміни в завдання",
        button: "Зберегти"
    },
    deleteTask: {
        header: "Ви справді хочете видалити це завдання?",
        button: "Видалити"
    }
}