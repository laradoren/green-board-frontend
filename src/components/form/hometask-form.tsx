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
    Input, Textarea
} from "../ui"
import { useForm } from "react-hook-form";
import * as React from "react";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

const hometaskSchema = z.object({
    text: z.string().min(2).max(50),
});

export const HomeTaskForm = ({options, status} : {options: any, status?: string}) => {
    const { createHomeTask, currentUser } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof hometaskSchema>>({
        resolver: zodResolver(hometaskSchema),
        defaultValues: {
            text: options.text
        },
    })

    function onSubmit(values: z.infer<typeof hometaskSchema>) {
        if(currentUser.data.role === "student") {
            createHomeTask({
                status: "pending",
                text: values.text,
                student: currentUser.student,
                task: options.taskId
            });
        } else {
            createHomeTask({
                status: status,
                text: values.text
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Коментар</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Введіть коментар" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose className="space-y-1 w-full">
                    <Button type="button" variant="outline">Назад</Button>
                    <Button type="submit" className="ml-5">Відправити</Button>
                </DialogClose>
            </form>
        </Form>
    )
}
