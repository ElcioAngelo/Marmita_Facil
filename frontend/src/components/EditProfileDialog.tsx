import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    nome: string;
    sobrenome: string;
    email: string;
    cidade: string;
    estado: string;
    endereco: string;
    numero_endereco: string;
    numero_telefone: string;
    role: string;
  };
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onClose, user }) => {
  const [form, setForm] = useState(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Visualizar/Editar Perfil</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome"
            name="nome"
            fullWidth
            value={form.nome}
            onChange={handleChange}
          />
          <TextField
            label="Sobrenome"
            name="sobrenome"
            fullWidth
            value={form.sobrenome}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Telefone"
            name="numero_telefone"
            fullWidth
            value={form.numero_telefone}
            onChange={handleChange}
          />
          <TextField
            label="Cidade"
            name="cidade"
            fullWidth
            value={form.cidade}
            onChange={handleChange}
          />
          <TextField
            label="Estado"
            name="estado"
            fullWidth
            value={form.estado}
            onChange={handleChange}
          />
          <TextField
            label="Endereço"
            name="endereco"
            fullWidth
            value={form.endereco}
            onChange={handleChange}
          />
          <TextField
            label="Nº"
            name="numero_endereco"
            fullWidth
            value={form.numero_endereco}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{bgcolor: 'coral', color: "#000"}}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
