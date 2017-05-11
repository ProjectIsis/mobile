import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ComplaintService} from '../../providers/complaint-service-mock';
import {ComplaintDetailPage} from '../complaint-detail/complaint-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: ComplaintService) {
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(ComplaintDetailPage, favorite.complaint);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
