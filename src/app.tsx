import { useState } from "react"

import {Header} from "./components/header"
import {Overview} from "./components/overview"
import { Status, TOrgano, TOrganoItem } from "./@types/TOrgano"
import {SelectOrgano} from "./components/select-organo"

import useLocalStorage from "./hooks/useLocalStorage"
import {ContainerMaxWidth} from "./components/container-max-width"
import {ContainerCards} from "./components/container-cards"
import { TCategorie } from "./@types/TCategorie"

export function App() {
  const organoCategories: TCategorie[] = [
    { id: '1', name: 'Front-End' },
    { id: '2', name: 'Back-End' },
    { id: '3', name: 'DevOps' }
  ]
  const [organos, setOrganos] = useLocalStorage<TOrgano[]>('organo', [])
  const [categories, setCategories] = useLocalStorage<TCategorie[]>('categorie', organoCategories)
  const [organoSelected, setOrganoSelected] = useState(organos[0])

  function handleSelectOrgano(id: string) {
    const selected = organos.find(item => item.id === id)
    setOrganoSelected(selected!)
  }

  function getOverview(organo: TOrgano) {
    return {
      ...organo.overview,
      id: organo.id
    }
  }

  function addOrgano(data: TOrgano) {
    setOrganos([
      ...organos,
      data
    ])

    setOrganoSelected(data)
  }

  function addOrganoItem(data: TOrganoItem) {
    const organoUpdated = organos.map(organo => {
      if(organo.id === organoSelected.id) {
        organo.items?.push(data)
        setOrganoSelected(organo)
        
        return organo
      }
      return organo
    })

    setOrganos(organoUpdated)
  }

  function inactivateOrgano(id: string) {
    const organoUpdated = organos.map(item => {
      if (item.id === id) {
        setOrganoSelected({ ...item, status: Status.Inativo })
        return { ...item, status: Status.Inativo }
      }

      return item;
    })

    setOrganos(organoUpdated)

  }

  function removeOrgano(id: string) {
    const result = organos.filter(item => item.id !== id)

    setOrganos(result)
    setOrganoSelected(result[0])
  }

  return (
    <>
      <Header addOrgano={addOrgano} />
      <ContainerMaxWidth>
        <SelectOrgano 
          handleSelectedValue={handleSelectOrgano} 
          selectedValue={organoSelected?.id} 
          data={organos.map(getOverview)} />
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
              status={organoSelected.status}
              categories={categories}
              data={organoSelected.items!} 
              addOrganoItem={addOrganoItem} />
          </>
        )}
      </ContainerMaxWidth>
    </>
  )
}
