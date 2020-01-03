import { ProductParameterService } from './product-parameter.service';
import { CriteriaComponent } from './../shared/criteria.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    //showImage: boolean; using getter and setter
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    includeDetail: boolean = true

    parentListFilter: string;
    //private _sub: Subscription;

    // @ViewChildren('filterElement') //for a list of elements
    //@ViewChild(NgModel) filterInput: NgModel;

    /*private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this._listFilter);
    }*/

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }

    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }

    filteredProducts: IProduct[];
    products: IProduct[];
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    constructor(private productService: ProductService, private productParameterService: ProductParameterService) { }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter = this.productParameterService.filterBy;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }
}
