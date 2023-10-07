import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "../components/ui/navigation-menu";
import {NavLink} from "react-router-dom";
import {navigationOptions} from "../lib/variables";
import {NavigationOptionType} from "../types";

export const NavigationBar = ({currentRole}: {currentRole:string}) => {
    return (
        <NavigationMenu className="sticky mb-2 z-50 bottom-0 h-14 dark text-foreground">
            <NavigationMenuList>
                {
                    navigationOptions.map((option, index) => {
                        return option.role === currentRole && <NavigationItem option={option} />
                        }
                    )
                }
            </NavigationMenuList>
        </NavigationMenu>

    );
}

const NavigationItem = ({option}: { option: NavigationOptionType }) => {
    return (
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <NavLink to={option.href}>
                <NavigationMenuLink>
                    {option.title}
                </NavigationMenuLink>
            </NavLink >
        </NavigationMenuItem>
    )
}