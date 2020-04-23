import { Subject } from 'rxjs';
import { KTool } from '../shared/k-tool.model';

export class KToolsService {
  kToolsChanged = new Subject<KTool[]>();

  private kTools: KTool[] = [
    {
      id: 'a',
      name: 'Google',
      description: 'Massively popular search engine',
      numUsers: 58105679288,
      starred: true,
    },
    {
      id: 'b',
      name: 'Bing',
      description: 'Massively unpopular search engine',
      numUsers: 8,
      starred: false,
    },
    {
      id: 'c',
      name: 'WinRAR',
      description: 'Ubiquitous archiving tool',
      numUsers: 5896568,
      starred: true,
    },
    {
      id: 'c',
      name: 'Twitter',
      description: 'A place where people post',
      numUsers: 12353567,
      starred: false,
    },
  ];

  getkTools(): KTool[] {
    return this.kTools.slice();
  }

  addkTool(kTool: KTool): void {
    this.kTools.push(kTool);
    this.kToolsChanged.next(this.getkTools());
  }

  addkTools(kTools: KTool[]): void {
    this.kTools.push(...kTools);
    this.kToolsChanged.next(this.getkTools());
  }
}
