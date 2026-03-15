import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getProductTypes } from "../../services/api"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material"
import type { ProductType } from "../types/ProductType"
import MenuButtons from "../components/MenuButtons"


export default function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([])

  useEffect(() => {
  const fetchProductTypes = async () => {
    const data = await getProductTypes()
    setProductTypes(data.content || data)
  }

  fetchProductTypes()
}, []);

  return (
    <>
      <Header />
      <MenuButtons/>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tipos de Produto
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome do Tipo</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productTypes.map((productType) => (
                <TableRow key={productType.id}>
                  <TableCell>{productType.id}</TableCell>
                  <TableCell>{productType.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}