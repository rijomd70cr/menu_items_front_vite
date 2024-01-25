import { Grid } from '@mui/material';

import { gridSpacing } from "../../../Services/Store/GridConstant";

const DashBoard = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                Dashboard
            </Grid>
        </Grid>
    )
}
export default DashBoard