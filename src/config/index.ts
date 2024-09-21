import "dotenv/config";

interface ENV {
  PORT?: number;
}

type AllRequired<T extends object> = {
  [K in keyof T]-?: T[K];
};

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

const getSanitzedConfig = (config: ENV): AllRequired<ENV> => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as AllRequired<ENV>;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
