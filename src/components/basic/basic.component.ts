import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  @Input() header: string = '';
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
