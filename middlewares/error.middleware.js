/* eslint-disable no-unused-vars */

const errorHandler = (err, req, res, next) => res.status(500).send({ status: false, message: `${err}` });

export default errorHandler;
