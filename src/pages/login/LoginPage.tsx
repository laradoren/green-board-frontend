import { LoginForm } from "../../components/form";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../components/ui";
import { BiSolidLeaf } from "react-icons/bi";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
export const LoginPage = () => {
    const { setLoginState } = useContext(GlobalContext);
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <BiSolidLeaf className="mx-auto h-10 w-auto fill-green-700" />
                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Вхід
                            до особистого кабінету</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <div onClick={() => setLoginState(false)} className={"w-full text-center underline cursor-pointer text-sm"}>Перший раз у системі? </div>
                </CardFooter>
            </Card>
        </div>
    );
}