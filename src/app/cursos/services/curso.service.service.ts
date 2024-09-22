import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc , getDoc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Curso } from '../interfaces/curso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoServiceService {

  constructor( private firestore: Firestore) { }

  addCurso(curso : any){
    const cursoRef = collection(this.firestore, 'cursos');
    return addDoc(cursoRef, curso);
  }

  getCursos(): Observable<any>{
    const cursoRef = collection(this.firestore, 'cursos');
    return collectionData(cursoRef, {idField: 'id'}) as Observable<any>;
  }

  getCurso(id_curso: string) {
    const cursoDocRef = doc(this.firestore, 'cursos', id_curso);

    return getDoc(cursoDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // console.log("Datos del curso:", docSnap.data());
          return docSnap.data();  // Retorna los datos del curso si existen
        } else {
          console.log("No se encontró el curso con el ID especificado.");
          return null;  // Manejo de cuando no se encuentra el documento
        }
      })
      .catch((error) => {
        console.error("Error al obtener el curso:", error);
      });
  }

  editarCurso(id: string | null, curso: any) {
    if (!id) {
      console.error('El ID del curso es nulo o indefinido.');
      return;  // Evita que se ejecute el código si el id es inválido
    }

    const cursoDocRef = doc(this.firestore, 'cursos', id);
    return updateDoc(cursoDocRef, curso)
      .then(() => console.log('Curso actualizado exitosamente'))
      .catch(error => console.error('Error al actualizar el curso:', error));
  }

  eliminarCurso(id: string | null) {

    if (!id) {
      console.error('El ID del curso es nulo o indefinido.');
      return;  // Evita que se ejecute el código si el id es inválido
    }

    const cursoDocRef = doc(this.firestore, 'cursos', id);
    return deleteDoc(cursoDocRef)
      .then(() => {
        console.log("Curso eliminado exitosamente");
      })
      .catch((error) => {
        console.error("Error eliminando el curso: ", error);
      });
  }

}
