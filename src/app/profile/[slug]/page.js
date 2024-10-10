// 'use server' deve ser removido a menos que você precise especificamente do código no servidor.

const exemplo = () => {
    return <h1>Hello World!</h1>;
  }
  
  // Correção da função generateStaticParams
  export async function generateStaticParams() {
    // Aqui você deve retornar uma lista de objetos, cada um representando um parâmetro dinâmico para a rota.
    // Exemplo com alguns slugs:
    const slugs = ['slug1', 'slug2', 'slug3'];
  
    // A função precisa retornar um array de objetos contendo o parâmetro slug
    return slugs.map(slug => ({
      slug: slug,
    }));
  }
  
  // Isso exporta o componente normalmente
  export default exemplo;
  