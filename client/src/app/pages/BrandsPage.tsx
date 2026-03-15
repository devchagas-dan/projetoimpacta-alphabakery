import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getBrands } from "../../services/api"

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
import MenuButtons from "../components/MenuButtons"
import type { Brand } from "../types/Brand"


export default function BrandsPage() {

  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
  const fetchBrands = async () => {
    const data = await getBrands()
    setBrands(data.content || data)
  }

  fetchBrands()
}, []);

  return (
    <>
      <Header />
      <MenuButtons/>

      <Box sx={{ padding: 4 }}>

        <Typography variant="h4" gutterBottom>
          Marcas
        </Typography>

        <TableContainer component={Paper}>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome da Marca</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {brands.map((brand) => (

                <TableRow key={brand.id}>

                  <TableCell>{brand.id}</TableCell>

                  <TableCell>{brand.name}</TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Box>
    </>
  )
}