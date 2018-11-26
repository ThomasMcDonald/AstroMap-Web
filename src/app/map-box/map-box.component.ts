import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';
import { environment } from '../../environments/environment';

@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit{

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v10';
  lat = 0;
  lng = 0;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
    if(localStorage.getItem("longlat") !== null){
      console.log(JSON.parse(localStorage.getItem("longlat")));
      this.lng = JSON.parse(localStorage.getItem("longlat")).lng;
      this.lat = JSON.parse(localStorage.getItem("longlat")).lat;
    }
  }

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        localStorage.setItem("longlat", JSON.stringify({lng: position.coords.longitude, lat:position.coords.latitude}));
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
    });
  }

}
