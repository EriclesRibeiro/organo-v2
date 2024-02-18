import { useState } from "react"

import Header from "./components/header"
import Overview from "./components/overview"
import { Status, TOrgano, TOrganoItem } from "./@types/TOrgano"
import SelectOrgano from "./components/select-organo"

import useLocalStorage from "./hooks/useLocalStorage"
import ContainerMaxWidth from "./components/container-max-width"
import ContainerCards from "./components/container-cards"
import { TCategorie } from "./@types/TCategorie"

export function App() {
  const organoCategories: TCategorie[] = [
    { id: '1', name: 'Front-End' },
    { id: '2', name: 'Back-End' },
    { id: '3', name: 'DevOps' }
  ]
  const [organo, setOrgano] = useLocalStorage<TOrgano[]>('organo', [])
  const [categories, setCategories] = useLocalStorage<TCategorie[]>('categorie', organoCategories)
  const [organoSelected, setOrganoSelected] = useState(organo[0])

  function handleSelectOrgano(id: string) {
    const selected = organo.find(item => item.id === id)
    setOrganoSelected(selected!)
  }

  function getOverview(organo: TOrgano) {
    return {
      ...organo.overview,
      id: organo.id
    }
  }

  function addOrgano(data: TOrgano) {
    setOrgano([
      ...organo,
      data
    ])

    setOrganoSelected(data)
  }

  function addOrganoItem(data: TOrganoItem) {
    console.log(data)
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

  function removeOrgano(id: string) {
    const result = organo.filter(item => item.id !== id)

    setOrgano(result)
    setOrganoSelected(result[0])
  }

  return (
    <>
      <Header addOrgano={addOrgano} />
      <ContainerMaxWidth>
        <SelectOrgano handleSelectedValue={handleSelectOrgano} selectedValue={organoSelected?.id} data={organo.map(getOverview)} />
        {organoSelected && (
          <>
            <Overview
              data={{
                overview: organoSelected.overview,
                status: organoSelected.status,
                id: organoSelected.id
              }}
              inactivateOrgano={inactivateOrgano}
              removeOrgano={removeOrgano} />

            <ContainerCards
              categories={categories}
              data={organoSelected.items!} />
          </>
        )}
      </ContainerMaxWidth>
    </>
  )
}
