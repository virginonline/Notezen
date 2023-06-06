"use client"
import React, {FC, ReactNode} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {Icons} from "@/component/ui/icons";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/component/ui/select";
import {SelectLabel} from "@radix-ui/react-select";
import {Input} from "@/component/ui/input";

interface ProjectsCreateButtonProps {
    btn: ReactNode
}
const ProjectButton : FC<ProjectsCreateButtonProps> = ({btn}) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                {btn}
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay
            className="
              bg-blackA9
              data-[state=open]:animate-overlayShow
              fixed
              inset-0
              "
            />
            <Dialog.Content className="
              data-[state=open]:animate-contentShow
              fixed top-[50%]
              left-[50%]
              max-h-[85vh]

              w-[90vw]
              max-w-[450px]
              translate-x-[-50%]
              translate-y-[-50%]
              p-[25px]
              shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
              focus:outline-none
              ">
                <Dialog.Title className="text-[#9CA3AF] m-0 text-[17px] font-medium">
                    Создание нового проекта
                </Dialog.Title>
                <fieldset className="mb[15px] flex items-center gap-5">
                    <Input
                        type="text"
                        placeholder="Название проекта"/>
                </fieldset>
                <fieldset className="mb[15px] flex items-center gap-5">
                    <Input
                        type="text"
                        placeholder="Описание проекта"/>
                </fieldset>
                <fieldset className="mb[15px] flex items-center gap-5">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите статус проекта" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Статус проекта</SelectLabel>
                                <SelectItem value="INPROGRESS">В процессе</SelectItem>
                                <SelectItem value="PLANNED">Запланирован</SelectItem>
                                <SelectItem value="STOPPED">Приостановлен</SelectItem>
                                <SelectItem value="COMPLETE">Завершен</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </fieldset>


                <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                    <button
                        className="
                  bg-green4
                  text-green11
                  hover:bg-green5
                  focus:shadow-green7
                  inline-flex
                  h-[35px]
                  items-center
                  justify-center
                  rounded-[4px]
                  px-[15px]
                  font-medium
                  leading-none
                  focus:shadow-[0_0_0_2px]
                  focus:outline-none"
                    >
                        Создать проект
                    </button>
                </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button
                        className="
                text-[#D4D4D4]
                hover:bg-violet4
                focus:shadow-violet7
                absolute
                top-[10px]
                right-[10px]
                inline-flex
                h-[25px]
                w-[25px]
                appearance-none
                items-center
                justify-center
                rounded-full
                focus:shadow-[0_0_0_2px]
                focus:outline-none"
                        aria-label="Close"
                    >
                        <Icons.close/>
                    </button>
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
    )
}

export default ProjectButton;