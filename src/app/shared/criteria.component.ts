import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'pm-criteria',
    templateUrl: 'criteria.component.html'
})

export class CriteriaComponent implements OnInit, OnChanges {
    listFilter: string
    @ViewChild('filterElement') filterElementRef: ElementRef;
    @Input() displayDetail: boolean
    @Input() hitCount: number
    hitMessage: string

    constructor() { }

    ngAfterViewInit() {
        if(this.filterElementRef)
            this.filterElementRef.nativeElement.focus();
    }

    ngOnChanges(changes: SimpleChanges):void {
        if(changes['hitCount'] && !changes['hitCount'].currentValue) {
            this.hitMessage = 'No matches found';
        } else {
            this.hitMessage = 'Hits:' + this.hitCount;
        }
    }

    ngOnInit() { }
}