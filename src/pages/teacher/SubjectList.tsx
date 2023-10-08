import {PageWrapper} from "../../components/wrapper/page-wrapper";
import * as React from "react";
import {
    ScrollArea,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../components/ui";
import {Subject, Task} from "../../types";
import {TaskItem} from "./TaskItem";
import {SubjectActions} from "./SubjectActions";

const subjects:Subject[] = [
    {
        id: "subject1",
        title: "Основи програмування",
        tasks: [
            {
                id: "task1",
                title: "Лекція 1: Основи програмування",
                description: "Опрацювати лекцію",
                file: "Лекція 1",
                deadline: "20-12-2023",
            },
            {
                id: "task2",
                title: "Лабораторна робота 1",
                description: "Виконати лабораторну роботу 1 та надіслати звіт",
                file: "Лабораторна робота 1",
                deadline: "25-12-202"
            }
        ]
    },
    {
        id: "subject2",
        title: "Графові бази даних",
        tasks: [
            {
                id: "task3",
                title: "Лабораторна робота 2",
                description: "Надіслати звіт по виконаній роботі",
                file: "Файл 1",
                deadline: "22-12-2023"
            },
            {
                id: "task4",
                title: "Заповнити таблицю",
                description: "Заповини та надіслати",
                file: "Таблиця 1",
                deadline: "18-12-2023"
            }
        ]
    },
    {
        id: "subject3",
        title: "Графові бази даних 2",
        tasks: []
    }
]
export const SubjectList = () => {
    return (
        <PageWrapper className="w-full" title={"Дисципліни"}>
            <SubjectActions />
            <Tabs defaultValue={subjects[0].id} className="flex justify-between items-start py-4">
                <TabsList className="flex flex-col w-96 items-center h-full">
                    {
                        subjects.map((subject:Subject) => {
                            return (
                                <TabsTrigger className="p-3 w-full" value={subject.id}>{subject.title}</TabsTrigger>
                            )
                    })
                    }
                </TabsList>
                {
                    subjects.map((subject:Subject) => {
                        return (
                            <TabsContent className="mt-0" value={subject.id}><TaskList tasks={subject.tasks} /></TabsContent>
                        )
                    })
                }
            </Tabs>
        </PageWrapper>
    );
}

const TaskList = ({tasks}: {tasks: Task[]}) => {
    return (
        <ScrollArea className="h-[calc(100vh-16.35rem)] w-[calc(100vw-30.5rem)] rounded-md border">
            <div className="p-4">
                {
                    (!tasks.length) ? (
                        <div className="text-center">
                            Для цієї дисципліни ще не створювались завдання
                        </div>
                    ) : tasks.map((task:Task) => <TaskItem task={task} />)
                }
            </div>
        </ScrollArea>
    )
}