import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { CommonService } from 'src/app/shared/services/common-service.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DateUtility } from 'src/app/shared/utils/date.util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnDestroy, OnInit {
  private navigationTimeout: any;
  private getProductSubscription: Subscription | null = null;
  private dateUtility = new DateUtility();

  public paginationLimit: number = 25;
  public currentPage: any;
  public addedProduct: string | null = null;
  public currentUser: any;
  public searchPlaceholder: string = 'Filter Developers..';
  public productListData: any[] = [];
  public filterKey = 'developers';
  public searchText: any = '';
  public editAccess = false;
  public addAccess = false;
  
  constructor(private router: Router, private commonService: CommonService, private route: ActivatedRoute,
    private userService: UserService ,private searchPipe: SearchPipe) {
    this.getProductList();
    this.route.params.subscribe(params => {
      this.addedProduct = params['id'];
      clearTimeout(this.navigationTimeout);
      this.navigationTimeout = setTimeout(() => this.router.navigate([AppConstants.PRODUCT_LIST_ROUTE]),3000);
    });
    
    this.currentUser = userService.getUser();
    
  }

  ngOnInit(): void {
    /*----------SETTING SEARCH OPTION BASED ON ROLE----------*/
    if(this.currentUser.role === 'director') {
      this.searchPlaceholder = 'Filter Scrum Master...';
      this.filterKey = 'scrumMasterName';
    }

    if(this.userService.getUser()?.access?.length) {
      this.editAccess = !!(this.userService.getUser().access.find((x:any) => x === AppConstants.access.EDIT));
      this.addAccess = !!(this.userService.getUser().access.find((x:any) => x === AppConstants.access.ADD));
    }
  }

  /*--------METHOD TO NAVIGATE TO A PARTICULAR ROUTE----------*/
  goTo(routeName: string) {
    this.router.navigate([routeName]);
  }

  /*----------METHOD TO FETCH THE PRODUCT LIST----------*/
  getProductList() {
    this.getProductSubscription = this.commonService.get().subscribe(res => {
      if(res && res.length) {
        this.productListData = res.reverse();
        if(this.productListData.length) {
          this.productListData.forEach(x => x.startDate = this.dateUtility.getDateInFormat(x.startDate));
        }
      }
    });
  }

  edit(id: string) {
    this.router.navigate([AppConstants.EDIT_PRODUCT_ROUTE+"/"+id]);
  }

  /*----------METHOD CALL TO DISPLAY THE LIST ON THE BASIS SEARCH OPTION ----------*/
  onSearch(searchText: string) {
    if(searchText){
      this.productListData = this.searchPipe.transform(this.productListData,this.filterKey,searchText);
    } else {
      this.getProductList();
    }
  }


  ngOnDestroy(): void {
    this.getProductSubscription?.unsubscribe();
    clearTimeout(this.navigationTimeout);
  }
}
