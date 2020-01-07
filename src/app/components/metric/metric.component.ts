import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {

  @Input() name: string;
  @Input() percentage: number;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
    console.log(this.value)
  }

}
