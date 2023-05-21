import { Button, Input } from "@nextui-org/react"
import axios from "axios"
import { Form, Formik } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { Flex } from "../../components/styles/flex"
import { insertService } from "../../redux/service-slice"
import { useAppDispatch } from "../../utils/hooks"
import type { Service } from "../../utils/type"

interface Values {
  name: string
  description: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required")
})

const CreatePage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initialValues = {
    name: "",
    description: "",
    quantity: 0,
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          const res = await axios.post<Service>(
            "http://localhost:5024/api/service",
            values,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          if (res.status === 200 || res.status === 201) {
            dispatch(insertService(res.data))
            router.push("/service")
          }
        }}
      >
        {({ handleBlur, handleChange, errors, touched }) => (
          <Form>
            <Flex direction={"column"} css={{ padding: "$10", gap: "$10" }}>
              <Input
                aria-label="Name"
                clearable={true}
                placeholder="Name..."
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Input
                aria-label="Description"
                clearable={true}
                placeholder="Description..."
                name="description"
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

export default CreatePage
