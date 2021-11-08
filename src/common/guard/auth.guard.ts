import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core'; //反射器，作用与自定义装饰器桥接
import { ToolsService } from '../../utils/tools.service';

//自定义守卫必须实现自CanActivate，固定写法，该接口只有一个canActivate方法
//canActivate参数：
//context：请求的(Response/Request)的引用
//通过守卫返回true，否则返回false，返回403状态码
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) { }

  // 白名单数组
  private whiteUrlList: string[] = [];

  // 验证该次请求是否为白名单内的路由
  private isWhiteUrl(urlList: string[], url: string): boolean {
    if (urlList.includes(url)) {
      return true;
    }
    return false;
  }

  canActivate(context: ExecutionContext): boolean {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();

    // 验证是否是白名单内的路由
    if (this.isWhiteUrl(this.whiteUrlList, request.url)) return true;

    // 获取session
    // const userinfo = context.switchToHttp().getRequest().session;

    // 获取请求头中的token字段
    const token = context.switchToRpc().getData().headers.token;
    const user: any = this.jwtService.decode(token);
    if (!user) ToolsService.fail('token获取失败，请传递token或书写正确');

    // 用法二：使用反射器，配合装饰器使用，获取装饰器传递过来的数据
    const authRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    //如果没有使用roles装饰，就获取不到值，就不鉴权，等于白名单
    if (!authRoles) return true;

    //如果与装饰器传递过来的值匹配则通过，否则不通过

    const userRoles = user.roles;
    for (let i = 0; i < userRoles.length; i++) {
      if (authRoles.includes(userRoles[i].rolename)) {
        return true;
      }
    }
    return false;
  }
}
