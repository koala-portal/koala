import { Subject } from 'rxjs';
import { KTool } from '../shared/k-tool.model';

export class KToolsService {
  kToolsChanged = new Subject<KTool[]>();

  private kTools: KTool[] = [new KTool('PAL', 3), new KTool('ZYX', 12)];

  getkTools() {
    return this.kTools.slice();
  }

  addkTool(kTool: KTool) {
    this.kTools.push(kTool);
    this.kToolsChanged.next(this.kTools.slice());
  }

  addkTools(kTools: KTool[]) {
    this.kTools.push(...kTools);
    this.kToolsChanged.next(this.kTools.slice());
  }
}
