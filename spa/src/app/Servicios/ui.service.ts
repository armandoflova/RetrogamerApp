import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, duracion: number) {
   return this.snackBar.open(message, action, {
      duration: duracion,
    });
}
}
