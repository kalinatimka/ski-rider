import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { CategoryModel } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.scss']
})
export class AddLotComponent implements OnInit {
  public form: FormGroup = null;
  public selectedFile: File = null;
  public categories: CategoryModel[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      startPrice: [null, Validators.required],
      priceStep: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    this.categoriesService.getAllCategories().pipe(
      take(1),
    ).subscribe(categories => {
      this.categories = categories;
    })
  }

  public onFileSelected(file: File): void {
    this.selectedFile = file;
  }

  public uploadData(): void {
    if (this.form.invalid) {
      return;
    }

    const values = this.form.value;

    const fd = new FormData();
    fd.append('name', values.name);
    fd.append('description', values.description);
    fd.append('startPrice', values.startPrice);
    fd.append('bidStep', values.priceStep);
    fd.append('endDate', values.endDate);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('idYear', '1');
    fd.append('idBrand', '1');
    fd.append('idType', '1');
    fd.append('idCategory', values.category);
    fd.append('idCreator', localStorage.getItem('idUser'));

    this.http.post(PATH_CONFIG.ADD_LOT_URL, fd, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(`Upload Progress: ${Math.round(event.loaded / event.total * 100)}%`);
      } else if (event.type === HttpEventType.Response) {
        this.router.navigate(['/']);
      }
    })
  }
}
