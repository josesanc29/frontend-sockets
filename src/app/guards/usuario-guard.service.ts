import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor( public ws: WebsocketService ,
               public router: Router) { }

  canActivate() {
      if ( this.ws.obtenerUsuario()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
