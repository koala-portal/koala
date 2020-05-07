import { KTool } from '../shared/k-tool.model';

export class ReleaseNote {
  id: number;
  kTool: KTool;
  releaseDate: Date;
  name: string;
  description: string;
  versionNumber: string;
}
