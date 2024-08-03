const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }

    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":p",
        img,
        google: true,
        rol: "USER_ROLE",
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      msg: "El Token no se pudo verificar",
    });
  }
};

const validarTokenUsuario = async (req, res = response ) => {
  // Generar el JWT
  const token = await generarJWT( req.usuario._id );

  res.json({
    usuario: req.usuario,
    token: token,
  })
}

module.exports = {
  login,
  googleSignIn,
  validarTokenUsuario
};
