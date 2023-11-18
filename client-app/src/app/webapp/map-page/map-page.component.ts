import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {LatLngExpression, Marker, Map, tileLayer, Layer, LayerGroup, marker } from 'leaflet';
import { Observable } from 'rxjs';
// import { count, map, tap } from 'rxjs/operators'
// import { markerClusterGroupProvider } from 'leaflet.markercluster';

import { MapService } from 'src/app/shared/layouts/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  map: Map | undefined;
  potholeData: Observable<any>;
  layerGroup: LayerGroup | undefined;

  constructor(private mapservice: MapService){
  }

  ngOnInit(): void {
    this.initializeMap();
    this.addPotholes();
    console.log("erferferf")
  }

  private initializeMap(): void {
    let center: LatLngExpression = [59.940224, 30.316028];
    let zoom = 12;

    this.map = new Map('leafletMap',{
      crs: L.CRS.EPSG3857
    }).setView(center, zoom);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors',
      minZoom: 10,
    }).addTo(this.map);

    this.layerGroup = new LayerGroup().addTo(this.map);
  }
  private addPotholes(): void {
    this.mapservice.getPotholes().subscribe(result =>{

      console.log(result[0].geometry);
      var x = result[0].geometry.coordinates[0] / 20037508.34 * 180;
      var y = result[0].geometry.coordinates[1] / 20037508.34 * 180;
      y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
      console.log([y, x]);

      var mark = marker([y,x]);
      mark.addTo(this.layerGroup);
      // for (var i = 0; i < result.length; i++){
      //   var coords = result[i].geometry.coordinates;
      //   console.log([coords[0], coords[1]]);
      //   var mark = marker([3379038, 8363315]);
      //   // var mark = marker(result[i].geometry.coordinates);
      //   mark.addTo(this.layerGroup);
      // }
    });
    
  }
}
