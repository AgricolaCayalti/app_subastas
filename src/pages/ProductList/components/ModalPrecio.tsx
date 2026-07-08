import { useEffect, useMemo, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { ButtonForm, Input } from '@/components';
import { useModalPrecio } from '../useModalPrecio';
import { useUI } from '@/hooks';
import { useProductList } from '../useProductList';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProductDetails } from '@/components/ProductOffers/types';


const generarEsquemaPrecios = (productos: ProductDetails[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};
    productos.forEach((p) => {
        shape[`precio_ofertado_${p.id}`] = z
            .coerce.number('Ingresa un número válido')
            .min(0, 'Mínimo 0')
            .max(999.99, 'Máximo 999.99') // Ajusta este tope a tu necesidad
            .refine(
                (val) => Number.isInteger(val * 100),
                { message: 'Solo se permiten 2 decimales' }
            );
    });
    return z.object(shape);
};

type FormPrecios = z.infer<ReturnType<typeof generarEsquemaPrecios>>;

export const ModalPrecio = () => {
    const { selected: seleccionado, onClosed, onListar } = useProductList();
    const formRef = useRef<HTMLFormElement>(null);
    const { loading: isRegistrando, onRegistrar } = useModalPrecio();
    const { strings } = useUI();


    const schema = generarEsquemaPrecios(seleccionado?.productosDetalle ?? []);
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<FormPrecios>({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    // Resetear al abrir
    useEffect(() => {
        if (!seleccionado) return;
        const defaultVals: Record<string, number> = {};
        seleccionado.productosDetalle.forEach((p) => {
            const ofertaAnterior = seleccionado.miUltimaOferta?.detalles?.find(
                (d) => d.idProducto === p.idProducto
            );
            defaultVals[`precio_ofertado_${p.id}`] = Number(ofertaAnterior?.precioOfertado) || 0;
        });
        reset(defaultVals);
    }, [seleccionado, reset]);

    // Cálculo ponderado
    const formValues = watch();
    const precioPonderado = useMemo(() => {
        if (!seleccionado?.productosDetalle) return '0.00';
        let totalCantidad = 0;
        let totalIngresos = 0;
        for (const p of seleccionado.productosDetalle) {
            const precio = Number(formValues[`precio_ofertado_${p.id}`] ?? 0);
            const cantidad = parseFloat(p.cantidadKg.replace(/,/g, ''));
            totalCantidad += cantidad;
            totalIngresos += cantidad * precio;
        }
        if (totalCantidad === 0) return '0.00';
        return (totalIngresos / totalCantidad).toFixed(2);
    }, [formValues, seleccionado]);

    // Cerrar y resetear
    const handleClose = () => {
        onClosed();
        reset();
    };

    // Submit
    const onSubmit = (data: FormPrecios) => {

        const preciosOfertados = seleccionado?.productosDetalle.map((p) => ({
            idProducto: p.idProducto,
            precioOfertadoKg: data[fieldId(p.id)] ?? 0,
        }));

        onRegistrar({
            idProductoOfertado: seleccionado?.id ?? 0,
            preciosOfertados: preciosOfertados ?? [],
        });
        onListar();
        handleClose();
    };

    const fieldId = (id: number) => `precio_ofertado_${id}`;
    // Control de apertura
    const open = !!seleccionado;

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => !open && handleClose()}
        >
            <DialogContent
                className="bg-white text-primary rounded-lg shadow-xl w-11/12 max-w-4xl mx-auto p-4 md:p-6 overflow-y-auto max-h-[90vh] bg-no-repeat bg-contain bg-top [&>button]:hidden background-modal"
            >
                {/* El formulario ahora solo tiene la estructura, sin estilos repetidos */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative"
                >
                    {/* Header */}
                    <div className="relative bg-transparent">
                        <h3 className="text-2xl md:text-3xl font-semibold text-terciary my-3">
                            {strings.PAGE_PRODUCTLIST_MODALPRECIO_OFERTANDO_PRECIO}
                        </h3>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-0 top-0 text-3xl font-bold text-gray-400 hover:text-black transition-colors"
                        >
                            &times;
                        </button>
                        <div className="text-xl md:text-2xl text-secondary font-medium">
                            <b>{strings.COMMON_SUBASTA_TITULO.replace(':0', seleccionado?.descripcion?.toString() || '')}</b>
                        </div>
                        <div className="text-base mt-1">
                            <b>{strings.PAGE_PRODUCTLIST_FECHA_ENTREGA}:</b> {seleccionado?.fechaEntrega}
                        </div>
                        <hr className="my-3 border-gray-300" />
                    </div>

                    <p className="font-semibold text-primary text-lg">NUEVO REQUERIMIENTO</p>
                    {/* <pre>{JSON.stringify(seleccionado?.productosDetalle, null, 3)}</pre> */}
                    {/* Lista de productos */}
                    <div className="text-sm md:text-base overflow-y-auto max-h-[50vh] mt-2">
                        {seleccionado?.productosDetalle?.map((productoDetalle, index) => {
                            const ofertaProductoOfertador = seleccionado?.miUltimaOferta?.detalles?.find(
                                (item: any) => item.idProducto == productoDetalle.idProducto
                            );
                            const fieldName = `precio_ofertado_${productoDetalle.id}`;

                            return (
                                <div key={index} className="mb-4">
                                    <pre>{JSON.stringify(ofertaProductoOfertador, null, 2)}</pre>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-lg font-medium">{productoDetalle?.descripcion}</div>
                                        <div>
                                            <b>{strings.PAGE_PRODUCTLIST_CANTIDAD}:</b> {productoDetalle?.cantidadKg} Kg
                                        </div>
                                        <div className="text-secondary font-semibold">
                                            {strings.PAGE_PRODUCTLIST_PRECIO_BASE}: {productoDetalle.precioBaseKg}
                                            {Boolean(ofertaProductoOfertador) && (
                                                <span className="text-terciary ml-1">
                                                    (Yo {ofertaProductoOfertador?.precioOfertado})
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Input
                                                {...field}
                                                value={field.value?.toString() ?? ''}
                                                onChange={(value) => field.onChange(value)} // Extrae el valor del evento
                                                icon={<FaRegMoneyBillAlt />}
                                                labelView={false}
                                                label="0.00"
                                                placeholder="0.00"
                                                errorMessage={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                    <hr className="border-gray-200" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="mt-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-base">
                            <div className="flex-1 flex justify-between items-center w-full sm:w-auto">
                                <span className="font-bold">{strings.PAGE_PRODUCTLIST_PRECIO_BASE}</span>
                                <span className="text-2xl font-semibold">
                                    {seleccionado?.precioBaseKg}
                                </span>
                            </div>
                            <div className="flex-1 flex justify-between items-center w-full sm:w-auto">
                                <span className="font-bold">{strings.PAGE_PRODUCTLIST_PRECIO_OFERTADO}</span>
                                <span className="text-2xl font-semibold text-secondary">
                                    PEN {precioPonderado}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <ButtonForm type="submit" bgColor="terciary" disabled={isRegistrando || isSubmitting}>
                                {strings.PAGE_PRODUCTLIST_MODALPRECIO_INGRESE_BTN_GUARDAR}
                            </ButtonForm>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

