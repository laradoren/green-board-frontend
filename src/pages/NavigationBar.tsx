import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList
} from "../components/ui";
import {NavLink} from "react-router-dom";
import {navigationOptions} from "../lib";
import {NavigationOptionType} from "../types";

export const NavigationBar = ({currentRole}: {currentRole:string}) => {
    return (
        <NavigationMenu className="sticky mb-2 z-50 bottom-0 h-14">
            <NavigationMenuList>
                {
                    navigationOptions.map((option, index) => {
                        return option.role === currentRole && <NavigationItem option={option} key={index} />
                        }
                    )
                }
            </NavigationMenuList>
        </NavigationMenu>

    );
}

const NavigationItem = ({option}: { option: NavigationOptionType }) => {
    return (
        <NavigationMenuItem className={"group inline-flex h-10 w-max items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"}>
            <NavLink to={option.href}>
                <NavigationMenuLink>
                    {option.title}
                </NavigationMenuLink>
            </NavLink >
        </NavigationMenuItem>
    )
}