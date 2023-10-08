"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "../ui"
import { useForm } from "react-hook-form";

const taskSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(5).max(20),
    file: z.string().min(5).max(20),
    deadline: z.string().min(5).max(20),
});

export const TaskForm = () => {
    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            file: "",
            deadline: ""
        },
    })

    function onSubmit(values: z.infer<typeof taskSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
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
                                <Input placeholder="Опишіть суть завдання" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Завантажити файл</FormLabel>
                            <FormControl>
                                <Input placeholder="Завантажте файл" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Термін для опрацювання</FormLabel>
                            <FormControl>
                                <Input placeholder="Термін розробки" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
