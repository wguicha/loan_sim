"use server"
import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    console.log("Paso: 1 LOGIN: ", validatedFields)

    if (!validatedFields.success) {
        return { error: "Valores de campo invalido" }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

        console.log("Paso: LOGIN SUCCESS: ", validatedFields)
    } catch (error) {

        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong!!!" }
            }
        }

        throw error;
    }


}
