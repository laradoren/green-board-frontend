import {PageWrapper} from "../../components/wrapper/page-wrapper";
import {Button} from "../../components/ui/button";
import * as React from "react";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {ScrollArea} from "../../components/ui/scroll-area";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
export const SubjectList = () => {
    return (
        <PageWrapper className="w-full" title={"Дисципліни"}>
            <div className="flex justify-between items-center">
                <Button
                    variant="secondary"
                    className="dark"
                    size="lg"
                >
                    Додати нову дисципліну
                </Button>
                <Button
                    variant="secondary"
                    className="dark"
                    size="lg"
                >
                    Нове завдання
                </Button>
            </div>

            <div className="flex justify-between items-center py-4">
                <ScrollArea className="h-[calc(100vh-16.35rem)] w-96 rounded-md border">
                    <div className="p-4">
                        {tags.map((tag) => (
                            <>
                                <Button
                                    variant="ghost"
                                    className="dark w-full"
                                    size="lg"
                                >
                                    Основи програмування
                                </Button>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
                <ScrollArea className="h-[calc(100vh-16.35rem)] w-[calc(100vw-30.5rem)] rounded-md border">
                    <div className="p-4">
                        {tags.map((tag) => (
                            <>
                                <Button
                                    variant="ghost"
                                    className="dark w-full"
                                    size="lg"
                                >
                                    Лекція 1
                                </Button>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </PageWrapper>
    );
}