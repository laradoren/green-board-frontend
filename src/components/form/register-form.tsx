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

const registerSchema = z.object({
    name: z.string().min(5).max(20),
    surname: z.string().min(5).max(20),
    lastname: z.string().min(5).max(20),
    email: z.string().min(5).max(20),
    password: z.string().min(5).max(20),
});

export const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            surname: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ім'я</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть ім'я" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Прізвище</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть прізвище" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>По-батькові</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть по-батькові" {...field} />
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть пароль" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
