"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button,
    DialogClose,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "../ui"
import { useForm } from "react-hook-form";
import * as React from "react";
import {handleExcelFile} from "../../lib/helper";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {IUserExelData} from "../../types";

const teacherSchema = z.object({
    fullname: z.string().min(2).max(100),
    email: z.string().min(5).max(50),
});

const teachersDataSchema = z.object({
    file: z.custom<File>()
});

export const TeacherDataForm = ({editOption}: {editOption: any}) => {
    const { createSingleTeacher, updateTeachersList } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            fullname: editOption ? editOption.fullname : "",
            email: editOption ? editOption.email : "",
        },
    })

    function onSubmit(values: z.infer<typeof teacherSchema>) {
        if(editOption) {
            updateTeachersList({...values, id: editOption.id});
        } else {
            createSingleTeacher({role: "teacher", ...values});
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Повне ім'я</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть прізвище, ім'я та по батькові" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Електронна пошта</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть пошту" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose className="space-y-1 w-full">
                    <Button type="button" variant="outline">Назад</Button>
                    <Button type="submit" className="ml-5">Додати</Button>
                </DialogClose>
            </form>
        </Form>
    )
};

export const TeachersDataFileForm = () => {
    const { createTeachersList } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof teachersDataSchema>>({
        resolver: zodResolver(teachersDataSchema), defaultValues: {
            file: new File([], "")
        }
    });

    function onSubmit(values: z.infer<typeof teachersDataSchema>) {
        handleExcelFile(values.file, (result: IUserExelData[]) => {
            createTeachersList(result);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Завантажте таблицю, із даними, будь ласка</FormLabel>
                            <Input
                                type="file"
                                accept=".xlsx"
                                name={field.name}
                                onChange={(e) =>
                                    field.onChange(e.target.files ? e.target.files[0] : null)
                                }
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose className="space-y-1 w-full">
                    <Button type="button" variant="outline">Назад</Button>
                    <Button type="submit" className="ml-5">Завантажити</Button>
                </DialogClose>
            </form>
        </Form>
    )
}
