exports.getHome = async (req, res) => {
  const usuario = req.usuario; // Os dados do usuário vem do middleware autorizar
  return res.render("home/mainPage", { usuario });
};
