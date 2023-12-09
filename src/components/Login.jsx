import { useState } from 'react';
import img1 from '../assets/selling-pictures.avif'

import img2 from '../assets/listado_programas.jpeg'


import app from '../firebase-conf'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // importar funciones de autenticacion de firebase
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@mui/material/Link';

const auth = getAuth(app) // inicializamos la autencion.


function Login() {

    const [registro, setRegistro] = useState(false) // estado para cambiar el texto del boton 



    const handlerSumit = async (e) => { // funcion para crear un usuario o Iniciar Sesion
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value



        if (registro) {
            //await createUserWithEmailAndPassword(auth,email,password) // crear un usuario

            try {
                const user = await createUserWithEmailAndPassword(auth, email, password) // crear un usuario
                console.log(user)
            } catch (error) {
                console.log(error)
            }
        } else {

            try {

                const user = await signInWithEmailAndPassword(auth, email, password) // Iniciar sesion
                console.log(user)
            } catch (error) {
                alert('Usuario o Contraseña incorrecto')

            }
        }
    }
    return (
        <div>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} className='logo'>
                        <img src={img1} className="size-imagen" alt="..." />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <Card sx={{ minWidth: 275 }} variant="outlined" className='card'>
                            <CardContent>

                                <Typography component="h1" variant="h4" color={'black'}>
                                    Bienvenido de vuelta
                                </Typography>

                                <Typography component="h3" variant="h6" color={'grey'}>
                                <h4 className='text-center' >{registro ? 'Registrate' : 'Iniciar Sesion'}</h4>
                                        
                                </Typography>
                                <Box>
                                    <Grid container spacing={2} maxWidth={'sm'}>
                                        <Grid item xs={6} sm={6}>
                                            <Avatar sx={{ m: 1, }}>
                                                <FacebookIcon className='iconFacebook' />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <Avatar sx={{ m: 1, }}>
                                                <GoogleIcon className='iconGoogle' />

                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Box>



                                <Box component="form" noValidate onSubmit={handlerSumit} sx={{ mt: 3 }} color={'white'}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <TextField

                                                required
                                                fullWidth
                                                id="email"
                                                label="Correo electronico"
                                                name="email"
                                                autoComplete="email"
                                            // helperText="Por favor, ingrese el correo"

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField

                                                required
                                                fullWidth
                                                name="password"
                                                label="Clave"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                            // helperText="Por favor, ingrese la clave"
                                            />
                                            <Link href="#" variant="body2">
                                                Olvidaste tu clave?
                                            </Link>
                                        </Grid>
                             
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {registro ? 'Registrarse..' : 'Iniciar Sesión'}
                                    </Button>

                                    <Grid container justifyContent="flex-end">
                                        <Grid container>
                                            <Grid item xs={9} sm={9} >

                                                <Typography component="p" variant="p" color={'white'}>
                                                   *
                                                </Typography>

                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>

                                    <hr />
                                    <Button

                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2, color: 'sky' }}
                                        onClick={() => setRegistro(!registro)}
                                    >
                                        {registro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?, Registrate...!'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>



            </Box>
        </div>
    )
}
export default Login;