const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_SECRET) {
    return res.status(401).json({ error: "API key inválida ou não fornecida" });
  }

  next();
};

module.exports = verifyApiKey;
