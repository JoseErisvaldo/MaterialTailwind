import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
 
export function ListIngredients({item}) {
  return (
    <Card className="">
      <List>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {item && item.map((item) => (
            <ListItem>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {item.created_at}
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  {item.name_ingredient}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {item.description_ingredient}
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  {item.price_ingredient}
                </Typography>
              </div>
            </ListItem>
          ))}
        </div>
      </List>
    </Card>
  );
}