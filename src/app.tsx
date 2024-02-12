import { Overview } from "./components/overview"
import { Status, TOrgano } from "./@types/TOrgano"
import { useState } from "react"
import { SelectOrgano } from "./components/select-organo"
import { OrganoView } from "./components/organo-view"
import { Header } from "./components/header"

// const organo: TOrgano[] = [
//   {
//     id: '1',
//     overview: {
//       creator: 'Ericles Ribeiro',
//       description: 'Descrição do Organo e mais coisas',
//       image: 'https://i.redd.it/qq9rnxx4sg971.png',
//       lastUpdate: new Date(),
//       createdAt: new Date(),
//       subtitle: 'Subtítulo do organo',
//       title: 'Nome do Organo',
//       email: 'ericles00@hotmail.com'
//     },
//     items: [
//       {
//         name: 'Ericles Ribeiro',
//         office: 'Desenvolvedor',
//         status: Status.Ativo,
//         github: 'https://github.com/EriclesRibeiro',
//         linkedin: ''
//       }
//     ]
//   },
//   {
//     id: '2',
//     overview: {
//       creator: 'Ericles Ribeiro',
//       description: 'Descrição do Organo e mais coisas',
//       image: 'https://i.redd.it/qq9rnxx4sg971.png',
//       lastUpdate: new Date(),
//       createdAt: new Date(),
//       subtitle: 'Subtítulo do organo',
//       title: 'Nome do Organo 2',
//       email: 'ericles00@hotmail.com'
//     },
//     items: []
//   },
// ]

export function App() {

  const [organo, setOrgano] = useState<TOrgano[]>([])
  const [selectedValue, setSelectedValue] = useState(organo[0]?.id)
  const [organoSelected, setOrganoSelected] = useState(organo[0])

  const handleSelectOrgano = (id: string) => {
    setSelectedValue(id)
    const selected = organo.find(item => item.id === id)
    setOrganoSelected(selected!)
  }

  const getOverview = (organo: TOrgano) => {
    return {
      ...organo.overview,
      id: organo.id
    }
  }

  const getOrganoItems = (id: string) => {
    const result = organo.find(item => item.id === id)
    if (result?.items) return result.items

    return []
  }

  const addOrgano = (data: TOrgano) => {
    setOrgano([
      ...organo,
      data
    ])

    setSelectedValue(data.id)
    setOrganoSelected(data)
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
            <Overview data={organoSelected.overview} />
            <OrganoView items={getOrganoItems(selectedValue)} />
          </>
        )}
      </div>
    </>
  )
}
