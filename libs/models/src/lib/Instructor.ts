import { ICirrusUser } from './ICirrusUser';
import { ICourse } from './ICourse';

export class Instructor {
  id?: number;
  firstName?: string;
  lastName?: string;
  user?: ICirrusUser;
  courses?: ICourse[];
  credentials?: string;
  students?: ICirrusUser[];
  // Snake case aliases of properties coming from the Rails server
  first_name?: string;
  last_name?: string;
}
