const errorHandler = (err, req, res) => res.status(500).send({ status: false, message: err });

export default errorHandler;
