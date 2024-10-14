"use server"
import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    console.log("Paso: 1 LOGIN: ", validatedFields)

    if (!validatedFields.success) {
        console.log("Cond 1: ", !validatedFields.success)
        return { error: "Valores de campo invalido" }
    }

    const { email, password } = validatedFields.data;

    try {
        console.log("Cond 2.1: ")
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

        console.log("Cond 2: ", validatedFields)
    } catch (error) {

        if (error instanceof AuthError) {
            console.log("Cond 3: ", error.type)
            switch (error.type) {
                case "CredentialsSignin":
                    console.log("Cond 4: ", error)
                    return { error: "Invalid Credentials" }
                default:
                    console.log("Cond 5: ", error)
                    return { error: "Something went wrong!!!" }
            }
        }
        console.log("Cond 6: ", isRedirectError(error))
        if (isRedirectError(error)) {
            throw error;
        };
    }


}
