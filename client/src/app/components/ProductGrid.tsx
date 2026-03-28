import { useEffect, useState } from "react"
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material"
import type { Product } from "../types/Product"
import { getProducts } from "../../services/api"
import { useNavigate } from "react-router-dom";

export default function ProductGrid() {

  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data.content || data)
    }

    fetchProducts()

  }, [])

  return (

    <Grid container spacing={3} padding={4}>

      {products.map(product => (

        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>

          <Card>

            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:8080/uploads/${product.pictureUrl}`}
              onClick={() => navigate(`/products/${product.id}`)}
            />

            <CardContent>

              <Typography variant="h6">
                {product.name}
              </Typography>

              <Typography>
                R$ {product.price}
              </Typography>

              <Typography>
                Descrição: {product.description}
              </Typography>

              <Typography>
                Marca: {product.brand?.name}
              </Typography>

              <Typography>
                Tipo: {product.productType?.name}
              </Typography>

              <Typography>
                Estoque: {product.quantity}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  )
}