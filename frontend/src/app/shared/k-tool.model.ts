import { UserGuide } from '../user-guide/guide.model';

export interface KTool {
  id: string;
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
