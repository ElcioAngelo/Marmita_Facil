import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import EditProfileDialog from 'components/EditProfileDialog';

const Profile = () => {
    const [open,setOpen] = useState<boolean>(false);
    const [user, setUser] = useState({
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@example.com',
    cidade: 'São Paulo',
    estado: 'SP',
    endereco: 'Rua das Flores',
    numero_endereco: '123',
    numero_telefone: '(11) 91234-5678',
    role: 'cozinheiro',
  });

  const mockUser = {
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@example.com',
    cidade: 'São Paulo',
    estado: 'SP',
    endereco: 'Rua das Flores',
    numero_endereco: '123',
    numero_telefone: '(11) 91234-5678',
    role: 'cozinheiro',
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Perfil
      </Typography>
      <Typography><strong>Nome:</strong> {mockUser.nome} {mockUser.sobrenome}</Typography>
      <Typography><strong>Email:</strong> {mockUser.email}</Typography>
      <Typography><strong>Telefone:</strong> {mockUser.numero_telefone}</Typography>
      <Typography>
        <strong>Endereço:</strong> {mockUser.endereco}, {mockUser.numero_endereco} - {mockUser.cidade}, {mockUser.estado}
      </Typography>
      <Typography><strong>Cargo:</strong> {mockUser.role}</Typography>
        <Button sx={{bgcolor: 'lightgreen', color: '#000', marginTop: 3}}
        onClick={() => setOpen((prev) => !prev)}
        >
            Editar Informações
        </Button>
        <Button sx={{bgcolor: 'coral', color: '#000', marginTop: 3, marginLeft: 2}}
        onClick={() => window.location.href = '/home'}
        >
            Retornar
        </Button>
        <EditProfileDialog
            user={user}
            open={open}
            onClose={() => setOpen(false)}
        />
    </Paper>
  );
};

export default Profile;
