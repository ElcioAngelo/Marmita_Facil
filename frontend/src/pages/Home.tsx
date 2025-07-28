import React, { useState, useEffect } from "react";
import MenuAppBar from "components/MenuAppBar";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'

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
    


   useEffect(() => {
        const getRestaurantes = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`http://127.0.0.1:8000/api/restaurantes/${codigo}/`, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.detail || "Erro ao buscar restaurante");
            return;
        }

        const data = await response.json();
        setRestaurante(data);    
        }catch(exception){
            console.error("Erro ao buscar restaurante: ", exception);
            setError(true);
            setErrorMessage('Erro de rede ou servidor');
        }
        }
   }, []);

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
                />
                <IconButton
                    sx={{
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
                    >
                    <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
            </Box>
        </Box>
    )
}
export default Home;