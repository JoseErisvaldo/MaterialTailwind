import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
 
const TABLE_HEAD = ["Id", "Ingrediente", "Descrição", "Preço"];
 
export function TableIngredients() {
  const [products, setProducts] = useState([])
  async function viewIngredients() {
    let { data: ingredients, error} = await supabase
    .from('ingredients')
    .select('*')
    setProducts(ingredients)
  }

  useEffect(() => {
    viewIngredients();

    const subscription = supabase
      .channel('public:ingredients')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ingredients' }, payload => {
        console.log('Mudança detectada:', payload);
        viewIngredients();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <Card className="h-[720px] w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(({ingredients, name, description, price }) => {
            return (
              <tr key={ingredients}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-gray-600"
                  >
                    {ingredients}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-gray-600"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {description}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {price}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/*
        <tfoot className="border-t border-gray-300">
          <tr>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-normal text-gray-600"
              >
                Total
              </Typography>
            </td>
            <td className="p-4"></td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-normal text-gray-600"
              >
                5
              </Typography>
            </td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-normal text-gray-600"
              >
                $1609.95
              </Typography>
            </td>
          </tr>
        </tfoot>*/}
      </table>
    </Card>
  );
}