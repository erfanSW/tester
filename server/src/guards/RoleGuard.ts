import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let user; 
    this.userService.findOne(request.user.id).then(res => {
      user = res;
    }).then(() => {
      console.log(user)
    });
    return true;
  }
}
