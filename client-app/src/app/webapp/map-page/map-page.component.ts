import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {LatLngExpression, Marker, Map, tileLayer, Layer, LayerGroup, marker } from 'leaflet';
import { catchError, Observable } from 'rxjs';
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
    let center: LatLngExpression = [59.940224, 30.316028]; //Санкт-Петербург
    let zoom = 12;
    let minzoom = 10;
    var southWest = L.latLng(55, 30),
    northEast = L.latLng(64, 31),
    bounds = L.latLngBounds(southWest, northEast);

    this.map = new Map('leafletMap',{
      crs: L.CRS.EPSG3857
    }).setView(center, zoom);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors',
      minZoom: 10,
      bounds: bounds
    }).addTo(this.map);
    this.layerGroup = new LayerGroup().addTo(this.map);
  }

  private addPotholes(): void {
    this.mapservice.getPotholes().subscribe(result =>{
      for (var i = 0; i < result.length; i++){
        var coords = result[i].geometry.coordinates;
        coords = this.mapservice.convert3857to4326(coords);
        var mark = marker(coords);
        mark.addTo(this.layerGroup);
      }
    });
  }
}
