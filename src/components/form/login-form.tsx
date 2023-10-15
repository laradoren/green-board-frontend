"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "../ui"
import { useForm } from "react-hook-form";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Dispatch, SetStateAction} from "react";
import {IUserData} from "../../types";

const LOGIN_USER = gql`
    query Login($email: String!, $password: String!) {
       login(email: $email, password: $password) {
           token user {
                role fullname email
            }
       } 
    }
`

const loginSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(5).max(20),
});

export const LoginForm = ({setCurrentUser}: {setCurrentUser: Dispatch<SetStateAction<IUserData>>}) => {
    const [loginUser, {loading}] = useLazyQuery(LOGIN_USER, {
        onError: error=> console.error(error),
        onCompleted: (data) => {
            let {token, user} = data.login;
            setCurrentUser({ token, data: user });
            localStorage.setItem("token", token);
            localStorage.setItem("data", JSON.stringify(user));
        }
    });
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit (values: z.infer<typeof loginSchema>) {
        loginUser({variables: values});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Логін</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть логін" {...field} />
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
                <Button className="flex h-10 w-full" type="submit">Вхід</Button>
            </form>
        </Form>
    )
}
