import { KTool } from '../shared/k-tool.model';

export class ReleaseNotes {
  id: number;
  kTool: KTool;
  releaseDate: Date;
  name: string;
  description: string;
  versionNumber: string;
}
