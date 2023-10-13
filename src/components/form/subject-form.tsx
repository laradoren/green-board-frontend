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

const subjectSchema = z.object({
    title: z.string().min(2).max(50),
    groups: z.string().min(5).max(20),
});

export const SubjectForm = () => {
    const form = useForm<z.infer<typeof subjectSchema>>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            title: "",
            groups: "",
        },
    })

    function onSubmit(values: z.infer<typeof subjectSchema>) {
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
                    name="groups"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Групи</FormLabel>
                            <FormControl>
                                <Input placeholder="Оберіть групи" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
