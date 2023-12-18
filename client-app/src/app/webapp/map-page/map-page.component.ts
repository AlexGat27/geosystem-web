import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {LatLngExpression, Marker, Map, tileLayer, Layer, LayerGroup, marker } from 'leaflet';
import { Subscription } from 'rxjs';
// import { count, map, tap } from 'rxjs/operators'
// import { markerClusterGroupProvider } from 'leaflet.markercluster';

import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  private map: Map | undefined;
  private potholeSubscription: Subscription;
  private markers: Marker[];
  private layerGroup: LayerGroup | undefined;

  constructor(private mapservice: MapService){
  }

  ngOnInit(): void {
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

    this.potholeSubscription = this.mapservice.markers$.subscribe(potholeData => {
      this.addPothole2Map(potholeData);
    });

    this.mapservice.getPotholes();
  }

  private addPothole2Map(potholeData: any): void {
    
    const customIcon = new L.Icon({
      iconUrl: "../../../assets/icons/pothole_1_1.png", // Путь к вашей иконке
      iconSize: [16, 16], // Размер иконки в пикселях
    });

    marker([potholeData.geometry.coordinates[0], potholeData.geometry.coordinates[1]], {
      icon: customIcon
    })
    .bindPopup(`ID: ${potholeData.id}<br>Данные: ${JSON.stringify(potholeData)}`)
    .addTo(this.map);
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    this.potholeSubscription.unsubscribe();
  }
}
