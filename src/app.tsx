import { useState } from "react"

import { Header } from "./components/header"
import { Overview } from "./components/overview"
import { Status, TOrgano } from "./@types/TOrgano"
import { OrganoView } from "./components/organo-view"
import { SelectOrgano } from "./components/select-organo"

import useLocalStorage from "./hooks/useLocalStorage"

export function App() {
  const [organo, setOrgano] = useLocalStorage<TOrgano[]>('organo', [])
  const [selectedValue, setSelectedValue] = useState(organo[0]?.id)
  const [organoSelected, setOrganoSelected] = useState(organo[0])

  function handleSelectOrgano(id: string) {
    setSelectedValue(id)
    const selected = organo.find(item => item.id === id)
    setOrganoSelected(selected!)
  }

  function getOverview(organo: TOrgano) {
    return {
      ...organo.overview,
      id: organo.id
    }
  }

  function getOrganoItems(id: string) {
    const result = organo.find(item => item.id === id)
    if (result?.items) return result.items

    return []
  }

  function addOrgano(data: TOrgano) {
    setOrgano([
      ...organo,
      data
    ])

    setSelectedValue(data.id)
    setOrganoSelected(data)
  }

  function inactivateOrgano(id: string) {
    const organoUpdated = organo.map(item => {
      if (item.id === id) {
        setOrganoSelected({ ...item, status: Status.Inativo })
        return { ...item, status: Status.Inativo }
      }

      return item;
    })

    setOrgano(organoUpdated)

  }


  return (
    <>
      <Header addOrgano={addOrgano} />
      <div className="max-w-6xl w-full bg-transparent mx-auto px-3">
        <div className="text-center py-5">
          <h1 className="text-or-snow text-2xl font-bold leading-6">Bem vindo ao Organo</h1>
          <p className="text-or-gray text-base font-light">Vamos organizar nosso tempo juntos</p>
        </div>
        <SelectOrgano handleSelectedValue={handleSelectOrgano} selectedValue={selectedValue} data={organo.map(getOverview)} />
        {organoSelected && (
          <>
            <Overview data={{
              overview: organoSelected.overview,
              status: organoSelected.status,
              id: organoSelected.id
            }} inactivateOrgano={inactivateOrgano} />
            <OrganoView items={getOrganoItems(selectedValue)} />
          </>
        )}
      </div>
    </>
  )
}
