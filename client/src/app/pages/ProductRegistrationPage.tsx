import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Menu,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";

import type { Brand } from "../types/Brand";
import type { ProductType } from "../types/ProductType";

export default function ProductRegistrationPage() {

    const navigate = useNavigate();

    const[loading, setLoading] = useState(true);
    const[saving, setSaving] = useState(false);

    const[brands, setBrands] = useState<Brand[]>([]);
    const[productTypes, setProductTypes] = useState<ProductType[]>([])

    const[selectedImage, setSelectedImage] = useState<File | null>(null);
    const[imagePreview, setImagePreview] = useState("");

    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    const[formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        brandId: 0,
        productTypeId: 0
    });

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const[brandsResponse, productTypesResponse] = 
                await Promise.all([
                    fetch("http://localhost:8080/api/products/brands"),
                    fetch("http://localhost:8080/api/products/producttypes")
                ]);

                if (!brandsResponse.ok){
                    throw new Error("Erro ao buscar marcas");
                }
                if(!productTypesResponse.ok){
                    throw new Error("Erro ao buscar tipos de produtos");
                }

                const brandsData: Brand[] = await brandsResponse.json();
                const productTypesData: ProductType[] = await productTypesResponse.json();

                setBrands(brandsData);
                setProductTypes(productTypesData);
            } catch (error) {
                console.error(error);
                setErrorMessage("Não foi possível carregar os dados");
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file){
            return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleCancel = () => {
        navigate("/products");
    };

    const handleCreate = async () => {
        try{
            setSaving(true);

            if(!selectedImage){
                setErrorMessage("Selecione uma imagem para o produto");
                return;
            }
            if(!formData.brandId || formData.productTypeId) {
                setErrorMessage("Selecione a marca e o tipo de produto");
                return;
            }

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", String(formData.price));
            data.append("quantity", String(formData.quantity));
            data.append("brandId", String(formData.brandId));
            data.append("productTypeId", String(formData.productTypeId));
            data.append("image", selectedImage);

            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                body: data
            });

            if(!response.ok){
                const errorText = await response.text();
                console.error("Erro da API:", errorText);
                throw new Error(`Erro ao cadastrar o produto: ${errorText}`);

            }

            setSuccessMessage("Produto cadastrado com sucesso");

            setTimeout(() => {
                navigate("/products");
            }, 1200);

        } catch (error){
            console.error(error);
            setErrorMessage("Não foi possível cadastrar o produto");
        } finally{
            setSaving(false);
        }
    };

    if(loading){
        return(
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress/>
            </Box>
        );
    }

    return(
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p:4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Cadastrar Produto
                </Typography>

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

                    <Button variant="outlined" component="label">
                        Selecionar imagem
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}                        
                        />
                    </Button>

                    {selectedImage && (
                        <Typography variant="body2">
                            Imagem selecionada: {selectedImage.name}
                        </Typography>
                    )}

                    {imagePreview && (
                        <Box
                          component="img"
                          src={imagePreview}
                          alt="Preview do Produto"
                          sx={{
                            width: "100%",
                            maxHeight: 260,
                            objectFit: "cover",
                            borderRadius: 2
                          }}
                        />                
                    
                    )}
                    <TextField 
                      select
                      label="Marca"
                      name="brandId"
                      value={formData.brandId}
                      onChange={handleChange}
                      fullWidth
                    >
                        
                        <MenuItem value={0} disabled>
                            Selecione uma marca
                        </MenuItem>

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
                        <MenuItem value={0} disabled>
                            Selecione o tipo de produto
                        </MenuItem>

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
                            onClick={handleCreate}
                            disabled={saving}
                        >
                            {saving ? "Salvando..." : "Cadastrar"}
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