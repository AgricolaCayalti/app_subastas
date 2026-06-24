import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUI } from "@/hooks";

interface ReadmeProps {
    open: boolean;
    onClose: () => void;
}

export const Readme: React.FC<ReadmeProps> = ({ open, onClose }) => {
    const { strings } = useUI();

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{strings.PAGE_PRODUCTLIST_MODALREADME_TITLE}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {
                        [strings.PAGE_PRODUCTLIST_MODALREADME_TEXT_BLOCK_01].map(textBlock => (
                            <p key={textBlock}>{textBlock}</p>
                        ))
                    }
                </DialogDescription>
                <div className="flex justify-end border-t pt-4">
                    <Button variant="outline" onClick={onClose}>
                        {strings.PAGE_PRODUCTLIST_MODALREADME_BTN_OK}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}