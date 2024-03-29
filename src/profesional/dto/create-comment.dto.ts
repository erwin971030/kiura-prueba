import { User } from "src/auth/entities/user.entity";
import { Profesional } from "../entities/profesional.entity";

export class CreateCommentDto{

    title: string;
    
    starts: number;
    
    comment: string;

    user?: User;
}