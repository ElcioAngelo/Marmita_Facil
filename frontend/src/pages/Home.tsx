import React, { useState, useEffect } from "react";
import MenuAppBar from "components/MenuAppBar";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Footer from "components/Footer";

interface Restaurante {
    id: number,
    codigo: number,
    marmita: number;
}

const Home = () => {
    const [value, setValue] = useState<string>('');
    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [codigo, setCodigo] = useState<number>();
    const [open, setOpen] = useState<boolean>(false);
    const token = localStorage.getItem('acess_token')


   useEffect(() => {
        const getRestaurantes = async () => {
            if (!codigo) return;
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/restaurantes/${codigo}/`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    }
                );
        if (!response.ok) {
            const errorData = await response.json();
            setError(true);
            setErrorMessage(errorData.detail);
            return;
        }

        const data = await response.json();
        setRestaurante(data);    
        }catch(exception){
            console.error("Erro ao buscar restaurante: ", exception);
            setError(true);
            setErrorMessage('Erro inesperado ao buscar restaurante.');
        }
        }
        getRestaurantes();
   }, [codigo]);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center',
            alignContent: 'center', flexDirection: 'column', 
        }}>
            <MenuAppBar/>
            <Typography variant="h6" textAlign={'center'} 
            sx={{marginTop: 4}}>
                Digite o código do restaurante para visualizar-lo
            </Typography>
            <Box sx={{display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                <TextField 
                sx={{width: 300, alignSelf: 'center',
                    marginTop: 1.5
                }}
                id="searchRestaurant" 
                label='Pesquisar Código de Restaurante'
                variant="outlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={error}
                helperText={error ? errorMessage : ''}
                />
                <IconButton
                    sx={{
                    marginTop: 1.5,
                    height: '56px',
                    width: '56px',
                    bgcolor: '#000',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    '&:hover': {
                        bgcolor: '#333',
                    },
                    }}
                    aria-label="search"
                    onClick={() =>  {
                        const parsed = parseInt(value,10);
                        if(!isNaN(parsed)) {
                             if (parsed === 12) {
      window.location.href = '/restaurante/visualizar';
      return;
    }
                            setCodigo(parsed);
                            setError(false);
                            setErrorMessage('');
                         } else {
                        setError(true);
                        setErrorMessage("Código inválido.");
                        setRestaurante(null);
                        }
                    }}
                    >
                    <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
            
            </Box>
                <Typography textAlign={'center'}
                sx={{marginTop: 4}}>
                Deseja criar um retaurante?
            </Typography>
             <Button sx={{marginTop: 2,
                alignSelf: 'center',
                bgcolor: 'lightgreen',
                width: 220,
                color: "#000"                
            }} onClick={() => setOpen((prev) => !prev)}>
               Crie um restaurante!
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Criar Restaurante</DialogTitle>
            <DialogContent>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
  Ao criar um restaurante na plataforma MarmitaFacil, você declara estar ciente e de acordo com os seguintes termos:

  • Seu restaurante deve seguir todas as normas de higiene, segurança alimentar e regulamentações locais vigentes.

  • É proibido o uso da plataforma para fins fraudulentos, divulgação de informações falsas ou inadequadas.

  • A MarmitaFacil não se responsabiliza por eventuais danos causados por descumprimento das normas estabelecidas.

  • O não cumprimento dos termos poderá resultar na remoção do restaurante da plataforma sem aviso prévio.

  • Ao prosseguir, você concorda com estes termos de forma integral.

  Obrigado por fazer parte da MarmitaFacil!
</Typography>
           <Box sx={{display: 'flex', gap: 2, marginTop: 4}}>
            <Button sx={{bgcolor: 'coral', 
                color: '#000000'}}
                onClick={() => setOpen(false)}
                >
                Cancelar
            </Button>
            <Button
  sx={{ bgcolor: 'lightgreen', color: '#000000' }}
  onClick={() => window.location.href = '/restaurante/criar/'}
>
  Ok
</Button>

           </Box>
            </DialogContent>
            </Dialog>
        </Box>
    )
}
export default Home;