declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      URI_DB: string;
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
    }
  }
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
