import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ColumnAccessGuard } from 'src/columns/guards/column-access.guard';
import { CardOwnerGuard } from './guards/card-owner.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardResponseDto } from './dto/card-response.dto';

@ApiTags('Cards')
@ApiBearerAuth('JWT-auth')
@Controller()
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @ApiOperation({ summary: 'Create a new card in a column' })
    @ApiResponse({
        status: 201,
        description: 'Card created.',
        type: CardResponseDto,
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You do not have access to this column.',
    })
    @UseGuards(JwtAuthGuard, ColumnAccessGuard)
    @Post('columns/:columnId/cards')
    async create(@Param('columnId', ParseIntPipe) columnId: number, @Body() createCardDto: CreateCardDto) {
        return await this.cardsService.create(columnId, createCardDto);
    }

    @ApiOperation({ summary: 'Get all cards in a column' })
    @ApiResponse({
        status: 200,
        description: 'Return all cards in the column.',
        type: [CardResponseDto],
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You do not have access to this column.',
    })
    @UseGuards(JwtAuthGuard, ColumnAccessGuard)
    @Get('columns/:columnId/cards')
    async findAll(@Param('columnId', ParseIntPipe) columnId: number) {
        return await this.cardsService.findAll(columnId);
    }

    @ApiOperation({ summary: 'Get a single card by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return the card.',
        type: CardResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    @UseGuards(JwtAuthGuard, CardOwnerGuard)
    @Get('cards/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.cardsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a card' })
    @ApiResponse({
        status: 200,
        description: 'Card updated.',
        type: CardResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    @UseGuards(JwtAuthGuard, CardOwnerGuard)
    @Put('cards/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
        return await this.cardsService.update(id, updateCardDto);
    }

    @ApiOperation({ summary: 'Delete a card' })
    @ApiResponse({ status: 200, description: 'Card deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    @UseGuards(JwtAuthGuard, CardOwnerGuard)
    @Delete('cards/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.cardsService.remove(id);
        return { message: 'Card deleted' };
    }
}
