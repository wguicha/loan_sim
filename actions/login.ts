"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    console.log("Paso: 1 LOGIN")

    if(!validatedFields.success) {
        return { error: "Valores de campo invalido"}
    }

    return { success: "Valores de campo validos"}
}
