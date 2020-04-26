import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Authorization } from '../Servicios/authorization.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  esVisible = false;
  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private  authorization: Authorization) { }

  ngOnInit() {
    const userRoles = this.authorization.decodedToken.role as Array<string>;
    // si noy roles hay que limpiar el viewcontainerRef;
    if (!userRoles){
      this.viewContainerRef.clear();
  }

    if (this.authorization.roleMatch(this.appHasRole))
  {
    if (!this.esVisible)
     {
       this.esVisible = true;
       this.viewContainerRef.createEmbeddedView(this.templateRef , {$implicit: Input});
     }
     else {
       this.esVisible = false;
       this.viewContainerRef.clear();
     }
  }
 }
}
