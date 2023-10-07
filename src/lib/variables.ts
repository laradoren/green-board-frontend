import {NavigationOptionType} from "../types";

export const navigationOptions: NavigationOptionType[] = [
    {
        title: "Список викладачів",
        role: "admin",
        href: "/list",
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
    }
]