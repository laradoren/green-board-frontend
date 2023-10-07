import {NavigationOptionType} from "../types";

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
        href: "/task/list",
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
]