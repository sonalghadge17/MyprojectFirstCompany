import { Component } from '@angular/core';

interface Entity {
  name: string;
 
  permissions: {
    add: boolean;
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
}
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PermissionsService } from './permissions.service';
import { UsersService } from '../users/users.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule,FormsModule,NgSelectModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
 
// gridjsList: Observable<undefined> | Subscribable<undefined> | Promise<undefined> | undefined;
ProgramList: any;
date: any;
id :any
selectAllAdd: boolean = false
requestBody:any;
dealStatus!: string;
datalist: any[] = [];
  public search: string = "";
  itemsPerPage = 10;
  pageNo = 1;
  listLength: any;
  selectedMethods: { [key: string]: string[] } = {};
  userList: any;
selectedSupplier: any;
  selectedUserId: any;
  data: any;
  selectedAll!: string;
constructor( private modalService: NgbModal,private UserService:UsersService,private route: ActivatedRoute,
  private toastr: ToastrService, private router: Router,private PermissionsService:PermissionsService){

    this.route.params.subscribe(params => {
      this.selectedUserId = params['id'];
      this.id = this.selectedUserId // or use queryParamMap if the ID is a query parameter
      // this.setSelectedUser(userId);
    });

}
ngOnInit(): void {
  this.getAllUsers()
  this.getAllModule()
  this.getServiceById()
  this.requestBody = {
    pageNo: this.pageNo - 1,
    pageSize: this.itemsPerPage,
    searchTerm: this.search,
    isPagination:1,
    sortBy:'createdOn',
    sortorder:'ASC',
  };
  this.dealStatus = 'Waiting Confirmation from Admin'
  // this.getAllDeal()
  }

  onPermissionChange(data: any, permission: string): void {
    // Handle permission change logic here
    console.log(`Permission ${permission} changed for entity ${data.entityName}:`, data.permissions[permission]);
   
  }
// Mock data fetching

save() {
  debugger
  if (this.id) {
    this.updateData();
  } else {
    this.sendData();
  }
}







sendData() {
  const requestBody = {
    userId:this.selectedUserId,
    moduleWithMethods: this.datalist.map((entity: { id: string | number; }) => ({
      moduleId: entity.id,
      methodName: this.selectedMethods[entity.id]
    }))
  };
  console.log(requestBody)
  this.PermissionsService.Save_Permissions(requestBody).subscribe(
    (res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message);
        // this.spinner.hide();
        // this.modal.dismiss();
      } else {
        this.toastr.error(res.message);
        // this.spinner.hide();
      }
    },
    (error: any) => {
      this.toastr.error(error);
      // this.spinner.hide();
    }
  );
}
updateData() {
  const requestBody = {
    userId:this.selectedUserId,
    moduleWithMethods: this.datalist.map((entity: { id: string | number; }) => ({
      moduleId: entity.id,
      methodName: this.selectedMethods[entity.id]
    }))
  };
  console.log(requestBody)
  this.PermissionsService.updatePermissions(requestBody).subscribe(
    (res: any) => {
      if (res.success === true) {
        this.toastr.success(res.message);
        // this.spinner.hide();
        // this.modal.dismiss();
      } else {
        this.toastr.error(res.message);
        // this.spinner.hide();
      }
    },
    (error: any) => {
      this.toastr.error(error);
      // this.spinner.hide();
    }
  );
}
getAllUsers() {
  this.requestBody = {
    isPagination: 0,
    pageNo: this.pageNo - 1,
    pageSize: this.itemsPerPage,
    orderBy: "DESC",
    sortBy: "createdDate",
    searchTerm: this.search,
    status: "",
    role: 'subadmin',
  };
  // this.spinner.show();
  const sbGetAll = this.UserService
    .getallUserBypegination(this.requestBody)
    .subscribe(
      (res: any) => {
        // this.spinner.hide();
        if (res.success) {
          this.userList = res.data;
          this.listLength = res.data.totalElements;
        } else {
        }
      },
      (error) => {
        // this.spinner.hide();
        this.toastr.error(error);
      }
    );

}

