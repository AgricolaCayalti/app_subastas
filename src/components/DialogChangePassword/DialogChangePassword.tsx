import { Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { InputPassword } from '../Input/InputPassword';
import { useDialogChangePassword } from './useDialogChangePassword';

export const DialogChangePassword = () => {
    const {
        isDialogOpen,
        setDialogOpen,
        isLoading,
        strings,
        control,
        handleSubmit,
        errors,
        onFormSubmit
    } = useDialogChangePassword();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {strings.COMMON_CAMBIAR_CLAVE}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {strings.PAGE_FORGOTPASSWORD_CAMBIO_CLAVE}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="space-y-4">
                        <Controller
                            name="newPassword"
                            control={control}
                            disabled={isLoading}
                            render={({ field }) => (
                                <div>
                                    <InputPassword {...field} label="Nueva contraseña" />
                                    {errors.newPassword && (
                                        <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
                                    )}
                                </div>
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            disabled={isLoading}
                            render={({ field }) => (
                                <div>
                                    <InputPassword {...field} label="Confirmar contraseña" />
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={isLoading}>{isLoading ? strings.LOADING : strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};