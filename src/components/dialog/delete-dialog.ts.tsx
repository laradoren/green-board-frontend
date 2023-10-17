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
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

export const DeleteDialog = ({header, button, list}: DialogOptionType) => {
    const { deleteTeachersList } = useContext(GlobalContext);

    const onDeleteClick = () => {
        deleteTeachersList(list);
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

