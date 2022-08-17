import { Component, OnInit } from '@angular/core';
import { FormSComponent } from '../form-s/form-s.component';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';

@Component({
  selector: 'app-link-preview',
  templateUrl: './link-preview.component.html',
  styleUrls: ['./link-preview.component.scss']
})

export class LinkPreviewComponent implements OnInit {

  constructor(
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  getMetaData(url: string) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

}
