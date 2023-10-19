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
import {useLazyQuery, useMutation} from "@apollo/client";
import {FIND_USER, REGISTER_USER} from "../../api";
import {useContext, useState} from "react";
import GlobalContext from "../../context/GlobalContext";

const findUserSchema = z.object({
    email: z.string().min(5).max(50),
    fullname: z.string().optional(),
});

const registerSchema = z.object({
    password: z.string().min(5).max(50),
});

export const RegisterForm = () => {
    const { setCurrentUser, setErrors } = useContext(GlobalContext);

    const [findUser] = useLazyQuery(FIND_USER);
    const [registerUser] = useMutation(REGISTER_USER);

    const findUserForm = useForm<z.infer<typeof findUserSchema>>({
        resolver: zodResolver(findUserSchema),
        defaultValues: {
            email: "",
            fullname: ""
        },
    });

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            password: "",
        },
    });

    const [disabled, setDisabled] = useState(true);

    function onUserFind(values: z.infer<typeof findUserSchema>) {
        findUser({variables: {email: values.email}}).then((result) => {
            const name = result.data.findUser.fullname;
            findUserForm.setValue("fullname", name);
            setDisabled(false);
        });
    }

    function onRegistration(values: z.infer<typeof registerSchema>) {
        const data = findUserForm.getValues();
        registerUser({variables: {password: values.password, email: data.email}}).then((result) => {
            let {token, user, group, teacher, student } = result.data.register;
            setCurrentUser({ token, group, teacher, student, data: user });
            localStorage.setItem("token", "Bearer " + token);
            localStorage.setItem("data", JSON.stringify(user));
            localStorage.setItem("group", group);
            localStorage.setItem("teacher", teacher);
            localStorage.setItem("student", student);
            window.location.href = '/';
        }).catch(e => setErrors(e));
    }

    return (
        <>
            <Form {...findUserForm}>
                <form onSubmit={findUserForm.handleSubmit(onUserFind)} className="space-y-5 mb-10">
                    <FormField
                        control={findUserForm.control}
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
                        control={findUserForm.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Повне ім'я</FormLabel>
                                <FormControl>
                                    <Input placeholder="Перевірте ваше ім'я" disabled={true} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="flex h-10 w-full" variant={"outline"} type="submit">Знайти</Button>
                </form>
            </Form>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegistration)} className="space-y-5">
                    <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input type={"password"} disabled={disabled} placeholder="Введіть пароль" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={disabled} className="flex h-10 w-full" type="submit">Реєстрація</Button>
                </form>
            </Form>
        </>
    )
}
