"use server"

import * as z from "zod";
import bcrypt from "bcrypt"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas";
import { error } from "console";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    console.log("Paso: 1")

    if(!validatedFields.success) {
        return { error: "Valores de campo invalido"}
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    });



    if (existingUser) {
        return { error: "Email Already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    //  TODO: Send verification token email!!!

    return { success: "User created!!!"}
}