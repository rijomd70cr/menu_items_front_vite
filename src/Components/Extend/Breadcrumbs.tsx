import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import SpaIcon from '@mui/icons-material/Spa';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import { config } from 'Services/Config/Config';
import { gridSpacing } from 'Services/Store/GridConstant';

import { TypeOfMenuPages } from '../../MenuItems'

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center'
};

export type TypesBreadcrumbs = {
  title: boolean,
  navigation: any,
  card?: boolean,
  divider?: boolean,
  icon?: boolean,
  icons?: boolean,
  maxItems?: number,
  rightAlign?: boolean,
  separator?: any,
  titleBottom?: boolean
}

export const Breadcrumbs = (props: TypesBreadcrumbs) => {
  const { card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom } = props;
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  const [main, setMain] = useState<TypeOfMenuPages>();
  const [item, setItem] = useState<TypeOfMenuPages>();

  // set active item state
  const getCollapse = (menu: TypeOfMenuPages) => {
    if (menu?.children) {
      menu?.children.filter((collapse: TypeOfMenuPages) => {
        if (collapse?.type && collapse?.type === 'collapse') {
          getCollapse(collapse);
        }
        else if (collapse?.type && collapse?.type === 'item') {
          if (document.location.pathname === config.basename + collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    if (navigation?.items) {
      navigation?.items?.map((menu: TypeOfMenuPages) => {
        if (menu?.type && menu?.type === 'group') {
          getCollapse(menu);
        }
        return false;
      });
    }
  }, []);

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon /> : <SpaIcon />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle} />}
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          textDecoration: 'none',
          alignContent: 'center',
          alignItems: 'center',
          color: 'grey.500'
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
            border: card === false ? 'none' : '1px solid',
            borderColor: theme.palette.primary.main[200] + 75,
            background: card === false ? 'transparent' : theme.palette.background.default
          }}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography component={Link} to="/" color="inherit" variant="subtitle1" sx={linkSX}>
                    {icons && <HomeTwoToneIcon sx={iconStyle} />}
                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                    {!icon && 'Dashboard'}
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && <Divider sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }} />}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};


