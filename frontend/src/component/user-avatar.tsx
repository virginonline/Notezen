import {Avatar, AvatarFallback, AvatarImage} from "@/component/ui/avatar";
import {Icons} from '@/component/ui/icons';
import {User} from "@/lib/types/type";
import {AvatarProps} from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "id" | "username">
}
export function UserAvatar({user} : UserAvatarProps) {
    return (
        <Avatar>
                <AvatarImage alt="Picture" src='/placeholder.png' />
                <AvatarFallback>
                    <span className="sr-only">{user.username.slice(0,2)}</span>
                    <Icons.user className="h-4 w-4" />
                </AvatarFallback>
        </Avatar>
    )
}