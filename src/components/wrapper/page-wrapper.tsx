import {CardContent, CardHeader, CardTitle} from "../ui/card";
import * as React from "react";
import {ReactNode} from "react";

export const PageWrapper = ({title, children, className}: {title: string, children: ReactNode, className: string}) => {
    return (
        <div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </div>
    );
}

