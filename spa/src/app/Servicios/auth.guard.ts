import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Authorization } from './authorization.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: Authorization, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    if(roles) 
      {
        const match = this.authService.roleMatch(roles);
        console.log(match);
        
        if(match)
        {
          return true;
        }
        else {
          this.router.navigate(['/admin']);
        }
      }    
    if (this.authService.loggedIn()) {
      return true;
    }
     this.router.navigate(['/home']);
    return false;
  }
}