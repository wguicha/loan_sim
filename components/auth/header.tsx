import { Poppins } from "next/font/google";
import { LockClosedIcon } from "@radix-ui/react-icons"


import { cn } from '@/lib/utils'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
});

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-full flex flex-row gap-x-2 items-center justify-center">
                <LockClosedIcon className="text-3xl" width="25" height="25" />
                <h1 className={cn(
                    "text-3xl font-semibold",
                    font.className,
                )}>
                     Auth
                </h1>
            </div>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )


}