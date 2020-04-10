export class Faq {
  public title: string;
  public description: string;
  public category: string;
  public starred: boolean;

  constructor(title: string, desc: string, category: string, starred: boolean) {
    this.title = title;
    this.description = desc;
    this.starred = starred;
    this.category = category;
  }
}
