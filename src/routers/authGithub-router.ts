import { Request, Response, Router } from 'express';
import userRepository from '@/repositories/user-repository';
import authenticationService from '@/services/authentication-service';
import axios from 'axios';
import { ApplicationError } from '@/protocols';

const githubRouter = Router();

githubRouter.post('/oauth/github/login', async (req: Request, res: Response) => {
  const code = req.body.code;

  const response = await axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  });

  const token = response.data.replace('access_token=', '').replace('&scope=&token_type=bearer', '');

  const userResponse = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const gitHubUser = userResponse.data;
  if (gitHubUser.email === null) throw unavailableEmailError();

  let registeredUser = await userRepository.findByEmail(gitHubUser.email);
  if (registeredUser === null) {
    const createUserData = { email: gitHubUser.email, password: 'null' };
    registeredUser = await userRepository.create(createUserData);
  }

  const newToken = await authenticationService.createSession(registeredUser.id);
  const resData = {
    user: { userId: registeredUser.id, email: registeredUser.email },
    token: newToken,
  };

  res.status(userResponse.status).send(resData);
});

function unavailableEmailError(): ApplicationError {
  return {
    name: 'unavailableEmailError',
    message: 'You cant not do login with a private email on github settings',
  };
}

export { githubRouter };
