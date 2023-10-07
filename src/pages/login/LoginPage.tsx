import { LoginForm } from "../../components/form/login-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BiSolidLeaf } from "react-icons/bi";

const LoginPage = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <BiSolidLeaf className="mx-auto h-10 w-auto" />
                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Вхід
                            до особистого кабінету</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
                <CardFooter>
                    <Button className="flex h-10 w-full" type="submit">Вхід</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginPage;
