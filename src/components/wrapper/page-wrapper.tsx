import {CardContent, CardHeader, CardTitle} from "../ui";
import * as React from "react";
import {ReactNode} from "react";

export const PageWrapper = ({title, children, className}: {title: string, children: ReactNode, className: string}) => {
    return (
        <div className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </div>
    );
}

