import { HorarioFuncionamento } from 'src/restaurante/horarioFuncionamento/horario.entity';

export function formatar_horario(Horarios: HorarioFuncionamento[]): any {
  const horarios = [null, null, null, null, null, null, null];

  const dias = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  for (const e of Horarios) {
    const horario_inicio = e.horario_inicio.toString().padStart(4, '0');
    const horario_fim = e.horario_fim.toString().padStart(4, '0');
    horarios[e.dia_semana - 1] = {
      dia: dias[e.dia_semana - 1],
      horario: `Das: ${horario_inicio.substr(0, 2)}:${horario_inicio.substr(
        2,
        4,
      )} às ${horario_fim.substr(0, 2)}:${horario_fim.substr(2, 4)}`,
    };
  }

  return horarios.map((e, i) => {
    if (e === null && horarios.length > 0)
      return { dia: dias[i], horario: `Fechado` };
    else return e;
  });
}
