import { useState } from "react";
import supabase from "../../lib/supabase";
import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";

export default function CreateCategory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  async function onSubmit(e) {
    e.preventDefault();

    const dados = [{
      name: e.target.name.value,
      description: e.target.description.value,
      photo: e.target.photo.value,
    }];

    try {
      const { data, error } = await supabase
        .from('category')
        .insert(dados)
        .select();

      if (data) {
        console.log("Categoria cadastrada com sucesso", data);
        handleCloseDialog();
      }

      if (error) {
        console.error("Erro ao cadastrar categoria", error);
      }

    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }

  return (
    <div>
      <div className="flex justify-end m-3">
        <Button onClick={handleOpen} color="blue">
          Nova Categoria
        </Button>  
      </div>
      <Dialog open={isDialogOpen} handler={handleCloseDialog}>
        <div className="p-6">
          <h3 className="text-xl font-semibold">Cadastrar Categoria</h3>
          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome da Categoria
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nome da categoria"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descrição da categoria"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="photo" className="block text-sm font-medium">
                Foto da Categoria (URL)
              </label>
              <Input
                id="photo"
                name="photo"
                type="text"
                placeholder="URL da foto da categoria"
                required
              />
            </div>

            <div className="mt-6">
              <Button type="submit" color="blue">
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
