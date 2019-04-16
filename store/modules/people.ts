import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '~/store'

export const name = 'people'

export const types = {
  SELECT: 'SELECT',
  SET: 'SET',
}

export interface IPersonContact {
  email: string
  phone: string
}

export interface IPersonAddress {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}

export interface IPerson {
  id: number
  first_name: string
  last_name: string
  contact: IPersonContact
  gender: string
  ip_address: string
  avatar: string
  address: IPersonAddress
}

export interface IState {
  selected: number
  people: IPerson[]
}

export const namespaced = true

export const state = (): IState => ({
  selected: 1,
  people: [],
})

export const getters: GetterTree<IState, RootState> = {
  selectedPerson: s => {
    const p = s.people.find(person => person.id === s.selected)
    return p ? p : { first_name: 'Please,', last_name: 'select someone' }
  },
}

export interface IActions<S, R> extends ActionTree<S, R> {
  select(context: ActionContext<S, R>, id: number): void
}

export const actions: IActions<IState, RootState> = {
  select({ commit }, id: number) {
    commit(types.SELECT, id)
  },
}

export const mutations: MutationTree<IState> = {
  [types.SELECT](s, id: number) {
    s.selected = id
  },
  [types.SET](s, people: IPerson[]) {
    s.people = people
  },
}
