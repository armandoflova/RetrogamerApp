import { Component, OnInit } from '@angular/core';
import { Foto} from '../Models/Foto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  foto: Foto[];
  constructor() { }

  ngOnInit(): void {
  }

}
