import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'notFound',
  templateUrl: './notFound.component.html'
})
export class NotFoundComponent implements OnInit{
  title = 'Not Found';

  ngOnInit(){
      console.log("notFound.component cargado");
  }
}
