import axios from "axios"
import { GetServerSideProps } from "next"
import type {
  DataTableProduct,
  DataTableService,
  Product,
  Service,
} from "../utils/type"
import { Flex } from "../components/styles/flex"
import { Card, Container, Grid, Text } from "@nextui-org/react"

const fetchProducts = async () => {
  const res = await axios.get<DataTableProduct>(
    "http://localhost:5024/api/product"
  )
  return res.data
}

const fetchServices = async () => {
  const res = await axios.get<DataTableService>(
    "http://localhost:5024/api/service"
  )
  return res.data
}

interface Props {
  products: Product[]
  services: Service[]
}

const HomePage = ({ products, services }: Props) => {
  return (
    <Container>
      <Container>
        <Text h1={true} css={{ textAlign: "center" }}>
          Tentang Kami
        </Text>
        <Text h3={true} weight={"medium"}>
          Kami Perusahaan Penyedia Layanan dan Penjualan Barang Elektronik
          Seperti Laptop, Smartphone, PC Rakitan dll yang dapat menunjang
          kinerja customer kami dalam melakukan aktivitas keseharian mereka
        </Text>
      </Container>
      <Container>
        <Text h1={true} css={{ textAlign: "center" }}>
          Visi Kami
        </Text>
        <Text h3={true} weight={"medium"}>
          Ingin menjadi supplier barang elektronik terbesar di Indonesia
        </Text>
      </Container>
      <Container>
        <Text h1={true} css={{ textAlign: "center" }}>
          Misi Kami
        </Text>
        <Text h3={true} weight={"medium"}>
          Meningkatkan layanan dan kualitas barang yang kami miliki untuk
          menjamin kepuasan customer
        </Text>
      </Container>
      <Container>
        <Text h2={true} css={{ textAlign: "center" }}>
          Produk Kami
        </Text>
        <Grid.Container gap={4}>
          {products.map((product) => (
            <Grid xs={6} sm={3}>
              <Card>
                <Card.Body>
                  <Text>Nama Produk: {product.name}</Text>
                  <Text>Deskripsi: {product.description}</Text>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
      <Container>
        <Text h2={true} css={{ textAlign: "center" }}>
          Layanan Kami
        </Text>
        <Grid.Container gap={4}>
          {services.map((service) => (
            <Grid xs={6} sm={3}>
              <Card>
                <Card.Body>
                  <Text>Nama Layanan: {service.name}</Text>
                  <Text>Deskripsi: {service.description}</Text>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </Container>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<{
  products: DataTableProduct
  services: DataTableService
}> = async () => {
  const productData = fetchProducts()
  const serviceData = fetchServices()
  const [products, services] = await Promise.all([productData, serviceData])
  return {
    props: {
      products,
      services,
    },
  }
}
