const isKeyMiddleware = (req, res, next) => {
  const headerskey = req.headers.key;
  if (!headerskey) {
    return res
      .status(400)
      .json({ message: 'Invalid order please write the key' });
  }

  next();
};

const areAllRequiredFieldsfilled = (req, res, next) => {
  const { title, amount, category } = req.body;

  if (!title || !amount || !category)
    return res
      .status(400)
      .json({ message: 'please fill all fields:  title, amount and category' });

  next();
};
export { isKeyMiddleware, areAllRequiredFieldsfilled };
