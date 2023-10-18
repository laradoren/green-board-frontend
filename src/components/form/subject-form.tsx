"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Badge, Button,
    ComboboxDemo, DialogClose,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "../ui"
import { useForm } from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../../context/GlobalContext";
import * as React from "react";
import {IoIosClose} from "react-icons/io";
import {IoClose} from "react-icons/io5";

const subjectSchema = z.object({
    title: z.string().min(2).max(50),
});

export const SubjectForm = () => {
    const { allGroupsData, createTeacherSubject, currentUser } = useContext(GlobalContext);

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState<string[]>([]);

    useEffect(() => {
        setData(allGroupsData.allGroups.map((data: any) => ({[data._id]: data.code})));
    }, [allGroupsData]);

    const form = useForm<z.infer<typeof subjectSchema>>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof subjectSchema>) {
        createTeacherSubject({title: values.title, groups: selectedData, email: currentUser.data.email});
    }

    return (
        <>
            <ComboboxDemo data={data} selectedData={selectedData} setSelectedData={setSelectedData} />
            <div className={"flex space-x-3 h-[25px]"}>
                {data.map((item: any) => {
                    let key = Object.keys(item)[0];
                    if(selectedData.includes(key)) {
                        return <Badge className={"px-2 py-1 flex items-center"} key={key}>
                            <div className={"mr-2"}>
                                {item[key]}
                            </div>

                            <IoClose size={15} onClick={() => {
                                setSelectedData(prevState => prevState.filter(i => i !== key));
                            }}/>
                        </Badge>
                    }
                })}
            </div>
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
                    <DialogClose className="space-y-1 w-full">
                        <Button type="button" variant="outline">Назад</Button>
                        <Button type="submit" className="ml-5">Додати</Button>
                    </DialogClose>
                </form>
            </Form>
        </>
    )
}
