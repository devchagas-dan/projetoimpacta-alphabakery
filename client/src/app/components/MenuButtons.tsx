import { Box, Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

type MenuButtonsProps = {
  createPath:string
}

export default function MenuButtons({ createPath} : MenuButtonsProps) {

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: "#e9aab4",
        padding: 2
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          sx={{ flex: 1 }}
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

           <Button
              variant="contained"
              onClick={() => navigate(createPath)}
              sx={{
                backgroundColor: "green",
                "&:hover": {
                  backgroundColor: "darkgreen"
                }
              }}
            >
          Cadastrar
        </Button>   
        </Stack>          
        
      </Stack>
    </Box>
  )
}