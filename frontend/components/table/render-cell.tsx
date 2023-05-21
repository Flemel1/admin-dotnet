import { Col, Row, Text, Tooltip } from "@nextui-org/react"
import axios from "axios"
import { useRouter } from "next/router"
import React from "react"
import { deleteProduct } from "../../redux/productSlice"
import { useAppDispatch } from "../../utils/hooks"
import { Product } from "../../utils/type"
import { DeleteIcon } from "../icons/table/delete-icon"
import { EditIcon } from "../icons/table/edit-icon"
import { IconButton } from "./table.styled"

interface Props {
  product: Product
  columnKey: string | React.Key
}

export const RenderCell = ({ product, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = product[columnKey]
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onDelete = async (id: number) => {
    const res = await axios.delete(`http://localhost:5024/api/product/${id}`)
    if (res.status === 200 || res.status === 201) {
      dispatch(deleteProduct(id))
    }
  }

  switch (columnKey) {
    case "name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {cellValue}
        </Text>
      )
    case "role":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {cellValue}
        </Text>
      )
    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit Product">
              <IconButton onClick={() => router.push(`/product/${product.id}`)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Delete Product" color="error">
              <IconButton onClick={() => onDelete(product.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      )
    default:
      return cellValue
  }
}
