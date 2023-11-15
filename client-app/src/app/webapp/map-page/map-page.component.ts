import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

// var LeafIcon = L.Icon.extend({
//   options: {
//     iconSize:     [32, 37],
//     iconAnchor:   [16,37],
//     popupAnchor:  [0, -30]
//   }
// });

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  // constructor(icon1class: L.Icon){
  //   icon1class = new LeafIcon(icon);
  // }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    const map = L.map('leafletMap').setView([59.940224, 30.316028], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'OpenStreetMap'
    }).addTo(map);
  }


}
