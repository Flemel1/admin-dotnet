import { Button, Input } from "@nextui-org/react"
import { Form, Formik } from "formik"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import * as Yup from "yup"
import { Flex } from "../../components/styles/flex"
import axios from "axios"
import type { Product } from "../../utils/type"
import { useAppDispatch } from "../../utils/hooks"
import { insertProduct } from "../../redux/productSlice"
import { useRouter } from "next/router"

interface Values {
  name: string
  description: string
  quantity: number
}

interface Props {
  product: Product
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  quantity: Yup.number().required("Required"),
})

const EditPage = ({ product }: Props) => {
  const router = useRouter()

  const initialValues = {
    name: product.name,
    description: product.description,
    quantity: product.quantity,
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          const res = await axios.put<Product>(
            `http://localhost:5024/api/product/${product.id}`,
            values,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          if (res.status === 200 || res.status === 201) {
            router.push("/")
          }
        }}
      >
        {({ handleBlur, handleChange, errors, touched, values }) => (
          <Form>
            <Flex direction={"column"} css={{ padding: "$10", gap: "$10" }}>
              <Input
                aria-label="Name"
                clearable={true}
                placeholder="Name..."
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Input
                aria-label="Description"
                clearable={true}
                placeholder="Description..."
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <Input
                aria-label="Quantity"
                clearable={true}
                placeholder="Quantity..."
                inputMode="numeric"
                name="quantity"
                value={values.quantity}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.quantity && touched.quantity ? (
                <div>{errors.quantity}</div>
              ) : null}
              <Button type="submit">Submit</Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default EditPage

export const getServerSideProps: GetServerSideProps<{
  product: Product
}> = async ({ params }) => {
  const id = params?.id || 1
  const res = await axios.get<Product>(
    `http://localhost:5024/api/product/${id}`
  )
  const product = res.data

  return { props: { product } }
}
