import { Button, Link } from "@nextui-org/react"
import { DataTableService } from "../../utils/type"
import { Box } from "../styles/box"
import { TableService } from "../table/service-table"

export const ServiceContent = ({ services }: DataTableService) => (
  <Box css={{ overflow: "hidden", height: "100%" }}>
    <Button>
      <Link href="/service/create">Tambah Service</Link>
    </Button>
    <TableService services={services} />
  </Box>
)
