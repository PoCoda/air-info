import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {

  @Input() name: string;
  @Input() firstLine: number;
  @Input() secondLine: number;

  constructor() { }

  ngOnInit() {
  }

}