getAllModule() {
  debugger
   this.PermissionsService.getallModule
     ()
     .subscribe(
       (res: any) => {
        //  this.spinner.hide();
         if (res.success) {
           debugger
           this.datalist = res.data;
           this.listLength = res.data.totalElements;
         } else {
           this.toastr.error(res.message);
          //  this.spinner.hide();
         }
       },
       (error:any) => {
        //  this.spinner.hide();
         this.toastr.error(error);
       }
     );
   
 }
 onUserChange(selectedId:any){
  this.selectedUserId =selectedId
  // this.userList=[]
  if(this.selectedUserId){
this.getServiceById()
  }
 }
 onUserClear(){
  this.selectedSupplier = ''
  this.getAllModule()
 }
 getServiceById() {
  debugger;
  // this.spinner.show();
  const sb = this.PermissionsService.userPermissionGet_ById(this.selectedUserId).subscribe(
    (res: any) => {
      // this.spinner.hide();
      console.log(res.data);
      this.id = res.data.userId;
      if (res.success) {
        debugger;
        this.data = res.data;
        if (res.success && res.data?.responses) {
          this.datalist = res.data.responses.map((module: { moduelId: any; moduleName: any; permissionMethod: any; }) => ({
            id: module.moduelId,  // Ensure correct key name
            name: module.moduleName,
            methods: module.permissionMethod || [] // Store allowed methods
          }));

          // Iterate through the methods and check if 'assignedToUser' is true
          this.datalist.forEach((module: any) => {
            module.methods.forEach((permission: any) => {
              if (permission.assignedToUser) {
                // If assignedToUser is true, mark the checkbox as checked
                if (!this.selectedMethods[module.id]) {
                  this.selectedMethods[module.id] = [];
                }
                this.selectedMethods[module.id].push(permission.method); // Add the method to selectedMethods
              }
            });
          });
        }
      }
    },
    (error: any) => {
      // this.spinner.hide();
      console.error("Error loading institute details", error);
    }
  );
}
   checkPermission(entity: any, method: string): boolean {
    return this.selectedMethods[entity.id] && this.selectedMethods[entity.id].includes(method);
    
  }

  toggleMethod(entityId: string, method: string, event: any) {
    if (!this.selectedMethods[entityId]) {
      this.selectedMethods[entityId] = [];
    }
  
    if (event.target.checked) {
      if (!this.selectedMethods[entityId].includes(method)) {
        this.selectedMethods[entityId].push(method);
      }
    } else {
      this.selectedMethods[entityId] = this.selectedMethods[entityId].filter(m => m !== method);
    }
  }
 itemsPerPageChange($event: any) {
  this.itemsPerPage = parseInt($event.target.value);
  this.requestBody.pageSize = this.itemsPerPage;
  this.itemsPerPage;
  this.requestBody.pageNo = 0;
  this.getAllModule();
}
pageNoChange($event: any) {
  this.pageNo = $event - 1;
  this.requestBody.pageNo = this.pageNo;
  this.getAllModule();
}
//searchevent
searchevent($event: any) {
  // this.requestBody.isPagination = 1;
  this.requestBody.searchTerm = $event.target.value;
  this.getAllModule();
}
selectAllMethods(method: string, event: any) {
  const checked = event.target.checked;

  this.datalist.forEach((entity: { id: string | number; }) => {
    if (!this.selectedMethods[entity.id]) {
      this.selectedMethods[entity.id] = [];
    }

    if (checked) {
      // Add method if not already present
      if (!this.selectedMethods[entity.id].includes(method)) {
        this.selectedMethods[entity.id].push(method);
      }
    } else {
      // Remove method from the list
      this.selectedMethods[entity.id] = this.selectedMethods[entity.id].filter(m => m !== method);
    }
  });
}

isAllSelected(method: string): boolean {

  return this.datalist.length > 0 && this.datalist.every((entity: { id: string | number; }) =>
    this.selectedMethods[entity.id] && this.selectedMethods[entity.id].includes(method)
  );
}

}




