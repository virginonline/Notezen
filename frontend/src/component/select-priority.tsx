import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/component/ui/select";
import {Priorities} from "@/component/data";

export function SelectPriority() {
    return(
        <Select>
            <SelectTrigger className="w-[500px] mb-3">
                <SelectValue placeholder="Выберите приоритет задачи" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Приоритет задачи</SelectLabel>
                    {Priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}