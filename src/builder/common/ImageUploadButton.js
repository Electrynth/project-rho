import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Clear as ClearIcon, FileUpload as FileUploadIcon } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

export default function ImageUploadButton({ uploadedImage, handleSetUploadedImage }) {
    return (
        <>
            {uploadedImage ? (
                <Button size="small" variant="contained" startIcon={<ClearIcon />} onClick={() => handleSetUploadedImage(null)}>
                    Clear Image
                </Button>
            ) : (
                <Button size="small" component="label" variant="contained" startIcon={<FileUploadIcon />}>
                    Upload Image
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            if (e.target.files && e.target.files.length > 0) {
                                if (e.target.files[0].size > (1 * 5000000)) {
                                    alert("File too large, keep it under 5MB");
                                } else {
                                    handleSetUploadedImage(e.target.files[0]);
                                }
                            }
                        }}
                    />
                </Button>
            )}
        </>
    );
}