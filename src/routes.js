import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.post("/user", async (req, res) => {

  try {
    const { name, email } = req.body;

    //Verifica se o e-mail é único
    const user = await prisma.user.findUnique({ where: { email } });

    if(user){
        return res.json({ error: "Já existe um usuário com esse e-mail" })
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.json(user);
  } catch (error) {
    
  }
});

export { router };
