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

const groupSchema = z.object({
    code: z.string().min(2).max(100),
    file: z.custom<File>()
});

export const GroupForm = () => {
    const { createGroup } = useContext(GlobalContext);

    const form = useForm<z.infer<typeof groupSchema>>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            code: "",
            file: new File([], "")
        },
    })

    function onSubmit(values: z.infer<typeof groupSchema>) {
        handleExcelFile(values.file, (result: IUserExelData[]) => {
            createGroup(values.code, result);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Код групи</FormLabel>
                            <FormControl>
                                <Input placeholder="Введіть код групи" {...field} />
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
                    <Button type="submit" className="ml-5">Додати</Button>
                </DialogClose>
            </form>
        </Form>
    )
};
