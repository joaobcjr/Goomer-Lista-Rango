import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class ValidarHorario implements ValidatorConstraintInterface {
  validate(horario: number): boolean {
    return horario > 2359 || horario < 0 ? false : true;
  }

  defaultMessage(): string {
    return 'Horário inválido';
  }
}

@ValidatorConstraint({ async: false })
export class ValidarDia implements ValidatorConstraintInterface {
  validate(dia: number): boolean {
    return dia > 7 || dia < 1 ? false : true;
  }

  defaultMessage(): string {
    return 'Dia inválido';
  }
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(horario_fim: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const horario_inicio = (args.object as any)[relatedPropertyName];

    const diferenca_tempo = horario_fim - horario_inicio;

    return (
      (diferenca_tempo > 14 && diferenca_tempo > 0) ||
      (diferenca_tempo < 0 && diferenca_tempo > -2346)
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} e ${args.property} devem ter um intervalo de 15 minutos`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
