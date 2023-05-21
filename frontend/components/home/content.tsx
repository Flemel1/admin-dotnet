import { Button, Link } from "@nextui-org/react"
import { DataTableProduct } from "../../utils/type"
import { Box } from "../styles/box"
import { TableWrapper } from "../table/table"

export const Content = ({ products }: DataTableProduct) => (
  <Box css={{ overflow: "hidden", height: "100%" }}>
    <Button>
      <Link href="/product/create">Tambah Product</Link>
    </Button>
    <TableWrapper products={products} />
  </Box>
)
