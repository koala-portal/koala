import { UserGuide } from '../user-guide/user-guide.model';

export interface KTool {
  id: number;
  name: string;
  description: string;
  url: string;
  numUsers: number;
  starred: boolean;
  userGuide: UserGuide;
}

export interface KToolActive extends KTool {
  isActive: boolean;
}
