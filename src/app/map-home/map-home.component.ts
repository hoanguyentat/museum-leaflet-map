import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoService } from '../map-info.service';
import { RegionConfig } from '../region-config';
import * as L from 'leaflet';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router/src/shared';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import { MapViewComponent } from '../map-view/map-view.component';
@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.component.html',
  styleUrls: ['./map-home.component.scss']
})


export class MapHomeComponent implements OnInit {
  naturalParks$: Observable<any[]>;
  private searchTerms = new Subject<string>();
  options: any;

  @ViewChild(MapViewComponent)
  private mapComponent: MapViewComponent;

  regionConfig: RegionConfig;
  public provincesData: any;
  public natureParksData: any;
  constructor(
    private mapInfoService: MapInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 5,
      center: L.latLng(46.879966, -121.726909)
    };
    this.regionConfig = this.mapInfoService.getRegion();
    console.log(this.regionConfig);
    this.mapInfoService.getProvinces().subscribe(data => {
      this.provincesData = data;
    });
    this.mapInfoService.getNationalParks().subscribe(data => {
      this.natureParksData = data;
    });

    this.naturalParks$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.mapInfoService.searchNationalPark(term)),
    );
  }

  clickOnNaturalPark(naturalPark: any): void {
    const bounds = L.geoJSON(naturalPark).getBounds();
    this.mapComponent.flyToBounds(bounds);
  }

}
