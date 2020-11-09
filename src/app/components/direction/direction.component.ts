import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
})
export class DirectionComponent implements OnInit {
  private addressSub: Subscription;
  paramID: string;
  origin: {latitude: number, longitude: number};
  destination: {latitude: number, longitude: number};

  constructor() { }

  ngOnInit() {}

  getTravelTime() {
    const directionsRenderer = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService;
    const map = new google.maps.Map(document.getElementById('direction-map'), {
      zoom: 15,
      center: {lat: 27.964157, lng: -82.452606}
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('right-panel'));

    const control = document.getElementById('floating-panel');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    this.calculateAndDisplayRoute(this.origin, this.destination, directionsService, directionsRenderer);

  }

  calculateAndDisplayRoute(start, end, directionsService, directionsRenderer) {

    directionsService.route({
      origin: {lat: +start.latitude, lng: +start.longitude},
      destination: {lat: +end.latitude, lng: +end.longitude},
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
