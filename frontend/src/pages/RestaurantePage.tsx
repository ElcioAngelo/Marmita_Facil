import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import MarmitaCard from '../components/MarmitaCard'
import Footer from 'components/Footer';

const mockMarmitas = [
  {
    id: 1,
    title: 'Marmita de Frango',
    description: 'Arroz, feijão, frango grelhado e salada.',
  },
  {
    id: 2,
    title: 'Marmita Vegetariana',
    description: 'Arroz integral, tofu grelhado.',
  },
  {
    id: 3,
    title: 'Marmita Fit',
    description: 'Quinoa, peito de frango e brócolis.',
  },
];

const RestauranteMockView: React.FC = () => {
  const handleOrder = (marmitaId: number) => {
    alert(`Pedido realizado para a marmita com ID: ${marmitaId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, display: 'flex', alignContent: 'center', flexDirection: 'column'}}>
      <Button onClick={() => window.location.href = '/home'} 
      sx={{alignSelf: 'center', marginBottom: 2, bgcolor: 'coral', color: '#000'}}>
        Retornar 
      </Button>
      <Typography variant="h4" gutterBottom>
        Restaurante do Cozinheiro João
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 0.5 }}>
        comidas de otíma qualidade!
      </Typography>
      <Typography>
        <strong>Email:</strong> joao.silva@example.com <br></br>
        <strong>Número:</strong> (11) 91234-5678
      </Typography>
      <Grid container spacing={3}>
        {mockMarmitas.map((marmita) => (
          <Grid key={marmita.id}>
            <MarmitaCard CardTitle={marmita.title} CardDescription={marmita.description} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 , bgcolor: 'lightgreen',color: '#000'}}
              onClick={() => handleOrder(marmita.id)}
            >
              Pedir Marmita
            </Button>
          </Grid>
        ))}
      </Grid>
      <Footer/>
    </Container>
  );
};

export default RestauranteMockView;
