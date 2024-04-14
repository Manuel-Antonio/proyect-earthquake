import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { Feature } from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  url: string = 'http://127.0.0.1:4567';
  feature?: Feature;
  currentPage: number = 1;
  perPage: number = 20;
  selectedValues: string[] = [];
  modeDark : boolean = false;

  constructor(private http: HttpClient) {
    this.loadLS();
  }

  listFeatures(page: number = 1, per_page: number = 20, filters : string = ""): Observable<any> {
    const url = `${this.url}/features?page=${page}&per_page=${per_page}${filters}`;
    this.saveLS();
    return this.http.get(
      url
    );
  }

  getFeature(id: string): Observable<any> {
    return this.http.get(`${this.url}/features/${id}`);
  }

  addComment(comment: {body : string, feature_id: string}) {
    return this.http.post(`${this.url}/features/comment`, JSON.stringify(comment));
  }

  saveLS() {
    localStorage.setItem("currentPage", JSON.stringify(this.currentPage));
    localStorage.setItem("perPage", JSON.stringify(this.perPage));
    localStorage.setItem("selectedValues", JSON.stringify(this.selectedValues));
    
  }

  loadLS() {
    const currentPageLS = localStorage.getItem("currentPage");
    const perPageLS = localStorage.getItem("perPage");
    const selectedValuesLS = localStorage.getItem("selectedValues");
    const modeDarkLS = localStorage.getItem("modeDark");

    this.currentPage = currentPageLS ? JSON.parse(currentPageLS) : 1;
    this.perPage = perPageLS ? JSON.parse(perPageLS) : 20;
    this.selectedValues = selectedValuesLS ? JSON.parse(selectedValuesLS) : [];
    this.modeDark = modeDarkLS ? JSON.parse(modeDarkLS) : true ;
  }

  onChangeModeDark(){
    this.modeDark = !this.modeDark;
    localStorage.setItem("modeDark", JSON.stringify(this.modeDark));
  }
}
