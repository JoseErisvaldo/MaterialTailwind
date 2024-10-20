import { useState } from "react";
import supabase from "../../lib/supabase";
import { Alert, Button, Dialog, Input, Textarea } from "@material-tailwind/react";

export default function CreateProduct() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState({
    dialog: false,
    mensagen: '',
    color: ''
  })

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
      category: e.target.category.value,
      price: e.target.price.value,
      photo: e.target.photo.value
    }];

    try {
      const { data, error } = await supabase
        .from('products')
        .insert(dados)
        .select();

      if (data) {
        setStatus({
          dialog:true,
          mensagen: 'Produto cadastrado com sucesso',
          color: 'green'
        })
        console.log("Produto cadastrado com sucesso", data);
       setTimeout(() => {
        setStatus({
          dialog: false,
          mensagen: '',
          color: ''
        })
        handleCloseDialog();
       }, 3000);
      }

      if (error) {
        console.error("Erro ao cadastrar produto", error);
      }

    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }

  return (
    <div>
      <div className="flex justify-end m-3">
        <Button onClick={handleOpen} color="blue">
          Novo produto
        </Button>  
      </div>
      <Dialog open={isDialogOpen} handler={handleCloseDialog}>
        <div className="p-6">
          <h3 className="text-xl font-semibold">Cadastrar Produto</h3>
          {status.dialog && <Alert color={status.color}>{status.mensagen}</Alert> }
          
          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nome do produto"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Descrição do produto
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descrição do produto"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="category" className="block text-sm font-medium">
                Categoria (ID)
              </label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="ID da categoria"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="price" className="block text-sm font-medium">
                Preço
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Preço do produto"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="photo" className="block text-sm font-medium">
                Foto do produto (URL)
              </label>
              <Input
                id="photo"
                name="photo"
                type="text"
                placeholder="URL da foto do produto"
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
