import { Controller } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useDialogChangePassword } from './useDialogChangePassword';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { Input } from '../Input/Input';
import { FaLock } from 'react-icons/fa6';

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
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    required
                                    type="password"
                                    icon={<FaLock />}
                                    label={strings.PAGE_SIGNUP_CONTRASENA}
                                    placeholder="Ej: *****************"
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    required
                                    type="password"
                                    icon={<FaLock />}
                                    label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA}
                                    placeholder="Ej: *****************"
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <ButtonForm type="submit" bgColor="terciary" disabled={isLoading}>
                            {isLoading ? strings.LOADING : strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}
                        </ButtonForm>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};