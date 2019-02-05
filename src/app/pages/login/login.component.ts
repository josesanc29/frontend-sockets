import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';
  constructor(public wsService: WebsocketService , public router: Router) { }

  ngOnInit() {
  }
  ingresar() {
    console.log(this.nombre);
    this.wsService.loginWebSock(this.nombre)
        .then( () => {
            this.router.navigate(['/chat']);
        });
  }

}
