import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Usuario {
    id : number;
    nombreCompleto : string;
    documento : {
        tipo: string;
        numero: string
    };
    fecha_nacimiento : string;
    correo : string;
    numCel : string;
    ubicacion : {
        pais : string;
        ciudad : string
    };
    politica : boolean;
}


@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent {
  nombre = signal('');
  apellido = signal('');
  tipo_doc = signal('CC');
  dni = signal('');
  fecha_nacimiento = signal('');
  correo = signal('');
  numCel = signal('');
  pais = signal('');
  ciudad = signal('');
  politica = signal(false);

  ultimoUsuario = signal<Usuario | null>(null);

  guardarUsuario() {
    if(!this.datos_personales()) {
      alert('Debe aceptar el tratamiento de datos personales.');
    }

    const usuarioCreado = {
    id : Date.now(),
    nombreCompleto : `${this.nombre()} ${this.apellido()}`,
    documento : {
        tipo: this.tipo_doc(),
        numero: this.dni()
    },
    fecha_nacimiento : this.fecha_nacimiento(),
    correo : this.correo(),
    numCel : this.numCel(),
    ubicacion : {
        pais : this.pais(),
        ciudad : this.ciudad()
    },
    politica : this.politica()
}

localStorage.setItem(usuarioGuardado.id.toString(), JSON.stringify(usuarioGuardado));

this.ultimoUsuario.set(usuarioCreado);
  }
}