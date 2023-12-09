import { useState } from 'react'
import app from '../firebase-conf'
import { getAuth, } from 'firebase/auth'
import { getFirestore, } from 'firebase/firestore'
import Swal from 'sweetalert2';

import NavBar from '../components/nav/NavBar';
import SideNav from '../components/nav/SideNav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const auth = getAuth(app)

const db = getFirestore(app) // inicializa la base datos

function Inicio(correoUsuario) {
    console.log(correoUsuario.correoUsuario);

    return (
        <div>

            <div className='container'>

                <NavBar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <SideNav />
                </Box>
                <Typography component="h1" variant="h4" color={'black'}>
                    Bienvenido
                </Typography>
                <Typography component="h2" variant="h5" color={'black'}>
                ¡Hola <strong style={{ color: 'Blue' }}> {correoUsuario ? correoUsuario.correoUsuario : ''}!</strong> Haz Iniciado Sesión
                </Typography>

               
                <Button className='btn btn-danger' variant="contained" onClick={() => auth.signOut(auth)}>Cerrar Sesión</Button>
                <hr />
            </div>
        </div>
    )
}
export default Inicio;