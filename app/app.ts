import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, LoadingController, AlertController} from 'ionic-angular';
import {StatusBar, Splashscreen, SocialSharing, Device, Dialogs} from 'ionic-native';
import {provideCloud, CloudSettings, Push, PushToken} from '@ionic/cloud-angular';
import {Deploy} from '@ionic/cloud-angular';
import { NewsPage } from './pages/news/news';
import {PushNotification} from './providers/push-notification/push-notification';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '9ee12683'
    },
    'push': {
        'sender_id': '242004580343',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#343434'
            }
        }
    }
};

@Component({
    templateUrl: 'build/app.html',
    providers: [PushNotification]
})
export class MyApp {
    pages: any;
    @ViewChild(Nav) nav: Nav;
    rootPage: any = NewsPage;
    snapshotAvailable: boolean = false;
    updateStatus: any;
    loading: boolean;

    constructor(public push: Push, private platform: Platform, private pushNotification: PushNotification, public alertCtrl: AlertController, private deploy: Deploy, public loadingCtrl: LoadingController) {
        this.pages = [
        {name: '', title: 'ពត៌មានជាតិ', component: NewsPage },
        { name: 'kohsantepheap', title: 'កោះសន្តិភាព', component: NewsPage },
        { name: 'rfa', title: 'អាសុីសេរី', component: NewsPage },
        { name: 'voa', title: 'វីអូអេ', component: NewsPage },
        { name: 'thmeythmey', title: 'ថ្មីថ្មី', component: NewsPage },
        { name: 'phnompenhpost', title: 'ភ្នំពេញ ប៉ុស្តិ', component: NewsPage },
        { name: 'dapnews', title: 'ដើមអម្ពិល', component: NewsPage },
        { name: 'kampucheathmey', title: 'កម្ពុជាថ្មី', component: NewsPage },
        { name: 'freshnews', title: 'Fresh News', component: NewsPage },
        { name: 'cen', title: 'CEN', component: NewsPage },
        { name: 'vod', title: 'VOD', component: NewsPage },
        { name: 'camnews', title: 'CamNews', component: NewsPage },
        ];

        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();

            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                var deviceInfo = {
                    uuid: Device.device.uuid,
                    deviceToken: t.token,
                    appName: 'khmernews'
                }
                this.pushNotification.insert(deviceInfo).then(() => {
                    console.log(deviceInfo);
                    console.log('Token saved:', t.token);
                });
            });

            this.push.rx.notification()
            .subscribe((msg) => {
                Dialogs.alert(msg.text, msg.title, 'Done').then(() => {
                    console.log('done alert');
                });
            });


            this.updateApp();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component, {
            website: page.name,
            websiteKh: page.title
        });
    }


    updateApp(){
        this.deploy.check().then((snapshotAvailable) => {
            this.snapshotAvailable = snapshotAvailable;
            if (this.snapshotAvailable){
                let loader = this.loadingCtrl.create({
                    content: "រៀបចំតម្លើង Version ថ្មី"
                });
                loader.present();
                this.deploy.download().then(() => {
                    this.deploy.extract().then(() => {
                        return this.deploy.load();
                    });
                });
            }
        });
    }
}

ionicBootstrap(MyApp, [
    Deploy,
    provideCloud(cloudSettings),
    SocialSharing
    ], {
        backButtonText: '',
    });
