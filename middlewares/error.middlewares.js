const errorHandler = (err, req, res, next) => res.status(500).send({ status: false, message: `${err.message }` });

export default errorHandler;
