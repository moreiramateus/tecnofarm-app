export type CepResponse = {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
  };
  
  export async function buscarEnderecoPorCep(cep: string): Promise<CepResponse | null> {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: CepResponse = await response.json();
  
      if (data.erro) return null;
      return data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      return null;
    }
  }
  