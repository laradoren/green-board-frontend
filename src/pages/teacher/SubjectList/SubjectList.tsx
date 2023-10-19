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
                                <TabsContent className="mt-0" key={subject.id} value={subject.id}><TaskList selected={selected} tasks={subject.tasks} /></TabsContent>
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

const TaskList = ({tasks, selected}: {tasks: Task[], selected: any}) => {
    return (
        <ScrollArea className="h-[calc(100vh-16.35rem)] w-[calc(100vw-30.5rem)] rounded-md border">
            <div className="px-4">
                {
                    (!tasks.length) ? (
                        <Label className="flex w-full justify-center mt-4">
                            Для цієї дисципліни ще не створювались завдання
                        </Label>
                    ) : tasks.map((task:Task) => <TaskItem task={task} key={task.id} selected={selected} />)
                }
            </div>
        </ScrollArea>
    )
}