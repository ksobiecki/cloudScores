import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.template.html',
    styleUrls: ['./header.less']
})
export class HeaderComponent {
    username: string = 'Krzyś';
}