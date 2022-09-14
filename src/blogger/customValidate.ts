import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { BloggerService } from './blogger.service';

export function BlogIsExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BlogIsExistRule,
    });
  };
}

@ValidatorConstraint({ name: 'BlogIsExist', async: false })
@Injectable()
export class BlogIsExistRule implements ValidatorConstraintInterface {
  constructor(private blogService: BloggerService) {}

  async validate(value: string) {
    try {
      const blog = await this.blogService.findOneForCustomDecorator(value)
      if(blog) {
        return true
      } else return false
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Blog doesn't exist`;
  }
}

