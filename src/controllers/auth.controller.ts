import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {toDTO} from "../utils/transform-response";
import {UserResponseDTO} from "../schemas/user.dto";

export class AuthController {

    /**
     * Register a new user
     * @param req
     * @param res
     */
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: toDTO(UserResponseDTO, user),
            });
        } catch (e) {
            res.status(400).json({ success: false, message: 'Registration failed' });
        }
    }

    /**
     * Login a user
     * @param req
     * @param res
     */
    static async login(req: Request, res: Response) {
        try {
            const data = await AuthService.login(req.body.email, req.body.password);
            res.json({
                success: true,
                message: 'Login successful',
                data: toDTO(UserResponseDTO, data.user),
                accessToken: data.token,
            });
        } catch (e) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }
}