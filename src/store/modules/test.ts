import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
export interface INumberState {
  number: number
}

@Module({ dynamic: true, store, name: 'number'})
class Number extends VuexModule implements INumberState {
  public number = 1;

  @Mutation
  public onePlus() {
    this.number++
  }

  @Action
  public onePlusAsync() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.onePlus()
        resolve()
      }, 1500)
    })
  }
}

export const NumberModule = getModule(Number)