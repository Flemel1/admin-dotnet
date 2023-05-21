import type { GetServerSideProps, NextPage } from "next"
import axios from "axios"
import { useEffect } from "react"
import { DataTableService } from "../../utils/type"
import { ServiceContent } from "../../components/home/service-content"
import { loadServices } from "../../redux/service-slice"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import type { RootState } from "../../redux/store"
import { Layout } from "../../components/layout/layout"

const ServicePage = (services: DataTableService) => {
  const data = useAppSelector((state: RootState) => state.service.services)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadServices(services))
  }, [services])

  if (data.length !== 0) {
    return (
      <Layout>
        <ServiceContent services={data} />
      </Layout>
    )
  }

  return (
    <Layout>
      <ServiceContent services={services.services} />
    </Layout>
  )
}

export default ServicePage

export const getServerSideProps: GetServerSideProps<{
  services: DataTableService
}> = async () => {
  const res = await axios.get<DataTableService>(
    "http://localhost:5024/api/service"
  )
  const services = res.data

  return { props: { services } }
}
