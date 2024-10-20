import CreateProduct from "../../components/products/CreateProducts";
import { TableProducts } from "../../components/products/TableProducts";
import ContainerChildren from "../../widgets/layout/ContainerChildren";

export default function Products () {
  return(
    <ContainerChildren title={'Produtos'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div>
        <CreateProduct />
        <TableProducts />
      </div>
    </ContainerChildren>
  )
}