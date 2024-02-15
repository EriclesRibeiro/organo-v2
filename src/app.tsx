import { useState } from "react"

import { Header } from "./components/header"
import { Overview } from "./components/overview"
import { Status, StatusItem, TOrgano, TOrganoItem } from "./@types/TOrgano"
import { SelectOrgano } from "./components/select-organo"

import useLocalStorage from "./hooks/useLocalStorage"
import { ContainerMaxWidth } from "./components/container-max-width"
import { ContainerCards } from "./components/container-cards"

export function App() {
  const [organo, setOrgano] = useLocalStorage<TOrgano[]>('organo', [])
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

  const items: TOrganoItem[] = [
    {
      id: '1',
      name: 'Ericles Ribeiro',
      office: 'Desenvolvedor',
      github: 'EriclesRibeiro',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Back-End'
    },
    {
      id: '2',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '3',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '4',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '5',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '6',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '7',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '8',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '9',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '10',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Back-End'
    },
    {
      id: '11',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'Front-End'
    },
    {
      id: '12',
      name: 'Ericles Ribeiro - Cronapp',
      office: 'Designer',
      github: 'EriclesRibeiro-Cronapp',
      linkedin: 'ericles-ribeiro',
      status: StatusItem.Ativo,
      categorie: 'DevOps'
    },
  ]

  const organoCategories: string[] = [
    'Front-End',
    'Back-End',
    'DevOps',
  ]

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

            {organoSelected.items && (
              <ContainerCards
                categories={organoCategories}
                data={items} />
            )}
          </>
        )}
      </ContainerMaxWidth>
    </>
  )
}
