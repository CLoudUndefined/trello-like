import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(userDto: AuthDto) {
        const existingUser = await this.usersService.findByEmail(userDto.email);
        if (existingUser) {
            throw new ConflictException('Email is already taken by another user');
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        const user = await this.usersService.create({
            ...userDto,
            password: hashedPassword,
        });

        return user;
    }

    async login(authDto: AuthDto) {
        const user = await this.usersService.findByEmail(authDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatching = await bcrypt.compare(authDto.password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userId: number) {
        const user = await this.usersService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException('Invalid id');
        }

        return user;
    }
}
