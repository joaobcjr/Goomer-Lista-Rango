import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { GetPromocaoDto, InsertPromocaoDto, PatchPromocaoDto, ResponsePromocaoDto } from './promocao.dto';
import { PromocaoService } from './promocao.service';

@Controller('promocao')
export class PromocaoController {
    constructor(private promocaoService: PromocaoService) {}

    @Post()
    insertPromocao(
      @Body(ValidationPipe) insertPromocaoDto: InsertPromocaoDto): Promise<ResponsePromocaoDto> {
      return this.promocaoService.insertPromocao(insertPromocaoDto);
    }

    @Get('/:id')
    getPromocaoByID(@Param('id', ParseIntPipe) id: number): Promise<ResponsePromocaoDto> {
      return this.promocaoService.getPromocaoById(id);
    }

    @Get()
    getPromocao(
      @Query(ValidationPipe) getPromocaoDto: GetPromocaoDto,
    ): Promise<ResponsePromocaoDto[]> {
      return this.promocaoService.getPromocao(getPromocaoDto);
    }

    @Patch('/:id')
    patchPromocao(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe) patchPromocaoDto: PatchPromocaoDto,
    ): Promise<ResponsePromocaoDto> {
      return this.promocaoService.patchPromocao(id, patchPromocaoDto);
    }
}
