import {
    Alert, AlertDescription,
    AlertTitle,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../components/ui";
import { RegisterForm } from "../../components/form";
import {Link} from "react-router-dom";

export const RegisterPage = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
            <Card className="sm:mx-auto sm:w-full sm:max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ласкаво просимо!</h2>
                    </CardTitle>
                    <CardDescription className="text-center">Введіть, будь ласка, вашу пошту та встановіть пароль</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <Link to={"/login"} className={"w-full text-center underline cursor-pointer text-sm"}> Я вже маю активований акаунт </Link>
                </CardFooter>
            </Card>
        </div>
    );
}