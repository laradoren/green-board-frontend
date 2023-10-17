import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from "../../components/ui";
import { RegisterForm } from "../../components/form/register-form";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

export const RegisterPage = () => {
    const { setLoginState } = useContext(GlobalContext);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
            <Card className="sm:mx-auto sm:w-full sm:max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ласкаво просимо!</h2>
                    </CardTitle>
                    <CardDescription className="text-center">Заповніть, будь ласка, ваші дані</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <CardFooter>
                        <div onClick={() => setLoginState(true)} className={"w-full text-center underline cursor-pointer text-sm"}>Вже зареєстровані? </div>
                    </CardFooter>
                </CardFooter>

            </Card>
        </div>
    );
}