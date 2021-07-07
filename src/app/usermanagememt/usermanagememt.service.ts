import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsermanagememtService {
  constructor(private http: HttpClient) { }
 
  // get all user data from server
  listuser(offset:number,search:string,sortby:number): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/customer/listuser?offset='+offset+'&search='+search+'&sortby='+sortby, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  listUsersTotal(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/customer/listuserstotal', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  totalCustomers(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/customer/totalcustomers', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get user data from server based on id
  getuser(id:String): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/customer/getuser/'+id, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing user
  adduser(name:string,phone:number,password:string,email:string,address:any,shipping_address:any,billing_address:any, id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/customer/adduser', {
        name,
        phone,
        password,
        email,
        address,
        shipping_address,
        billing_address,
        id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }



  downloadFile(data, filename = 'data') { 
        let csvData = this.ConvertToCSV(data, [ 
            'name', 'email', 'phone'
        ]); 
        console.log(csvData) 
        let blob = new Blob(['\ufeff' + csvData], { 
            type: 'text/csv;charset=utf-8;'
        }); 
        let dwldLink = document.createElement("a"); 
        let url = URL.createObjectURL(blob); 
     
        dwldLink.setAttribute("href", url); 
        dwldLink.setAttribute("download", filename + ".csv"); 
        dwldLink.style.visibility = "hidden"; 
        document.body.appendChild(dwldLink); 
        dwldLink.click(); 
        document.body.removeChild(dwldLink); 
    } 

 ConvertToCSV(objArray, headerList) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = 'S.No,';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = (i+1)+'';
             for (let index in headerList) {
                let head = headerList[index];

                 line += ',' + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
     } 



}
