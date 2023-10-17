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
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

const studentSchema = z.object({
    fullname: z.string().min(2).max(100),
    email: z.string().min(5).max(50),
});

export const StudentDataDataForm = ({editOption}: {editOption: any}) => {
    const { updateStudent } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof studentSchema>>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            fullname: editOption ? editOption.fullname : "",
            email: editOption ? editOption.email : "",
        },
    })

    function onSubmit(values: z.infer<typeof studentSchema>) {
        updateStudent({...values, id: editOption.id});
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

