import { useFormik } from "formik";
import * as Yup from "yup";

const useCustomToolbarHelper = (
    getValueSearch: any,
    setValueSearch: (e: any) => void,
    handleOnClickSearchColumns: (e: any) => void) => {

    const formik = useFormik({
        initialValues: {
            searchText: getValueSearch?.searchText || "",
            submit: null,
        },
        validationSchema: Yup.object({
            searchText: Yup.string()
                .max(255)
                .required("É necessário preencher o campo de interação"),
        }),
        onSubmit: async (values: any, helpers: any) => {
            try {
                setValueSearch(values)
                handleOnClickSearchColumns(values)

            } catch (err: any) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });


    return {
        formik
    };
};

export default useCustomToolbarHelper;
