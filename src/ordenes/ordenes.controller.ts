import { Controller, Post, Body, UseGuards, UseInterceptors, HttpException, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrdenDto } from './dto/createOrden.dto';
import { OrdenesService } from './ordenes.service';
import { Orden } from './interfaces/orden.interface';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { Payload } from '../auth/decorators/Payload.decorator';
import { JwtPayload } from '../auth/interfaces/jwtPayload.interface';

@Controller('ordenes')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard('jwt'))
export class OrdenesController {

    constructor( private _ordenService: OrdenesService) {}

    @Post('/realizarOrden')
    async realizarOrden(@Payload() payload: JwtPayload, @Body() body: CreateOrdenDto): Promise<Orden> {
        // console.log(JSON.stringify(body));
        if (!(body && body.items && body.items.trim().length > 0)) {
            throw new HttpException('Faltan los productos de la orden', HttpStatus.BAD_REQUEST);
        }

        const detalle: Array<string> = body.items.split(',');

        return await this._ordenService.createOrden(payload.userId, detalle);
    }

    @Get('/orden/:ordenId')
    async obtenerOrdenPorId(@Param() params): Promise<Orden> {
        return await this._ordenService.findById(params.ordenId);
    }

    @Get('/usuario/:usuarioId')
    async obtenerOrdenesPorUsuarioId(@Param() params): Promise<Orden[]> {
        return await this._ordenService.findByUsuarioId(params.usuarioId);
    }

    @Delete('/borrar/:ordenId')
    async borrarOrden(@Payload() payload: JwtPayload, @Param() params) {
        return await this._ordenService.borrarOrdenByIdAndUserId(params.ordenId, payload.userId);
    }
}
