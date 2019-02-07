import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket ,
    private router: Router
  ) {
    this.cargarUserStorage();
    this.checkStatus();
  }


    checkStatus() {

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
        this.cargarUserStorage();
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        this.socketStatus = false;
      });
    }


    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      // Si se envia el payload (data) es obligatorio enviar un callback.
      this.socket.emit( evento, payload, callback );

    }

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }

    loginWebSock(nombre: string) {
          return new Promise( ( resolve, reject ) => {
            console.log('Configurando usuario', nombre);
            this.emit('configurar-usuario', {nombre} , (resp: any) => {
                console.log(resp);
                // Se auntentica el usuario
                this.usuario = new Usuario(nombre);
                // Lo guardamos en localstorage
                this.guardarUserStorage();

                resolve();
            });
          });
    }
    desloginWebSock(){
        this.usuario = null;
        localStorage.removeItem('usuario');
        const payload ={
          nombre: 'sin-nombre'
        }

        this.emit('configurar-usuario', payload , () => {});
        this.router.navigate(['/']);
    }

    obtenerUsuario() {
      return this.usuario;
    }

    guardarUserStorage() {
      localStorage.setItem('usuario' , JSON.stringify(this.usuario));
    }
    cargarUserStorage() {
      if (localStorage.getItem('usuario')) {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.loginWebSock(this.usuario.nombre);
      }
    }

}
