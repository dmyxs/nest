import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
//必须实现自PipeTransform，并且必须传递string类型的值，该接口有一个transform方法
//transform参数：
//value：使用myPipe时所传递的值，可以是param传递的的查询路径参数，可以是body的请求体
//metadata：元数据，可以用它判断是来自param或body或query
export class myPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      console.log('来自请求体', value);
    }
    if (metadata.type === 'param') {
      console.log('来自查询路径', value);

      const val = parseInt(value, 10);
      if (isNaN(val)) {
        throw new BadRequestException('Validation failed');
      }
      return val;
    }

    return value;
  }
}
