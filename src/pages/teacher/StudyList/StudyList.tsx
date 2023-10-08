import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import * as React from "react";
import {
    ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui";
import {Group, Student, Subject, Task} from "../../../types";

const students:Student[] = [
    {
        id: "student1",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        score: "20",
        firstAttestation: true,
        secondAttestation: false
    },
    {
        id: "student2",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        score: "10",
        firstAttestation: false,
        secondAttestation: false
    },
    {
        id: "student3",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        score: "10",
        firstAttestation: false,
        secondAttestation: false
    },
    {
        id: "student4",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        score: "10",
        firstAttestation: false,
        secondAttestation: false
    }
]
export const StudyList = () => {
    return (
        <PageWrapper className="w-full" title={"Електронний журнал"}>
            <div className="flex">
                <Select>
                    <SelectTrigger className="w-[384px]">
                        <SelectValue placeholder="Обрати дисципліну" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="subject1">Основи програмування</SelectItem>
                        <SelectItem value="subject2">Основи програмування 2</SelectItem>
                        <SelectItem value="subject3">Дисципліна</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[384px]">
                        <SelectValue placeholder="Обрати групу" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="subject1">Основи програмування</SelectItem>
                        <SelectItem value="subject2">Основи програмування 2</SelectItem>
                        <SelectItem value="subject3">Дисципліна</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea className="h-[calc(100vh-15.15rem)] w-[770px] rounded-md border mt-4">
                <div className="p-4">
                    {
                        (!students.length) ? (
                            <div className="text-center">
                                Студентів не знайдено
                            </div>
                        ) : students.map((student:Student) => <StudentItem key={student.id} student={student}/>)
                    }
                </div>
            </ScrollArea>
        </PageWrapper>
    );
}

const StudentItem = ({student}: {student: Student}) => {
    return (
        <div className="flex w-full justify-between">
            <div>{`${student.name} ${student.surname} ${student.lastname}`}</div>
            <div>{student.score}</div>
        </div>
    )
}
