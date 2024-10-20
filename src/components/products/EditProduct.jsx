import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";
import { Alert, Button, Card, Dialog, Input, Textarea } from "@material-tailwind/react";
import { ListIngredients } from "./ListIngredients";
import { AddIngredientsToProducts } from "./AddIngredientsToProducts";

export default function EditProduct({ productId }) {
  const [productData, setProductData] = useState(null);
  const [status, setStatus] = useState({
    dialog: false,
    mensagen: '',
    color: ''
  });
  const [ingredientsInTheProducts, setIngredientsInTheProducts] = useState()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('sku', productId)
          .single();
        
        if (data) {
          setProductData(data);
        } else if (error) {
          console.error("Erro ao buscar produto", error);
        }
      } catch (error) {
        console.error("Erro na requisição", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  async function onSubmit(e) {
    e.preventDefault();

    const updatedData = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      price: e.target.price.value,
      photo: e.target.photo.value
    };

    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedData)
        .eq('sku', productId);

      if (data) {
        setStatus({
          dialog: true,
          mensagen: 'Produto atualizado com sucesso',
          color: 'green'
        });
        console.log("Produto atualizado com sucesso", data);
        setTimeout(() => {
          setStatus({
            dialog: false,
            mensagen: '',
            color: ''
          });
          handleCloseDialog();
        }, 3000);
      }

      if (error) {
        console.error("Erro ao atualizar produto", error);
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }


  const list = [{
    name: 'teste',
    price: 12
  }]

  async function viewIngredientsInTheProducts() {
    try {
      const { data, error } = await supabase
        .from('viewingredients_in_the_product')
        .select('*')
        .eq('sku', productId);
      if (error) throw error;

      if (data) {
        setIngredientsInTheProducts(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Erro ao buscar ingredientes:", error);
    }
  }

  useEffect(() => {
    viewIngredientsInTheProducts();

    const subscription = supabase
      .channel('public:viewingredients_in_the_product')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'viewingredients_in_the_product' }, payload => {
        console.log('Mudança detectada:', payload);
        viewIngredientsInTheProducts(); // Chama novamente a função para buscar dados após uma mudança
      })
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Limpa a inscrição quando o componente é desmontado
    };
  }, []);



  return (
    <div>
      <Card >
        <div className="p-6">
          <h3 className="text-xl font-semibold">Editar Produto</h3>
          {status.dialog && <Alert color={status.color}>{status.mensagen}</Alert>}

          {productData ? (
            <form onSubmit={onSubmit}>
              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={productData.name}
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
                  defaultValue={productData.description}
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
                  defaultValue={productData.category}
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
                  defaultValue={productData.price}
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
                  defaultValue={productData.photo}
                  required
                />
              </div>
              <div className="mt-5 mb-5">
                <AddIngredientsToProducts button={'Adicionar ingredientes'} sku={productId}/>
              </div>
              <div>
                <ListIngredients item={ingredientsInTheProducts} />
              </div>
              <div className="mt-6">
                <Button type="submit" color="blue">
                  Atualizar
                </Button>
              </div>
            </form>
          ) : (
            <div>Carregando dados do produto...</div>
          )}
        </div>
      </Card>
    </div>
  );
}
