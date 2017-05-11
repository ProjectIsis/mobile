import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {BrokerDetailPage} from '../broker-detail/broker-detail';
import {ComplaintService} from '../../providers/complaint-service-mock';

@Component({
    selector: 'page-complaint-detail',
    templateUrl: 'complaint-detail.html'
})
export class ComplaintDetailPage {

    complaint: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public complaintService: ComplaintService, public toastCtrl: ToastController) {
        this.complaint = this.navParams.data;
        complaintService.findById(this.complaint.id).then(
            complaint => this.complaint = complaint
        );
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

    favorite(complaint) {
        this.complaintService.favorite(complaint)
            .then(complaint => {
                let toast = this.toastCtrl.create({
                    message: 'Complaint added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(complaint) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
