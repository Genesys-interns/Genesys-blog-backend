/* eslint-disable no-unused-vars */
<<<<<<< HEAD
const errorHandler = (err, req, res, next) => res.status(500).send({ status: false, message: err });
=======

const errorHandler = (err, req, res, next) => res.status(500).send({ status: false, message: `${err}` });
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26

export default errorHandler;
