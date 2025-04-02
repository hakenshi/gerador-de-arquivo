'use server'

import { Users } from '@prisma/client';
import db from '../../../../prisma/prisma';
import { hashPassword } from '@/server/bcrypt';
import { UserFormValues } from './schema';
import { revalidatePath } from 'next/cache';


// Recupera todos os usuários
export async function getUsers(): Promise<Users[]> {
    return await db.users.findMany({
        orderBy: [
            {
                firstName: 'asc'
            }
        ]
    });
}

// Recupera um usuário pelo ID
export async function getUserById(id: number): Promise<Users | null> {
    return await db.users.findUnique({
        where: { id },
        select: {
            id: true,
            firstName: true,
            secondName: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

// Cria um novo usuário
export async function createUser(data: UserFormValues) {
    try {
        const user = await db.users.create({ data: { ...data, password: await hashPassword(data.password) } });

        if (user) {
            revalidatePath("/usuarios")
            return {
                status: 201,
                message: "Usuário cadastrado com sucesso."
            };
        }
        return {
            status: 500,
            message: "Erro ao cadastrar o usuário."
        };
    } catch (error) {
        if (error instanceof SyntaxError) {
            return {
                status: 400,
                message: "Erro ao processar o JSON fornecido."
            };
        }

        return {
            status: 500,
            message: "Erro interno do servidor.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        };
    }
}

// Atualiza um usuário existente
export async function updateUser(id: number, data: Partial<UserFormValues>) {
    try {
        const user = await db.users.findFirstOrThrow({
            where: { id }
        })
        const updatedUser = await db.users.update({
            where: { id },
            data: {
                password: data.password ? await hashPassword(data.password) : user.password,
                email: data.email ?? user.email,
                firstName: data.firstName ?? user.firstName,
                secondName: data.secondName ?? user.secondName
            }
        })
        if (updatedUser) {
            revalidatePath("/usuarios")
            return {
                status: 200,
                message: "Usuário atualizado com sucesso.",
            }
        }
        return {
            status: 500,
            message: "Erro ao atualizar usuário"
        }
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            return {
                status: 400,
                message: "Erro ao processar o JSON fornecido."
            };
        }

        return {
            status: 500,
            message: "Erro interno do servidor.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        };
    }
}
// Remove um usuário
export async function deleteUser(id: number) {
    try {
        const user = await db.users.delete({ where: { id } });
        
        if (user) {
            revalidatePath("/usuarios");
            return {
                status: 200,
                message: "Usuário removido com sucesso."
            };
        }
        
        return {
            status: 500,
            message: "Erro ao remover o usuário."
        };
    } catch (error) {
        if (error instanceof SyntaxError) {
            return {
                status: 400,
                message: "Erro ao processar o JSON fornecido."
            };
        }

        return {
            status: 500,
            message: "Erro interno do servidor.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        };
    }
}