import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefult';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForme';
import FormField from '../../../components/FormField';
import videosRepository from '../../../reposirories/videos';
import categoriasRepository from '../../../reposirories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault link="/cadastro/categoria">
      <h1>Novo Vídeo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const categoriaEscolhida = categorias.find((categoria) => {
            console.log(values);
            return categoria.titulo === values.categoria;
          });
          console.log('Categoria escolhida', categoriaEscolhida);

          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
            .then(() => {
              console.log('Cadastrou com sucesso!');
              history.push('/');
            });
        }}
      >
        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
    </PageDefault>
  );
}

export default CadastroVideo;
