import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import { loginValidation } from '../middlewares/validation';

const sessionRoutes = Router();

sessionRoutes.post('/', loginValidation, async (req, res) => {
  /**
   * 1: Criar o serviço
   * 2: trycatch
   * responder a requisiçãoo
   */

  try {
    const { email, password } = req.body;
    const createSession = new CreateSessionService();

    const session = await createSession.execute({ email, password });
    delete session.user.password;
    return res.json(session);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default sessionRoutes;
