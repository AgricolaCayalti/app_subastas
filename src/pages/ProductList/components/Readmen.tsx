import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"  // <-- Importa el botón
import { useUI } from "@/hooks";

interface ReadmeProps {
    open: boolean;
    onClose: () => void;
}

export const Readme = ({ open, onClose }: ReadmeProps) => {
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
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    {
                        [strings.PAGE_PRODUCTLIST_MODALREADME_TEXT_BLOCK_01].map(textBlock => (
                            <p key={textBlock}>{textBlock}</p>
                        ))
                    }
                </div>
                {/* Nuevo footer con el botón de cierre */}
                <div className="mt-6 flex justify-end border-t pt-4">
                    <Button variant="outline" onClick={onClose}>
                        {strings.PAGE_PRODUCTLIST_MODALREADME_BTN_OK}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}