import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription, finalize, tap } from 'rxjs';

import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, AfterViewInit {

  private map: L.Map | undefined;
  private tileMaps: { [tileMapValue: string]: L.TileLayer } = {};
  private potholeSubscription: Subscription;
  // private controlLayers: L.Control.Layers | undefined;
  // private districtGroups: { [districtValue: string]: L.LayerGroup } = {};//Объект для хранения групп по районам
  // private markerClusterGroups: { [classValue: string]: L.MarkerClusterGroup } = {}; // Объект для хранения групп кластеризации по классам
  private markerClusterGroup: L.MarkerClusterGroup;

  constructor(private mapservice: MapService){
    this.markerClusterGroup = new L.MarkerClusterGroup({
      maxClusterRadius: 20,
      iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        var style = `width: 45px;height: 45px;
        background-image: url('../../../assets/icons/pothole_1_1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        text-align: center;
        color: white;
        padding-top: 40%;` 
        var html = `<div style="${style}">${markers.length}</div>`;
        return L.divIcon({ html: html, className: 'clusterMarker', iconSize: L.point(32, 32) });
      },
      spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: false
    });
  }

  ngOnInit(): void {
    // let center: L.LatLngExpression = [59.940224, 30.316028]; //Санкт-Петербург
    // let zoom = 12;
    // let minzoom = 7;
    // var southWest = L.latLng(55, 30),
    // northEast = L.latLng(64, 31),
    // bounds = L.latLngBounds(southWest, northEast);

    // this.map = new L.Map('leafletMap',{
    //   crs: L.CRS.EPSG3857
    // }).setView(center, zoom);
    // this.tileMaps["OSM"] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    //   minZoom: minzoom,
    //   bounds: bounds
    // }).addTo(this.map);

    // this.potholeSubscription = this.mapservice.markers$.subscribe(potholeData => {
    //   this.addPothole2Layers(potholeData);
    //   this.map.addLayer(this.markerClusterGroup);
    // })

    // this.mapservice.getPotholes();
  }
  ngAfterViewInit(): void {
    let center: L.LatLngExpression = [59.940224, 30.316028]; //Санкт-Петербург
    let zoom = 12;
    let minzoom = 7;
    var southWest = L.latLng(55, 30),
    northEast = L.latLng(64, 31),
    bounds = L.latLngBounds(southWest, northEast);

    this.map = new L.Map('leafletMap',{
      crs: L.CRS.EPSG3857
    }).setView(center, zoom);
    this.tileMaps["OSM"] = L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=XJet6sPq12R5nqxXbV6N',{
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      minZoom: minzoom,
      bounds: bounds
    }).addTo(this.map);

    this.potholeSubscription = this.mapservice.markers$.subscribe(potholeData => {
      this.addPothole2Layers(potholeData);
      this.map.addLayer(this.markerClusterGroup);
    })

    this.mapservice.getPotholes();
  }

  private addPothole2Layers(potholeData: any): void {
    // const classValue = potholeData.pothole_class;
    // const districtValue = potholeData.adress;

    // const districtGroup = this.getPotholeDistrict(districtValue);
    // const clusterGroup = this.getClusterGroup(classValue);
    const stylePopup = `background-color: var(--gray-light); border-radius: 10px; 
    padding: 10px; margin: 0; color: var(--white-contour); width:100%; height: 100%;`
    const customIcon = new L.Icon({
      iconUrl: `../../assets/icons/pothole_1_1.png`,
      iconSize: [16, 16],
    });
    const marker = L.marker([potholeData.geometry.coordinates[0], potholeData.geometry.coordinates[1]], {
      icon: customIcon
    }).bindPopup(`
      <p>Владелец: ${potholeData.user.login}</p>
      <p>Ям на фотографии: ${potholeData.countPotholes}</p>
      <p>Ссылка: Не включена в эту версию</p>`);

    // this.markerClusterGroup.addLayer(marker);
    marker.addTo(this.map);
    // districtGroup.addLayer(marker);
  }

  // private getPotholeDistrict(districtValue): L.LayerGroup {
  //   if (!this.districtGroups[districtValue]) {
  //     this.districtGroups[districtValue] = new L.LayerGroup(); // Если группы для данного класса ещё нет, создаем новую
  //     this.map.addLayer(this.districtGroups[districtValue]);
  //     this.addControlLayers();
  //   }
  //   console.log(this.districtGroups[districtValue].getLayers());
  //   return this.districtGroups[districtValue];
  // }

  // private getClusterGroup(classValue): L.MarkerClusterGroup{
  //   if (!this.markerClusterGroups[classValue]) {
  //     // Если группы кластеризации для данного класса ещё нет, создаем новую
  //     this.markerClusterGroups[classValue] = L.markerClusterGroup({
  //       iconCreateFunction: function (cluster) {
  //         var markers = cluster.getAllChildMarkers();

  //         var style = `width: 45px;height: 45px;
  //         background-image: url('../../../assets/icons/pothole_1_${classValue}.png');
  //         background-repeat: no-repeat;
  //         background-size: 100% 100%;
  //         background-position: center;
  //         text-align: center;
  //         color: white;
  //         padding-top: 40%;` 

  //         var html = `<div style="${style}">`+classValue+'</div>';
  //         return L.divIcon({ html: html, className: 'clusterMarker', iconSize: L.point(32, 32) });
  //       },
  //       spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: false
  //     });
  //   }
  //   return this.markerClusterGroups[classValue];
  // }

  // private addControlLayers(){
  //   if (this.controlLayers !== undefined){this.map.removeControl(this.controlLayers);}
  //   this.controlLayers = L.control.layers(this.tileMaps,this.districtGroups).addTo(this.map);
  // }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    this.potholeSubscription.unsubscribe();
  }
}
