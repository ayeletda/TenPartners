import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../../service.service';


@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })


export class BoardComponent implements OnInit {
    constructor(private router: Router,private serviceService:ServiceService) {
    }

    ngOnInit() {


        this.serviceService.setTitle("Suggested projects");

        (<any>$('#SuggestedProjects')).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
        });
    }

    clicked(event) {

        this.router.navigateByUrl('/masterDB');

    }
}
 