import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { BoardColumn } from './columns/columns.entity';
import { Card } from './cards/cards.entity';
import { Comment } from './comments/comments.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, BoardColumn, Card, Comment],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        ColumnsModule,
        CardsModule,
        CommentsModule,
    ],
})
export class AppModule {}
