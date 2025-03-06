"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";


export default function Header() {
    return (
      <nav className="">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>Quienes somos</NavigationMenuItem>
          <NavigationMenuItem>Nuestros servicios</NavigationMenuItem>
          <NavigationMenuItem>Opiniones de nuestros clientes</NavigationMenuItem>
          <NavigationMenuItem>Características</NavigationMenuItem>
          <NavigationMenuItem>Contáctanos</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>

    );
        
}