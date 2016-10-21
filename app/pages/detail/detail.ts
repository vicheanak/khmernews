import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {News} from '../../providers/news/news';
/*
Generated class for the DetailPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/detail/detail.html',
    providers: [News]
})
export class DetailPage {

    result: any;
    title: any;
    pushId: any;

    constructor(private navCtrl: NavController, private news: News, private navParams: NavParams) {
        var articleId = this.navParams.get('id');
        this.news.findOne(articleId).then((data) => {
            this.result = data;
        });
    }

    openLink(url){
        open(url, "_blank", "location=no");
    }

    back(){
        this.navCtrl.pop();
    }
}
