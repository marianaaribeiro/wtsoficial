import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import { IProps } from "./IProps";
import useFileUploadHelper from "./FileUpload.helper";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload(props: IProps) {
    const { extensionTypes, url } = props;
    const { resources } = useFileUploadHelper();

    const [file, setFile] = useState<any>({});

    useEffect(() => {
        const uploadFile = file?.file;
        if (uploadFile) {
            const formData = new FormData();

            formData.append('fileName', uploadFile.name);
            formData.append('formFile', uploadFile);

            axios.post(url, formData)
        }
    }, [file])

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: { lg: '1rem 1rem', md: '1rem 0.5rem', sm: '0.5rem 0.5rem 0 0.5rem', xs: '0.5rem 0.5rem 0 0.5rem' } }}>
            {resources.fileToUpload}:
            <CustomInput placeholder={resources.placeholder} value={file.path} sx={{ marginLeft: '1rem' }} />

            <Button
                sx={{
                    height: '2rem',
                    width: '10rem',
                    margin: '0 1rem'
                }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
            >
                {resources.uploadFileButton}
                <VisuallyHiddenInput accept={extensionTypes} type="file" onChange={(e: any) => setFile({ file: e.target.files[0], path: e.target.value })} />
            </Button>
        </Box>
    );
}