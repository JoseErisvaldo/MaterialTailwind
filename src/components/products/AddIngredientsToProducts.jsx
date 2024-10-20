import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../lib/supabase";

export function AddIngredientsToProducts({ button, sku }) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para capturar erros

  const handleOpen = () => setOpen(!open);

  // Função para buscar os ingredientes do Supabase
  async function ViewIngredients() {
    try {
      let { data: ingredients, error } = await supabase
        .from("ingredients")
        .select("*");
      if (error) throw error;
      setIngredients(ingredients);
    } catch (error) {
      console.error("Erro ao buscar ingredientes:", error);
    }
  }

  useEffect(() => {
    ViewIngredients();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); // Ativa o loading

    try {
      // Obtém o usuário autenticado
      const {
        data: { user },
      } = await supabase.auth.getUser(); // Obtém o usuário autenticado corretamente

      const userId = user?.id; // Captura o user_id

      console.log({ ingredient: selectedIngredient, sku: sku, price: price, user_id: userId });

      // Insere o ingrediente com o user_id correto
      const { data, error } = await supabase
        .from("ingredients_in_the_product")
        .insert([{ ingredient: selectedIngredient, sku: sku, price: price, user_id: userId }])
        .select();

      if (error) throw error;

      if (data) {
        setOpen(false); // Fecha o modal
        setLoading(false); // Desativa o loading
        setSelectedIngredient(""); // Reseta o ingrediente selecionado
        setPrice(""); // Reseta o campo de preço
        console.log("Ingrediente adicionado com sucesso", data);
      }
    } catch (error) {
      console.error("Erro ao adicionar ingrediente:", error);
      setError(error.message); // Armazena o erro
      setLoading(false); // Desativa o loading em caso de erro
    }
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {button}
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <form onSubmit={onSubmit}>
          <DialogHeader className="relative m-0 block">
            <Typography className="mt-1 font-normal text-gray-600 text-2xl">
              Inserir novos ingredientes
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5"
              onClick={handleOpen}
            >
              <XMarkIcon className="h-4 w-4 stroke-2" />
            </IconButton>
          </DialogHeader>

          <DialogBody className="space-y-4 pb-6">
            {/* Exibe uma mensagem de erro, caso exista */}
            {error && (
              <Typography color="red" className="text-sm">
                Erro: {error}
              </Typography>
            )}

            {/* Selecionar Ingrediente */}
            <Select
              size="md"
              label="Selecionar ingrediente"
              value={selectedIngredient || ""}
              onChange={(value) => {
                const selectedItem = ingredients.find(
                  (item) => item.name === value
                );
                setSelectedIngredient(selectedItem?.ingredients);
              }}
            >
              {ingredients &&
                ingredients.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
            </Select>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Preço
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Preço"
                name="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)} // Captura o valor do preço
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button className="ml-auto" type="submit" color="blue" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
