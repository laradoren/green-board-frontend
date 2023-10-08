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
        title: "Статистика",
        role: "admin",
        href: "/statistics",
        type: "statistics"
    },
    {
        title: "Повідомлення",
        role: "admin",
        href: "/statistics",
        type: "statistics"
    },
    {
        title: "Календар",
        role: "admin",
        href: "/statistics",
        type: "statistics"
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
        title: "Повідомлення",
        role: "teacher",
        href: "/messenger",
        type: "messenger"
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