import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { MovieService } from '../../services/movie';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  listado:FirebaseListObservable<any>;
  bandera :boolean = true;
  public prev : MovieService[] = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    private platform: Platform
    ) {
      this.listado= this.database.list("/movies");
      var offline = Observable.fromEvent(document, "offline");
      var online = Observable.fromEvent(document, "online"); 

      offline.subscribe(() => {
        this.bandera = false;  
      });

    online.subscribe(()=>{
        this.bandera=true;
        this.insertar();
    });
  }

   
    openAlertNewMovie(){

      let alert = this.alertCtrl.create({
      title: 'Registrar pelicula',
      message: 'Agrega los datos de la pelicula',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'El titulo de la pelicula.',
        },
        {
          name: 'descripcion',
          placeholder: 'Agrega una descripcion',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            this.insertarPeli(data);
          }
        }
      ]
    });
    alert.present();
   }
  
    insertarPeli(data:any){
      try {
        if(this.bandera){
          this.listado.push({
          title:data.titulo,
          descripcion: data.descripcion
        });  
        this.insertar();
        }else{
           this.prev.push(new MovieService(data.titulo, data.descripcion));
        }
      } catch (error) {
        this.alertCtrl.create({
          title:"Error",
          subTitle:error,
          buttons: ['Dismiss']
        }).present();  
        return false;     
      }     
      return true;
    }

  insertar(){
    while(this.prev.length > 0){
        console.log(this.prev.length);
        if(this.bandera){
          try{
            this.listado.push({
              title:this.prev[0].titulo,
              descripcion: this.prev[0].descripcion
            });
            this.prev.shift();
          }catch(error){
          console.log(error);
          }  
        }
    }
    this.alertCtrl.create({
      title: "¡Sincronización completa!",
       message: "Los datos se han actualizado!",
      buttons: ['¡Entendido!']
    }).present();
  }    
}
