import AxiosConfig from './AxiosConfig';

const login = (usuario) => {
  return AxiosConfig.post('/usuarios/login', usuario);
};

const registrar = (usuario) => {
  return AxiosConfig.post('/usuarios/registro', usuario);
};

export default {login, registrar};
