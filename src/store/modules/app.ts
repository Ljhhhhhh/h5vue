import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
export interface IAppState {
  direction: string
}

@Module({ dynamic: true, store, name: 'app'})
class App extends VuexModule implements IAppState {
  public direction = 'forward';

  @Mutation
  public updateDirection(dir: string) {
    this.direction = dir;
  }

}

export const AppModule = getModule(App)