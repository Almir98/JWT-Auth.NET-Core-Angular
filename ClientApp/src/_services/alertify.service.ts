import { Injectable } from '@angular/core';

declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message:string,okCallBak:()=>any)  // Yes no
{
  alertify.confirm(message,function(e){
    if(e)
    {
      okCallBak();
    }
    else{}
  });
}

public successAlert(content:string){
  alertify.success(content);
}

public errorAlert(content:string){
  alertify.error(content);
}

public warningAlert(content:string){
  alertify.warning(content);
}

public messageAlert(content:string)
{
  alertify.message(content);
}

}
