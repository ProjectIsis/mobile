import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {ComplaintService} from '../../providers/complaint-service-mock';
import {ComplaintDetailPage} from '../complaint-detail/complaint-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-complaint-list',
    templateUrl: 'complaint-list.html'
})
export class ComplaintListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: ComplaintService, public config: Config) {
        this.findAll();
    }

    openComplaintDetail(complaint: any) {
        this.navCtrl.push(ComplaintDetailPage, complaint);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.properties.forEach(complaint => {
            if (complaint.lat, complaint.long) {
                let marker: any = leaflet.marker([complaint.lat, complaint.long]).on('click', event => this.openComplaintDetail(event.target.data));
                marker.data = complaint;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
