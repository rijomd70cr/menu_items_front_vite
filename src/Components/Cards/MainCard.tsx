import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

const headerSX = { '& .MuiCardHeader-action': { mr: 0 } };

type TypeMainCard = {
  border?: boolean;
  boxShadow?: boolean;
  content?: boolean;
  children?: React.ReactElement;
  contentClass?: string;
  darkTitle?: boolean;
  title: string;
  contentSX?: { [others: string]: any; };
  sx?: { [others: string]: any; };
  [others: string]: any;
}

export const MainCard = ({ border = true, boxShadow, children, content = true, contentClass = '',
  contentSX = {}, darkTitle = false, secondary, shadow, sx = {}, title, ...others }: TypeMainCard) => {
  const theme = useTheme();

  return (
    <Card
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.primary.main[200] + 25,
        ':hover': { boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit' },
        ...sx
      }}
    >
      {title && <CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />}

      {title && <Divider />}

      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}

      {!content && children}

    </Card>
  );
}

