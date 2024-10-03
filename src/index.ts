import express from 'express';
import { config } from 'dotenv';
import { mainRouter } from '@routes'; 
import { sequelizeConfig } from '@config';
import "./models/connections.model";
import { errorHandler } from '@errors';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/my/first/portfolio", mainRouter);

app.use(errorHandler);

(async () => {
  try {
  
    await sequelizeConfig.authenticate();
    console.log('Database connected...');


    await sequelizeConfig.sync({ alter: false });
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
