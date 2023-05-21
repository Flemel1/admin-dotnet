import { Button, Input } from "@nextui-org/react"
import axios from "axios"
import { Form, Formik } from "formik"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { Flex } from "../../components/styles/flex"
import { useAppDispatch } from "../../utils/hooks"
import type { Service } from "../../utils/type"

interface Values {
  name: string
  description: string
}

interface Props {
  service: Service
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required")
})

const EditPage = ({ service }: Props) => {
  const router = useRouter()

  const initialValues = {
    name: service.name,
    description: service.description
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          const res = await axios.put<Service>(
            `http://localhost:5024/api/service/${service.id}`,
            values,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          if (res.status === 200 || res.status === 201) {
            router.push("/service")
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
  service: Service
}> = async ({ params }) => {
  const id = params?.id || 1
  const res = await axios.get<Service>(
    `http://localhost:5024/api/service/${id}`
  )
  const service = res.data

  return { props: { service } }
}
