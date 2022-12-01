import type { User } from '@/server/models';

declare module 'iron-session' {
  interface IronSessionData {
    user?: Pick<User, '_id' | 'email'>;
  }
}
