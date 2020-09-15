import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  luz_estado: boolean = false;
  aire_estado: boolean = false;
  
  constructor() {}

  luz()
  {
    this.luz_estado = !this.luz_estado
  }

  aire()
  {
    this.aire_estado = !this.aire_estado
  }
}
