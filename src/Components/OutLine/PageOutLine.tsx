import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Link } from '@mui/material';

import { PageActions, TypeActions } from "./PageActions";

export const PageWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '80vh'
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="grey.500" align="center" component={Link} sx={{ mt: 1.25 }}>
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

    return (
        <PageWrapper>
            {children}

            <PageActions actions={actions} />
            <Copyright />
        </PageWrapper>
    )
}