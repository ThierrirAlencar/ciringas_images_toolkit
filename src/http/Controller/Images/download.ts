import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getImage } from "../../../core/minio";

export async function downloadImage(req: FastifyRequest, res: FastifyReply) {
  const result = z.object({
    objectName: z.string().min(1),
  }).safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: "objectName is required" });
  }

  const { objectName } = result.data;
  const fileName = (objectName.split("/").pop() ?? "image.png").replace(/[^a-zA-Z0-9._-]/g, "_");

  try {
    const object = await getImage(objectName);

    return res.type("image/png").header(
      "Content-Disposition",
      `attachment; filename="${fileName}"`,
    ).send(object);
  } catch (error: any) {
    console.error("Unable to download image", error);
    const statusCode = error?.code === "NoSuchKey" ? 404 : 500;
    return res.status(statusCode).send({
      error: statusCode === 404 ? "Image not found" : "Unable to download image",
    });
  }
}