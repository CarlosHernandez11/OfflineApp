import { Injectable } from '@angular/core';

@Injectable()
export class MovieService{
   private _titulo : string;
   private _descripcion : string;

   constructor(titulo:string, descripcion: string){
        this._titulo = titulo;
        this._descripcion = descripcion;
   }

   get titulo():string{
       return this._titulo;
   }
   get descripcion():string{
       return this._descripcion;
   }

   set titulo(newTitulo:string){
       this._titulo=newTitulo;
   }

   set descripcion(newDescripcion:string){
       this._descripcion= newDescripcion;
   }
}