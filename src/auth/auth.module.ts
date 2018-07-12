import {UsuariosModule} from 'usuarios/usuarios.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsuariosModule } from 'usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [UsuariosModule],
  controllers: [AuthController],
})
export class AuthModule {}
