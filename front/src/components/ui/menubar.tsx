"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";

function MenubarMenu({
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
    return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
    return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
    return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
    return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
    return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
        ref={ref}
        className={cn(
            "flex justify-start h-12 space-x-1 rounded-md border bg-background p-1 shadow-sm w-full",
            className
        )}
        {...props}
    />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarMain = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
        ref={ref}
        className={cn(
            "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
            className
        )}
        {...props}
    />
))
MenubarMain.displayName = "MenubarMain"


const MenubarTrigger = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            className
        )}
        {...props}
    />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
        inset?: boolean
    }
>(({ className, inset, children, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            inset && "pl-8",
            className
        )}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.SubContent
        ref={ref}
        className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
    (
        { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
        ref
    ) => (
        <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content
                ref={ref}
                align={align}
                alignOffset={alignOffset}
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
                )}
                {...props}
            />
        </MenubarPrimitive.Portal>
    )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
    </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
                <Circle className="h-4 w-4 fill-current" />
            </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
    </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Label
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-sm font-semibold",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}
MenubarShortcut.displayname = "MenubarShortcut"

const MainMenubar = () => {
    const router = useRouter()

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger onClick={() => router.push('/')}>Accueil</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger onClick={() => router.push('/collection')}>Découvrir</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>NFT</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => router.push('/minting')}>
                        Ajouter une NFT
                    </MenubarItem>
                    <MenubarItem onClick={() => router.push('/Marketplace')}>
                        Lister un NFT
                    </MenubarItem>
                    <MenubarItem disabled>Expertiser une NFT</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Partager</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Facebook</MenubarItem>
                            <MenubarItem>X</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>
            <div className={"w-full"}></div>
            <MenubarMenu>
                <MenubarTrigger className={"ml-auto"}>
                    <SearchIcon className="h-4 w-4 mr-1.5" />
                    <Input type="search" placeholder="Search a NFT"
                        className="ml-auto border-0 h-8 font-semibold"
                           /*todo onSubmit={}*/ />
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Avatar
                        onClick={() => router.push('/auth')}
                    >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>IM</AvatarFallback>
                    </Avatar>
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}
MenubarShortcut.displayname = "MainMenubar"

export {
    MainMenubar,
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarLabel,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarPortal,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarGroup,
    MenubarSub,
    MenubarShortcut,
}
