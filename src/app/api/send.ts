import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '../../../services/mailService';

interface CustomNextApiRequest extends NextApiRequest {
  auth_data?: any; // Замените `any` на точный тип данных, если он известен
}

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        // Do something
        await sendMail(
          "TEST",
          "maximov.roman0604@gmail.com",
          "THIS IS A TEST FOR MY MEDIUM USERS"
        );
        res.status(200).send("Success");
        break;
      }
      case "GET": {
        // Do something
        if (req.auth_data) {
          res.status(200).send(req.auth_data);
        } else {
          res.status(400).json({ message: "auth_data not found" });
        }
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err: any) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;
