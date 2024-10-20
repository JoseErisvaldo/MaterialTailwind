import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

const TABLE_HEAD = ["Id", "Nome", "Descrição", "Foto"];

export function TableCategory() {
  const [categories, setCategories] = useState([]);

  // Função para buscar categorias
  async function viewCategories() {
    let { data: categories, error } = await supabase
      .from('category')
      .select('*');
    
    if (error) {
      console.error("Erro ao carregar categorias", error);
    } else {
      setCategories(categories);
    }
  }

  useEffect(() => {
    viewCategories();

    const subscription = supabase
      .channel('public:category')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'category' }, payload => {
        console.log('Mudança detectada:', payload);
        viewCategories();
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
          {categories.map(({ id, name, description, photo }) => {
            return (
              <tr key={id}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-gray-600"
                  >
                    {id}
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
                    <img src={photo} alt={name} className="h-10 w-10 object-cover" />
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
