import '@angular/compiler'
import {
  readingReducer,
  initialReadingState,
} from './reading.reducer'

import {
  addToReading,
  removeFromReading,
} from './reading.actions'

import { Resource } from '../services/resources.service'

describe('readingReducer', () => {

  const resource: Resource = {
    id: 1,
    title: 'Introducción a la programación',
    category: 'Programación',
    description: 'Recurso de aprendizaje de programación.',
  }

  it('debe retornar el estado inicial', () => {
    const state = readingReducer(undefined, {
      type: '@@INIT',
    })

    expect(state).toEqual(initialReadingState)
    expect(state.resources).toEqual([])
  })

  it('debe agregar un recurso a la lista', () => {
    const state = readingReducer(
      initialReadingState,
      addToReading({ resource })
    )

    expect(state.resources.length).toBe(1)
    expect(state.resources[0]).toEqual(resource)
  })

  it('no debe agregar recursos duplicados', () => {
    const stateWithResource = readingReducer(
      initialReadingState,
      addToReading({ resource })
    )

    const state = readingReducer(
      stateWithResource,
      addToReading({ resource })
    )

    expect(state.resources.length).toBe(1)
  })

  it('debe eliminar un recurso de la lista', () => {
    const stateWithResource = readingReducer(
      initialReadingState,
      addToReading({ resource })
    )

    const state = readingReducer(
      stateWithResource,
      removeFromReading({ resourceId: 1 })
    )

    expect(state.resources.length).toBe(0)
  })

})
