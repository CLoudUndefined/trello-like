import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from './columns.entity';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { UsersModule } from 'src/users/users.module';
import { ColumnOwnerGuard } from './guards/column-owner.guard';
import { ColumnAccessGuard } from './guards/column-access.guard';

@Module({
    imports: [TypeOrmModule.forFeature([BoardColumn]), UsersModule],
    providers: [ColumnsService, ColumnOwnerGuard, ColumnAccessGuard],
    controllers: [ColumnsController],
    exports: [ColumnsService, ColumnAccessGuard],
})
export class ColumnsModule {}
