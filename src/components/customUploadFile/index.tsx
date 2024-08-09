import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IProps } from './IProps';

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

export default function CustomUploadFile({ title, extensionTypes, setValueUpload }: IProps) {

    const [file, setFile] = React.useState<any>({});

    React.useEffect(() => {
        const uploadFile = file?.file;
        if (uploadFile) {
            const formData = new FormData();

            formData.append('fileName', uploadFile.name);
            formData.append('formFile', uploadFile);
            setValueUpload(formData)
        }
    }, [file])

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            {title}
            <VisuallyHiddenInput accept={extensionTypes} type="file" onChange={(e: any) => setFile({ file: e.target.files[0], path: e.target.value })} />
        </Button>
    );
}