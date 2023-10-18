import {Task} from "../../../types";
import {
    Button, Dialog, DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
    Progress, Separator
} from "../../../components/ui";
import {MoreHorizontal} from "lucide-react";
import * as React from "react";
import {DialogWrapper} from "../../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../../lib/variables";
import {TaskForm} from "../../../components/form/task-form";

export const TaskItem = ({task} : {task: Task}) => {
    return (
        <>
            <div className="w-full flex justify-between items-center p-4">
                <div className="whitespace-nowrap overflow-hidden mr-1">{task.title}</div>
                <div className="whitespace-nowrap overflow-hidden cursor-pointer mr-1">{task.file}</div>
                <div className="w-[45%] flex items-center">
                    <Progress value={13} className="mr-4" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <TaskActions title={task.title} />
                    </DropdownMenu>
                </div>

            </div>
            <Separator className="my-2" />
        </>
    )
}

const TaskActions = ({title}: {title: string}) => {
    return (
        <DropdownMenuContent align="end">
            <Dialog>
                <DialogTrigger>
                    <DropdownMenuLabel>Деталі</DropdownMenuLabel>
                </DialogTrigger>
                <DialogWrapper header={title} button={""}>
                    Task content
                </DialogWrapper>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <Dialog>
                <DialogTrigger>
                    <DropdownMenuLabel>Видалити</DropdownMenuLabel>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.deleteTask.header} button={dialogOptions.deleteTask.button}>
                    <div>Якщо ви видалите завдання, його неможливо буде відновити</div>
                </DialogWrapper>
            </Dialog>
        </DropdownMenuContent>
    )
}