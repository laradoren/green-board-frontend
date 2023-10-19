import {BadgeOptionType, HomeTask, Task} from "../../../types";
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge,
    Button, Card, Dialog, DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger, Label,
    Separator
} from "../../../components/ui";
import {MoreHorizontal} from "lucide-react";
import * as React from "react";
import {DialogWrapper} from "../../../components/wrapper/dialog-wrapper";
import {useContext} from "react";
import GlobalContext from "../../../context/GlobalContext";
import {BsFillTrashFill} from "react-icons/bs";
import {dialogOptions} from "../../../lib";
import {HomeTaskForm} from "../../../components/form/hometask-form";

export const TaskItem = ({task} : {task: Task}) => {
    const { deleteTask } = useContext(GlobalContext);

    return (
        <>
            <Accordion type="multiple" className="w-full">
                <AccordionItem value={task.id}>
                    <AccordionTrigger className={"mr-1"}>
                        {task.name}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className={"flex flex-col"}>
                            <Label className={"text-base font-normal"}>Деталі: {task.description}</Label>
                            <HomeTasksBlock hometasks={task.hometasks} />
                            <Button
                                variant="destructive"
                                className="hidden h-10 w-10 p-0 lg:flex mt-3 self-end"
                                onClick={() => deleteTask({id: task.id})}
                            >
                                <span className="sr-only">Видалити</span>
                                <BsFillTrashFill className="h-5 w-5"/>
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}

const HomeTasksBlock = ({hometasks}: {hometasks: HomeTask[]}) => {
    const { updateHomeTask } = useContext(GlobalContext);

    if(!hometasks.length) return <></>
    return (
        <div className="my-2">
            {
                hometasks.map((h: HomeTask) => {
                    return (
                        <Card className="my-2 p-3 flex justify-between">
                            <Label>{h.student} </Label>
                            {h.text} {getStatusBadge(h.status)}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Меню</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                {h.status !== "success" && <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="cursor-pointer" onClick={() => updateHomeTask({status: "fail", id: h.id})}>Відхилити</DropdownMenuLabel>
                                    <DropdownMenuLabel className="cursor-pointer" onClick={() => updateHomeTask({status: "success", id: h.id})}>Прийняти</DropdownMenuLabel>
                                </DropdownMenuContent>}
                            </DropdownMenu>
                    </Card>
                    )
                })
            }
        </div>
    )
}

const getStatusBadge = (status: string) => {
    let option:BadgeOptionType = {
        variant: "outline",
        title: "Не відправлено"
    }
    switch (status) {
        case "success":
            option = {
                variant: undefined,
                title: "Перевірено"
            }
            break;
        case "pending":
            option = {
                variant: "secondary",
                title: "Очікує"
            }
            break;
        case "fail":
            option = {
                variant: "outline",
                title: "На доопрацюванні"
            }
            break;
    }
    return <Badge variant={option.variant} className="green">{option.title}</Badge>
}


