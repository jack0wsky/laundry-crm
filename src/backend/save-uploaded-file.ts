import formidable from "formidable";
import path from "path";
import { NextApiRequest } from "next";

export const saveUploadedFile = async (
  req: NextApiRequest,
): Promise<formidable.File | undefined> => {
  const form = formidable({
    uploadDir: path.join(process.cwd(), "/public/files/"),
    keepExtensions: true,
    filename: (name, ext) => `${name}${ext}`,
  });

  const [_, files] = await form.parse(req);

  return files.file?.[0];
};
