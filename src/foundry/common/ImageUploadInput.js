import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUpload from '@mui/icons-material/FileUpload';

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

export default function ImageUploadInput({ uploadedFile, handleSetUploadedFile }) {
    return (
        <div>
            <Button component="label" variant="contained" startIcon={<FileUpload />}>
                Upload Image
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        if (e.target.files && e.target.files.length > 0) {
                            if (e.target.files[0].size > (1 * 5000000)) {
                                alert("File too large, keep it under 5MB");
                            } else {
                                handleSetUploadedFile(e.target.files[0]);
                            }
                        }
                    }}
                />
            </Button>
            {uploadedFile ? (
                <Button onClick={() => handleSetUploadedFile(null)}>
                    Clear
                </Button>
            ) : undefined}
        </div>
    );
}