import { Component } from "@angular/core";
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';

@Component({
    selector: 'shr-fallback',
    templateUrl: './fallback.template.html',
    styleUrls: ['./fallback.less']
})
export class FallbackComponent {

    faLongArrowAltLeft = faLongArrowAltLeft;

    constructor(private _location: Location) {}

    onBackClick() {
        this._location.back();
    }
}