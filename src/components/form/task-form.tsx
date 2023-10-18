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

const taskSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(5).max(20),
});

export const TaskForm = ({subject}: {subject: string}) => {
    const { createTask } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    function onSubmit(values: z.infer<typeof taskSchema>) {
        createTask({subject: subject, ...values});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Назва</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть назву" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Опис</FormLabel>
                            <FormControl>
                                <Input placeholder="Опишіть деталі завдання" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose className="space-y-1 w-full">
                    <Button type="button" variant="outline">Назад</Button>
                    <Button type="submit" className="ml-5">Створити</Button>
                </DialogClose>
            </form>
        </Form>
    )
}
