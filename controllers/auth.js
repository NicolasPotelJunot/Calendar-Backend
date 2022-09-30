const {response} = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/Usuario")
const { generarJWT } = require("../helpers/jwt")

const crearUsuario = async (req,res=response) =>{
    
    const { email, password }= req.body
        
    try {

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok : false,
                msg: "el usuario existe con ese correo"
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password= bcrypt.hashSync( password,salt );
            
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "error, hable con el admin"
        })
    }
}

const loginUsuario = async (req,res) =>{

    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email })

        if ( !usuario ) {
            return res.status(400).json({
                ok : false,
                msg: "el usuario no existe con ese correo"
            });
        }
        // confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "contraseña incorrecta"
            })
        }

        //generar nuestro json web token JWT

        // Generar token
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error, hable con el admin"
        })
    }

    
}

const revalidarToken = async (req,res) =>{

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid,name)

    res.json({
        ok: true,
        token
    })
    
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}