import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { DataTableService, Service, ServiceState } from "../utils/type"

const initialState: ServiceState = {
  services: [],
}

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    loadServices: (state, action: PayloadAction<DataTableService>) => {
      state.services = action.payload.services
    },
    insertService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload)
    },
    deleteService: (state, action: PayloadAction<number>) => {
      const index = state.services.findIndex(
        (service) => service.id == action.payload
      )
      state.services.splice(index, 1)
    },
  },
})

export const { loadServices, insertService, deleteService } =
  serviceSlice.actions

export default serviceSlice.reducer
