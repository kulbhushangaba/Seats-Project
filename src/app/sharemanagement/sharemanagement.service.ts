import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SharemanagementService {

  constructor(private http: HttpClient) { }

  // get all state data from server
  liststate(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/locality/statelist', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

    // get all state data from server
    listcity(state_id:any): Observable<any> {
      return Observable.create(observer => {
        this.http.post('/api/locality/citylist', {
          state_id
        }).subscribe((data: any) => {
          observer.next(data);
          observer.complete();
        })
      });
    }
    
  //send data to server for adding or editing Image
  addImage(imageFile): Observable<any> {
    return Observable.create(observer => {
      const dataform = new FormData();
      dataform.append('pics', imageFile);
      this.http.post('/api/filemanager/addimage', dataform).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get all Image data from server
  listImage(pageNo,search,sortby): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/filemanager/listimage?pageNo=' + pageNo +'&search='+search+'&sortby='+sortby, {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  listImagetotal(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/filemanager/listimagetotal', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // delete Image data from server database
  deleteImage(wallpaper: any): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/filemanager/deletemediaimage', {
        wallpaper
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get all page data from server
  listpage(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/share/listpage', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing page
  addpage(page_name: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/share/addpage', {
        page_name,
        id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get all category data from server
  listcategory(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/share/listcategory', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing category
  addcategory(category_name: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/share/addcategory', {
        category_name,
        id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  // get all tag data from server
  listtag(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/share/listtag', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing tag
  addTag(tag_name: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/share/addtag', {
        tag_name,
        id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

}
