import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVars {
  PORT: number;
  APIKEY: string;
  AUTHDOMAIN: string;
  PROJECTID: string;
  STORAGEBUCKET: string;
  MESSAGINGSENDERID: string;
  APPID: string;
  MEASUREMENTID: string;
  MONGODB: string;
  JWT_SEED: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    APIKEY: joi.string().required(),
    AUTHDOMAIN: joi.string().required(),
    PROJECTID: joi.string().required(),
    STORAGEBUCKET: joi.string().required(),
    MESSAGINGSENDERID: joi.string().required(),
    APPID: joi.string().required(),
    MEASUREMENTID: joi.string().required(),
    MONGODB: joi.string().required(),
    JWT_SEED: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVariable: EnvironmentVars = value;

export const envs = {
  port: envsVariable.PORT,
  apiKey: envsVariable.APIKEY,
  authDomain: envsVariable.AUTHDOMAIN,
  projectId: envsVariable.PROJECTID,
  storageBucket: envsVariable.STORAGEBUCKET,
  messagingSenderid: envsVariable.MESSAGINGSENDERID,
  appId: envsVariable.APPID,
  measureMentid: envsVariable.MEASUREMENTID,
  mongoDb: envsVariable.MONGODB,
  jwtSeed: envsVariable.JWT_SEED,
};
