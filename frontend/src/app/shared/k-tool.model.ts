import { UserGuide } from '../user-guide/guide.model';

export interface KTool {
  id: number;
  name: string;
  description: string;
  url: string;
  numUsers: number;
  starred: boolean;
  userGuide: UserGuide;
}
