import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import * as Joi from 'joi';
import { EventsGateway } from './events.gateway';

@Module({
	imports: [
		MatchmakingModule,
		GameModule,
		UsersModule,
		AuthModule,
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_PORT: Joi.number().required(),
				POSTGRES_DB: Joi.string().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRATION_TIME: Joi.string().required()
      		})
		}),
		DatabaseModule,
		ChatModule
	],
	providers: [EventsGateway]
})
export class AppModule {}