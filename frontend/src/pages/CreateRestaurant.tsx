import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function CreateRestaurant() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!nome || !descricao) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/restaurantes/criar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          descricao,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Erro ao criar restaurante.');
      }

      setSuccessMsg('Restaurante criado com sucesso!');
      setNome('');
      setDescricao('');
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Criar Restaurante
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do Restaurante"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
          required
        />
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMsg}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 , bgcolor: 'lightgreen', color: '#000000'}}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Criar'}
        </Button>
        <Button
         type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: 'coral', color: '#000'}}
          onClick={() => window.location.href = '/home'}
          >
          Cancelar
        </Button>
      </form>
    </Box>
  );
}
