import {Alert, AlertDescription, AlertTitle} from "../ui";
import {AlertCircle} from "lucide-react";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

export const ErrorAlert = () => {
    const { errors } = useContext(GlobalContext);

    if(!errors) return;

    return (
        <Alert variant="destructive" className="fixed w-[400px] bottom-10 right-10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {errors.message}
            </AlertDescription>
        </Alert>
    )
}