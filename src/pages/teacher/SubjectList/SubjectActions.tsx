import {
    Button,
    Dialog,
    DialogTrigger
} from "../../../components/ui";
import {TaskForm} from "../../../components/form/task-form";
import {SubjectForm} from "../../../components/form/subject-form";
import * as React from "react";
import {DialogWrapper} from "../../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../../lib/variables";

export const SubjectActions = ({subject}: {subject: string}) => {
    return (
        <div className="flex justify-between items-center">
            <Dialog>
                <DialogTrigger>
                    <Button
                        size="lg"
                    >
                        Додати нову дисципліну
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.newSubject.header} >
                    <SubjectForm />
                </DialogWrapper>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button
                        size="lg"
                        variant={"outline"}
                    >
                        Публікація завдання
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.newTask.header} button={dialogOptions.newTask.button}>
                    <TaskForm subject={subject} />
                </DialogWrapper>
            </Dialog>
        </div>
    )
}