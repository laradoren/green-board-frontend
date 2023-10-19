import {HomeTask, Task} from "../../../types";
import {
    Button, Dialog, DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
    Separator
} from "../../../components/ui";
import {MoreHorizontal} from "lucide-react";
import * as React from "react";
import {DialogWrapper} from "../../../components/wrapper/dialog-wrapper";
import {useContext} from "react";
import GlobalContext from "../../../context/GlobalContext";

export const TaskItem = ({task} : {task: Task}) => {
    return (
        <>
            <div className="w-full flex justify-between items-center p-4">
                <div className="whitespace-nowrap overflow-hidden mr-1">{task.name}</div>
                <HomeTasksBlock hometasks={task.hometasks} />
                <div className="flex items-center">
                    {/*<Progress value={13} className="mr-4" />*/}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <TaskActions task={task} />
                    </DropdownMenu>
                </div>

            </div>
            <Separator className="my-2" />
        </>
    )
}

const HomeTasksBlock = ({hometasks}: {hometasks: HomeTask[]}) => {
    if(!hometasks.length) return <></>
    return (
        <>
            {
                hometasks.map((h: HomeTask) => {
                    return <div>{h.text}</div>
                })
            }
        </>
    )
}

const TaskActions = ({task} : {task: Task}) => {
    const { deleteTask } = useContext(GlobalContext);
    return (
        <DropdownMenuContent align="end">
            <Dialog>
                <DialogTrigger>
                    <DropdownMenuLabel>Деталі</DropdownMenuLabel>
                </DialogTrigger>
                <DialogWrapper header={task.name} button={""}>
                    {task.description}
                </DialogWrapper>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className={"cursor-pointer"} onClick={() => deleteTask({id: task.id})}>Видалити</DropdownMenuLabel>
        </DropdownMenuContent>
    )
}
