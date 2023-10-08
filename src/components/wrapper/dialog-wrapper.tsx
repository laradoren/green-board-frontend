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

export const DialogWrapper = ({header, button, children}: DialogOptionType) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{header}</DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
                <DialogClose>
                    {button && (
                        <>
                            <Button type="button" variant="outline">Назад</Button>
                            <Button type="submit" className="ml-5">{button}</Button>
                        </>
                    )}
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}

