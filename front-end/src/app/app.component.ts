
import { Component , OnInit,  EventEmitter} from '@angular/core';
import {ProductService} from './services/product.service';
import {MaterializeAction} from 'angular2-materialize';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent implements OnInit {
  width= 100; //images width
  height= 50; // images height
  products: any[]= []; // contains all the products
  reviews: any[]= [];  //contains all the reviews of a product
  modalActions = new EventEmitter<string|MaterializeAction>();
  p = 1; // pagination
  categories: string[]= []; // contains all distinct categories
  filter = ''; // filter criteria
  filteredItems: any[]= []; // filtered items
  loading = true;

  ngOnInit(): void { this.getAll();  }

  constructor(private _service: ProductService) { }


  getAll(): void {
      this._service.getProducts()
        .subscribe(data => {this.products = data;
                                  this.getCategories();
                                  this.filteredItems = this.products;
                                  this.loading = false;
                                  } );
                }

  getCategories(): void {
    const categories1 = new Array();
    this.products.forEach((product) => {categories1.push(product['category']); });
    this.categories = categories1.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
                    }

  filterByCategorie(filter): void {
    this.filteredItems = [];
    if (filter === '' ) {
      this.filteredItems = this.products;
    }else{
      this.products.forEach((product) => { if ( product['category'] === filter ) { this.filteredItems.push(product); } });
        }
    }

  onChange($event) {
   this.filter = $event.target.value;
    this.filterByCategorie(this.filter);
                  }

  openModal(arg) {
    this.modalActions.emit({action: 'modal', params: ['open']});
    this.reviews = arg;
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

}
