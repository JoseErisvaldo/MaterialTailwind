import CreateCategory from "../../components/products/CreateIngredients";
import { TableCategory } from "../../components/products/TableCategory";
import ContainerChildren from "../../widgets/layout/ContainerChildren";

export default function Category () {
  return(
    <ContainerChildren title={'Categoria'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div>
        <CreateCategory />
        <TableCategory />
      </div>
    </ContainerChildren>
  )
}