
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const NAVIGATION = [
  {
    segment: 'inbox',
    title: 'Orders',
    pattern: 'inbox/:id',
  },
];


interface CustomPageContainerProps {
  children: React.ReactNode;
}

function CustomPageContainer({ children }: CustomPageContainerProps) {

  const theme = useTheme();

  return (
    <AppProvider navigation={NAVIGATION} theme={theme}>
        <Paper sx={{ width: '80%', height: '80%', margin: '10px', padding: '10px', marginLeft: '65px', backgroundColor: '#FFFFE0'}}>{children}</Paper>
    </AppProvider>
  );
}

export default CustomPageContainer