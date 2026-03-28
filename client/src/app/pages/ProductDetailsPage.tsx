import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import type {Brand} from "../types/Brand"
import type { Product } from "../types/Product";
import type { ProductType } from "../types/ProductType";



export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    pictureUrl: "",
    brandId: 0,
    productTypeId: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, brandsResponse, productTypesResponse] =
          await Promise.all([
            fetch(`http://localhost:8080/api/products/${id}`),
            fetch("http://localhost:8080/api/products/brands"),
            fetch("http://localhost:8080/api/products/producttypes")
          ]);

        if (!productResponse.ok) {
          throw new Error("Erro ao buscar produto");
        }

        if (!brandsResponse.ok) {
          throw new Error("Erro ao buscar marcas");
        }

        if (!productTypesResponse.ok) {
          throw new Error("Erro ao buscar tipos de produto");
        }

        const productData: Product = await productResponse.json();
        const brandsData: Brand[] = await brandsResponse.json();
        const productTypesData: ProductType[] = await productTypesResponse.json();

        setBrands(brandsData);
        setProductTypes(productTypesData);

        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          pictureUrl: productData.pictureUrl,
          brandId: productData.brand.id,
          productTypeId: productData.productType.id
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "quantity" ||
        name === "brandId" ||
        name === "productTypeId"
          ? Number(value)
          : value
    }));
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const selectedBrand = brands.find((brand) => brand.id === formData.brandId);
      const selectedProductType = productTypes.find(
        (type) => type.id === formData.productTypeId
      );

      if (!selectedBrand || !selectedProductType) {
        throw new Error("Marca ou tipo de produto inválido");
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        pictureUrl: formData.pictureUrl,
        brand: {
          id: selectedBrand.id          
        },
        productType: {
          id: selectedProductType.id          
        }
      };

      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

     

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        throw new Error(`Erro ao atualizar produto: ${errorText}`);
      }

      setSuccessMessage("Produto atualizado com sucesso!");

      setTimeout(() => {
        navigate("/products");
      }, 1200);
    } catch (error) {
      console.error("Erro completo:", error);
      setErrorMessage("Não foi possível atualizar o produto.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Detalhes do Produto
        </Typography>

        <Box
          component="img"
          src={`http://localhost:8080/uploads/${formData.pictureUrl}`}
          alt={formData.name}
          sx={{
            width: "100%",
            maxHeight: 260,
            objectFit: "cover",
            borderRadius: 2,
            mb: 3
          }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Preço"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Quantidade"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="URL da Imagem"
            name="pictureUrl"
            value={formData.pictureUrl}            
            fullWidth
            disabled
          />

          <TextField
            select
            label="Marca"
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            fullWidth
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Tipo de Produto"
            name="productTypeId"
            value={formData.productTypeId}
            onChange={handleChange}
            fullWidth
          >
            {productTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="outlined" fullWidth onClick={handleCancel}>
              Cancelar
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdate}
              disabled={saving}
            >
              {saving ? "Atualizando..." : "Atualizar"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}