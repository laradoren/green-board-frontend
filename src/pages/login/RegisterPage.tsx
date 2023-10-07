import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RegisterForm } from "../../components/form/register-form";

const RegisterPage = () => {
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
                    <Button className="flex h-10 w-full" type="submit">Створити профіль</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default RegisterPage;
