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
  Typography,
  IconButton,
  TextField,
  Tooltip
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import MenuButtons from "../components/MenuButtons"
import type { Brand } from "../types/Brand"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [editingBrandId, setEditingBrandId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState("")

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands()
      setBrands(data.content || data)
    }

    fetchBrands()
  }, [])

  const handleEditClick = (brand: Brand) => {
    setEditingBrandId(brand.id)
    setEditedName(brand.name)
  }

  const handleDeleteClick = (brandId: number) => {
    console.log("Deletar marca com id:", brandId)
  }

  const handleBlur = () => {
    setEditingBrandId(null)
    setEditedName("")
  }

  return (
    <>
      <Header />
      <MenuButtons />

      <Box sx={{ padding: 10 }}>
        <Typography variant="h4" gutterBottom>
          Marcas
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Nome da Marca
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>

                  <TableCell>
                    {editingBrandId === brand.id ? (
                      <TextField
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleBlur}
                        size="small"
                        fullWidth
                        autoFocus
                      />
                    ) : (
                      brand.name
                    )}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Editar" arrow>
                        <IconButton onClick={() => handleEditClick(brand)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Deletar" arrow>
                        <IconButton onClick={() => handleDeleteClick(brand.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}