// https://medium.com/reactbrasil/mascara-de-cpf-com-react-javascript-a07719345c93

export const cpfMask = (value: string) => {
    return value
      // Substitui qualquer caractere que nao seja número por nada
      .replace(/\D/g, '') 
      // Captura 2 grupos de números, o primeiro de 3 e o segundo de 1, após capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de números	
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
       // Captura 2 números seguidos de um traço e não deixa ser digitado mais nada
      .replace(/(-\d{2})\d+?$/, '$1')
  }