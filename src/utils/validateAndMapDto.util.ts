import { UnprocessableEntityException, ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateAndMapDto<T extends object>(
  data: any[],
  dtoClass: new () => T,
): Promise<T[]> {
  const validatedResults: T[] = [];
  console.debug(`Data: `, data);

  for (const item of data) {
    const dto = plainToInstance(dtoClass, item);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const errorMessages: string = errors
        .map((err: ValidationError) =>
          Object.values(err.constraints).join(', '),
        )
        .join('; ');
      throw new UnprocessableEntityException(
        `Validation failed: ${errorMessages}`,
      );
    }

    validatedResults.push(dto);
  }

  return validatedResults;
}
