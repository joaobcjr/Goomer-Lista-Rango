import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import {
  InsertRestauranteDto,
  GetRestauranteDto,
  PatchRestauranteDto,
  ResponseRestauranteDto,
} from './restaurante.dto';
import { Restaurante } from './restaurante.entity';

@Controller('restaurante')
export class RestauranteController {
  constructor(private restauranteService: RestauranteService) {}

  @Post()
  insertRestaurante(
    @Body(ValidationPipe) insertRestauranteDto: InsertRestauranteDto,
  ): Promise<Restaurante> {
    return this.restauranteService.insertRestaurante(insertRestauranteDto);
  }

  @Get('/:id')
  getRestauranteByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseRestauranteDto> {
    return this.restauranteService.getRestauranteById(id);
  }

  @Get()
  getRestaurante(
    @Query(ValidationPipe) getRestauranteDto: GetRestauranteDto,
  ): Promise<ResponseRestauranteDto[]> {
    return this.restauranteService.getRestaurante(getRestauranteDto);
  }

  @Patch('/:id')
  patchRestaurante(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) patchRestauranteDto: PatchRestauranteDto,
  ): Promise<ResponseRestauranteDto> {
    return this.restauranteService.patchRestaurante(id, patchRestauranteDto);
  }

  @Delete(':id')
  deleteRestaurante(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.restauranteService.deleteRestaurante(id);
  }
}
