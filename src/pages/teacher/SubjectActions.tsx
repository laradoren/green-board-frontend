import {
    Button,
    Dialog,
    DialogTrigger
} from "../../components/ui";
import {TaskForm} from "../../components/form/task-form";
import {SubjectForm} from "../../components/form/subject-form";
import * as React from "react";
import {DialogWrapper} from "../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../lib/variables";

export const SubjectActions = () => {
    return (
        <div className="flex justify-between items-center">
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant="secondary"
                        className="dark"
                        size="lg"
                    >
                        Додати нову дисципліну
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.newSubject.header} button={dialogOptions.newSubject.button}>
                    <SubjectForm />
                </DialogWrapper>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant="secondary"
                        className="dark"
                        size="lg"
                    >
                        Публікація завдання
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.newTask.header} button={dialogOptions.newTask.button}>
                    <TaskForm />
                </DialogWrapper>
            </Dialog>
        </div>
    )
}