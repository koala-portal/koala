import { KTool } from '../shared/k-tool.model';
export class Ticket {
  // this form will be the 20+ fields
  public name: string;
  public description: string;
  public imagePath: string;
  public ktools: KTool[];
  public ticketNumber: string;

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ktools: KTool[],
    ticketNumber: string
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ktools = ktools;
    this.ticketNumber = ticketNumber;
  }
}
