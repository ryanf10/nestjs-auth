import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    });
  }

  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(
          this.handleError(e.getResponse()),
        );
      }
    }
  }

  private handleError(errors) {
    const { message, ...errorResponse } = errors;
    errorResponse['message'] = {};
    errors.message.forEach((error) => {
      errorResponse['message'][error.property] = [];
      for (const [, value] of Object.entries(error.constraints)) {
        errorResponse['message'][error.property].push(value);
      }
    });
    return errorResponse;
  }
}
