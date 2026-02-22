"use client";

import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { use } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[91%] max-w-7xl z-50 ">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <Link href="/" className="p-0 h-auto">
            New Drops 🔥
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto cursor-pointer">
                Men
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Sneakers</DropdownMenuItem>
              <DropdownMenuItem>Running</DropdownMenuItem>
              <DropdownMenuItem>Basketball</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto cursor-pointer">
                Women
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Sneakers</DropdownMenuItem>
              <DropdownMenuItem>Running</DropdownMenuItem>
              <DropdownMenuItem>Training</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <div className="flex flex-col gap-6 mt-8 text-lg">
                <Link href="/"  className="justify-start">
                  New Drops 🔥
                </Link>
                <Button variant="ghost" className="justify-start cursor-pointer">
                  Men
                </Button>
                <Button variant="ghost" className="justify-start">
                  Women
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
          KICKS
        </h1>

        <div className="flex items-center gap-4 md:gap-6">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Search size={20} />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex cursor-pointer">
            <User size={20} />
          </Button>

          <div className="relative" onClick={() => router.push("/cart")}>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ShoppingCart size={20} />
            </Button>
            <Badge className="absolute -top-2 -right-2 bg-orange-400 text-white px-1.5">
              {cartItems.length || 0}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
