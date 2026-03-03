import React from 'react';
import { Box, CircularProgress } from '@mui/material';

type FullPageLoaderProps = {
    minHeight?: string | number;
};

export default function FullPageLoader({ minHeight = '100vh' }: FullPageLoaderProps) {
    return (
        <Box
            sx={{
                minHeight,
                display: 'grid',
                placeItems: 'center',
                width: '100%',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
