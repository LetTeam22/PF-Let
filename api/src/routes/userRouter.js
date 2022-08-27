const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Nota mental: hay que importar las funciones del controller!!!!!!!!!
const {isInDB, getAllUsers, createUser, getDetails} = require ('../controllers/userControllers.js')

const router = Router();

// obtener true o false si usuario esta o no en la base de datos
// El path seria /user/isRegister?email=maxi@gmail.com
router.get('/isRegister', isInDB)

// obtener el arreglo de objetos de todos los usuarios: /user/getAll
router.get('/getAll',getAllUsers)

// obtener los datos de un usuario ejemplo: /user/detail?email=maxi@gmail.com
router.get('/detail',getDetails)

// crear un nuevo usuario, se pasan los datos por body
router.post('/create',createUser)




module.exports = router;
