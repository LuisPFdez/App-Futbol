import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("content", { static: true }) content!:ElementRef;
  @Output() salida!:EventEmitter<string>;
  modalReference!: NgbModalRef;
  constructor(private modalService: NgbModal) { 
    this.salida = new EventEmitter<string>(); 
  }
  login(usuario:string, password:string){
    if (usuario.length >= 1 && password.length >= 1){
      this.salida.emit(usuario);
      this.modalReference.close();
    }
  }
  ngOnInit(): void {
    console.log("Contenido", this.content);
    this.modalReference = this.modalService.open(this.content,{ariaLabelledBy: 'popup-inicio-title', backdrop: "static", keyboard: false,centered: true,animation: true})
  }


}
