import { UserGuideService } from './user-guide.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KTool } from '../shared/k-tool.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KToolsService } from '../k-tools/k-tools.service';
import { Section } from './section.model';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent implements OnInit, OnDestroy {
  kTool: KTool;

  selectedSection: Section = null;

  private routeParamsSub: Subscription;
  private sectionSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private kToolsService: KToolsService,
    private userGuideService: UserGuideService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe((params) => {
      this.kTool = this.kToolsService.findById(params.id);
      this.userGuideService.setUserGuide(this.kTool.userGuide);
    });

    this.sectionSub = this.userGuideService.currentSection$.subscribe(
      (section) => {
        this.selectedSection = section;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.sectionSub.unsubscribe();
  }

  onClickSectionLink(section: Section): void {
    this.userGuideService.setCurrentSection(section);
    setTimeout(() => {
      this.router.navigate(['./'], {
        fragment: section.title,
        relativeTo: this.route,
      });
    }, 0);
  }
}
