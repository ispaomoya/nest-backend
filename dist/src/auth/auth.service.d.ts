import { AuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(data: AuthDto): Promise<any>;
}
