import { Box, Typography } from '@mui/material';
import imagem from '../assets/imagem.png'
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 2,
        backgroundColor: 'background.paper',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={imagem} alt="Logo MarmitaFacil" width={50} height={50} />
        <Typography variant="subtitle1" fontWeight="bold">
          MarmitaFacil
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} MarmitaFacil. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
