import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Footer from 'components/Footer';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
}));

export default function SignUp() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateInputs = () => {
    const requiredFields = [
      'nome',
      'sobrenome',
      'email',
      'password',
      'cidade',
      'estado',
      'endereco',
      'numero_endereco',
      'numero_telefone',
    ];

    const newErrors: Record<string, string> = {};
    requiredFields.forEach((id) => {
      const el = document.getElementById(id) as HTMLInputElement;
      if (!el || el.value.trim().length === 0) {
        newErrors[id] = 'Este campo é obrigatório.';
      } else {
        if (id === 'email' && !/\S+@\S+\.\S+/.test(el.value)) {
          newErrors[id] = 'Email inválido.';
        }
        if (id === 'password' && el.value.length < 6) {
          newErrors[id] = 'A senha deve ter pelo menos 6 caracteres.';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (formData: Record<string, string>) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios/registrar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.detail || 'Erro ao registrar usuário.';
        alert(`Erro: ${errorMsg}`);
        return;
      }

      alert('Usuário registrado com sucesso!');
      window.location.href = '/home'
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de rede ou servidor ao registrar usuário.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const userPayload = {
      nome: data.get('nome') as string,
      sobrenome: data.get('sobrenome') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      cidade: data.get('cidade') as string,
      estado: data.get('estado') as string,
      endereco: data.get('endereco') as string,
      numero_endereco: data.get('numero_endereco') as string,
      numero_telefone: data.get('numero_telefone') as string,
    };

    await registerUser(userPayload);
  };

  return (
    <>
      <CssBaseline />
      <SignUpContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Criar conta
          </Typography>


          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { id: 'nome', label: 'Nome' },
              { id: 'sobrenome', label: 'Sobrenome' },
              { id: 'email', label: 'Email' },
              { id: 'password', label: 'Password', type: 'password' },
              { id: 'numero_telefone', label: 'Telefone' },
              { id: 'cidade', label: 'Cidade' },
              { id: 'estado', label: 'Estado' },
              { id: 'endereco', label: 'Endereço' },
              { id: 'numero_endereco', label: 'Número' },
            ].map(({ id, label, type = 'text' }) => (
              <FormControl key={id}>
                <FormLabel htmlFor={id}>{label}</FormLabel>
                <TextField
                  id={id}
                  name={id}
                  type={type}
                  fullWidth
                  error={!!errors[id]}
                  helperText={errors[id]}
                />
              </FormControl>
            ))}

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Quero receber novidades por e-mail."
            />

            <Button type="submit" fullWidth variant="contained">
              Criar conta
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={() => alert('Google')}>
              Criar conta com Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} onClick={() => alert('Facebook')}>
              Criar conta com Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Já tem uma conta?{' '}
              <Link href="/" variant="body2">
                Entrar
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
      <Footer/>
    </>
  );
}
