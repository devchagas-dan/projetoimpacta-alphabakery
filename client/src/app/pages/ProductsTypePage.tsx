import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getProductTypes, updateProductTypes } from "../../services/api"

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
import CheckIcon from "@mui/icons-material/Check"
import MenuButtons from "../components/MenuButtons"
import type { ProductType } from "../types/ProductType"

export default function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [editingProductTypeId, setEditingProductTypeId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState("")

  useEffect(() => {
    const fetchProductTypes = async () => {
      const data = await getProductTypes()
      setProductTypes(data.content || data)
    }

    fetchProductTypes()
  }, [])

  const handleEditClick = (productType: ProductType) => {
    setEditingProductTypeId(productType.id)
    setEditedName(productType.name)
  }

  const handleDeleteClick = (productTypeId: number) => {
    console.log("Deletar tipo de produto com id:", productTypeId)
  }

  const handleBlur = () => {
    setEditingProductTypeId(null)
    setEditedName("")
  }

  const handleUpdateProductType = async (productTypeId: number) => {
    const trimmedName = editedName.trim()

    if (!trimmedName) {
      setEditingProductTypeId(null)
      setEditedName("")
      return
    }

    try {
      const updatedProductType = await updateProductTypes(productTypeId, { name: trimmedName })

      setProductTypes((prevProductTypes) =>
        prevProductTypes.map((productType) =>
          productType.id === productTypeId
            ? { ...productType, name: updatedProductType.name }
            : productType
        )
      )

      setEditingProductTypeId(null)
      setEditedName("")
    } catch (error) {
      console.error("Erro ao atualizar tipo de produto:", error)
    }
  }

  return (
    <>
      <Header />
      <MenuButtons />

      <Box sx={{ padding: 10 }}>
        <Typography variant="h4" gutterBottom>
          Tipos de Produto
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Nome do Tipo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productTypes.map((productType) => (
                <TableRow key={productType.id}>
                  <TableCell>{productType.id}</TableCell>

                  <TableCell>
                    {editingProductTypeId === productType.id ? (
                      <TextField
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleBlur}
                        size="small"
                        fullWidth
                        autoFocus
                      />
                    ) : (
                      productType.name
                    )}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {editingProductTypeId === productType.id ? (
                        <Tooltip title="Confirmar edição" arrow>
                          <IconButton
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleUpdateProductType(productType.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Editar" arrow>
                          <IconButton onClick={() => handleEditClick(productType)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Deletar" arrow>
                        <IconButton onClick={() => handleDeleteClick(productType.id)}>
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