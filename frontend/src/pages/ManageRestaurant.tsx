import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Snackbar, Alert, Paper } from '@mui/material';
import MarmitaCard from '../components/MarmitaCard';

interface Marmita {
  id: number;
  title: string;
  description: string;
}

const OwnerDashboard: React.FC = () => {
  const [restaurant, setRestaurant] = useState({
    nome: 'Restaurante do Cozinheiro João',
    descricao: 'comidas de otíma qualidade!',
  });

  const [marmitas, setMarmitas] = useState<Marmita[]>([
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
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const handleCreateMarmita = () => {
    if (!newTitle || !newDesc) {
      setSnackbar('Preencha todos os campos para criar uma marmita.');
      return;
    }
    const nextId = marmitas.length + 1;
    setMarmitas([...marmitas, { id: nextId, title: newTitle, description: newDesc }]);
    setNewTitle('');
    setNewDesc('');
    setSnackbar('Marmita criada com sucesso!');
  };

  const handleEditRestaurant = () => {
    setSnackbar('Informações do restaurante salvas!');
  };

  return (
    <Box sx={{ p: 4 }}>
        <Button sx={{bgcolor: 'coral', color: '#000', marginBottom: 2}}
            onClick={() => window.location.href = '/home'}
        >
            Retornar 
        </Button>
      <Typography variant="h4" gutterBottom>Dashboard do Proprietário</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Editar Restaurante</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Nome do Restaurante"
            fullWidth
            value={restaurant.nome}
            onChange={(e) => setRestaurant({ ...restaurant, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            multiline
            rows={3}
            value={restaurant.descricao}
            onChange={(e) => setRestaurant({ ...restaurant, descricao: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleEditRestaurant}>
            Salvar Alterações
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Criar Nova Marmita</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Título da Marmita"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Descrição da Marmita"
            fullWidth
            multiline
            rows={2}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleCreateMarmita}>
            Criar Marmita
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Lista de Marmitas</Typography>
        <Stack spacing={3}>
          {marmitas.map((m) => (
            <Box key={m.id}>
              <MarmitaCard CardTitle={m.title} CardDescription={m.description} />
            </Box>
          ))}
        </Stack>
      </Box>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={2500}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbar(null)}>
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OwnerDashboard;
