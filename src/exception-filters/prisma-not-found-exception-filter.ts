import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.error(exception)
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const errorMessage = exception.meta?.cause ?? exception.message

        
        // Registro não encontrado = P2025 
        exception.code === 'P2025' ? response.status(404).json({
            statusCode: 404,
            message: errorMessage,
        }) :  response.status(500).json({
            statusCode: 500,
            message: errorMessage,
        })
    }
}