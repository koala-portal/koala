
export interface User {
  userName: string;
  userCreds: string;
  role: string;

  constructor(userName: string, userCreds: string, role: string);
  clone(): User;
}
