import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductService } from './services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Products {
  title: string;
  price: number;
  category: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{
  displayedColumns: string[] = ['category', 'title', 'price', 'description'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  productForm!: FormGroup;


  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(
    private product: ProductService,
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      title: new FormControl('',Validators.required),
      price: new FormControl(0,Validators.required),
      category: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    });
    let getData: any;
    getData = localStorage.getItem('product');
    if(JSON.parse(getData)) {
      this.product.getProductRecords().then((res: any) => {
        this.dataSource.data = res.products
        localStorage.setItem('product', JSON.stringify(res.products));
      })
    }

  }

  onSubmit(form: FormGroup) {
    if(form.valid) {
      console.log('his.productForm.value', this.productForm.value);
      this.dataSource.data.push(this.productForm.value)
      console.log(this.dataSource.data)
      localStorage.setItem('product', JSON.stringify(this.dataSource.data));
      this.productForm.reset();
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
