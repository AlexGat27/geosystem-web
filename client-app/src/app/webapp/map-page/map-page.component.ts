import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';

import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  private map: L.Map | undefined;
  private potholeSubscription: Subscription;
  private markers: L.Marker[];
  private layerGroup: L.LayerGroup | undefined;
  private markerClusterGroups: { [classValue: string]: L.MarkerClusterGroup } = {}; // Объект для хранения групп кластеризации по классам

  constructor(private mapservice: MapService){
  }

  ngOnInit(): void {
    let center: L.LatLngExpression = [59.940224, 30.316028]; //Санкт-Петербург
    let zoom = 12;
    let minzoom = 10;
    var southWest = L.latLng(55, 30),
    northEast = L.latLng(64, 31),
    bounds = L.latLngBounds(southWest, northEast);

    this.map = new L.Map('leafletMap',{
      crs: L.CRS.EPSG3857
    }).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      minZoom: 10,
      bounds: bounds
    }).addTo(this.map);

    this.layerGroup = new L.LayerGroup().addTo(this.map);

    this.potholeSubscription = this.mapservice.markers$.subscribe(potholeData => {
      this.addPothole2Map(potholeData);
    });

    this.mapservice.getPotholes();
  }

  private addPothole2Map(potholeData: any): void {
    const classValue = potholeData.pothole_class;

    if (!this.markerClusterGroups[classValue]) {
      // Если группы кластеризации для данного класса ещё нет, создаем новую
      this.markerClusterGroups[classValue] = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          var markers = cluster.getAllChildMarkers();

          var style = `width: 32px;height: 32px;
          background-image: url('../../../assets/icons/pothole_1_${classValue}.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          text-align: center;
          align-items: center`

          var html = `<div style="${style}">` + markers.length + '</div>';
          return L.divIcon({ html: html, className: 'clusterMarker', iconSize: L.point(32, 32) });
        },
        spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: false
      });
      this.map.addLayer(this.markerClusterGroups[classValue]);
    }
    const customIcon = new L.Icon({
      iconUrl: `../../assets/icons/pothole_1_${potholeData.pothole_class}.png`,
      iconSize: [16, 16],
    });
  
    L.marker([potholeData.geometry.coordinates[0], potholeData.geometry.coordinates[1]], {
      icon: customIcon
    })
    .bindPopup(`ID: ${potholeData.id}<br>
                  Адрес: ${potholeData.adress}<br>
                  Класс: ${potholeData.pothole_class}`)
    .addTo(this.markerClusterGroups[classValue]);
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    this.potholeSubscription.unsubscribe();
  }
}
