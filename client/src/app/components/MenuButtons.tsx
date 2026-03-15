import { Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function MenuButtons() {

  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      spacing={4}
      justifyContent="center"
      sx={{
        backgroundColor: "#e9aab4",
        padding: 2
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/products")}
      >
        Produtos
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/brands")}
      >
        Marca
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/producttypes")}
      >
        Tipo de Produto
      </Button>

    </Stack>
  )
}