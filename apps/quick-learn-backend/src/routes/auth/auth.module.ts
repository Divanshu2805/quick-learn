import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetTokenEntity } from '@src/entities/reset-token.entity';
import { UserEntity } from '@src/entities/user.entity';
import { EmailModule } from '@src/common/modules';
import { JwtStrategy, LocalStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecretkey'),
        signOptions: {
          expiresIn: `${configService.getOrThrow('app.jwtExpiryTimeInDays')}d`,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ResetTokenEntity, UserEntity]),
    EmailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
