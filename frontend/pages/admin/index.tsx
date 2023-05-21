import type { GetServerSideProps, NextPage } from "next"
import { Content } from "../../components/home/content"
import axios from "axios"
import { DataTableProduct, Product } from "../../utils/type"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import type { RootState } from "../../redux/store"
import { useEffect } from "react"
import { loadProducts } from "../../redux/productSlice"
import { Layout } from "../../components/layout/layout"

const Home = (products: DataTableProduct) => {
  const data = useAppSelector((state: RootState) => state.product.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadProducts(products))
  }, [products])

  if (data.length !== 0) {
    return (
      <Layout>
        <Content products={data} />
      </Layout>
    )
  }

  return (
    <Layout>
      <Content products={products.products} />
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
  products: DataTableProduct
}> = async () => {
  const res = await axios.get<DataTableProduct>(
    "http://localhost:5024/api/product"
  )
  const products = res.data

  return { props: { products } }
}
