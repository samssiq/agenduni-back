import { Contato } from '../models/contatos';

export class ContatosRepository{

async createContato(data: {
  nome: string;
  email: string;
  telefone: string;}) {

  return await Contato.create(data);
  }



    
}
