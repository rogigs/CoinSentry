import DialogMUI from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

export const BootstrapDialog = styled(DialogMUI)(() => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'var(--gray-color)',
  },
  '& .MuiDialogContent-root': {
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .center': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiDialogTitle-root': {
    gap: '4px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '600',
  },
}));
