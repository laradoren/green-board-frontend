import { Button } from "../../components/ui";
import { BiSolidLeaf } from "react-icons/bi";
import * as React from "react";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
export const LogoutPage = () => {
    const { setCurrentUser } = useContext(GlobalContext);

    const logout = () => {
        localStorage.clear();
        setCurrentUser({
            data: {
                role: "",
                email: "",
                fullname: ""
            },
            token: "",
            group: "",
            teacher: "",
            student: ""
        });
        window.location.href = '/';
    }

    return (
        <div className="flex h-full flex-col justify-center align-center px-6 py-12 lg:px-8">
            <BiSolidLeaf className="mx-auto h-10 w-auto fill-green-700" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Ви справді хочете вийти із системи?
            </h2>
            <Button
                onClick={logout}
                className={"w-[200px] self-center mt-12"}
                size="lg"
            >
                Так, я хочу вийти
            </Button>
        </div>
    );
}