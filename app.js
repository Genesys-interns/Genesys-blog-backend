import express from 'express';
import pino from 'pino';

const logger = pino();
const app = express();


PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
    logger.info(`PORT IS LISTENING ON ${PORT}`)
});

