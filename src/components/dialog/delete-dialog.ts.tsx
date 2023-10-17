import {
    Button, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../ui";
import * as React from "react";
import {DialogOptionType} from "../../types";
import {useMutation} from "@apollo/client";
import {DELETE_TEACHER, DELETE_TEACHERS_LIST} from "../../api";

export const DeleteDialog = ({header, button, id, list}: DialogOptionType) => {
    const [deleteTeacher] = useMutation(DELETE_TEACHER);
    const [deleteTeachersList] = useMutation(DELETE_TEACHERS_LIST);


    const onDeleteClick = () => {
        if(id) {
            deleteTeacher({variables: {id}})
        }
        if(list?.length) {
            deleteTeachersList({variables: {list: list}});
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{header}</DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button type="button" variant="outline">Назад</Button>
                    <Button type="submit" className="ml-5" onClick={onDeleteClick}>{button}</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}

