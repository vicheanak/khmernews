import { Injectable } from '@angular/core';
import {Deploy} from '@ionic/cloud-angular';

@Injectable()
export class DeployService {
    snapshotAvailable: boolean;

    constructor(public deploy:Deploy) {

    }

    update(){
        return new Promise( resolve => {
            this.deploy.check().then((snapshotAvailable: boolean) => {
                this.snapshotAvailable = snapshotAvailable;
                if (this.snapshotAvailable){
                    this.deploy.download().then(() => {
                        resolve(this.deploy.extract());
                    });
                }
            });

        } );
    }

    checkAndUpdate(){
        this.update().then(() => {
            this.deploy.load();
        });
    }

}

