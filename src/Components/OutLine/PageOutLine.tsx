import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Link, Box } from '@mui/material';

import { PageActions, TypeActions } from "./PageActions";

// import { getCustomizationState } from "Themes/Reducer/customizationActions";
// import { useAppSelector } from "Services/Hook/Hook";

const Copyright = () => {
    return (
        <Typography variant="body2" color="grey.500" align="center" component={Link}>
            {`Copyright © www.starter.com © ${new Date().getFullYear()}`}
        </Typography>
    );
}

export type pageActions = TypeActions;

export type TypePageOutLine = {
    children?: React.ReactElement;
    actions?: TypeActions[];
}

export const PageOutLine = ({ children, actions = [] }: TypePageOutLine) => {

    // const customization = useAppSelector(getCustomizationState);

    const PageWrapper = styled('div')(({ theme }) => ({
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px',
        background: theme.palette.primary.light
        // ...customization.pageStyle,
    }));

    return (
        <PageWrapper>
            <PageActions actions={actions} />
            {children}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: 1.5 }}>
                <Copyright />
            </Box>
        </PageWrapper>
    )
}