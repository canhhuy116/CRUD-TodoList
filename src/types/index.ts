import session from 'express-session';

export = session;

declare module 'express-session' {
  interface SessionData {
    isAuth: boolean;
    username: string;
  }
}
