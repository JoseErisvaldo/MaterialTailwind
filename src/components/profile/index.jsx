import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import supabase from "../../lib/supabase";
import { useEffect, useState } from "react";
 
export function ProfileCard() {
  const [user, setUser] = useState()

  async function FetchUser () {
    let {data: user, error} = await supabase
    .from('viewusers')
    .select('*')
    console.log(user)
    setUser(user)
  }
  useEffect(() => {
    FetchUser()
  },[])
  return (
    <Card className="w-96">
      
      
      {user && user.map((item) => (
        <div key={item.user_id}>
          <CardHeader floated={false} className="h-80">
            <img src="https://i.pinimg.com/736x/9e/d5/95/9ed595846835238de9e19b8e3d79f0f1.jpg" alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {item.nome}
              </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {item.type}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {item.descricao}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {item.empresa}
            </Typography>
          </CardBody>
        </div>
      ))}
    </Card>
  );
}