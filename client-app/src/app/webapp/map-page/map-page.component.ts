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
  private districtGroups: { [classValue: string]: L.LayerGroup } = {};
  private markerClusterGroups: { [classValue: string]: L.MarkerClusterGroup } = {}; // Объект для хранения групп кластеризации по классам

  constructor(private mapservice: MapService){
  }

  ngOnInit(): void {
    let center: L.LatLngExpression = [59.940224, 30.316028]; //Санкт-Петербург
    let zoom = 12;
    let minzoom = 7;
    var southWest = L.latLng(55, 30),
    northEast = L.latLng(64, 31),
    bounds = L.latLngBounds(southWest, northEast);

    this.map = new L.Map('leafletMap',{
      crs: L.CRS.EPSG3857
    }).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      minZoom: 7,
      bounds: bounds
    }).addTo(this.map);

    this.potholeSubscription = this.mapservice.markers$.subscribe(potholeData => {
      this.addPothole2Layers(potholeData);
    });

    this.mapservice.getPotholes();
  }

  private addPothole2Layers(potholeData: any): void {
    const classValue = potholeData.pothole_class;
    const districtValue = potholeData.adress;

    const districtGroup = this.getPotholeDistrict(districtValue);
    const clusterGroup = this.getClusterGroup(classValue);

    const customIcon = new L.Icon({
      iconUrl: `../../assets/icons/pothole_1_${potholeData.pothole_class}.png`,
      iconSize: [16, 16],
    });
  
    const marker = L.marker([potholeData.geometry.coordinates[0], potholeData.geometry.coordinates[1]], {
      icon: customIcon
    })
    .bindPopup(`ID: ${potholeData.id}<br>
                  Адрес: ${potholeData.adress}<br>
                  Класс: ${potholeData.pothole_class}`);

    clusterGroup.addLayer(marker)
    districtGroup.addLayer(clusterGroup);
  }

  private getPotholeDistrict(districtValue): L.LayerGroup {
    if (!this.districtGroups[districtValue]) {
      // Если группы кластеризации для данного класса ещё нет, создаем новую
      this.districtGroups[districtValue] = new L.LayerGroup();
      // this.map.addLayer(this.districtGroups[classValue]);
    }
    return this.districtGroups[districtValue];
  }

  private getClusterGroup(classValue): L.MarkerClusterGroup{
    if (!this.markerClusterGroups[classValue]) {
      // Если группы кластеризации для данного класса ещё нет, создаем новую
      this.markerClusterGroups[classValue] = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          var markers = cluster.getAllChildMarkers();

          var style = `width: 40px;height: 40px;
          background-image: url('../../../assets/icons/pothole_1_${classValue}.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center;
          text-align: center;
          vertical-align: middle;` 

          var html = `<div style="${style}">`+classValue+'</div>';
          return L.divIcon({ html: html, className: 'clusterMarker', iconSize: L.point(32, 32) });
        },
        spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: false
      });
      // this.map.addLayer(this.markerClusterGroups[classValue]);
    }
    return this.markerClusterGroups[classValue]
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    this.potholeSubscription.unsubscribe();
  }
}
