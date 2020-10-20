import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './restaurante.entity';
import { HorarioFuncionamento } from './horarioFuncionamento/horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, HorarioFuncionamento])],
  providers: [RestauranteService],
  controllers: [RestauranteController],
})
export class RestauranteModule {}
