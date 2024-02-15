import { Dispatch, useState } from "react";

type TDialog = boolean

type TSetDialog = Dispatch<React.SetStateAction<boolean>>

type TDialogActions = {
    openDialog: () => void
    closeDialog: () => void
}

type TUseDialogReturn = [TDialog, TSetDialog, TDialogActions]

export default function useDialog(initialValue?: boolean): TUseDialogReturn {
    const [idDialogOpen, setIsDialogOpen] = useState<boolean>(() => {
        return initialValue ? initialValue : false
    })

    function openDialog() {
        setIsDialogOpen(true)
    }

    function closeDialog() {
        setIsDialogOpen(false)
    }

    return [
        idDialogOpen,
        setIsDialogOpen,
        { openDialog, closeDialog }
    ]
}