import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private http: HttpClient) { }

   // get blog data from server based on id
   getseats(id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/seats/getseats/'+id, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get all blog data from server
  listseats(type:string, offset:number,search:string,sortby:number): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/seats/listseats?type='+type+'&offset='+offset+'&search='+search+'&sortby='+sortby, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  listSeatsTotal(status:string): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/seats/listseatstotal?status='+status, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  listAllSeatsTotal(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/seats/listAllseatstotal', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }
  
  // delete blog data from server based on id
  deleteSeats(id: string): Observable<any> {
    console.log("k");
    return Observable.create(observer => {
      this.http.get('/api/seats/delete/'+id, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing blog
  addseats(id: string, left: string, right: string, status: string, rank: string, slug:string, _id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/seats/addseats', {
          id,
          left,
          right,
          status,
          rank,
          slug,
          _id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  downloadFile(data, filename = 'data') { 
    console.log(data); 
		let csvData = this.ConvertToCSV(data, [ 
			'createdAt','id', 'left','right','status','rank'
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
         let row = 'S.No, Date, Id, Left, Right, Status, Rank';

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
 