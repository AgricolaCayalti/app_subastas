import { Layout } from '@/components/Layout/Layout';
import { Controller } from 'react-hook-form';
import { ButtonForm, Input } from '@/components';
import { FaAddressCard, FaEnvelope, FaUser, FaLock, FaPhone, FaSpinner } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { Loading } from '@/components/Loading/Loading';
import { useForm } from './useForm';
import clsx from 'clsx';

export const SignUp = () => {
    const {
        handleSubmit,
        handleRegister,
        strings,
        control,
        isLoading,
        isSearching,
        handleSearching,
        error,
        razonSocial,
        handlerClearDocument
    } = useForm();

    return <Layout>
        <form className="space-y-4 m-7" onSubmit={handleSubmit(handleRegister)}>
            <h3>{strings.PAGE_SIGNUP_REGISTRATE}</h3>
            <div className="relative">
                <Controller
                    name="numero_documento"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <Input
                                        {...field}
                                        required                                        
                                        type="text"
                                        icon={<FaAddressCard />}
                                        label={strings.PAGE_SIGNUP_RUCDNI}
                                        placeholder="Ej: 1234567890"
                                        errorMessage={fieldState.error?.message || error}
                                        disabled={razonSocial || isSearching ? true : false}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => razonSocial ? handlerClearDocument() : handleSearching(field.value)}
                                    className={clsx(
                                        fieldState.error?.message || error ? "mb-12" : "mb-1",
                                        razonSocial ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700",
                                        "p-2 text-white rounded-lg h-12.5 w-12.5 flex items-center justify-center  transition-colors disabled:bg-gray-400")}
                                    disabled={isSearching}
                                >
                                    {razonSocial ? <AiOutlineClear size={20} /> : isSearching ? <FaSpinner className="animate-spin" size={20}  /> : <FaSearch size={20} />}
                                </button>
                            </div>
                        )
                    }}
                />
            </div>

            <Controller
                name="razon_social"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        disabled
                        required
                        type="text"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_RAZON_SOCIAL}
                        placeholder="EMPRESA SAC"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="nombre_contacto"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="text"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_CONTACTO}
                        placeholder="Juan Perez"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="correo"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="email"
                        icon={<FaEnvelope />}
                        label={strings.PAGE_SIGNUP_CORREO}
                        placeholder="empresa@compania.com"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="telefono"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="text"
                        icon={<FaPhone />}
                        label={strings.PAGE_SIGNUP_NUMERO_TELEFONO}
                        placeholder="954927482"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            <h6>{strings.PAGE_SIGNUP_CREDENCIALES_ACCESO}</h6>

            <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="email"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_USUARIO}
                        placeholder="empresa@compania.com"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="password"
                        icon={<FaLock />}
                        label={strings.PAGE_SIGNUP_CONTRASENA}
                        placeholder="*****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="confirm_password"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        disabled={!razonSocial ? true : false}
                        type="password"
                        icon={<FaLock />}
                        label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA}
                        placeholder="*****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            {
                razonSocial && <ButtonForm disabled={isLoading} bgColor='secondary' type="submit">{strings.PAGE_SIGNUP_BTN_REGISTRAR}</ButtonForm>
            }
        </form>
    </Layout>
}