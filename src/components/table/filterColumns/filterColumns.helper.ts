import { useFormik } from "formik";
import * as Yup from "yup";

const useFilterColumnsHelper = (valueSearchColumns: any, setValueSearch: (e: any) => void) => {

    const formik = useFormik({
        initialValues: {
            searchText: valueSearchColumns,
            submit: null,
        },
        validationSchema: Yup.object({
            searchText: Yup.string()
                .max(255)
                .required("É necessário preencher o campo de interação"),
        }),
        onSubmit: async (values: any, helpers: any) => {
            try {
                const params = {
                    searchText: values.searchText
                }
                setValueSearch(params)

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

export default useFilterColumnsHelper;
