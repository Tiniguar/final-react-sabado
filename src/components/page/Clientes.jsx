import { useState, useEffect } from 'react'

import app from '../../firebase-conf'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'


import NavBar from '../../components/nav/NavBar';
import SideNav from '../../components/nav/SideNav'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//getFirestores, getFirestore,collection, addDoc,getDocs,doc,deleteDoc .. gestion de la base de datos NoSql
const auth = getAuth(app)

const db = getFirestore(app) // inicializa la base datos

export default function Clientes({ correoUsuario }) {

    const persona = { // objeto persona para guardar los datos
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',


    }

    const [user, setUser] = useState(persona) //Guardar los datos del objeto persona
    const [lista, setLista] = useState([]) // guarda los datos del objeto persona en una lista
    const [title, setTitle] = useState();

    const [open, setOpen] = useState(false);

    // --------------------------- Capturar los datos del formulario y los gurada en el objeto perona -----------

    const capturarDatos = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    // ------------------------- Persistencia en la base de datos  ------------------------

    const guardarDatos = async (e) => {
        e.preventDefault();
        try {
            if (!user.id) {
                handleClose();
                Swal.fire({
                    title: '¿Está seguro de agregar el cliente?',
                    text: user.nombre,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await addDoc(collection(db, "clientes"), user);
                            //document.getElementById('nombre').focus();
                            setUser(persona);
                            await obtenerDatos();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            } else {
                handleClose();
                Swal.fire({
                    title: '¿Está seguro de actualizar el cliente?',
                    text: user.nombre,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await setDoc(doc(db, "clientes", user.id), { ...user });
                            //document.getElementById('nombre').focus();
                            setTitle(false);
                            setUser(persona);
                            await obtenerDatos();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            }
        } catch (e) {
            console.log("Error adding/updating document: ", e);
        }
    };


    const obtenerDatos = async () => {
        try {
            const datos = await getDocs(collection(db, "clientes")) //conexion a bd
            const arrayDatos = datos.docs.map(doc => ({ id: doc.id, ...doc.data() })) // guardar los datos en un array
            setLista(arrayDatos) // seteo los datos de lista
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async (id) => {

        try {
            const docRef = doc(db, "clientes", id)    // obtengo el id del documento
            const docSnap = await getDoc(docRef) // obtine los datos del docum

            if (docSnap.exists()) { // si existe el documento
                setUser({ ...docSnap.data(), id: docSnap.id }) //enviamos los datos del documento al formulario
                setTitle(true)
            } else {
                console.log('El documento no existe')
            }

            handleClickOpen();

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id, user) => {

        Swal.fire({
            title: `¿Está seguro de eliminar el cliente? ${user.nombre}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
        }).then(async (result) => { // async: es para que espere a que se ejecute await y luego continue el codigo
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "clientes", id)) // elimnina el docuemnto de la base datos 
                    await obtenerDatos()

                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    useEffect(() => {
        //fucus en el campo name con el id
        //document.getElementById('nombre').focus()
        obtenerDatos()
    }, [user]);

    //comportamiento del modal
    
    const agregarRegistro= () =>{
        setUser(persona);
        setOpen(true);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='bg'>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{!title ? 'Crear Registro' : 'Actualizar Cliente'}</DialogTitle>
                <form onSubmit={guardarDatos}>
                <DialogContent>
                    <DialogContentText>
                        {!title ? 'Por favor, agregue los datos' : 'Realiace los cambios necesario'}
                    </DialogContentText>
                    
                        <div className="card card-body">
                            
                                
                                <TextField
                                    autoFocus
                                    type="text"
                                    margin="dense"
                                    //placeholder="Ingrese su nombre"
                                    //className="form-control"
                                    label="Ingrese su nombre"
                                    name='nombre'
                                    id='nombre'
                                    required
                                    value={user.nombre}
                                    onChange={capturarDatos}
                                    fullWidth
                                    variant="standard"
                                />
                            
                                <TextField
                                    type="text"
                                    //placeholder="Ingrese su direccion"
                                    label="Ingrese su direccion"
                                    className="form-control mb-2"
                                    name='direccion'
                                    required
                                    value={user.direccion}
                                    onChange={capturarDatos}
                                    fullWidth
                                    variant="standard"

                                />
                            
                            
                                <TextField
                                    type="phone"
                                    //placeholder="Ingrese su Teléfono"
                                    label="Ingrese su teléfono"
                                    className="form-control mb-2"
                                    name='telefono'
                                    required
                                    value={user.telefono}
                                    onChange={capturarDatos}
                                    fullWidth
                                    variant="standard"
                                />

                                <TextField
                                    type="email"
                                    //placeholder="Ingrese su correo"
                                    label="Ingrese su correo"
                                    className="form-control mb-2"
                                    name='email'
                                    required
                                    value={user.email}
                                    onChange={capturarDatos}
                                    fullWidth
                                    variant="standard"
                                />
                            
                            {/* <Button
                                                className={!title ? 'btn btn-primary mt-4 form-control' : 'btn btn-success mt-4 form-control'}
                                                type='submit'>{!title ? 'Guardar Registro' : 'Guardar Cambios'}</Button> */}
                        </div>
                    

                    <hr />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button  type='submit'
                        className={!title ? 'btn btn-primary mt-4 form-control' : 'btn btn-success mt-4 form-control'}
                    >{!title ? 'Guardar Registro' : 'Guardar Cambios'} </Button>
                </DialogActions>
                </form>
            </Dialog>



            <NavBar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                <Grid container spacing={1}>
                    <Grid item xs={12}>

                        <Stack spacing={2} direction="row">
                            <Card className='gradient'>
                                <CardContent>


                                    <h3 className=''>¡Hola <strong style={{ color: 'Blue' }}>{correoUsuario}!</strong></h3>
                                    <hr />
                                    <Button variant="outlined" onClick={agregarRegistro}>Agregar un Cliente</Button>

                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nombre </TableCell>
                                                    <TableCell align="right">Direccion</TableCell>
                                                    <TableCell align="right">Telefono</TableCell>
                                                    <TableCell align="right">Email</TableCell>
                                                    <TableCell align="right">Acciones</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {lista.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.nombre}
                                                        </TableCell>
                                                        <TableCell align="right">{row.direccion}</TableCell>
                                                        <TableCell align="right">{row.telefono}</TableCell>
                                                        <TableCell align="right">{row.email}</TableCell>
                                                        <TableCell align="right">
                                                            <Button className="btn btn-danger btn-sm mx-2" onClick={() => deleteUser(row.id, row)} >Eliminar</Button>
                                                            <Button className="btn btn-warning btn-sm mx-2" onClick={() => updateUser(row.id)}>Editar</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        </div >
    )
}
