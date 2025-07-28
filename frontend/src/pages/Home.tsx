import React, { useState } from "react";
import MenuAppBar from "components/MenuAppBar";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'

const Home = () => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

   const useEffect = () => {

   ,[]}

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