const errorHandler = (err, req, res, next) => {
return res.status(500).send({ status: false, message: err });


}
export default errorHandler;
