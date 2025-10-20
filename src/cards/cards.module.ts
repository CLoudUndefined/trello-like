import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardOwnerGuard } from './guards/card-owner.guard';
import { CardAccessGuard } from './guards/card-access.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Card]), ColumnsModule],
    providers: [CardsService, CardOwnerGuard, CardAccessGuard],
    controllers: [CardsController],
    exports: [CardsService, CardAccessGuard],
})
export class CardsModule {}
