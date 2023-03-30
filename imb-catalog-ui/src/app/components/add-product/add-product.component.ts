import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { ConstructFormDataUtility } from 'src/app/shared/utils/constructFormData.util';
import { AppConstants } from '../../app.constants';
import { CommonService } from '../../shared/services/common-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnDestroy {
  private pingInterval: any;
  private timerSubs: any;
  private productSubscription: Subscription | null = null;
  private constructFormDataUtility = new ConstructFormDataUtility();
  
  public addProductForm: FormGroup<any>;
  public developersFA: any;
  public developerLimit: number = AppConstants.DEVELOPER_LIMIT;
  public errorText: string | null = null;
  public successText: string | null = null;
  public pingTime = 0;
  public methodologyList = AppConstants.METHODOLOGY_LIST;
  public productId: string | null = null;
  public isEdit = false;
  public startDate: any | null = null;
  public editAllowed = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.addProductForm = this.fb.group({
      productName: [null, Validators.required],
      productOwnerName: [null, Validators.required],
      developers: this.fb.array([]),
      scrumMasterName: [null, Validators.required],
      startDate: [null, Validators.required],
      methodology: [this.methodologyList[0], Validators.required],
    });
    
    let productId : string | null = null;
    this.route.params.subscribe(params => {
      productId = params['id'];
    });

    /*----------Edit Product----------*/
    if(this.router.url.indexOf('edit-product') !== -1) {
      this.isEdit = true;
      this.getSelectedProduct(productId);
    } else { // ADD PRODUCT
      this.addDeveloper(null);
    }
  }

  /*----------METHOD TO CREATE DEVELOPER FORM CONTROL-----------*/
  public addDeveloper(name: string | null) {
    const control = <FormArray>this.addProductForm.controls['developers'];
    control.push(
      this.fb.group({
        name: [name, Validators.required],
      })
    );
    this.developersFA = control.controls;
  }

  /*----------METHOD TO DELETE DEVELOPER FORM CONTROLS-----------*/
  public deleteDeveloper(i: number) {
    const control = <FormArray>this.addProductForm.controls['developers'];
    control.removeAt(i);
  }

  /*-----------METHOD TO HANDLE SUBMISSION OF THE FORM TO BACKEND API----------*/
  public submitForm() {
    if(!this.isEdit) {
      this.addProduct();
    } else {
      this.editProduct();
    }
  }

  /*----------METHOD TO ADD PRODUCT TO THE LIST---------*/
  addProduct() {
    if (this.addProductForm.valid) {      
      this.productSubscription = this.commonService
      .post(this.constructFormDataUtility.constructFormData(this.addProductForm.value))
      .subscribe(
        (x) => {
          if (x.productId) {
            this.setSuccess(
              'Product has been saved succesfully! Redirecting to product list in ',
              3, x.productId
            );
          } else
            this.toastr.error(
              'An unexpected error occurred, please try again later'
            );
        },
        (error) => {
          this.toastr.error('An unexpected error occurred, please try again later');
        }
      );
    } else {
      this.toastr.error('Please enter all the details to continue');
    }
  }

  /*----------METHOD TO EDIT PRODUCT----------*/
  editProduct() {
    if (this.addProductForm.valid) {
      const editEntity = this.constructFormDataUtility.constructFormData(this.addProductForm.value);
      editEntity['productId'] = this.productId;
      this.productSubscription = this.commonService
      .edit(editEntity)
      .subscribe(
        (x) => {
          if (x.productId) {
            this.setSuccess(
              'Product has been edited succesfully! Redirecting to product list in ',
              3, x.productId
            );
          } else
            this.toastr.error(
              'An unexpected error occurred, please try again later'
            );
        },
        (error) => {
          this.toastr.error('An unexpected error occurred, please try again later');
        }
      );
    } else {
      this.toastr.error('Please enter all the details to continue');
    }
  }

  /*-----------METHOD TO HANDLE SUBMISSION OF THE FORM TO BACKEND API----------*/
  private getSelectedProduct(id: string | null) {
    if (id) {
      this.productSubscription = this.commonService
      .find(id)
      .subscribe(
        (res) => {
          if(res.productId) {
            this.productId = id;
            for(let z in res) {
              console.log(z);
              if(z === 'startDate') {
                this.addProductForm.get(z)?.patchValue(new Date(res[z]));
                this.startDate = moment(res[z]).format('YYYY/MM/DD');
              } else if(z === 'developers') {
                for(let x=0; x<res[z].length; x++) {
                  this.addDeveloper(res[z][x]);
                }
              } else if(this.addProductForm.get(z) !== undefined) {
                this.addProductForm.get(z)?.patchValue(res[z]);
              } 
            }
          } else if(res.message) {
            this.router.navigate([AppConstants.PRODUCT_LIST_ROUTE]);
            this.toastr.error(res.message);
          } else {
            this.toastr.error('An unexpected error occurred, please try again later');
          }
        },
        (error) => {
          this.toastr.error('An unexpected error occurred, please try again later');
        }
      );
    }
  }

  /*----------METHOD TO HANDLE ERROR MESSAGE DISPLAY-----------*/
  private setError(errorText: string): void {
    this.errorText = errorText;
    this.timerSubs = timer(3000).subscribe((x) => (this.errorText = null));
  }

  /*----------METHOD TO HANDLE SUCCESS MESSAGE DISPLAY-----------*/
  private setSuccess(successText: string, ping: number, productId: any): void {
    this.successText = successText;
    this.pingTime = ping;
    clearInterval(this.pingInterval);
    this.pingInterval = setInterval(() => {
      if (this.pingTime > 0) {
        this.pingTime = this.pingTime - 1;
      } else {
        this.router.navigate([
          AppConstants.PRODUCT_LIST_ROUTE + '/' + productId,
        ]);
        clearInterval(this.pingInterval);
      }
    }, 1000);
  }

  /*---------METHOD TO CANCEL AND NAVIGATE TO PRODUCT LIST PAGE----------*/
  cancel() {
    this.router.navigate([AppConstants.PRODUCT_LIST_ROUTE]);
  }

  ngOnDestroy() {
    clearInterval(this.pingInterval);
    this.timerSubs?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }
}
