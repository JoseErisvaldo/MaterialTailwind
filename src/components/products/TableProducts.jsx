import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { Link } from "react-router-dom";
 
const TABLE_HEAD = ["Sku", "Nome", "Descrição", "Categoria", "Preço", "Ação"];
 
export function TableProducts() {
  const [products, setProducts] = useState([])
  async function viewProducts() {
    let { data: products, error} = await supabase
    .from('viewproducts')
    .select('*')
    setProducts(products)
    console.log(products)
  }

  useEffect(() => {
    viewProducts();

    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
        console.log('Mudança detectada:', payload);
        viewProducts();
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
          {products && products.map(({sku, nameproduct, descriptionproduct, namecategory, priceproduct }) => {
            return (
              <tr key={sku}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-gray-600"
                  >
                    {sku}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-gray-600"
                  >
                    {nameproduct}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {descriptionproduct}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {namecategory}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {priceproduct}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    <Link to={`editproduct/${sku}`} >
                    <Button>Editar</Button>
                    </Link>
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
                
              >
                Total
              </Typography>
            </td>
            <td className="p-4"></td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                
              >
                5
              </Typography>
            </td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                
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