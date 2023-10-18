import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import * as React from "react";
import {
    Card, CardContent, CardTitle, Label,
    ScrollArea,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui";
import {Task, TeacherSubject} from "../../../types";
import {TaskItem} from "./TaskItem";
import {SubjectActions} from "./SubjectActions";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../../../context/GlobalContext";

// const subjects:Subject[] = [
//     {
//         id: "subject1",
//         title: "Основи програмування",
//         tasks: [
//             {
//                 id: "task1",
//                 title: "Лекція 1: Основи програмування",
//                 description: "Опрацювати лекцію",
//                 file: "Лекція 1",
//                 deadline: "20-12-2023",
//             },
//             {
//                 id: "task2",
//                 title: "Лабораторна робота 1",
//                 description: "Виконати лабораторну роботу 1 та надіслати звіт",
//                 file: "Лабораторна робота 1",
//                 deadline: "25-12-202"
//             }
//         ]
//     },
//     {
//         id: "subject2",
//         title: "Графові бази даних",
//         tasks: [
//             {
//                 id: "task3",
//                 title: "Лабораторна робота 2",
//                 description: "Надіслати звіт по виконаній роботі",
//                 file: "Файл 1",
//                 deadline: "22-12-2023"
//             },
//             {
//                 id: "task4",
//                 title: "Заповнити таблицю",
//                 description: "Заповини та надіслати",
//                 file: "Таблиця 1",
//                 deadline: "18-12-2023"
//             }
//         ]
//     },
//     {
//         id: "subject3",
//         title: "Графові бази даних 2",
//         tasks: []
//     }
// ]
export const SubjectList = () => {
    const { allTeacherSubjects: subjects } = useContext(GlobalContext);
    const [selected, setSelected] = useState("");
    useEffect(() => {
        if(subjects && subjects.length) {
            setSelected(subjects[0].id);
        }
    }, [subjects]);
    return (
        <PageWrapper className="w-full" title={"Дисципліни"}>
            <SubjectActions subject={selected} />
            {subjects.length ? (
                <Tabs defaultValue={subjects[0].id} className="flex justify-between items-start py-4">
                    <TabsList className="flex flex-col w-96 items-center h-full">
                        {
                            subjects.map((subject:TeacherSubject) => {
                                return (
                                    <TabsTrigger onClick={() => setSelected(subject.id)} key={subject.id} className="p-3 w-full" value={subject.id}>{subject.title}</TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                    {
                        subjects.map((subject:TeacherSubject) => {
                            return (
                                <TabsContent className="mt-0" key={subject.id} value={subject.id}><TaskList tasks={subject.tasks} /></TabsContent>
                            )
                        })
                    }
                </Tabs>
            ) : (
                <Card className={"mt-10 p-5 text-center"}>
                    <CardContent>Ще немає дисциплін, створіть, будь ласка, щоби розпочати роботу</CardContent>
                </Card>
            )
            }

        </PageWrapper>
    );
}

const TaskList = ({tasks}: {tasks: Task[]}) => {
    return (
        <ScrollArea className="h-[calc(100vh-16.35rem)] w-[calc(100vw-30.5rem)] rounded-md border">
            <div className="p-4">
                {
                    (!tasks.length) ? (
                        <Label className="flex w-full justify-center mt-4">
                            Для цієї дисципліни ще не створювались завдання
                        </Label>
                    ) : tasks.map((task:Task) => <TaskItem task={task} key={task.id} />)
                }
            </div>
        </ScrollArea>
    )
}