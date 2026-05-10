import { useEffect, useState } from "react"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Tooltip,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material"
import type { Product } from "../types/Product"
import { getProducts } from "../../services/api"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate()

  const handleDeleteClick = (productId: number) => {
    if(isDeleting) return

    setSelectedProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleCancelDelete = () => {
    if(isDeleting) return 

    setOpenConfirmModal(false)
    setSelectedProductId(null)
  }

  const handleConfirmDelete = async () => {
    if(isDeleting || selectedProductId === null) return

    try{
      setIsDeleting(true)
      console.log("Produto confirmado para deletar:", selectedProductId)
    } finally{
      setIsDeleting(false)
      setOpenConfirmModal(false)
      setSelectedProductId(null)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data.content || data)
    }

    fetchProducts()
  }, [])

  return (
    <>
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

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>
                    Estoque: {product.quantity}
                  </Typography>

                  <Tooltip title="Deletar" arrow>
                    <span>
                    <IconButton 
                      onClick={() => handleDeleteClick(product.id)}
                      disabled={isDeleting}
                      >
                      <DeleteIcon />
                    </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openConfirmModal}
        onClose={handleCancelDelete}
      >
        <DialogTitle>
          Confirmar exclusão
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar este produto?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={handleCancelDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}            
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeleting}            
          >
            {isDeleting? (
              <CircularProgress size={20} />
            ): ("Deletar"

            )}            
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}