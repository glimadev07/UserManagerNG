import { environment } from "../environments/environment";

const VERSION = 'v1'
const BASE_URL = environment.URL_API + `/${VERSION}`;

/**
 * @router  Users
 */
export const USERS = `${BASE_URL}/users`

