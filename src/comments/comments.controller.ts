import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as express from 'express';
import { User } from 'src/users/users.entity';
import { CommentDto } from './dto/comment.dto';
import { CommentOwnerGuard } from './guards/comment-owner.guard';
import { CardAccessGuard } from 'src/cards/guards/card-access.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentResponseDto } from './dto/comment-response.dto';

@ApiTags('Comments')
@ApiBearerAuth('JWT-auth')
@Controller()
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Create a new comment on a card' })
    @ApiResponse({
        status: 201,
        description: 'Comment created.',
        type: CommentResponseDto,
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You do not have access to this card.',
    })
    @UseGuards(JwtAuthGuard, CardAccessGuard)
    @Post('cards/:cardId/comments')
    async create(
        @Param('cardId', ParseIntPipe) cardId: number,
        @Req() req: express.Request,
        @Body() commentDto: CommentDto,
    ) {
        const user = req.user as User;
        return await this.commentsService.create(cardId, user.id, commentDto);
    }

    @ApiOperation({ summary: 'Get all comments on a card' })
    @ApiResponse({
        status: 200,
        description: 'Return all comments on the card.',
        type: [CommentResponseDto],
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You do not have access to this card.',
    })
    @UseGuards(JwtAuthGuard, CardAccessGuard)
    @Get('cards/:cardId/comments')
    async findAll(@Param('cardId', ParseIntPipe) cardId: number) {
        return await this.commentsService.findAll(cardId);
    }

    @ApiOperation({
        summary: 'Get a single comment by ID (not used in UI, for completeness)',
    })
    @ApiResponse({
        status: 200,
        description: 'Return the comment.',
        type: CommentResponseDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    @UseGuards(JwtAuthGuard, CommentOwnerGuard)
    @Get('comments/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.commentsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update your comment' })
    @ApiResponse({
        status: 200,
        description: 'Comment updated.',
        type: CommentResponseDto,
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You can only update your own comments.',
    })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    @UseGuards(JwtAuthGuard, CommentOwnerGuard)
    @Put('comments/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() commentDto: CommentDto) {
        return await this.commentsService.update(id, commentDto);
    }

    @ApiOperation({ summary: 'Delete your comment' })
    @ApiResponse({ status: 200, description: 'Comment deleted.' })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. You can only delete your own comments.',
    })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    @UseGuards(JwtAuthGuard, CommentOwnerGuard)
    @Delete('comments/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.commentsService.remove(id);
        return { message: 'Comment deleted' };
    }
}
