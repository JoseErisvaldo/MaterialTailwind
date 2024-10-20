import React, { useContext } from "react";
 
// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
 
// @icons
import { CpuChipIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../components/context/auth";
 
export function Auth() {
  const {Login} = useContext(AuthContext)

  function Auth(e) {
    e.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')
    Login(email,password)
    
  }
  return (
    <Card
      shadow={false}
      className="md:px-24 md:py-14 py-8 border border-gray-300"
    >
      <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:text-4xl"
        >
          Entrar
        </Typography>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={Auth}
          action="#"
          className="flex flex-col gap-4 md:mt-12"
        >
          <div>
            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Seu email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Senha
              </Typography>
            </label>
            <Input
              id="password"
              color="gray"
              size="lg"
              type="password"
              name="password"
              placeholder="**********"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <Button type="submit" size="lg" color="gray" fullWidth>
            Entrar
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
          >
            <CpuChipIcon className="h-6 w-6" />
            Wallet Authentication
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
 
export default Auth;