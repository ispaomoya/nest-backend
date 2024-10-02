import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: AuthDto): Promise<any>;
}
