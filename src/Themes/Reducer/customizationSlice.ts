
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { config } from "Services/Config/Config";

export interface TypesCustomization {
    isOpen: any[],
    defaultId: string,
    fontFamily: string,
    borderRadius: number
    opened: boolean
}

const initialState: TypesCustomization = {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

export const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        openMenu: (state, action: PayloadAction<number | string>) => {
            state.isOpen = [action.payload];
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            state.fontFamily = action.payload;
        },
        openDrawer: (state, action: PayloadAction<boolean>) => {
            state.opened = action.payload;
        },
        
    },
});

export const { openDrawer, setFontFamily, openMenu } = customizationSlice.actions;
export default customizationSlice.reducer; 
